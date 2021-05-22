import React, { useContext, useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import './Promo.scss'
import API from '../../services/api'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Endpoint from '../../services/api/endpoint'
import Headers from '../../components/headers/Headers'
import { PathContext } from '../../services/context/path/Path'
import Card from '../../components/card/Card'
import ButtonCard from '../../components/buttoncard/ButtonCard'
import Loading from '../../components/loading/Loading'

function Promo() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar] = useContext(PathContext)
    const [dataHeader, setDataHeader] = useState({})
    const [promo, setPromo] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [loading, setLoading] = useState(false)

    const history = useHistory();
    const location = window.location.pathname.toString().split('/')[1]

    function setAllAPI() {
        setLoading(true)
        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path.includes(location))
                setDataHeader(getData[0])
            })

        API.APIGetPromo()
            .then(res => {
                setLoading(false)
                setPromo(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setAllAPI();
        activeNavbar();
    }, [])

    const indexOfLastPage = currentPage * perPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const currentList = promo.slice(indexOfFirstPage, indexOfLastPage)

    function loadMore() {
        if (perPage < promo.length) {
            setPerPage(perPage + 6)
        }
    }

    function toPage(path) {
        history.push(path)
        updateParams(path)
    }

    return (
        <>
            <HelmetCard
                title={Object.keys(dataHeader).length > 0 ? dataHeader.namePage + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content="Rumah sakit permata Depok - Testimoni para pasien loyal"
            />

            <BannerHeader
                img={Object.keys(dataHeader).length > 0 ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />

            <div className="wrapp-promo">
                <Headers
                    header1="Home"
                    arrow=">"
                    header2={dataHeader && dataHeader.namePage}
                    cursor1="pointer"
                    colorHeader2="#7e7e7e"
                    click1={() => toPage('/')}
                />

                <div className="container-konten-promo">
                    {currentList && currentList.length > 0 ?
                        currentList.map((e) => {
                            return (
                                <>
                                    <Card
                                        key={e._id}
                                        widthCard="calc(90%/2)"
                                        heightImg="213px"
                                        heightCardImg="213"
                                        widthCardImg="425"
                                        paddingCard="0"
                                        marginCard="0 0 40px 0"
                                        nameBtnReadMore="Read More"
                                        img={`${Endpoint}/images/${e.image}`}
                                        title={e.title}
                                        date={e.date}
                                        deskripsi={e.deskripsi}
                                        clickToPage={() => toPage(`/promo/details/${e.path}`)}
                                    />
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                </div>

                <div className="container-btn-promo">
                    {promo && promo.length > 6 ? (
                        <ButtonCard
                            displayBtn={perPage === promo.length || perPage > promo.length ? 'none' : 'flex'}
                            title="LOAD MORE"
                            nameClassBtn="btn-card-two"
                            clickBtn={loadMore}
                        />
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
            />
        </>
    )
}

export default withRouter(Promo);