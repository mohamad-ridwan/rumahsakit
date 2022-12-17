import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './DetailPromo.scss'
import API from '../../services/api'
import url from '../../services/api/url'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Headers from '../../components/headers/Headers'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import Loading from '../../components/loading/Loading'
import Card from '../../components/card/Card'

function DetailPromo() {
    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar] = useContext(PathContext)
    const [dataHeader, setDataHeader] = useState({})
    const [detailPromo, setDetailPromo] = useState({})
    const [allPromo, setAllPromo] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(3)

    const location = window.location.pathname.toString().split('/')[1]
    const locationDetail = window.location.pathname.toString().split('/')[3]

    const history = useHistory()

    function setAllAPI(pathLocal) {
        setLoading(true)
        const newLocationDetail = pathLocal === undefined ? locationDetail : pathLocal

        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path === location)
                setDataHeader(getData[0])
            })

        API.APIGetPromo()
            .then(res => {
                setLoading(false)
                const getData = res.data.filter((e) => e.path === newLocationDetail)
                setDetailPromo(getData[0])

                const getAllData = res.data.filter((e) => e.path !== newLocationDetail)
                setAllPromo(getAllData)
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setAllAPI();
        activeNavbar();
    }, [])

    const indexOfLastPage = currentPage * perPage
    const indexOfFirstPage = indexOfLastPage - perPage
    const currentList = allPromo.slice(indexOfFirstPage, indexOfLastPage)

    function RenderHTML(data) {
        return (
            <p className="txt-konten-detail-promo" dangerouslySetInnerHTML={{ __html: data.konten }}>

            </p>
        )
    }

    function toPage(path) {
        history.push(path)
        updateParams(path)

        if (path.includes('/details')) {
            const getIdPath = path.split('/promo/details/')
            setAllAPI(getIdPath[1]);
            window.scrollTo(0, 0)
        }
    }

    const widthBody = document.body.getBoundingClientRect().width
    const minimizeValue = Math.floor(widthBody)

    const heightImgCard1024 = minimizeValue > 766 && minimizeValue < 1024 ? '114px' : '150px'

    const heightImgCard = minimizeValue < 767 ? 'auto' : heightImgCard1024

    return (
        <>
            <HelmetCard
                title={Object.keys(detailPromo).length > 0 ? detailPromo.title + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content="Detail informasi perobatan atau produk semacamnya dengan promo yang tersedia dirumah sakit permata depok - permata keluarga husada grup"
                linkCanonical={`${url}promo/details/${detailPromo.path}`}
            />

            <BannerHeader
                img={Object.keys(dataHeader).length > 0 ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />

            <div className="wrapp-detail-promo">
                <Headers
                    header1="Home"
                    arrow=">"
                    header2={dataHeader && dataHeader.namePage}
                    header3={detailPromo && detailPromo.title}
                    cursor1="pointer"
                    cursor2="pointer"
                    colorHeader3="#7e7e7e"
                    arrow2=">"
                    click1={() => toPage('/')}
                    click2={() => toPage('/promo')}
                />

                <div className="container-detail-promo">
                    <div className="main-konten-detail-promo">
                        {Object.keys(detailPromo).length > 0 ? (
                            <>
                                <img src={`${Endpoint}/images/${detailPromo.image}`} loading="lazy" alt="gambar detail artikel promo rs permata" className="img-detail-promo" width="940" height="377" />

                                <p className="title-detail-promo">
                                    {detailPromo.title}
                                </p>

                                <p className="date-detail-promo">
                                    <i className="far fa-calendar-alt"></i>
                                    {detailPromo.date}
                                </p>
                            </>
                        ) : (
                            <div></div>
                        )}
                    </div>

                    <div className="konten-detail-promo">
                        <RenderHTML
                            konten={detailPromo && detailPromo.konten}
                        />
                    </div>

                    <div className="container-promo-lainnya">
                        <p className="promo-lainnya">
                            Promo Lainnya
                        </p>

                        <div className="column-card-promo-lainnya">
                            {currentList && currentList.length > 0 ? currentList.map((e) => {
                                return (
                                    <>
                                        <div className="column-card-detail-promo">
                                            <Card
                                                key={e._id}
                                                widthCard="100%"
                                                nameBtnReadMore="Read More"
                                                displayBtnDownload="none"
                                                altImg={e.title}
                                                img={`${Endpoint}/images/${e.image}`}
                                                title={e.title}
                                                date={e.date}
                                                deskripsi={e.deskripsi}
                                                heightImg={heightImgCard}
                                                lazyLoadingImg="lazy"
                                                linkDownloadPdf={`${url}promo/details/${e.path}`}
                                                clickToPage={() => toPage(`/promo/details/${e.path}`)}
                                            />
                                        </div>
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
            />
        </>
    )
}

export default DetailPromo;