import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './Home.scss'
import CarouselMain from '../../components/carouselmain/CarouselMain'
import ButtonCard from '../../components/buttoncard/ButtonCard'
import Card from '../../components/card/Card'
import { PathContext } from '../../services/context/path/Path'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import API from '../../services/api'
import Endpoint from '../../services/api/endpoint'
import Loading from '../../components/loading/Loading'
import ModalSuccess from '../../components/modalsuccess/ModalSuccess'

function Home() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive, searchResult, setSearchResult, searchValue, setSearchValue, autoplayCarousel, playInterval, setPlayInterval] = useContext(PathContext)
    const [dataArticle, setDataArticle] = useState([])
    const [dataCarouselHome, setDataCarouselHome] = useState([])
    const [dataBannerNewsletter, setDataBannerNewsletter] = useState({})
    const [dataReserveNow, setDataReserveNow] = useState({})
    const [bannerSelamatDatang, setBannerSelamatDatang] = useState({})
    const [bannerGradient, setBannerGradient] = useState({})
    const [dataTestimoni, setDataTestimoni] = useState([])
    const [dataOurPatientTestimony, setDataOurPatientTestimony] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [inputSubscribe, setInputSubscribe] = useState({
        email: ''
    })

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
                }
            })
            .catch(err => console.log(err))

        API.APIGetCarouselHome()
            .then(res => {
                setDataCarouselHome(res.data);
            })

        API.APIGetBanner()
            .then(res => {
                const respons = res.data
                if (respons) {
                    const getBannerNewsletter = respons.filter((e) => e.path.includes('newsletter'))
                    setDataBannerNewsletter(getBannerNewsletter[0])

                    const getReserveNow = respons.filter((e) => e.path.includes('reserve online'))
                    setDataReserveNow(getReserveNow[0])

                    const getBannerSelamatDatang = respons.filter((e) => e.path.includes('selamat datang'))
                    setBannerSelamatDatang(getBannerSelamatDatang[0])

                    const getBannerGradient = respons.filter((e) => e.path.includes('banner gradient'))
                    setBannerGradient(getBannerGradient[0])

                    const getDataOurPatient = respons.filter((e) => e.path.includes('our patient testimony'))
                    setDataOurPatientTestimony(getDataOurPatient[0])
                }
            })
            .catch(err => {
                console.log(err)
            })

        API.APIGetTestimonial()
            .then(res => {
                setDataTestimoni(res.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setAllAPI();
        activeNavbar();
    }, [])

    const styleBgGradientHome = {
        backgroundImage: Object.keys(bannerGradient).length > 0 ? `url(${Endpoint}/images/${bannerGradient.background})` : ''
    }

    const styleBannerWelcome = {
        backgroundImage: Object.keys(bannerSelamatDatang).length > 0 ? `url(${Endpoint}/images/${bannerSelamatDatang.image})` : ''
    }

    const styleBannerSubscribe = {
        backgroundImage: Object.keys(dataBannerNewsletter).length > 0 ? `url(${Endpoint}/images/${dataBannerNewsletter.image})` : ''
    }

    const styleLoadingBtnSubscribe = {
        display: loadingBtn ? 'flex' : 'none'
    }

    function submitSubscribe(e) {
        e.preventDefault()

        if (loadingBtn === false) {
            if (inputSubscribe.email.length > 0 && inputSubscribe.email.trim()) {
                if (inputSubscribe.email.includes('@')) {
                    setErrorMessage('')
                    setLoadingBtn(true)
                    API.APIGetEmailUser()
                        .then(res => {
                            const respons = res.data
                            if (respons.length > 0) {
                                const checkEmail = respons.filter((e) => e.email.includes(inputSubscribe.email))

                                if (checkEmail.length === 0) {
                                    API.APIPostEmailUser(inputSubscribe)
                                        .then(res => {
                                            setSuccessMessage('Anda telah berhasil subscribe!. Dan nantikan E-Newsletter tips sehat kami di gmail Anda.')
                                            setInputSubscribe({ email: '' })

                                            setTimeout(() => {
                                                setLoadingBtn(false)
                                                setSuccessMessage('')
                                            }, 5000);
                                            return res;
                                        })
                                } else {
                                    setSuccessMessage('Gagal subscribe!, Email Anda telah terdaftar sebelumnya!')

                                    setTimeout(() => {
                                        setLoadingBtn(false)
                                        setSuccessMessage('')
                                    }, 3000);
                                }
                            } else {
                                API.APIPostEmailUser(inputSubscribe)
                                    .then(res => {
                                        setSuccessMessage('Anda telah berhasil subscribe!. Dan nantikan E-Newsletter tips sehat kami di gmail Anda.')
                                        setInputSubscribe({ email: '' })

                                        setTimeout(() => {
                                            setLoadingBtn(false)
                                            setSuccessMessage('')
                                        }, 5000);
                                        return res;
                                    })
                            }
                        })
                } else {
                    setErrorMessage(`Must be required "@".`)
                }
            } else {
                setErrorMessage(`This field is required.`)
            }
        }
    }

    function toPageProfile() {
        history.push('our-hospital/content/profil')
        updateParams('our-hospital/content/profil')
        setPlayInterval(true)
    }

    function toPageBlogArticles(e) {
        updateParams(`/articles/read/${e.path}`)
        history.push(`/articles/read/${e.path}`)
        setPlayInterval(true)
    }

    function toPageArticles() {
        updateParams('/articles')
        history.push('/articles')
        setPlayInterval(true)
    }

    function changeInputSubscribe(e) {
        setInputSubscribe({ email: e.target.value })
    }

    function toPageOnlineReservation() {
        updateParams('online-reservation')
        history.push('online-reservation')
        setPlayInterval(true)
    }

    const widthBody = document.body.getBoundingClientRect().width
    const minimizeValue = Math.floor(widthBody)

    const topSuccessMessage1024 = minimizeValue > 766 && minimizeValue < 1024 ? '150px' : '170px'

    const topSuccessMessage = minimizeValue < 767 ? '110px' : topSuccessMessage1024

    const heightImgCard1024 = minimizeValue > 766 && minimizeValue < 1024 ? 'auto' : '200px'

    const heightImgCard = minimizeValue < 767 ? 'auto' : heightImgCard1024

    return (
        <>
            <HelmetCard
                title="Rumah Sakit Permata"
                content="Rumah Sakit Permata - Permata Keluarga Husada Grup"
            />

            <div className="wrapp-home">
                <ModalSuccess
                    marginTop={successMessage.length > 0 ? topSuccessMessage : '-170px'}
                    bgColor={successMessage.toLocaleLowerCase().includes('berhasil') ? '#08a808' : '#d30c0c'}
                    message={successMessage.length > 0 ? successMessage : ''}
                />

                <CarouselMain
                    data={dataCarouselHome}
                    displayCarouselImg="flex"
                />

                {Object.keys(bannerGradient).length > 0 ? (
                    <>
                        <div className="bg-gradient-home" style={styleBgGradientHome}>
                            <div className="column-tengah-bg-gradient">
                                <img src={`${Endpoint}/images/${bannerGradient.image}`} alt="background gradient" width="97" height="87" className="img-logo2-rs" />
                                <p className="txt-rs-permata-depok">
                                    {bannerGradient.title}
                                </p>

                                <ButtonCard
                                    nameClassBtn="btn-card"
                                    title="VIEW PROFILE"
                                    clickBtn={toPageProfile}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div></div>
                )}

                {Object.keys(bannerSelamatDatang).length > 0 ? (
                    <>
                        <div className="banner-selamat-datang" style={styleBannerWelcome}>
                            <div className="column-banner-selamat-datang">
                                <p className="title-selamat-datang">
                                    {bannerSelamatDatang.title}
                                </p>
                                <p className="deskripsi-selamat-datang">
                                    {bannerSelamatDatang.deskripsi}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div></div>
                )}

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
                                    <>
                                        <div className="column-card-article-home">
                                            <Card
                                                key={e._id}
                                                img={`${Endpoint}/images/${e.image}`}
                                                widthCard="100%"
                                                title={`${minimizeTitle}...`}
                                                date={e.date}
                                                deskripsi={`${minimizeDescription}...`}
                                                heightImg={heightImgCard}
                                                nameBtnReadMore="Read More"
                                                clickToPage={() => toPageBlogArticles(e)}
                                            />
                                        </div>
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                    </div>

                    <div className="column-btn-blog-health-articles">
                        <ButtonCard
                            nameClassBtn="btn-card-two"
                            title="READ MORE ARTICLES"
                            clickBtn={toPageArticles}
                        />
                    </div>
                </div>

                <div className="container-banner-subscribe-home" style={styleBannerSubscribe}>
                    <div className="column-banner-subscribe-home">
                        <div className="konten-banner-subscribe">
                            {Object.keys(dataBannerNewsletter).length > 0 ? (
                                <>
                                    <p className="txt-konten-banner">
                                        {dataBannerNewsletter.title}
                                        <br />
                                        <em>{dataBannerNewsletter.deskripsi}</em>
                                    </p>
                                </>
                            ) : (
                                <div></div>
                            )}

                            <form onSubmit={submitSubscribe}
                                className="form-input-subscribe">
                                <input type="email" className="input-subscribe" value={inputSubscribe.email} placeholder="Enter your email address"
                                    onChange={changeInputSubscribe}
                                />

                                <div className="container-btn-subscribe">
                                    <button className="btn-subscribe"
                                        onClick={submitSubscribe}
                                    >
                                        SUBSCRIBE
                                </button>
                                    <div className="container-loading-btn-subscribe" style={styleLoadingBtnSubscribe}>
                                        <div className="loading-btn-subscribe">

                                        </div>
                                    </div>
                                </div>
                            </form>

                            {errorMessage.length > 0 ? (
                                <>
                                    <p className="txt-error-input">
                                        {errorMessage}
                                    </p>
                                </>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="container-our-patient-testimony">
                    <div className="column-our-patient-testimony">
                        <div className="kolom-kanan-our-patient">
                            <p className="title-our-patient">
                                {Object.keys(dataOurPatientTestimony).length > 0 ? dataOurPatientTestimony.title : ''}
                            </p>

                            <CarouselMain
                                displayCarouselTestimony="flex"
                                dataTestimoni={dataTestimoni}
                                iconQuotes={Object.keys(dataOurPatientTestimony).length > 0 ? `${Endpoint}/images/${dataOurPatientTestimony.image}` : ''}
                            />
                        </div>
                        <div className="kolom-kiri-our-patient">
                            {Object.keys(dataReserveNow).length > 0 ? (
                                <>
                                    <p className="title-our-patient">
                                        {dataReserveNow.title}
                                    </p>

                                    <div className="box-pink-reserve-now">
                                        <img src={`${Endpoint}/images/${dataReserveNow.image}`} alt="background pink reserve now" className="img-reserve-now" />

                                        <p className="deskripsi-box-pink">
                                            {dataReserveNow.deskripsi}
                                        </p>

                                        <ButtonCard
                                            nameClassBtn="btn-card-two"
                                            title="RESERVE NOW"
                                            clickBtn={toPageOnlineReservation}
                                        />
                                    </div>
                                </>
                            ) : (
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

export default Home;