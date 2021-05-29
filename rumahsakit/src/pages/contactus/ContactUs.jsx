import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { withRouter } from 'react-router-dom'
import { send } from 'emailjs-com'
import { Loader, LoaderOptions } from 'google-maps'
import './ContactUs.scss'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Headers from '../../components/headers/Headers'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import API from '../../services/api'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'
import Input from '../../components/input/Input'
import ButtonCard from '../../components/buttoncard/ButtonCard'
import Loading from '../../components/loading/Loading'
import ModalSuccess from '../../components/modalsuccess/ModalSuccess'

function ContactUs() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive, searchResult, setSearchResult, searchValue, setSearchValue, autoplayCarousel] = useContext(PathContext)
    const [dataHeader, setDataHeader] = useState({})
    const [dataContactRS, setDataContactRS] = useState({})
    const [errForm, setErrForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [valueContact, setValueContact] = useState({
        id: 'data-user',
        nama: '',
        emailAddress: '',
        phoneNumber: '',
        company: '',
        message: ''
    })

    const [sendGmail, setSendGmail] = useState({
        from_name: '',
        to_name: '',
        phoneNumber: '',
        company: '',
        emailAddress: '',
        message: ''
    })

    const location = window.location.pathname.toString().split('/')[1]

    const history = useHistory()

    const lat = -6.398846435949064
    const lng = 106.77086719868362
    const APIKey = 'AIzaSyAdmoWMT0t7Gj1EButLm35pQJ9BhiG6ZL0'

    function setAllAPI() {
        setLoading(true)
        API.APIGetHeader()
            .then(res => {
                setLoading(false)
                const getData = res.data.filter((e) => e.path.includes(location))
                setDataHeader(getData[0])
            })

        API.APIGetContactUs()
            .then(res => {
                const getContactRS = res.data.filter((e) => e.id === 'data-contact-rs')
                setDataContactRS(getContactRS[0])
            })

        initMap();
    }

    async function initMap() {
        const loader = new Loader(APIKey, LoaderOptions);

        const google = await loader.load();

        const map = new google.maps.Map(document.getElementsByClassName('container-google-maps')[0], {
            center: { lat: lat, lng: lng },
            zoom: 8
        })

        return map;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setAllAPI();
        activeNavbar();
    }, [])

    function inputValue(e) {
        setValueContact({
            ...valueContact,
            [e.target.name]: e.target.value
        })

        if (Object.keys(errForm).length > 0) {
            setErrForm({
                ...errForm,
                [e.target.name]: ''
            })
        }

        setSendGmail({
            from_name: valueContact.nama,
            to_name: `Rumah Sakit Permata Depok`,
            phoneNumber: valueContact.phoneNumber,
            company: valueContact.company,
            emailAddress: valueContact.emailAddress,
            message: valueContact.message
        })
    }

    function postContact() {
        API.APIPostContactUs(valueContact)
            .then(res => {
                setSuccessMessage('Anda berhasil mengirim pesan. Kami segera akan meresponnya melalui SMS dan GMAIL Anda.')
                setLoadingSubmit(false)

                setValueContact({
                    nama: '',
                    emailAddress: '',
                    phoneNumber: '',
                    company: '',
                    message: ''
                })

                setTimeout(() => {
                    setSuccessMessage('')
                }, 5000);
                return res;
            })
            .catch(err => {
                setSuccessMessage('oops!, telah terjadi kesalahan. Mohon dicoba beberapa saat lagi')

                setTimeout(() => {
                    setSuccessMessage('')
                }, 3000);
                console.log(err)
            })
    }

    function submitForm() {
        let err = {}
        let kondisi = false

        const confirm = window.confirm('Apakah data sudah benar?')

        if (!valueContact.nama) {
            err.nama = 'Wajib di isi'
        }

        if (!valueContact.emailAddress) {
            err.emailAddress = 'Wajib di isi'
        } else if (!valueContact.emailAddress.includes('@')) {
            err.emailAddress = `Harus berupa "@".`
        }

        setErrForm(err)

        setTimeout(() => {
            if (confirm) {
                kondisi = true
                if (Object.keys(err).length === 0 && kondisi) {
                    setLoadingSubmit(true)

                    send(
                        'service_j94lebl',
                        'template_6qtz4y7',
                        sendGmail,
                        'user_OTNWA7vJIJuI4F2IiKuIN'
                    )
                        .then(res => {
                            setSendGmail({
                                from_name: '',
                                to_name: '',
                                phoneNumber: '',
                                company: '',
                                emailAddress: '',
                                message: ''
                            })

                            return res;
                        })
                        .catch(err => console.log(err))

                    postContact();
                }
            }
        }, 0);
    }

    function toPageHome() {
        history.push('/')
        updateParams('/')
    }

    const widthBody = document.body.getBoundingClientRect().width
    const minimizeValue = Math.floor(widthBody)

    const topSuccessMessage1024 = minimizeValue > 766 && minimizeValue < 1024 ? '150px' : '170px'

    const topSuccessMessage = minimizeValue < 767 ? '110px' : topSuccessMessage1024

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

            <div className="wrapp-contact-us">
                <ModalSuccess
                    marginTop={successMessage.length > 0 ? topSuccessMessage : '-170px'}
                    bgColor={successMessage.toLocaleLowerCase().includes('berhasil') ? '#08a808' : '#d30c0c'}
                    message={successMessage.length > 0 ? successMessage : ''}
                />

                <Headers
                    header1="Home"
                    arrow=">"
                    header2={dataHeader && dataHeader.namePage}
                    cursor1="pointer"
                    colorHeader2="#7e7e7e"
                    click1={toPageHome}
                />

                <p className="title-contact-us">
                    Tetaplah Terhubung dengan Kami
                </p>

                <div className="container-konten-contact-us">
                    <div className="form-kiri-online-cu">
                        <div className="container-form-contact-us">
                            <div className="column-kiri-form-contact-us">
                                <Input
                                    displayTitle="none"
                                    label="Nama"
                                    nameInput="nama"
                                    typeInput="text"
                                    value={valueContact.nama}
                                    handleChange={inputValue}
                                    errorMessage={errForm && errForm.nama}
                                />

                                <Input
                                    displayTitle="none"
                                    label="Phone Number"
                                    nameInput="phoneNumber"
                                    displayBintangWajib="none"
                                    typeInput="tel"
                                    value={valueContact.phoneNumber}
                                    handleChange={inputValue}
                                />
                            </div>

                            <div className="column-kanan-form-contact-us">
                                <Input
                                    displayTitle="none"
                                    label="Email Address"
                                    nameInput="emailAddress"
                                    typeInput="email"
                                    value={valueContact.emailAddress}
                                    handleChange={inputValue}
                                    errorMessage={errForm && errForm.emailAddress}
                                />

                                <Input
                                    displayTitle="none"
                                    label="Company"
                                    nameInput="company"
                                    displayBintangWajib="none"
                                    value={valueContact.company}
                                    handleChange={inputValue}
                                />
                            </div>
                        </div>

                        <label htmlFor="label" className="label-form-online-rv">
                            Message
                        </label>

                        <textarea name="message" className="input-form-online-rv" cols="30" rows="10"
                            onChange={inputValue}
                        ></textarea>

                        <div className="container-btn-contact-us">
                            <ButtonCard
                                nameClassBtn="btn-card-two"
                                title="CONTACT US"
                                clickBtn={submitForm}
                            />
                        </div>
                    </div>

                    <div className="form-kanan-online-cu">
                        <div className="container-google-maps">

                        </div>

                        <p className="txt-icon-contact-us">
                            <i className="fas fa-medkit">
                            </i>
                            RS Permata Depok
                        </p>

                        <a href={`tel:${dataContactRS && dataContactRS.noTelpRS}`} className="txt-icon-contact-us">
                            <i className="fas fa-phone">
                            </i>
                            {dataContactRS && dataContactRS.noTelpRS}
                        </a>

                        <a href={`mailto:${dataContactRS && dataContactRS.emailRS}`} className="txt-icon-contact-us">
                            <i className="fas fa-envelope">
                            </i>
                            {dataContactRS && dataContactRS.emailRS}
                        </a>
                    </div>
                </div>
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
                displayLoadingForm={loadingSubmit ? 'flex' : 'none'}
            />
        </>
    )
}

export default withRouter(ContactUs);