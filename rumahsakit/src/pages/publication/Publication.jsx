import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './Publication.scss'
import API from '../../services/api'
import url from '../../services/api/url'
import { PathContext } from '../../services/context/path/Path'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Endpoint from '../../services/api/endpoint'
import Headers from '../../components/headers/Headers'
import Card from '../../components/card/Card'
import Loading from '../../components/loading/Loading'
import ButtonCard from '../../components/buttoncard/ButtonCard'

function Publication() {
    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive] = useContext(PathContext)
    const [dataHeader, setDataHeader] = useState({})
    const [publication, setPublication] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(6)

    const location = window.location.pathname.toString().split('/')[1]

    const history = useHistory()

    function setAllAPI() {
        setLoading(true)
        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path === location)
                setDataHeader(getData[0])
            })

        API.APIGetPublication()
            .then(res => {
                setLoading(false)
                setPublication(res.data)
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setAllAPI();
        setIndexActive();
        activeNavbar();
    }, [])

    const indexOfLastPage = currentPage * perPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const currentList = publication.slice(indexOfFirstPage, indexOfLastPage)

    function toPage(path) {
        history.push(path)
        updateParams(path)
    }

    function loadDataPublication() {
        if (perPage < publication.length) {
            setPerPage(perPage + 6)
        }
    }

    function toViewPdf(path) {
        window.open(path)
    }

    const widthBody = document.body.getBoundingClientRect().width
    const minimizeValue = Math.floor(widthBody)

    const heightImgCard1024 = minimizeValue > 766 && minimizeValue < 1024 ? '225px' : '180px'

    const widthImgCard1024 = minimizeValue > 766 && minimizeValue < 1024 ? '160' : '120'

    const heightImgCard = minimizeValue < 767 ? '180px' : heightImgCard1024
    const widthImgCard = minimizeValue < 767 ? '120' : widthImgCard1024

    return (
        <>
            <HelmetCard
                title={Object.keys(dataHeader).length > 0 ? dataHeader.namePage + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content="Buku panduan rumah sakit permata depok - permata keluarga husada grup"
                linkCanonical={`${url}publication`}
            />

            <BannerHeader
                img={Object.keys(dataHeader).length > 0 ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />

            <div className="wrapp-publication">
                <Headers
                    header1="Home"
                    arrow=">"
                    header2={dataHeader && dataHeader.namePage}
                    cursor1="pointer"
                    colorHeader2="#7e7e7e"
                    click1={() => toPage('/')}
                />

                <div className="konten-publication">
                    {currentList && currentList.length > 0 ? currentList.map((e) => {
                        return (
                            <>
                                <div className="column-card-publication">
                                    <Card
                                        key={e._id}
                                        widthCard="100%"
                                        flexDirection="row"
                                        heightImg={heightImgCard}
                                        heightCardImg="180"
                                        widthCardImg={widthImgCard}
                                        paddingCard="0"
                                        displayReadMore="none"
                                        marginImg="0 20px 0 0"
                                        marginCard="0 0 40px 0"
                                        displayBtnDownload="flex"
                                        altImg={e.title}
                                        img={`${Endpoint}/images/${e.image}`}
                                        clickToPage={() => toViewPdf(e.link)}
                                        title={e.title}
                                        date={e.date}
                                        deskripsi={e.deskripsi}
                                        iconPdf={`${Endpoint}/images/${e.icon}`}
                                        linkDownloadPdf={e.link}
                                    />
                                </div>
                            </>
                        )
                    }) : (
                        <div></div>
                    )}
                </div>

                {publication.length > 6 ? (
                    <>
                        <div className="column-btn-publication">
                            <ButtonCard
                                displayBtn={perPage === publication.length || perPage > publication.length ? 'none' : 'flex'}
                                nameClassBtn="btn-card-two"
                                title="LOAD MORE"
                                clickBtn={loadDataPublication}
                            />
                        </div>
                    </>
                ) : (
                    <div></div>
                )}
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
            />
        </>
    )
}

export default Publication;