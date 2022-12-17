import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './OurHospital.scss'
import url from '../../services/api/url'
import Endpoint from '../../services/api/endpoint'
import API from '../../services/api'
import { PathContext } from '../../services/context/path/Path'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Headers from '../../components/headers/Headers'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import Input from '../../components/input/Input'
import Loading from '../../components/loading/Loading'
import NavMenu from '../../components/navmenu/NavMenu'
import Pagination from '../../components/pagination/Pagination'
import CarouselMain from '../../components/carouselmain/CarouselMain'
import ButtonCard from '../../components/buttoncard/ButtonCard'

function OurHospital() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive, searchResult, setSearchResult, searchValue, setSearchValue, autoplayCarousel, playInterval, setPlayInterval] = useContext(PathContext)
    const [ourHospital, setOurHospital] = useState({})
    const [dataHeader, setDataHeader] = useState({})
    const [pageNavMenu, setPageNavMenu] = useState([])
    const [pageModalNavMenu, setPageModalNavMenu] = useState([])
    const [loading, setLoading] = useState(false)
    const [activeModalNavmenu, setActiveModalNavmenu] = useState()
    const [nameBtnSelect, setNameBtnSelect] = useState('Jantung dan Pembuluh Darah')
    const [listJadwalDoctor, setListJadwalDoctor] = useState([])
    const [selectListJadwalDoctor, setSelectListJadwalDoctor] = useState([])
    const [listSpesialisDoctor, setListSpesialisDoctor] = useState([])
    const [listDoctor, setListDoctor] = useState([])
    const [modalSelectSpesialisDoctor, setModalSelectSpesialisDoctor] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(3)
    const [indexPaginate, setIndexPaginate] = useState(1)
    const [value, setValue] = useState('')
    const [pathLocal, setPathLocal] = useState('')
    const [activeJadwalDokter, setActiveJadwalDokter] = useState(null)

    const location = window.location.pathname.toString().split('/')[3]
    const location2 = window.location.pathname.toString().split('/')[1]

    const arrayDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const history = useHistory()

    function setAllAPI(path, idPathLocal) {
        const newPathLocal = idPathLocal === undefined ? location : idPathLocal
        setLoading(true)

        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path.includes(location2))
                setDataHeader(getData[0])
            })

        API.APIGetOurHospital()
            .then(res => {
                const respons = res.data

                const getListJadwalDoctor = respons.filter((e) => e.path === 'jadwal-dokter')
                const getDefaultList = getListJadwalDoctor.filter((e) => e.speciality === 'Jantung dan Pembuluh Darah')
                const getSpesialisDoctor = getListJadwalDoctor.filter((e, i, a) => a.findIndex(t => (t.speciality === e.speciality)) === i)
                setListJadwalDoctor(getListJadwalDoctor)
                setSelectListJadwalDoctor(getDefaultList)

                let dataSpeciality = []

                if (getSpesialisDoctor.length > 0) {
                    getSpesialisDoctor.forEach((e) => {
                        dataSpeciality.push(e.speciality)

                        setListSpesialisDoctor(dataSpeciality)
                    })

                    setTimeout(() => {
                        selectSpesialisDoctor('Jantung dan Pembuluh Darah', 0, false)
                    }, 0);
                }

                let newOurHospital = {}

                if (path !== undefined && path !== null) {
                    const getData2 = respons.filter((e) => e.path === path)
                    setOurHospital(getData2[0])
                    newOurHospital = getData2[0]
                } else {
                    const getData = respons.filter((e) => e.path === newPathLocal)
                    setOurHospital(getData[0])
                    newOurHospital = getData[0]
                }

                let newData = []

                const layananAndFasilitas = { title: 'Layanan & Fasilitas' }

                const getTitle = respons.filter((e, i, a) => a.findIndex(t => (t.title === e.title)) === i)

                const mainNavMenu = getTitle.filter((e) => e.title === 'Profil' ||
                    e.title === 'Jadwal Dokter'
                )

                if (mainNavMenu.length > 0) {
                    for (let i = 0; i < mainNavMenu.length; i++) {
                        newData.push(mainNavMenu[i])
                    }

                    setTimeout(() => {
                        newData.push(layananAndFasilitas)
                    }, 0);
                }

                setTimeout(() => {
                    setPageNavMenu(newData)
                }, 0);

                const modalNavMenu = getTitle.filter((e) => e.title === 'Waspada Covid-19' ||
                    e.title === 'Layanan Unggulan' ||
                    e.title === 'UGD' ||
                    e.title === 'Rawat Jalan' ||
                    e.title === 'Rawat Inap' ||
                    e.title === 'Panduan Rawat Inap' ||
                    e.title === 'Penunjang Medis'
                )

                setPageModalNavMenu(modalNavMenu)

                if (newOurHospital.path === 'profil') {
                    setPathLocal('profil')

                    setTimeout(() => {
                        activeBtnGroupNavmenu(0, '-7px', '#333')
                    }, 0);
                } else if (newOurHospital.path === 'jadwal-dokter') {
                    setActiveJadwalDokter(1)
                    setPathLocal('jadwal-dokter')

                    setTimeout(() => {
                        activeBtnGroupNavmenu(1, '-7px', '#333')
                    }, 0);
                } else {
                    setPathLocal('layanan & fasilitas')

                    setTimeout(() => {
                        activeBtnGroupNavmenu(2, '-7px', '#333')
                    }, 0);
                }

                setTimeout(() => {
                    clickLayananAndFasilitas(true, undefined, newPathLocal);
                    toActiveBtnModalNavmenu(newOurHospital)
                }, 0);

                setTimeout(() => {
                    setLoading(false)
                }, 500);
            })

        API.APIGetListDoctor()
            .then(res => setListDoctor(res.data))
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setAllAPI();
        activeNavbar();
    }, [])

    function RenderHTML(data) {
        return (
            <p className="txt-content-our-hospital" dangerouslySetInnerHTML={{ __html: data.konten }}>

            </p>
        )
    }

    const styleTableJadwalDoctor = {
        display: activeJadwalDokter === 1 ? 'flex' : 'none'
    }

    const stylePaginate = {
        display: activeJadwalDokter === 1 ? 'flex' : 'none'
    }

    const elementNavmenu = document.getElementsByClassName('wrapp-navmenu')
    const eContainerModalNavmenu = document.getElementsByClassName('container-modal-navmenu')

    const indexOfLastPage = currentPage * perPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const currentList = selectListJadwalDoctor.slice(indexOfFirstPage, indexOfLastPage);

    function activeBtnGroupNavmenu(idx, marginLeft, color) {
        const newBtnGroupNavmenu = document.getElementsByClassName('btn-group-navmenu')

        newBtnGroupNavmenu[idx].style.marginLeft = marginLeft
        newBtnGroupNavmenu[idx].style.color = color
    }

    function mouseEnterNavmenu(index) {
        if (elementNavmenu.length > 0) {
            for (let i = 0; i < elementNavmenu.length; i++) {
                elementNavmenu[i].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '0'
            }

            if (pathLocal === 'profil') {
                elementNavmenu[0].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '-7px'
                elementNavmenu[0].getElementsByClassName('btn-group-navmenu')[0].style.color = '#333'
            }
            if (pathLocal === 'jadwal-dokter') {
                elementNavmenu[1].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '-7px'
                elementNavmenu[1].getElementsByClassName('btn-group-navmenu')[0].style.color = '#333'
            }
            if (eContainerModalNavmenu[2].style.height !== '1px') {
                document.getElementsByClassName('btn-group-navmenu')[2].style.marginLeft = '-7px'
                document.getElementsByClassName('btn-group-navmenu')[2].style.color = '#333'
            }

            elementNavmenu[index].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '-7px'
            elementNavmenu[index].getElementsByClassName('btn-group-navmenu')[0].style.color = '#333'
        }
    }

    function mouseLeaveNavmenu() {
        if (elementNavmenu.length > 0) {
            for (let i = 0; i < elementNavmenu.length; i++) {
                elementNavmenu[i].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '0'
                elementNavmenu[i].getElementsByClassName('btn-group-navmenu')[0].style.color = '#b04579'
            }

            if (pathLocal === 'profil') {
                elementNavmenu[0].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '-7px'
                elementNavmenu[0].getElementsByClassName('btn-group-navmenu')[0].style.color = '#333'
            }
            if (pathLocal === 'jadwal-dokter') {
                elementNavmenu[1].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '-7px'
                elementNavmenu[1].getElementsByClassName('btn-group-navmenu')[0].style.color = '#333'
            }
            if (eContainerModalNavmenu[2].style.height !== '1px') {
                document.getElementsByClassName('btn-group-navmenu')[2].style.marginLeft = '-7px'
                document.getElementsByClassName('btn-group-navmenu')[2].style.color = '#333'
            }
        }
    }

    function clickLayananAndFasilitas(active, activeClick, idPathLocal) {
        const newPathLocal = idPathLocal === undefined ? location : idPathLocal

        if (eContainerModalNavmenu.length > 0) {
            if (active) {
                setTimeout(() => {
                    if (newPathLocal !== 'profil' && newPathLocal !== 'jadwal-dokter') {
                        if (eContainerModalNavmenu[2].style.height === '1px') {
                            eContainerModalNavmenu[2].style.height = eContainerModalNavmenu[2].scrollHeight + 'px'
                        } else if (eContainerModalNavmenu[2].style.height !== '1px') {
                            eContainerModalNavmenu[2].style.height = '1px'
                        }
                    } else {
                        if (activeClick) {
                            if (eContainerModalNavmenu[2].style.height === '1px') {
                                eContainerModalNavmenu[2].style.height = eContainerModalNavmenu[2].scrollHeight + 'px'
                            } else {
                                eContainerModalNavmenu[2].style.height = '1px'
                            }
                        }
                    }
                }, 0);
            }
        }
    }

    const btnModalNavmenu = document.getElementsByClassName('btn-modal-navmenu')

    function mouseEnterModal(i) {
        if (btnModalNavmenu.length > 0) {
            btnModalNavmenu[i].style.color = '#333'
        }
    }

    function mouseLeaveModal() {
        for (let i = 0; i < btnModalNavmenu.length; i++) {
            btnModalNavmenu[i].style.color = '#b04579'
        }

        if (activeModalNavmenu !== undefined && activeModalNavmenu !== null) {
            btnModalNavmenu[activeModalNavmenu].style.color = '#333'
        }
    }

    function toActiveBtnModalNavmenu(header) {
        for (let l = 0; l < btnModalNavmenu.length; l++) {
            const check = btnModalNavmenu[l].textContent === header.title

            if (check) {
                btnModalNavmenu[l].style.color = '#333'
                setActiveModalNavmenu(l)
            }
        }
    }

    function toPageFromNavmenu(e, i) {
        if (e.title !== 'Layanan & Fasilitas') {
            history.push(`${e.path}`)
            setPathLocal(e.path)
            setAllAPI(undefined, e.path)
            setActiveModalNavmenu()

            for (let i = 0; i < btnModalNavmenu.length; i++) {
                btnModalNavmenu[i].style.color = '#b04579'
            }
            eContainerModalNavmenu[2].style.height = '1px'

            if (e.path === 'jadwal-dokter') {
                setActiveJadwalDokter(i)
            } else {
                setActiveJadwalDokter(null)
            }

            window.scrollTo(0, 0)
        } else {
            clickLayananAndFasilitas(true, true);

            if (pathLocal === 'profil') {
                activeBtnGroupNavmenu(0, '-7px', '#333')
            } else if (pathLocal === 'jadwal-dokter') {
                activeBtnGroupNavmenu(1, '-7px', '#333')
            }
        }
    }

    function toPageFromModalNavmenu(data, idx, i) {
        history.push(`${data.path}`)
        setActiveModalNavmenu(idx)
        setActiveJadwalDokter(null)
        setPathLocal('layanan & fasilitas')
        activeBtnGroupNavmenu(0, '0', '#b04579')
        activeBtnGroupNavmenu(1, '0', '#b04579')

        clickLayananAndFasilitas(true)

        setTimeout(() => {
            setAllAPI(data.path)
            window.scrollTo(0, 0)
        }, 0);
    }

    function toPage(path) {
        history.push(path)
        updateParams(path)
        setPlayInterval(true)
    }

    function toPageTop() {
        window.scrollTo(0, 0)
    }

    function showModalSpesialisDoctor(e) {
        e.stopPropagation();

        setModalSelectSpesialisDoctor(!modalSelectSpesialisDoctor)
    }

    function closeModalSpesialisDoctor() {
        setModalSelectSpesialisDoctor(false)
    }

    function selectSpesialisDoctor(data, index, update) {
        const elementSpesialisDoctor = document.getElementsByClassName('speciality-jadwal-doctor')

        for (let i = 0; i < elementSpesialisDoctor.length; i++) {
            elementSpesialisDoctor[i].style.backgroundColor = '#fff'
            elementSpesialisDoctor[i].style.color = '#333'
        }

        elementSpesialisDoctor[index].style.backgroundColor = '#999'
        elementSpesialisDoctor[index].style.color = '#fff'

        if (update === true) {
            setNameBtnSelect(data)
            getJadwalDoctorFromSelectSpeciality(data)
            setModalSelectSpesialisDoctor(false)
            setIndexPaginate(1)
            setCurrentPage(1)
        }
    }

    function getJadwalDoctorFromSelectSpeciality(speciality) {
        const getJadwalDoctor = listJadwalDoctor.filter((e) => e.speciality === speciality)

        setSelectListJadwalDoctor(getJadwalDoctor)
    }

    function numberPaginate(number) {
        setCurrentPage(number)
        setIndexPaginate(number)
    }

    const filterSearchSpesialisDoctor = listSpesialisDoctor.filter((e) => e.toLowerCase().includes(value.toLowerCase()))

    function searchSpesialisDoctor(e) {
        setValue(e.target.value)
    }

    return (
        <>
            <HelmetCard
                title={Object.keys(ourHospital).length > 0 ? ourHospital.title + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content="Rumah sakit permata Depok - Mengenai profil rumah sakit permata depok, berbagai layanan fasilitas dan jadwal dokter yang siap melayani pasien"
                linkCanonical={`${url}content/profil`}
            />

            <BannerHeader
                img={Object.keys(dataHeader).length > 0 ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={ourHospital && ourHospital.title}
            />

            <div className="wrapp-our-hospital">
                <div className="wrapp-content-our-hospital">
                    <div className="column-content-our-hospital">
                        <div className="column-kiri-our-hospital">
                            {pageNavMenu && pageNavMenu.length > 0 ?
                                pageNavMenu.map((e, i) => {
                                    return (
                                        <>
                                            <NavMenu
                                                key={e._id}
                                                name={e.title}
                                                mouseEnter={() => mouseEnterNavmenu(i)}
                                                mouseLeave={() => mouseLeaveNavmenu()}
                                                dataModalMenu={e.title === 'Layanan & Fasilitas' ? pageModalNavMenu : []}
                                                clickBtn={() => toPageFromNavmenu(e, i)}
                                                btnModalMenu={(data, idx) => toPageFromModalNavmenu(data, idx, i)}
                                                mouseEnterModal={(idx) => mouseEnterModal(idx)}
                                                mouseLeaveModal={(idx) => mouseLeaveModal(idx)}
                                            />
                                        </>
                                    )
                                }) : (
                                    <div></div>
                                )}
                        </div>

                        <div className="column-kanan-our-hospital">
                            <Headers
                                header1="Home"
                                arrow=">"
                                arrow2=">"
                                header2={dataHeader && dataHeader.namePage}
                                header3={ourHospital && ourHospital.title}
                                cursor1="pointer"
                                cursor2="pointer"
                                colorHeader3="#7e7e7e"
                                click1={() => toPage('/')}
                                click2={toPageTop}
                            />

                            {Object.keys(ourHospital).length > 0 ? (
                                <>
                                    <p className="title-page-our-hospital">
                                        {ourHospital.title}
                                    </p>
                                </>
                            ) : (
                                <div></div>
                            )}

                            <div className="content-our-hospital">
                                {Object.keys(ourHospital).length > 0 ? (
                                    <>
                                        <div className="container-table-jadwal-doctor" style={styleTableJadwalDoctor}>
                                            <div className="column-select-jadwal-doctor-table">
                                                <Input
                                                    displayLabel="none"
                                                    displayInput="none"
                                                    displayBtn="flex"
                                                    nameBtn={nameBtnSelect}
                                                    nameClass="speciality-jadwal-doctor"
                                                    borderBtn="1px solid #ddd"
                                                    searchMenuInput={searchSpesialisDoctor}
                                                    displayModal={modalSelectSpesialisDoctor ? 'flex' : 'none'}
                                                    topModal="40px"
                                                    data={filterSearchSpesialisDoctor}
                                                    clickBtnInput={(e) => showModalSpesialisDoctor(e)}
                                                    clickCloseModal={closeModalSpesialisDoctor}
                                                    clickNameMenu={(data, index) => selectSpesialisDoctor(data, index, true)}
                                                />
                                            </div>

                                            <div className="wrapp-table-jadwal">
                                                <thead>
                                                    <tr className="t-name">
                                                        Name
                                                    </tr>

                                                    <div className="column-list-day-table">
                                                        {arrayDay.map((e, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    {e}
                                                                </tr>
                                                            )
                                                        })}
                                                    </div>
                                                </thead>

                                                <tbody>
                                                    {currentList && currentList.length > 0 ? currentList.map((e) => {
                                                        return (
                                                            <>
                                                                <div key={e._id} className="column-list-jadwal-doctor">
                                                                    <div className="tbody-name-jadwal-doctor">
                                                                        <p className="name-doctor">
                                                                            {e.name}
                                                                        </p>
                                                                        <p className="spesialis-doctor">
                                                                            {e.speciality}
                                                                        </p>
                                                                    </div>
                                                                    <div className="tbody-jadwal-doctor">
                                                                        <p className="jadwal-doctor-group">
                                                                            {e.Mon}
                                                                        </p>
                                                                        <p className="jadwal-doctor-group">
                                                                            {e.Tue}
                                                                        </p>
                                                                        <p className="jadwal-doctor-group">
                                                                            {e.Wed}
                                                                        </p>
                                                                        <p className="jadwal-doctor-group">
                                                                            {e.Thu}
                                                                        </p>
                                                                        <p className="jadwal-doctor-group">
                                                                            {e.Fri}
                                                                        </p>
                                                                        <p className="jadwal-doctor-group">
                                                                            {e.Sat}
                                                                        </p>
                                                                        <p className="jadwal-doctor-group">
                                                                            {e.Sun}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    }) : (
                                                        <div></div>
                                                    )}
                                                </tbody>
                                            </div>
                                        </div>

                                        <RenderHTML
                                            konten={ourHospital.konten}
                                        />

                                        <div className="container-paginate-jadwal-doctor" style={stylePaginate}>
                                            <Pagination
                                                perPage={perPage}
                                                totalData={selectListJadwalDoctor.length}
                                                indexPaginate={indexPaginate}
                                                clickBtn={(number) => numberPaginate(number)}
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
            </div>

            <div className="container-carousel-our-hospital">
                <div className="column-bawah-carousel-our-hospital">
                    <p className="title-our-doctors">
                        OUR DOCTORS
                    </p>

                    <div className="column-carousel-our-hospital">
                        <CarouselMain
                            displayCarouselListDoctor="flex"
                            dataListDoctor={listDoctor}
                        />
                    </div>

                    <div className="container-btn-our-hospital">
                        <ButtonCard
                            nameClassBtn="btn-card-two"
                            title="FIND A DOCTOR"
                            clickBtn={() => toPage('/findadoctor')}
                        />
                    </div>
                </div>
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
            />
        </>
    )
}

export default OurHospital;