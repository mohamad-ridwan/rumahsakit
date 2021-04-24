import React, { useContext, useEffect, useState } from 'react'
import CarouselMain from '../../components/carouselmain/CarouselMain'
import './Home.scss'
import bgGradient from '../../images/bggradient.png'
import logo2Rs from '../../images/logo2-rs.png'
import bgPink from '../../images/bgpink.svg'
import ButtonCard from '../../components/buttoncard/ButtonCard'
import Card from '../../components/card/Card'
import imgCard from '../../images/healtarticles1.png'
import { useHistory } from 'react-router'
import { PathContext } from '../../services/context/path/Path'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import API from '../../services/api'
import Endpoint from '../../services/api/endpoint'
import Loading from '../../components/loading/Loading'

function Home() {

    const [paramsGlobal, setParamsGlobal, updateParams] = useContext(PathContext)
    const [dataArticle, setDataArticle] = useState([])
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    function setAllAPI() {
        setLoading(true);

        API.APIGetHealthArticle()
            .then(res => {
                let newData = new Array()
                if (res.data.length > 0) {
                    for (let i = 0; i < 3; i++) {
                        newData.push(res.data[i])
                    }
                    setDataArticle(newData)
                    setLoading(false)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setAllAPI();
    }, [])

    function goToArticles(path) {
        history.push(`/${path}`)
    }

    function goToBlogArticle(path) {
        history.push(`/articles/read/${path}`)
    }

    return (
        <>
            <HelmetCard
                title="Rumah Sakit Permata"
                content="Rumah Sakit Permata - Permata Keluarga Husada Grup"
            />
            <div className="wrapp-home">
                <CarouselMain />

                <div className="bg-gradient-home" style={{
                    backgroundImage: `url(${bgGradient})`
                }}>
                    <div className="column-tengah-bg-gradient">
                        <img src={logo2Rs} alt="" className="img-logo2-rs" />
                        <p className="txt-rs-permata-depok">
                            RS PERMATA DEPOK
                        </p>

                        <ButtonCard
                            title={'VIEW PROFILE'}
                        />
                    </div>
                </div>

                <div className="banner-selamat-datang" style={{
                    backgroundImage: `url(${bgPink})`
                }}>
                    <p className="title-selamat-datang">
                        Selamat Datang di RS Permata Keluarga Husada Grup
                    </p>
                    <p className="deskripsi-selamat-datang">
                        Website Ini dirancang untuk memudahkan anda dalam mendapatkan pelayanan kami dan memperoleh informasi kesehatan keluarga anda. Kami hadirkan pula Reservasi Online untuk konsultasi dengan dokter kami.
                    </p>
                </div>

                <div className="container-blog-health-articles">
                    <p className="title-blog-health-articles">
                        HEALTH ARTICLES
                    </p>

                    <div className="column-blog-card-health-articles">
                        {dataArticle && dataArticle.length > 0 ?
                            dataArticle.map((e) => {

                                const removeTagHTML = e.deskripsi.includes('<br/>') ? e.deskripsi.split('<br/>').join(' ') : e.deskripsi

                                const minimizeDescription = removeTagHTML.substr(0, 200)
                                const minimizeTitle = e.title.substr(0, 50)

                                return (
                                    <Card
                                        key={e._id}
                                        img={`${Endpoint}/images/${e.image}`}
                                        title={`${minimizeTitle}...`}
                                        date={e.date}
                                        deskripsi={`${minimizeDescription}...`}
                                        heightImg={'200px'}
                                        clickToPage={async () => {
                                            await goToBlogArticle(e.path)
                                            updateParams(`/articles/read/${e.path}`)
                                        }}
                                    />
                                )
                            }) : (
                                <div></div>
                            )}
                    </div>

                    <div className="column-btn-blog-health-articles">
                        <ButtonCard
                            title={'READ MORE ARTICLES'}
                            border={'2px solid #b04579'}
                            colorNameBtn={'#b04579'}
                            colorIcon={'#b04579'}
                            clickBtn={async () => {
                                await goToArticles('articles')
                                updateParams('articles')
                            }}
                        />
                    </div>
                </div>
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
            />
        </>
    )
}

export default Home;