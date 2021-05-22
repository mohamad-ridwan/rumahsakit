import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './SearchResult.scss'
import API from '../../services/api'
import { PathContext } from '../../services/context/path/Path'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Endpoint from '../../services/api/endpoint'
import Headers from '../../components/headers/Headers'
import Card from '../../components/card/Card'
import Loading from '../../components/loading/Loading'
import { FaqContext } from '../../services/context/faq/Faq'

function SearchResult() {

    const [titleMenuFaq, setTitleMenuFaq, indexActiveFaqGlobal, setIndexActiveFaqGlobal] = useContext(FaqContext)
    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive, searchResult, setSearchResult, searchValue, setSearchValue] = useContext(PathContext)
    const [dataHeader, setDataHeader] = useState({})
    const [dataFaq, setDataFaq] = useState([])
    const [article, setArticle] = useState([])
    const [publication, setPublication] = useState([])
    const [doctor, setDoctor] = useState([])
    const [layananAndFasilitas, setLayananAndFasilitas] = useState([])
    const [promo, setPromo] = useState([])
    const [career, setCareer] = useState([])
    const [loading, setLoading] = useState(false)

    const location = window.location.pathname.toString().split('/')[1]

    const history = useHistory()

    function setAllAPI() {
        setLoading(true)
        let newDataFaq = []

        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path === location)
                setDataHeader(getData[0])
            })

        API.APIGetGeneral()
            .then(res => {
                const respons = res.data
                respons.forEach((e) => {
                    newDataFaq.push(e)
                })

                setTimeout(() => {
                    API.APIGetVisitorPatientInformation()
                        .then(res => {
                            const respons = res.data
                            respons.forEach((e) => {
                                newDataFaq.push(e)
                            })

                            setTimeout(() => {
                                setDataFaq(newDataFaq)
                            }, 0);
                        })
                }, 0);
            })

        API.APIGetHealthArticle()
            .then(res => setArticle(res.data))

        API.APIGetPublication()
            .then(res => setPublication(res.data))

        API.APIGetListDoctor()
            .then(res => setDoctor(res.data))

        API.APIGetOurHospital()
            .then(res => {
                const getPathLayananAndFasilitas = res.data.filter((e) => e.path !== 'profil' && e.path !== 'jadwal-dokter')
                setLayananAndFasilitas(getPathLayananAndFasilitas)
            })

        API.APIGetPromo()
            .then(res => setPromo(res.data))

        API.APIGetCareer()
            .then(res => {
                setLoading(false)
                setCareer(res.data)
            })
    }

    useEffect(() => {
        setAllAPI();
        activeNavbar();
        setIndexActive();
    }, [])

    const searchFaq = dataFaq.filter((e) => e.question.toLowerCase().includes(searchResult.toLowerCase()))

    const searchArticles = article.filter((e) => e.title.toLowerCase().includes(searchResult.toLowerCase()))

    const searchPublication = publication.filter((e) => e.title.toLowerCase().includes(searchResult.toLowerCase()))

    const searchDoctor = doctor.filter((e) => e.name.toLowerCase().includes(searchResult.toLowerCase()) ||
        e.speciality.toLowerCase().includes(searchResult.toLowerCase())
    )

    const searchLayananAndFasilitas = layananAndFasilitas.filter((e) => e.title.toLowerCase().includes(searchResult.toLowerCase()))

    const searchPromo = promo.filter((e) => e.title.toLowerCase().includes(searchResult.toLowerCase()))

    const searchCareer = career.filter((e) => e.titleBidang.toLowerCase().includes(searchResult.toLowerCase()))

    const messageNoResult = searchFaq.length + searchArticles.length + searchPublication.length + searchDoctor.length + searchLayananAndFasilitas.length + searchPromo.length + searchCareer.length

    function toPage(path) {
        history.push(path)
        updateParams(path)
        setSearchValue('')
        setSearchResult('')
    }

    function updateStateFaq(index, title) {
        setIndexActiveFaqGlobal(index)
        setTitleMenuFaq(title)
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

            <div className="wrapp-search-result">
                <Headers
                    header1="Home"
                    arrow=">"
                    header2={dataHeader && dataHeader.namePage}
                    cursor1="pointer"
                    colorHeader2="#7e7e7e"
                    click1={() => toPage('/')}
                />

                <div className="konten-search-result">
                    {searchFaq && searchFaq.length > 0 ? (
                        <>
                            <p className="title-faq-search-result">
                                FAQ
                            </p>

                            <div className="konten-faq-search-result konten-group-search-result">
                                {searchFaq.map((e) => {

                                    const checkTitle = e.title === 'General' ? 0 : 1

                                    return (
                                        <>
                                            <Card
                                                key={e._id}
                                                widthCard="100%"
                                                flexDirection="row"
                                                displayImg="none"
                                                paddingCard="0"
                                                marginCard="0 0 40px 0"
                                                title={e.question}
                                                displayIcon="none"
                                                nameBtnReadMore="Read More"
                                                deskripsi={e.answer}
                                                clickToPage={() => {
                                                    updateStateFaq(checkTitle, e.title)
                                                    toPage(`/faq`)
                                                }}
                                            />
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}

                    {searchArticles && searchArticles.length > 0 ? (
                        <>
                            <p className="title-faq-search-result">
                                Article
                            </p>

                            <div className="konten-article-search-result konten-group-search-result">
                                {searchArticles.map((e) => {

                                    const removeTagHTML = e.deskripsi.includes('<br/>') ? e.deskripsi.split('<br/>').join(' ') : e.deskripsi

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
                                                deskripsi={removeTagHTML}
                                                clickToPage={() => toPage(`/articles/read/${e.path}`)}
                                            />
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}

                    {searchPublication && searchPublication.length > 0 ? (
                        <>
                            <p className="title-faq-search-result">
                                Publication
                            </p>

                            <div className="konten-publication-search-result konten-group-search-result">
                                {searchPublication.map((e) => {
                                    return (
                                        <>
                                            <Card
                                                key={e._id}
                                                widthCard="calc(90%/2)"
                                                flexDirection="row"
                                                heightImg="180px"
                                                heightCardImg="180"
                                                widthCardImg="120"
                                                paddingCard="0"
                                                displayReadMore="none"
                                                marginImg="0 20px 0 0"
                                                marginCard="0 0 40px 0"
                                                displayBtnDownload="flex"
                                                img={`${Endpoint}/images/${e.image}`}
                                                title={e.title}
                                                date={e.date}
                                                deskripsi={e.deskripsi}
                                                iconPdf={`${Endpoint}/images/${e.icon}`}
                                                linkDownloadPdf={e.link}
                                            />
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}

                    {searchDoctor && searchDoctor.length > 0 ? (
                        <>
                            <p className="title-faq-search-result">
                                Doctor
                            </p>

                            <div className="konten-doctor-search-result konten-group-search-result">
                                {searchDoctor.map((e) => {
                                    return (
                                        <>
                                            <Card
                                                key={e._id}
                                                widthCard="calc(100%/3)"
                                                displayReadMore="none"
                                                flexDirection="row"
                                                displayIcon="none"
                                                heightImg="80px"
                                                heightCardImg="213"
                                                widthCardImg="80"
                                                radiusImg="0"
                                                paddingCard="0"
                                                fontFamilyTitle="Mulish, sans-serif"
                                                fontTitle="16px"
                                                marginImg="0 10px 0 0"
                                                marginCard="0px 0px 40px 0"
                                                img={`${Endpoint}/images/${e.image}`}
                                                title={e.name}
                                                date={e.speciality}
                                                clickToPage={() => toPage(`/doctor/${e.path}`)}
                                            />
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}

                    {searchLayananAndFasilitas && searchLayananAndFasilitas.length > 0 ? (
                        <>
                            <p className="title-faq-search-result">
                                Layanan & Fasilitas
                            </p>

                            <div className="konten-layanan-and-fasilitas-search-result konten-group-search-result">
                                {searchLayananAndFasilitas.map((e) => {
                                    return (
                                        <>
                                            <Card
                                                key={e._id}
                                                widthCard="calc(90%/2)"
                                                flexDirection="row"
                                                displayIcon="none"
                                                radiusImg="0"
                                                paddingCard="0"
                                                fontStyle="italic"
                                                marginImg="0 10px 0 0"
                                                marginCard="0px 0px 40px 0"
                                                displayImg="none"
                                                nameBtnReadMore="Read More"
                                                title={e.title}
                                                deskripsi={e.konten}
                                                clickToPage={() => toPage(`/our-hospital/content/${e.path}`)}
                                            />
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}

                    {searchPromo && searchPromo.length > 0 ? (
                        <>
                            <p className="title-faq-search-result">
                                Promo
                            </p>

                            <div className="konten-promo-search-result konten-group-search-result">
                                {searchPromo.map((e) => {
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
                                })}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}

                    {searchCareer && searchCareer.length > 0 ? (
                        <>
                            <p className="title-faq-search-result">
                                Career
                            </p>

                            <div className="konten-career-search-result konten-group-search-result">
                                {searchCareer.map((e) => {
                                    return (
                                        <>
                                            <Card
                                                key={e._id}
                                                widthCard="calc(90%/2)"
                                                displayImg="none"
                                                paddingCard="0"
                                                fontTitle="18px"
                                                marginCard="0 0 40px 0"
                                                fontFamilyTitle="Mulish, sans-serif"
                                                nameBtnReadMore="View Detail"
                                                title={e.titleBidang}
                                                date={e.dateLamaran}
                                                deskripsi={e.deskripsi}
                                                clickToPage={() => toPage(`/career/details/${e.path}`)}
                                            />
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}

                    {messageNoResult === 0 ? (
                        <>
                            <p className="title-faq-search-result">
                                Sorry, no result
                            </p>
                        </>
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

export default SearchResult;