import React, { useContext, useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import './Promo.scss'
import API from '../../services/api'
import url from '../../services/api/url'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Headers from '../../components/headers/Headers'
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

    const widthBody = document.body.getBoundingClientRect().width
    const minimizeValue = Math.floor(widthBody)

    const heightImgCard1024 = minimizeValue > 767 && minimizeValue < 1024 ? 'auto' : '213px'

    const widthImgCard1024 = minimizeValue > 767 && minimizeValue < 1024 ? 'auto' : '425'

    const heightImgCard = minimizeValue < 767 ? 'auto' : heightImgCard1024
    const widthImgCard = minimizeValue < 767 ? 'auto' : widthImgCard1024

    return (
        <>
            <HelmetCard
                title={Object.keys(dataHeader).length > 0 ? dataHeader.namePage + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content="Berbagai promo berobat atau produk semacamnya dirumah sakit permata depok - permata keluarga husada grup"
                linkCanonical={`${url}promo`}
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
                    <div className="column-konten-promo">
                        {currentList && currentList.length > 0 ?
                            currentList.map((e) => {
                                return (
                                    <>
                                        <div className="column-card-promo">
                                            <Card
                                                key={e._id}
                                                widthCard="100%"
                                                heightImg={heightImgCard}
                                                heightCardImg="213"
                                                widthCardImg={widthImgCard}
                                                paddingCard="0"
                                                lazyLoadingImg="lazy"
                                                marginCard="0 0 40px 0"
                                                nameBtnReadMore="Read More"
                                                displayBtnDownload="none"
                                                altImg={e.title}
                                                img={`${Endpoint}/images/${e.image}`}
                                                title={e.title}
                                                date={e.date}
                                                deskripsi={e.deskripsi}
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