import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { send } from 'emailjs-com'
import getYear from 'date-fns/getYear'
import getMonth from 'date-fns/getMonth'
import getDay from 'date-fns/getDay'
import format from 'date-fns/format'
import { range } from 'lodash'
import addMonths from 'addmonths'
import './OnlineReservation.scss'
import API from '../../services/api';
import url from '../../services/api/url';
import Endpoint from '../../services/api/endpoint';
import { PathContext } from '../../services/context/path/Path';
import BannerHeader from '../../components/bannerheader/BannerHeader';
import ButtonCard from '../../components/buttoncard/ButtonCard';
import Headers from '../../components/headers/Headers';
import HelmetCard from '../../components/helmetcard/HelmetCard';
import Input from '../../components/input/Input';
import IndicatorAnswer from '../../components/indicatoranswer/IndicatorAnswer';
import Loading from '../../components/loading/Loading';
import ModalSuccess from '../../components/modalsuccess/ModalSuccess';

function OnlineReservation() {
    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive] = useContext(PathContext)
    const [dataHeader, setDataHeader] = useState({})
    const [dataListDoctor, setDataListDoctor] = useState([])
    const [allDoctor, setAllDoctor] = useState([])
    const [listNamaDoctor, setListNamaDoctor] = useState([])
    const [starDateOfBirth, setStarDateOfBirth] = useState(new Date())
    const [starDateKunjungan, setStarDateKunjungan] = useState('')
    const [isOpenTanggalKunjungan, setIsOpenTanggalKunjungan] = useState(false)
    const [displayLoadBtnCalendar, setDisplayLoadBtnCalendar] = useState(false)
    const [filterDateKunjungan, setFilterDateKunjungan] = useState(null)
    const [minDateKunjungan, setMinDateKunjungan] = useState(new Date())
    const [maxDateKunjungan, setMaxDateKunjungan] = useState(addMonths(new Date(), 0))
    const [pilihTanggalKunjungan, setPilihTanggalKunjungan] = useState('Pilih Tanggal')
    const [topModal, setTopModal] = useState('')
    const [topModalPilihDoctor, setTopModalPilihDoctor] = useState('')
    const [searchSpesialisDoctor, setSearchSpesialisDoctor] = useState('')
    const [nameBtnPilihDoctor, setNameBtnPilihDoctor] = useState('Pilih Dokter')
    const [nameBtnSpesialisDoctor, setNameBtnSpesialisDoctor] = useState('Pilih Spesialisasi Dokter')
    const [modalPilihDoctor, setModalPilihDoctor] = useState(false)
    const [modalSpesialisDoctor, setModalSpesialisDoctor] = useState(false)
    const [answerPernahBerobat, setAnswerPernahBerobat] = useState('Ya')
    const [answerTipePembayaran, setAnswerTipePembayaran] = useState('Biaya Pribadi')
    const [agreeSubmit, setAgreeSubmit] = useState(false)
    const [errForm, setErrForm] = useState({})
    const [loadingPage, setLoadingPage] = useState(false)
    const [loadingForm, setLoadingForm] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [jadwalDokter, setJadwalDokter] = useState({
        Senin: '',
        Selasa: '',
        Rabu: '',
        Kamis: '',
        Jumat: '',
        Sabtu: '',
        Minggu: ''
    })
    const [value, setValue] = useState({
        nama: '',
        nomorTelepon: '',
        email: '',
        message: '',
        nomorRekamMedis: '',
        spesialisDokter: '',
        namaDokter: '',
        jadwalDokter: '',
    })

    const history = useHistory()

    const monthsCalendar = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    const yearsCalendar = range(1920, getYear(new Date()) + 1, 1)

    const getParams = window.location.pathname.toString().split('/')[1]

    function setAllAPI() {
        setLoadingPage(true)
        API.APIGetHeader()
            .then(res => {
                if (res.data.length > 0) {
                    const getPath = res.data.filter((e) => e.path.includes(getParams))
                    setDataHeader(getPath[0])
                }
            })
        API.APIGetListDoctor()
            .then(res => {
                const respons = res.data
                setAllDoctor(respons)

                let newData = []
                const getSpeciality = respons.filter((v, i, a) => a.findIndex(t => (t.speciality === v.speciality)) === i)

                if (getSpeciality.length > 0) {
                    for (let i = 0; i < getSpeciality.length; i++) {
                        newData.push(getSpeciality[i].speciality)
                    }
                    setDataListDoctor(newData)
                }

                setLoadingPage(false)
            })
    }

    function changeElementInputFormRv(condition) {
        if (condition) {
            const getTanggalKunjungan = document.getElementById('tanggal-kunjungan')
            return getTanggalKunjungan.setAttribute('readonly', 'readonly')
        } else {
            const getTanggalKunjungan = document.getElementById('tanggal-kunjungan')
            return getTanggalKunjungan.removeAttribute('readonly', 'readonly')
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setAllAPI();
        activeNavbar();
        setIndexActive();
        changeElementInputFormRv(true);
    }, [])

    const styleGroupAnswer = {
        display: nameBtnPilihDoctor !== 'Pilih Dokter' ? 'flex' : 'none'
    }

    const styleColumnIndicatorAnswer = {
        flexDirection: 'column'
    }

    const styleIconCheck = {
        display: agreeSubmit ? 'flex' : 'none'
    }

    function inputDataPribadi(e) {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })

        if (Object.keys(errForm).length > 0) {
            setErrForm({
                ...errForm,
                [e.target.name]: ''
            })
        }
    }

    async function postOnlineReservation() {
        return await new Promise((resolve, reject) => {
            const data = {
                nama: value.nama,
                nomorTelepon: value.nomorTelepon,
                tanggalLahir: document.getElementById('date-of-birth').value,
                email: value.email,
                tanggalKunjungan: pilihTanggalKunjungan,
                message: value.message,
                nomorRekamMedis: `${value.nomorRekamMedis.length > 0 ? value.nomorRekamMedis : '-'}`,
                spesialisDokter: value.spesialisDokter,
                namaDokter: value.namaDokter,
                jadwalDokter: value.jadwalDokter,
                pernahBerobat: `Apakah Pernah Berobat Sebelumnya ? : ${answerPernahBerobat}`,
                tipePembayaran: answerTipePembayaran
            }

            API.APIPostOnlineReservation(data)
                .then(res => {
                    resolve('success')
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setIsOpenTanggalKunjungan(false)

        const getYearsOfBirth = document.getElementById('date-of-birth').value.split('/')[2]
        const year = new Date().getFullYear().toString()
        const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/

        const confirm = window.confirm('Note: Harap Tidak melakukan pendaftaran ulang dengan jadwal yang sama/yang sudah terdaftar!. \n\nApakah data sudah benar?')

        let err = {}
        let kondisi = false

        if (!value.nama) {
            err.nama = 'Wajib di isi'
        }

        if (!value.nomorTelepon) {
            err.nomorTelepon = 'Wajib di isi'
        }

        if (getYearsOfBirth === year && dateRegex.test(getYearsOfBirth) === false) {
            err.tanggalLahir = 'Wajib di isi'
        }

        if (!value.email) {
            err.email = 'Wajib di isi'
        } else if (!value.email.includes('@')) {
            err.email = `Harus berupa "@".`
        }

        if (!value.spesialisDokter) {
            err.spesialisDokter = 'Wajib di isi'
        }

        if (!value.namaDokter) {
            err.namaDokter = 'Wajib di isi'
        }

        if (!value.jadwalDokter) {
            err.jadwalDokter = 'Wajib di isi'
        }

        if (pilihTanggalKunjungan === 'Pilih Tanggal') {
            err.tanggalKunjungan = 'Wajib di isi'
        }

        if (agreeSubmit === false) {
            err.agreeSubmit = 'Wajib menyetujui prasyarat'
        }

        setErrForm(err)

        setTimeout(() => {
            if (confirm) {
                setLoadingForm(true)
                document.body.style.overflowY = 'hidden'
                kondisi = true
                if (Object.keys(err).length === 0 && kondisi) {
                    postOnlineReservation()
                        .then(res => {
                            if (res === 'success') {
                                const data = {
                                    from_name: value.nama,
                                    to_name: 'RS Permata Depok',
                                    message: `Pesan Dari Pasien : ${value.message}`,
                                    nama: `Nama : ${value.nama}`,
                                    nomorTelepon: `Nomor Telepon : ${value.nomorTelepon}`,
                                    tanggalLahir: `Tanggal Lahir : ${document.getElementById('date-of-birth').value}`,
                                    email: `Email : ${value.email}`,
                                    tanggalKunjungan: `Tanggal Kunjungan : ${pilihTanggalKunjungan}`,
                                    nomorRekamMedis: `Nomor Rekam Medis: ${value.nomorRekamMedis.length > 0 ? value.nomorRekamMedis : '-'}`,
                                    spesialisDokter: `Spesialisasi Dokter: ${value.spesialisDokter}`,
                                    namaDokter: `Nama Dokter : ${value.namaDokter}`,
                                    jadwalDokter: `Jadwal Dokter : ${value.jadwalDokter}`,
                                    pernahBerobat: `Apakah Pernah Berobat Sebelumnya ? : ${answerPernahBerobat}`,
                                    tipePembayaran: `Metode Tipe Pembayaran : ${answerTipePembayaran}`,
                                    reply_to: value.email,
                                }

                                send(
                                    'service_j94lebl',
                                    'template_r59s9rb',
                                    data,
                                    'user_OTNWA7vJIJuI4F2IiKuIN'
                                )
                                    .then(res => {
                                        setLoadingForm(false)
                                        setAgreeSubmit(false)
                                        setSuccessMessage('Pendaftaran Online Reservation telah berhasil. Kami akan meresponnya melalui SMS dan GMAIL Anda.')
                                        setNameBtnPilihDoctor('Pilih Dokter')
                                        setNameBtnSpesialisDoctor('Pilih Spesialisasi Dokter')
                                        setAnswerPernahBerobat('Ya')
                                        setAnswerTipePembayaran('Biaya Pribadi')
                                        setPilihTanggalKunjungan('Pilih Tanggal')
                                        setStarDateKunjungan('')
                                        setStarDateOfBirth(new Date())

                                        setValue({
                                            nama: '',
                                            nomorTelepon: '',
                                            email: '',
                                            message: '',
                                            nomorRekamMedis: '',
                                            spesialisDokter: '',
                                            namaDokter: '',
                                            jadwalDokter: '',
                                        })

                                        const elementJadwalPraktek = document.getElementsByClassName('jadwal-praktek')

                                        if (elementJadwalPraktek.length > 0 && nameBtnPilihDoctor !== 'Pilih Dokter') {
                                            for (let i = 0; i < elementJadwalPraktek.length; i++) {
                                                elementJadwalPraktek[i].style.backgroundColor = 'transparent'
                                                elementJadwalPraktek[i].style.border = '1px solid #999'
                                            }
                                        }

                                        const element = document.getElementsByClassName('spesialis')

                                        if (element.length > 0) {
                                            for (let i = 0; i < element.length; i++) {
                                                element[i].style.backgroundColor = '#fff'
                                                element[i].style.color = '#333'
                                            }
                                        }

                                        document.body.style.overflowY = 'scroll'

                                        setTimeout(() => {
                                            setSuccessMessage('')
                                        }, 5000);
                                    })
                                    .catch(err => {
                                        setSuccessMessage('oops!, terjadi kesalahan. Mohon coba beberapa saat lagi.')
                                        setLoadingForm(false)
                                        document.body.style.overflowY = 'scroll'

                                        setTimeout(() => {
                                            setSuccessMessage('')
                                        }, 5000);
                                        console.log(err)
                                    })
                            }
                        })
                        .catch(err => {
                            setSuccessMessage('oops!, terjadi kesalahan. Mohon coba beberapa saat lagi.')
                            setLoadingForm(false)
                            document.body.style.overflowY = 'scroll'

                            setTimeout(() => {
                                setSuccessMessage('')
                            }, 5000);
                            console.log(err)
                        })
                } else {
                    setLoadingForm(false)
                    document.body.style.overflowY = 'scroll'
                }
            }
        }, 0);
    }

    function clickPilihDokter(name) {
        const getJadwal = allDoctor.filter((e) => e.name === name)

        if (getJadwal.length === 1) {
            const getSchedule = getJadwal[0].doctorSchedule

            setJadwalDokter({
                Senin: `Senin ${getSchedule.Monday}`,
                Selasa: `Selasa ${getSchedule.Tuesday}`,
                Rabu: `Rabu ${getSchedule.Wednesday}`,
                Kamis: `Kamis ${getSchedule.Thursday}`,
                Jumat: `Jumat ${getSchedule.Friday}`,
                Sabtu: `Sabtu ${getSchedule.Saturday}`,
                Minggu: `Minggu ${getSchedule.Sunday}`
            })
        }
    }

    function getNameDoctor(name) {
        const getSpeciality = allDoctor.filter((e) => e.speciality === name)

        let newData = []

        if (getSpeciality.length > 0) {
            for (let i = 0; i < getSpeciality.length; i++) {
                newData.push(getSpeciality[i].name)
            }

            setListNamaDoctor(newData)
        }
    }

    function clickAgreeSubmit() {
        setAgreeSubmit(!agreeSubmit)
    }

    const filterSpesialisDoctor = dataListDoctor.filter((e) => e.toLowerCase().includes(searchSpesialisDoctor.toLocaleLowerCase()))

    const filterNameDoctor = listNamaDoctor.filter((e) => e.toLocaleLowerCase().includes(searchSpesialisDoctor.toLocaleLowerCase()))

    function toPageHome() {
        history.push('/')
        updateParams('/')
    }

    function answerYes() {
        setAnswerPernahBerobat('Ya')
    }

    function answerNo() {
        setAnswerPernahBerobat('Tidak')
    }

    function answerBiayaPribadi() {
        setAnswerTipePembayaran('Biaya Pribadi')
    }

    function answerBiayaAsuransi() {
        setAnswerTipePembayaran('Asuransi')
    }

    function inputSpesialisDoctor(e) {
        setSearchSpesialisDoctor(e.target.value)
    }

    function showModalSpesialisDoctor(e) {
        e.stopPropagation();
        setIsOpenTanggalKunjungan(false)

        const getTop = document.getElementById('btn-form-online-rv')
        setTopModal(`${getTop.getBoundingClientRect().top + 40}px`)

        setModalSpesialisDoctor(!modalSpesialisDoctor)
    }

    function selectSpesialisDoctor(data, index) {
        const element = document.getElementsByClassName('spesialis')

        for (let i = 0; i < element.length; i++) {
            element[i].style.backgroundColor = '#fff'
            element[i].style.color = '#333'
        }

        element[index].style.backgroundColor = '#999'
        element[index].style.color = '#fff'
        setNameBtnSpesialisDoctor(data)
        setValue({
            ...value,
            spesialisDokter: data,
            jadwalDokter: ''
        })

        changeElementInputFormRv(true);

        if (pilihTanggalKunjungan !== 'Pilih Tanggal') {
            setPilihTanggalKunjungan('Pilih Tanggal')
            setStarDateKunjungan('')
        }

        setTimeout(() => {
            if (nameBtnPilihDoctor !== 'Pilih Dokter') {
                getNameDoctor(data);
                setNameBtnPilihDoctor('Pilih Dokter')

                const element = document.getElementsByClassName('nameDoctor')

                for (let i = 0; i < element.length; i++) {
                    element[i].style.backgroundColor = '#fff'
                    element[i].style.color = '#333'
                }

                const elementJadwalPraktek = document.getElementsByClassName('jadwal-praktek')

                if (elementJadwalPraktek.length > 0 && nameBtnPilihDoctor !== 'Pilih Dokter') {
                    for (let i = 0; i < elementJadwalPraktek.length; i++) {
                        elementJadwalPraktek[i].style.backgroundColor = 'transparent'
                        elementJadwalPraktek[i].style.border = '1px solid #999'
                    }
                }
            } else {
                getNameDoctor(data);
            }

            setModalSpesialisDoctor(false)
        }, 0);
    }

    function closeModalSpesialisDoctor() {
        setModalSpesialisDoctor(false)
        setSearchSpesialisDoctor('')
    }

    function showModalNameDoctor(e) {
        if (nameBtnSpesialisDoctor !== 'Pilih Spesialisasi Dokter') {
            e.stopPropagation();
            setIsOpenTanggalKunjungan(false)

            const getTop = document.getElementById('btn-form-online-rv')
            setTopModalPilihDoctor(`${getTop.getBoundingClientRect().top + 40}px`)

            setModalPilihDoctor(!modalPilihDoctor)
        }
    }

    function closeModalNameDoctor() {
        setSearchSpesialisDoctor('')
        setModalPilihDoctor(false)
    }

    function selectNameDoctor(data, index) {
        const elementNameDoctor = document.getElementsByClassName('nameDoctor')

        for (let i = 0; i < elementNameDoctor.length; i++) {
            elementNameDoctor[i].style.backgroundColor = '#fff'
            elementNameDoctor[i].style.color = '#333'
        }

        elementNameDoctor[index].style.backgroundColor = '#999'
        elementNameDoctor[index].style.color = '#fff'

        const elementJadwalPraktek = document.getElementsByClassName('jadwal-praktek')

        if (elementJadwalPraktek.length > 0 && nameBtnPilihDoctor !== 'Pilih Dokter') {
            for (let i = 0; i < elementJadwalPraktek.length; i++) {
                elementJadwalPraktek[i].style.backgroundColor = 'transparent'
                elementJadwalPraktek[i].style.border = '1px solid #999'
            }
        }

        setTimeout(() => {
            clickPilihDokter(data)
            setModalPilihDoctor(false)
        }, 0);

        setValue({
            ...value,
            namaDokter: data,
            jadwalDokter: ''
        })
        setNameBtnPilihDoctor(data)

        if (pilihTanggalKunjungan !== 'Pilih Tanggal') {
            setPilihTanggalKunjungan('Pilih Tanggal')
            setStarDateKunjungan('')
        }

        changeElementInputFormRv(true);
    }

    function answerJadwalPraktek(e, i) {
        setIsOpenTanggalKunjungan(false)
        setValue({
            ...value,
            jadwalDokter: e[1]
        })

        const elementJadwalPraktek = document.getElementsByClassName('jadwal-praktek')

        for (let p = 0; p < elementJadwalPraktek.length; p++) {
            elementJadwalPraktek[p].style.backgroundColor = 'transparent'
            elementJadwalPraktek[p].style.border = '1px solid #999'
        }

        elementJadwalPraktek[i].style.backgroundColor = '#b04579'
        elementJadwalPraktek[i].style.border = '1px solid #b04579'

        if (pilihTanggalKunjungan !== 'Pilih Tanggal') {
            setPilihTanggalKunjungan('Pilih Tanggal')
            setStarDateKunjungan('')
        }

        changeElementInputFormRv(false);
    }

    const widthBody = document.body.getBoundingClientRect().width
    const minimizeValue = Math.floor(widthBody)

    const topSuccessMessage1024 = minimizeValue > 766 && minimizeValue < 1024 ? '150px' : '170px'

    const topSuccessMessage = minimizeValue < 769 ? '110px' : topSuccessMessage1024

    async function getOneDoctor() {
        return await new Promise((resolve, reject) => {
            API.APIGetListDoctor()
                .then(res => {
                    const respons = res.data

                    const getDoctor = respons.filter(e => e.name === nameBtnPilihDoctor && e.speciality === nameBtnSpesialisDoctor)
                    resolve(getDoctor)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    function clickDateKunjungan(e) {
        e.preventDefault()
        if (value.jadwalDokter.length > 1 && displayLoadBtnCalendar === false) {
            if (isOpenTanggalKunjungan === false) {
                setDisplayLoadBtnCalendar(true)
                getOneDoctor()
                    .then(res => {
                        if (res && res.length > 0) {
                            setMinDateKunjungan(new Date(res[0].minDate))
                            setMaxDateKunjungan(addMonths(new Date(res[0].maxDate), 0))

                            setIsOpenTanggalKunjungan(!isOpenTanggalKunjungan)
                            const days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu']
                            const getDayKunjungan = value.jadwalDokter.split(' ')[0].toLowerCase()

                            for (let i = 0; i < days.length; i++) {
                                if (getDayKunjungan === days[i]) {
                                    setFilterDateKunjungan(i)
                                }
                            }

                            setDisplayLoadBtnCalendar(false)
                        }
                    })
                    .catch(err => {
                        alert('Oops!, telah terjadi kesalahan server\nMohon coba beberapa saat lagi.')
                        console.log(err)
                        setDisplayLoadBtnCalendar(false)
                    })
            } else {
                setIsOpenTanggalKunjungan(!isOpenTanggalKunjungan)
            }
        }
    }

    function changeDateKunjungan(date) {
        setIsOpenTanggalKunjungan(!isOpenTanggalKunjungan)
        setStarDateKunjungan(date)
        setPilihTanggalKunjungan(format(date, "MM/dd/yyyy"))
    }

    function isWeekDay(date) {
        const day = getDay(date)
        return day === filterDateKunjungan
    }

    return (
        <>
            <HelmetCard
                title={Object.keys(dataHeader).length > 0 ? `${dataHeader.namePage} - Rumah Sakit Permata` : 'Rumah Sakit Permata'}
                content="Pendaftaran online untuk anda berobat atau berkonsultasi dirumah sakit permata - permata keluarga husada grup"
                linkCanonical={`${url}online-reservation`}
            />

            <BannerHeader
                img={Object.keys(dataHeader).length > 0 ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />

            <div className="wrapp-online-reservation">
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

                <div className="container-konten-online-reservation">
                    <div className="column-konten-online-reservation">
                        <div className="form-kiri-online-rv">
                            <Input
                                displayTitle="flex"
                                title="Data Pribadi"
                                label="Nama"
                                nameInput="nama"
                                typeInput="text"
                                value={value.nama}
                                handleChange={inputDataPribadi}
                                errorMessage={errForm && errForm.nama}
                            />

                            <Input
                                label="Nomor Telepon"
                                nameInput="nomorTelepon"
                                typeInput="tel"
                                value={value.nomorTelepon}
                                handleChange={inputDataPribadi}
                                errorMessage={errForm && errForm.nomorTelepon}
                            />

                            <Input
                                renderCustomHeader={({
                                    date,
                                    changeYear,
                                    changeMonth,
                                    decreaseMonth,
                                    increaseMonth,
                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled,
                                }) => (
                                    <div
                                        style={{
                                            margin: 10,
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} style={{
                                            display: 'flex',
                                            width: '30px',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            {"<"}
                                        </button>
                                        <select
                                            value={getYear(date)}
                                            onChange={({ target: { value } }) => changeYear(value)}
                                        >
                                            {yearsCalendar.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            value={monthsCalendar[getMonth(date)]}
                                            onChange={({ target: { value } }) =>
                                                changeMonth(monthsCalendar.indexOf(value))
                                            }
                                        >
                                            {monthsCalendar.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>

                                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} style={{
                                            display: 'flex',
                                            width: '30px',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            {">"}
                                        </button>
                                    </div>
                                )}
                                displayInput="none"
                                displayWrappCalendar="flex"
                                label="Tanggal Lahir"
                                nameInput="tanggalLahir"
                                typeInput="text"
                                idCalendar="date-of-birth"
                                selectedCalendar={starDateOfBirth}
                                changeDateOfCalendar={(date) => setStarDateOfBirth(date)}
                                errorMessage={errForm && errForm.tanggalLahir}
                            />

                            <Input
                                label="Email"
                                nameInput="email"
                                typeInput="email"
                                value={value.email}
                                handleChange={inputDataPribadi}
                                errorMessage={errForm && errForm.email}
                            />

                            <div className="container-group-answer">
                                <p className="question-form-kanan-online-rv">
                                    Apakah Anda pernah berobat di RS Permata sebelumnya?
                                </p>

                                <div className="column-indicator-answer">
                                    <IndicatorAnswer
                                        answer="Ya"
                                        bgColorAnswer={answerPernahBerobat === 'Ya' ? '#b04579' : 'transparent'}
                                        borderAnswer={answerPernahBerobat === 'Ya' ? '1px solid #b04579' : '1px solid #999'}
                                        clickAnswer={answerYes}
                                    />

                                    <IndicatorAnswer
                                        answer="Tidak"
                                        bgColorAnswer={answerPernahBerobat === 'Tidak' ? '#b04579' : 'transparent'}
                                        borderAnswer={answerPernahBerobat === 'Tidak' ? '1px solid #b04579' : '1px solid #999'}
                                        clickAnswer={answerNo}
                                    />
                                </div>
                            </div>

                            <Input
                                displayWrapp={answerPernahBerobat === 'Ya' ? 'flex' : 'none'}
                                displayBintangWajib="none"
                                label="Nomor Rekam Medis"
                                nameInput="nomorRekamMedis"
                                typeInput="text"
                                value={value.nomorRekamMedis}
                                handleChange={inputDataPribadi}
                            />

                            <div className="container-group-answer">
                                <p className="question-form-kanan-online-rv">
                                    Pilih Tipe Pembayaran
                                </p>

                                <div className="column-indicator-answer">
                                    <IndicatorAnswer
                                        answer="Biaya Pribadi"
                                        bgColorAnswer={answerTipePembayaran === 'Biaya Pribadi' ? '#b04579' : 'transparent'}
                                        borderAnswer={answerTipePembayaran === 'Biaya Pribadi' ? '1px solid #b04579' : '1px solid #999'}
                                        clickAnswer={answerBiayaPribadi}
                                    />

                                    <IndicatorAnswer
                                        answer={'Asuransi'}
                                        bgColorAnswer={answerTipePembayaran !== 'Biaya Pribadi' ? '#b04579' : 'transparent'}
                                        borderAnswer={answerTipePembayaran !== 'Biaya Pribadi' ? '1px solid #b04579' : '1px solid #999'}
                                        clickAnswer={answerBiayaAsuransi}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-kanan-online-rv">
                            <Input
                                displayTitle="flex"
                                title="Waktu Kunjungan Anda"
                                displayInput="none"
                                label="Spesialisasi Dokter"
                                errorMessage={errForm && errForm.spesialisDokter}
                                displayBtn="flex"
                                nameBtn={nameBtnSpesialisDoctor}
                                data={filterSpesialisDoctor}
                                displayModal={modalSpesialisDoctor ? 'flex' : 'none'}
                                topModal={topModal}
                                nameClass="spesialis"
                                searchMenuInput={inputSpesialisDoctor}
                                clickBtnInput={(e) => showModalSpesialisDoctor(e)}
                                clickNameMenu={(data, index) => selectSpesialisDoctor(data, index)}
                                clickCloseModal={closeModalSpesialisDoctor}
                            />

                            <Input
                                displayTitle="none"
                                displayInput="none"
                                label="Nama Dokter"
                                errorMessage={errForm && errForm.namaDokter}
                                displayBtn="flex"
                                nameBtn={nameBtnPilihDoctor}
                                data={filterNameDoctor}
                                displayModal={modalPilihDoctor ? 'flex' : 'none'}
                                topModal={topModalPilihDoctor}
                                nameClass="nameDoctor"
                                cursorBtn={nameBtnSpesialisDoctor === 'Pilih Spesialisasi Dokter' ? 'not-allowed' : 'pointer'}
                                searchMenuInput={inputSpesialisDoctor}
                                clickBtnInput={(e) => showModalNameDoctor(e)}
                                clickCloseModal={closeModalNameDoctor}
                                clickNameMenu={(data, index) => selectNameDoctor(data, index)}
                            />

                            <div className="container-group-answer" style={styleGroupAnswer}>
                                <p className="question-form-kanan-online-rv">
                                    Pilih Jadwal Praktek Dokter
                                </p>

                                <div className="column-indicator-answer" style={styleColumnIndicatorAnswer}>
                                    {Object.entries(jadwalDokter).map((e, i) => {

                                        const removeNonSchedule = e[1].includes('.') ? e[1] : ''

                                        return (
                                            <>
                                                <IndicatorAnswer
                                                    key={i}
                                                    displayWrapp={removeNonSchedule !== '' ? 'flex' : 'none'}
                                                    answer={removeNonSchedule}
                                                    classAnswer="jadwal-praktek"
                                                    clickAnswer={() => answerJadwalPraktek(e, i)}
                                                />
                                            </>
                                        )
                                    })}
                                </div>
                            </div>

                            <p className="error-message-form-online-rv">
                                {nameBtnPilihDoctor !== 'Pilih Dokter' ? errForm && errForm.jadwalDokter : ''}
                            </p>

                            <Input
                                displayInput="none"
                                nameBtn={pilihTanggalKunjungan}
                                displayLoadBtn={displayLoadBtnCalendar ? 'flex' : 'none'}
                                displayBtn="flex"
                                label="Tanggal Kunjungan"
                                errorMessage={errForm && errForm.tanggalKunjungan}
                                nameInput="tanggalKunjungan"
                                typeInput="text"
                                clickBtnInput={clickDateKunjungan}
                                cursorBtn={value.jadwalDokter.length > 1 ? 'pointer' : 'not-allowed'}
                                idInputForm="tanggal-kunjungan"
                                filterDateKunjungan={isWeekDay}
                                selectedDateKunjungan={starDateKunjungan}
                                isOpenTanggalKunjungan={isOpenTanggalKunjungan}
                                minDateKunjungan={minDateKunjungan}
                                maxDateKunjungan={maxDateKunjungan}
                                changeDateKunjungan={changeDateKunjungan}
                            />

                            <label htmlFor="label" className="label-form-online-rv">
                                Message
                            </label>

                            <textarea name="message" className="input-form-online-rv" cols="30" rows="10"
                                onChange={inputDataPribadi}
                            ></textarea>

                            <p className="note-form-online-rv">
                                Note : Dokter sewaktu waktu dapat membatalkan jadwal praktek dikarenakan cuti atau berhalangan, kami akan mengkonfirmasi anda via sms/telepon jika ada perubahan tersebut. Terima Kasih dan harap maklum
                            </p>

                            <div className="container-agree-form-online-rv">
                                <div className="checkbox-agree-form-online-rv"
                                    onClick={clickAgreeSubmit}
                                >
                                    <i className="fas fa-check"
                                        style={styleIconCheck}
                                    ></i>
                                </div>

                                <p className="deskripsi-agree-form-online-rv"
                                    onClick={clickAgreeSubmit}
                                >
                                    Saya setuju bahwa data saya akan digunakan oleh rumah sakit untuk keperluan yang berhubungan dengan pelayanan kesehatan saya
                                </p>
                            </div>

                            <p className="error-message-form-online-rv">
                                {errForm && errForm.agreeSubmit}
                            </p>

                            <div className="column-btn-form-online-rv">
                                <ButtonCard
                                    nameClassBtn="btn-card-two"
                                    title="SUBMIT"
                                    clickBtn={handleSubmit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Loading
                displayWrapp={loadingPage ? 'flex' : 'none'}
                displayLoadingForm={loadingForm ? 'flex' : 'none'}
            />
        </>
    )
}

export default OnlineReservation;