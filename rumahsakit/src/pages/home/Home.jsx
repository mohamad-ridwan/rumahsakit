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
import subscribe from '../../images/subscribe.jpg'
import ModalSuccess from '../../components/modalsuccess/ModalSuccess'

function Home() {

    const [paramsGlobal, setParamsGlobal, updateParams] = useContext(PathContext)
    const [dataArticle, setDataArticle] = useState([])
    const [dataCarouselHome, setDataCarouselHome] = useState([])
    const [dataBannerNewsletter, setDataBannerNewsletter] = useState({})
    const [dataReserveNow, setDataReserveNow] = useState({})
    const [bannerSelamatDatang, setBannerSelamatDatang] = useState({})
    const [bannerGradient, setBannerGradient] = useState({})
    const [dataTestimoni, setDataTestimoni] = useState([])
    const [dataOurPatientTestimony, setDataOurPatientTestimony] = useState({})
    const [displayBtnCarousel, setDisplayBtnCarousel] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [inputSubscribe, setInputSubscribe] = useState({
        email: ''
    })

    const history = useHistory()

    let index = 0
    let indexCarouselOurPatient = 0

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

        API.APIGetCarouselHome()
            .then(res => {
                setDataCarouselHome(res.data);

                setTimeout(() => {
                    getElementCarouselHome();
                }, 0);
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

                setTimeout(() => {
                    getElementCarouselTestimoni();
                }, 0);
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setAllAPI();
    }, [])

    function getElementCarouselHome() {
        const element = document.getElementsByClassName('img-carousel-main')

        if (element) {
            for (let i = 0; i < element.length; i++) {
                const check = element[i].getAttribute('name') !== index
                if (check) {
                    element[i].style.display = 'none'
                }
            }
            element[index].style.display = 'flex'
        }
    }

    function getElementCarouselTestimoni() {
        const element = document.getElementsByClassName('container-konten-carousel-main')

        if (element.length > 0) {
            for (let i = 0; i < element.length; i++) {
                element[i].style.display = 'none'
            }

            element[0].style.display = 'flex'
        }
    }

    function btnRightCarouselOurTestimony() {
        const element = document.getElementsByClassName('container-konten-carousel-main')

        if (element.length > 0) {
            for (let i = 0; i < element.length; i++) {
                element[i].style.display = 'none'
            }

            if (indexCarouselOurPatient < element.length - 1) {
                indexCarouselOurPatient = indexCarouselOurPatient + 1

                setTimeout(() => {
                    element[indexCarouselOurPatient].style.display = 'flex'
                }, 0);
            } else {
                indexCarouselOurPatient = 0

                setTimeout(() => {
                    element[0].style.display = 'flex'
                }, 0);
            }
        }
    }

    function btnLeftCarouselOurTestimony() {
        const element = document.getElementsByClassName('container-konten-carousel-main')

        if (element.length > 0) {
            for (let i = 0; i < element.length; i++) {
                element[i].style.display = 'none'
            }

            if (indexCarouselOurPatient !== 0) {
                indexCarouselOurPatient = indexCarouselOurPatient - 1

                setTimeout(() => {
                    element[indexCarouselOurPatient].style.display = 'flex'
                }, 0);
            } else {
                indexCarouselOurPatient = element.length - 1

                setTimeout(() => {
                    element[element.length - 1].style.display = 'flex'
                }, 0);
            }
        }
    }

    function btnRightCarouselHome() {
        if (index < dataCarouselHome.length - 1) {
            index = index + 1
            setTimeout(() => {
                getElementCarouselHome();
            }, 0);
        } else {
            index = 0
            setTimeout(() => {
                getElementCarouselHome();
            }, 0);
        }
    }

    function btnLeftCarouselHome() {
        if (index > 0) {
            index = index - 1
            setTimeout(() => {
                getElementCarouselHome();
            }, 0);
        } else {
            index = dataCarouselHome.length - 1
            setTimeout(() => {
                getElementCarouselHome();
            }, 0);
        }
    }

    function goToArticles(path) {
        history.push(`/${path}`)
    }

    function goToBlogArticle(path) {
        history.push(`/articles/read/${path}`)
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

    function autoChangeSlide() {
        if (displayBtnCarousel === false) {
            setTimeout(() => {
                if (index < dataCarouselHome.length - 1) {
                    index = index + 1

                    setTimeout(() => {
                        getElementCarouselHome();
                    }, 0);
                } else {
                    index = 0

                    setTimeout(() => {
                        getElementCarouselHome();
                    }, 0);
                }
            }, 0);
        }
    }

    // if (dataCarouselHome.length > 0) {
    //     autoChangeSlide();
    // }

    return (
        <>
            <HelmetCard
                title="Rumah Sakit Permata"
                content="Rumah Sakit Permata - Permata Keluarga Husada Grup"
            />
            <div className="wrapp-home">
                <ModalSuccess
                    marginTop={successMessage.length > 0 ? '170px' : '-170px'}
                    bgColor={successMessage.toLocaleLowerCase().includes('berhasil') ? '#08a808' : '#d30c0c'}
                    message={successMessage.length > 0 ? successMessage : ''}
                />

                <CarouselMain
                    data={dataCarouselHome}
                    mouseEnter={() => {
                        setDisplayBtnCarousel(true)
                    }}
                    mouseLeave={() => {
                        setDisplayBtnCarousel(false)
                    }}
                    displayBtn={displayBtnCarousel ? 'flex' : 'none'}
                    clickBtnLeft={() => {
                        btnLeftCarouselHome();
                    }}
                    clickBtnRight={() => {
                        btnRightCarouselHome();
                    }}
                />

                {bannerGradient && Object.keys(bannerGradient).length > 0 ? (
                    <div className="bg-gradient-home" style={{
                        backgroundImage: `url(${Endpoint}/images/${bannerGradient.background})`
                    }}>
                        <div className="column-tengah-bg-gradient">
                            <img src={`${Endpoint}/images/${bannerGradient.image}`} alt="" className="img-logo2-rs" />
                            <p className="txt-rs-permata-depok">
                                {bannerGradient.title}
                            </p>

                            <ButtonCard
                                nameClassBtn={'btn-card'}
                                title={'VIEW PROFILE'}
                            />
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}


                {bannerSelamatDatang && Object.keys(bannerSelamatDatang).length > 0 ? (
                    <>
                        <div className="banner-selamat-datang" style={{
                            backgroundImage: `url(${Endpoint}/images/${bannerSelamatDatang.image})`
                        }}>
                            <p className="title-selamat-datang">
                                {bannerSelamatDatang.title}
                            </p>
                            <p className="deskripsi-selamat-datang">
                                {bannerSelamatDatang.deskripsi}
                            </p>
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
                            nameClassBtn={'btn-card-two'}
                            title={'READ MORE ARTICLES'}
                            clickBtn={async () => {
                                await goToArticles('articles')
                                updateParams('articles')
                            }}
                        />
                    </div>
                </div>

                <div className="container-banner-subscribe-home" style={{
                    backgroundImage: `url(${Endpoint}/images/${dataBannerNewsletter && dataBannerNewsletter.image ? dataBannerNewsletter.image : ''})`
                }}>
                    <div className="konten-banner-subscribe">
                        {dataBannerNewsletter && Object.keys(dataBannerNewsletter).length > 0 ? (
                            <p className="txt-konten-banner">
                                {dataBannerNewsletter.title}
                                <br />
                                <em>{dataBannerNewsletter.deskripsi}</em>
                            </p>
                        ) : (
                            <div></div>
                        )}

                        <form onSubmit={submitSubscribe}
                            className="form-input-subscribe">
                            <input type="text" className="input-subscribe" value={inputSubscribe.email} placeholder={'Enter your email address'}
                                onChange={(e) => setInputSubscribe({ email: e.target.value })}
                            />

                            <div className="container-btn-subscribe">
                                <button className="btn-subscribe"
                                    onClick={submitSubscribe}
                                >
                                    SUBSCRIBE
                                </button>
                                <div className="container-loading-btn-subscribe" style={{
                                    display: `${loadingBtn ? 'flex' : 'none'}`
                                }}>
                                    <div className="loading-btn-subscribe">

                                    </div>
                                </div>
                            </div>

                        </form>

                        {errorMessage.length > 0 ? (
                            <p className="txt-error-input">
                                {errorMessage}
                            </p>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>

                <div className="container-our-patient-testimony">
                    <div className="kolom-kanan-our-patient">
                        <p className="title-our-patient">
                            {dataOurPatientTestimony && dataOurPatientTestimony.title ? dataOurPatientTestimony.title : ''}
                        </p>

                        <CarouselMain
                            displayBtn={'flex'}
                            fontSizeBtnArrow={'25px'}
                            leftBtnArrow={'0'}
                            rightBtnArrow={'0'}
                            displaykontenTestimony={'flex'}
                            dataTestimoni={dataTestimoni}
                            iconQuotes={dataOurPatientTestimony && dataOurPatientTestimony.image ? `${Endpoint}/images/${dataOurPatientTestimony.image}` : ''}
                            clickBtnLeft={() => {
                                btnLeftCarouselOurTestimony();
                            }}
                            clickBtnRight={() => {
                                btnRightCarouselOurTestimony();
                            }}
                        />
                    </div>
                    <div className="kolom-kiri-our-patient">
                        {dataReserveNow && Object.keys(dataReserveNow).length > 0 ? (
                            <>
                                <p className="title-our-patient">
                                    {dataReserveNow.title}
                                </p>

                                <div className="box-pink-reserve-now">
                                    <img src={`${Endpoint}/images/${dataReserveNow.image}`} alt="" className="img-reserve-now" />

                                    <p className="deskripsi-box-pink">
                                        {dataReserveNow.deskripsi}
                                    </p>

                                    <ButtonCard
                                        nameClassBtn={'btn-card-two'}
                                        title={'RESERVE NOW'}
                                        clickBtn={() => {
                                            history.push('online-reservation')
                                        }}
                                    />
                                </div>
                            </>
                        ) : (
                            <div></div>
                        )}

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