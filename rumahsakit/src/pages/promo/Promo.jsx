import React, { useContext, useEffect, useState } from 'react'
import './Promo.scss'
import { useHistory, withRouter } from 'react-router-dom'
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

    const [paramsGlobal, setParamsGlobal, updateParams] = useContext(PathContext)
    const [dataHeader, setDataHeader] = useState({})
    const [promo, setPromo] = useState([])
    const [totalData, setTotalData] = useState()
    const [indexBtn, setIndexBtn] = useState(5)
    const [loading, setLoading] = useState(false)

    const history = useHistory();
    const location = window.location.pathname.toString().split('/')[1]

    let index = 5

    function setAllAPI() {
        setLoading(true)
        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path.includes(location))
                setDataHeader(getData[0])
            })

        getDataPromo();
    }

    function getDataPromo() {
        API.APIGetPromo()
            .then(res => {
                setLoading(false)
                const respons = res.data
                setTotalData(respons.length)

                let newData = []

                if (respons.length > 2) {
                    for (let i = 0; i < index; i++) {
                        newData.push(respons[i])
                    }
                    setPromo(newData)
                } else {
                    setPromo(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setAllAPI();
    }, [])

    function loadMore() {
        if (index < totalData) {
            if (totalData > 12) {
                if (indexBtn === totalData) {
                    index = indexBtn - 3
                    setIndexBtn(indexBtn - 3)

                    setTimeout(() => {
                        getDataPromo();
                    }, 0);
                } else {
                    index = index + 3
                    setIndexBtn(indexBtn + 3)
                    setTimeout(() => {
                        getDataPromo();
                    }, 0);
                }
            }
        }
    }

    function goToPage(path) {
        history.push(`/promo/details/${path}`)
    }

    return (
        <>
            <HelmetCard
                title={`${dataHeader && dataHeader.namePage ? dataHeader.namePage + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}`}
                content="Rumah sakit permata Depok - Testimoni para pasien loyal"
            />
            <BannerHeader
                img={dataHeader && dataHeader.img ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />
            <div className="wrapp-promo">
                <Headers
                    header1={'Home'}
                    arrow={'>'}
                    header2={dataHeader && dataHeader.namePage}
                    cursor1={'pointer'}
                    colorHeader2={'#7e7e7e'}
                    click1={() => {
                        history.push('/')
                        updateParams('/')
                    }}
                />

                <div className="container-konten-promo">
                    {promo && promo.length > 0 ?
                        promo.map((e) => {
                            return (
                                <Card
                                    key={e._id}
                                    widthCard={'calc(90%/2'}
                                    heightImg="213px"
                                    heightCardImg="213"
                                    widthCardImg="425"
                                    paddingCard={'0'}
                                    marginCard={'0 0 40px 0'}
                                    img={`${Endpoint}/images/${e.image}`}
                                    title={e.title}
                                    date={e.date}
                                    deskripsi={e.deskripsi}
                                    clickToPage={() => {
                                        goToPage(e.path)
                                    }}
                                />
                            )
                        }) : (
                            <div></div>
                        )}
                </div>

                <div className="container-btn-promo">
                    {promo && promo.length > 12 ? (
                        <ButtonCard
                            title={indexBtn === totalData ? 'LESS' : 'LOAD MORE'}
                            nameClassBtn={'btn-card-two'}
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