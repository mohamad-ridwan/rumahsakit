import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import './SearchResult.scss'
import API from '../../services/api'
import url from '../../services/api/url'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'
import { FaqContext } from '../../services/context/faq/Faq'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Headers from '../../components/headers/Headers'
import Card from '../../components/card/Card'
import Loading from '../../components/loading/Loading'

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
    const [messageWrongQuery, setMessageWrongQuery] = useState(false)

    const location = window.location.pathname.toString().split('/')[1]

    const history = useHistory()

    const query = useLocation()

    const regexSpecialCharacters = /[^a-zA-Z0-9 ]/g

    function setAllAPI() {
        if (query && Object.keys(query).length > 0) {
            if (query.search.includes('?q=')) {
                setSearchResult(query.search.split('?q=')[1].replace(/ /g, '%20').split('%20').filter(e => e !== '').join(' '))
                setSearchValue(query.search.split('?q=')[1].replace(/ /g, '%20').split('%20').filter(e => e !== '').join(' '))
            } else {
                setMessageWrongQuery(true)
            }
        }
        setLoading(true)
        let newDataFaq = []

        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path === location)
                setDataHeader(getData[0])
            })
            .catch(err=>{
                console.log(err)
                alert('Oops!, telah terjadi kesalahan server')
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
            .catch(err=>{
                console.log(err)
                alert('Oops!, telah terjadi kesalahan server')
            })

        API.APIGetHealthArticle()
            .then(res => setArticle(res.data))
            .catch(err=>{
                console.log(err)
                alert('Oops!, telah terjadi kesalahan server')
            })

        API.APIGetPublication()
            .then(res => setPublication(res.data))
            .catch(err=>{
                console.log(err)
                alert('Oops!, telah terjadi kesalahan server')
            })

        API.APIGetListDoctor()
            .then(res => setDoctor(res.data))
            .catch(err=>{
                console.log(err)
                alert('Oops!, telah terjadi kesalahan server')
            })

        API.APIGetOurHospital()
            .then(res => {
                const getPathLayananAndFasilitas = res.data.filter((e) => e.path !== 'profil' && e.path !== 'jadwal-dokter')
                setLayananAndFasilitas(getPathLayananAndFasilitas)
            })
            .catch(err=>{
                console.log(err)
                alert('Oops!, telah terjadi kesalahan server')
            })

        API.APIGetPromo()
            .then(res => setPromo(res.data))
            .catch(err=>{
                console.log(err)
                alert('Oops!, telah terjadi kesalahan server')
            })

        API.APIGetCareer()
            .then(res => {
                setLoading(false)
                setCareer(res.data)
            })
            .catch(err=>{
                console.log(err)
                alert('Oops!, telah terjadi kesalahan server')
            })
    }

    useEffect(() => {
        setAllAPI();
        activeNavbar();
        setIndexActive();
    }, [query])

    const searchFaq = dataFaq.filter((e) => e.question.replace(regexSpecialCharacters, '').toLowerCase().includes(searchResult.replace(/ /g, '+').split('+').filter(e => e !== '').join(' ').replace(regexSpecialCharacters, '').toLowerCase()))

    const searchArticles = article.filter((e) => e.title.replace(regexSpecialCharacters, '').toLowerCase().includes(searchResult.replace(/ /g, '+').split('+').filter(e => e !== '').join(' ').replace(regexSpecialCharacters, '').toLowerCase()))

    const searchPublication = publication.filter((e) => e.title.replace(regexSpecialCharacters, '').toLowerCase().includes(searchResult.replace(/ /g, '+').split('+').filter(e => e !== '').join(' ').replace(regexSpecialCharacters, '').toLowerCase()))

    const searchDoctor = doctor.filter((e) => e.name.replace(regexSpecialCharacters, '').toLowerCase().includes(searchResult.replace(/ /g, '+').split('+').filter(e => e !== '').join(' ').replace(regexSpecialCharacters, '').toLowerCase()) ||
        e.speciality.replace(regexSpecialCharacters, '').toLowerCase().includes(searchResult.replace(/ /g, '+').split('+').filter(e => e !== '').join(' ').replace(regexSpecialCharacters, '').toLowerCase())
    )

    const searchLayananAndFasilitas = layananAndFasilitas.filter((e) => e.title.replace(regexSpecialCharacters, '').toLowerCase().includes(searchResult.replace(/ /g, '+').split('+').filter(e => e !== '').join(' ').replace(regexSpecialCharacters, '').toLowerCase()))

    const searchPromo = promo.filter((e) => e.title.replace(regexSpecialCharacters, '').toLowerCase().includes(searchResult.replace(/ /g, '+').split('+').filter(e => e !== '').join(' ').replace(regexSpecialCharacters, '').toLowerCase()))

    const searchCareer = career.filter((e) => e.titleBidang.replace(regexSpecialCharacters, '').toLowerCase().includes(searchResult.replace(/ /g, '+').split('+').filter(e => e !== '').join(' ').replace(regexSpecialCharacters, '').toLowerCase()))

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

    const widthBody = document.body.getBoundingClientRect().width
    const minimizeValue = Math.floor(widthBody)

    // Article
    const heightCardImgArticle1024 = minimizeValue > 766 && minimizeValue < 1024 ? 'auto' : '213px'
    const widthCardImgArticle1024 = minimizeValue > 766 && minimizeValue < 1024 ? 'auto' : '425'

    const heightCardImgArticle = minimizeValue < 767 ? 'auto' : heightCardImgArticle1024
    const widthCardImgArticle = minimizeValue < 767 ? 'auto' : widthCardImgArticle1024

    // Publication
    const heightImgCard1024Publication = minimizeValue > 766 && minimizeValue < 1024 ? '225px' : '180px'

    const widthImgCard1024Publication = minimizeValue > 766 && minimizeValue < 1024 ? '160' : '120'

    const heightImgCardPublication = minimizeValue < 767 ? '180px' : heightImgCard1024Publication
    const widthImgCardPublication = minimizeValue < 767 ? '120' : widthImgCard1024Publication

    return (
        <>
            <HelmetCard
                title={Object.keys(dataHeader).length > 0 ? dataHeader.namePage + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content="Pencarian berbagai konten di website rumah sakit permata depok - rumah sakit permata husada grup"
                linkCanonical={`${url}search`}
            />

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
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
                    {messageWrongQuery === false && searchFaq && searchFaq.length > 0 ? (
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
                                                altImg=""
                                                nameBtnReadMore="Read More"
                                                displayBtnDownload="none"
                                                deskripsi={e.answer}
                                                linkDownloadPdf={`${url}faq`}
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

                    {messageWrongQuery === false && searchArticles && searchArticles.length > 0 ? (
                        <>
                            <p className="title-faq-search-result">
                                Article
                            </p>

                            <div className="konten-article-search-result konten-group-search-result">
                                {searchArticles.map((e) => {

                                    const removeTagHTML = e.deskripsi.includes('<br/>') ? e.deskripsi.split('<br/>').join(' ') : e.deskripsi

                                    return (
                                        <>
                                            <div className="column-card-article-search-result">
                                                <Card
                                                    key={e._id}
                                                    widthCard="100%"
                                                    heightImg={heightCardImgArticle}
                                                    heightCardImg="213"
                                                    lazyLoadingImg="lazy"
                                                    widthCardImg={widthCardImgArticle}
                                                    paddingCard="0"
                                                    marginCard="0 0 40px 0"
                                                    nameBtnReadMore="Read More"
                                                    displayBtnDownload="none"
                                                    altImg={e.title}
                                                    img={`${Endpoint}/images/${e.image}`}
                                                    title={e.title}
                                                    date={e.date}
                                                    deskripsi={removeTagHTML}
                                                    linkDownloadPdf={`${url}articles/read/${e.path}`}
                                                    clickToPage={() => toPage(`/articles/read/${e.path}`)}
                                                />
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}

                    {messageWrongQuery === false && searchPublication && searchPublication.length > 0 ? (
                        <>
                            <p className="title-faq-search-result">
                                Publication
                            </p>

                            <div className="konten-publication-search-result konten-group-search-result">
                                {searchPublication.map((e) => {
                                    return (
                                        <>
                                            <div className="column-card-publication-search-result">
                                                <Card
                                                    key={e._id}
                                                    widthCard="100%"
                                                    flexDirection="row"
                                                    lazyLoadingImg="lazy"
                                                    heightImg={heightImgCardPublication}
                                                    heightCardImg="180"
                                                    widthCardImg={widthImgCardPublication}
                                                    paddingCard="0"
                                                    displayReadMore="none"
                                                    marginImg="0 20px 0 0"
                                                    marginCard="0 0 40px 0"
                                                    displayBtnDownload="flex"
                                                    altImg={e.title}
                                                    img={`${Endpoint}/images/${e.image}`}
                                                    title={e.title}
                                                    date={e.date}
                                                    deskripsi={e.deskripsi}
                                                    iconPdf={`${Endpoint}/images/${e.icon}`}
                                                    linkDownloadPdf={e.link}
                                                />
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}

                    {messageWrongQuery === false && searchDoctor && searchDoctor.length > 0 ? (
                        <>
                            <p className="title-faq-search-result">
                                Doctor
                            </p>

                            <div className="konten-doctor-search-result konten-group-search-result">
                                {searchDoctor.map((e) => {
                                    return (
                                        <>
                                            <div className="column-card-doctor-search-result">
                                                <Card
                                                    key={e._id}
                                                    widthCard="100%"
                                                    lazyLoadingImg="lazy"
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
                                                    displayBtnDownload="none"
                                                    altImg={e.name}
                                                    img={`${Endpoint}/images/${e.image}`}
                                                    title={e.name}
                                                    date={e.speciality}
                                                    linkDownloadPdf={`${url}doctor/${e.path}`}
                                                    clickToPage={() => toPage(`/doctor/${e.path}`)}
                                                />
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}

                    {messageWrongQuery === false && searchLayananAndFasilitas && searchLayananAndFasilitas.length > 0 ? (
                        <>
                            <p className="title-faq-search-result">
                                Layanan & Fasilitas
                            </p>

                            <div className="konten-layanan-and-fasilitas-search-result konten-group-search-result">
                                {searchLayananAndFasilitas.map((e) => {
                                    return (
                                        <>
                                            <div className="column-card-layanan-fasilitas-search-result">
                                                <Card
                                                    key={e._id}
                                                    widthCard="100%"
                                                    flexDirection="row"
                                                    displayIcon="none"
                                                    radiusImg="0"
                                                    paddingCard="0"
                                                    fontStyle="italic"
                                                    marginImg="0 10px 0 0"
                                                    marginCard="0px 0px 40px 0"
                                                    displayImg="none"
                                                    nameBtnReadMore="Read More"
                                                    displayBtnDownload="none"
                                                    altImg=""
                                                    title={e.title}
                                                    deskripsi={e.konten}
                                                    linkDownloadPdf={`${url}our-hospital/content/${e.path}`}
                                                    clickToPage={() => toPage(`/our-hospital/content/${e.path}`)}
                                                />
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}

                    {messageWrongQuery === false && searchPromo && searchPromo.length > 0 ? (
                        <>
                            <p className="title-faq-search-result">
                                Promo
                            </p>

                            <div className="konten-promo-search-result konten-group-search-result">
                                {searchPromo.map((e) => {
                                    return (
                                        <>
                                            <div className="column-card-promo-search-result">
                                                <Card
                                                    key={e._id}
                                                    widthCard="100%"
                                                    heightImg={heightCardImgArticle}
                                                    heightCardImg="213"
                                                    lazyLoadingImg="lazy"
                                                    widthCardImg={widthCardImgArticle}
                                                    paddingCard="0"
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
                                })}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}

                    {messageWrongQuery === false && searchCareer && searchCareer.length > 0 ? (
                        <>
                            <p className="title-faq-search-result">
                                Career
                            </p>

                            <div className="konten-career-search-result konten-group-search-result">
                                {searchCareer.map((e) => {
                                    return (
                                        <>
                                            <div className="column-card-career-search-result">
                                                <Card
                                                    key={e._id}
                                                    widthCard="100%"
                                                    displayImg="none"
                                                    paddingCard="0"
                                                    fontTitle="18px"
                                                    marginCard="0 0 40px 0"
                                                    fontFamilyTitle="Mulish, sans-serif"
                                                    nameBtnReadMore="View Detail"
                                                    displayBtnDownload="none"
                                                    altImg=""
                                                    title={e.titleBidang}
                                                    date={e.dateLamaran}
                                                    deskripsi={e.deskripsi}
                                                    linkDownloadPdf={`${url}career/details/${e.path}`}
                                                    clickToPage={() => toPage(`/career/details/${e.path}`)}
                                                />
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <div></div>
                    )}

                    {messageWrongQuery ? (
                        <>
                            <p className="title-faq-search-result">
                                Sorry, incorrect search query
                            </p>
                        </>
                    ) : (
                        <>
                            {messageNoResult === 0 ? (
                                <p className="title-faq-search-result">
                                    Sorry, no result
                                </p>
                            ) : ''}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default SearchResult;