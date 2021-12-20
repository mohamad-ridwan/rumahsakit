import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { withRouter } from 'react-router-dom'
import { send } from 'emailjs-com'
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
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7928.985849919385!2d106.79462772110102!3d-6.459057920540529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e9e7ede517f7%3A0xb8953bf5dd0f86f1!2sJl.%20Sunan%20Muria%20IV%2C%20Pabuaran%2C%20Kec.%20Bojong%20Gede%2C%20Bogor%2C%20Jawa%20Barat%2016921!5e0!3m2!1sid!2sid!4v1637844448487!5m2!1sid!2sid" width="100%" style={{
                                border: '0px'
                            }} allowfullscreen="" loading="lazy"></iframe>
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