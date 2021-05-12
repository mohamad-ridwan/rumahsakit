import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './FindADoctor.scss'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import ButtonCard from '../../components/buttoncard/ButtonCard'
import Card from '../../components/card/Card'
import Headers from '../../components/headers/Headers'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import Input from '../../components/input/Input'
import Loading from '../../components/loading/Loading'
import Pagination from '../../components/pagination/Pagination'
import API from '../../services/api'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'

function FindADoctor() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar] = useContext(PathContext)
    const [loading, setLoading] = useState(false)
    const [dataHeader, setDataHeader] = useState({})
    const [findADoctor, setFindADoctor] = useState({})
    const [listDoctor, setListDoctor] = useState([])
    const [displayPersonalized, setDisplayPersonalized] = useState(false)
    const [nameBtn, setNameBtn] = useState('Select Speciality')
    const [listSpeciality, setListSpeciality] = useState([])
    const [modalList, setModalList] = useState(false)
    const [valueNameDr, setValueNameDr] = useState('')
    const [displayBtn, setDisplayBtn] = useState(true)
    const [filterDay, setFilterDay] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [indexPaginate, setIndexPaginate] = useState(1)

    const location = window.location.pathname.toString().split('/')[1]

    const history = useHistory()

    const elementPersonalized = document.getElementsByClassName('container-detail-personalized')

    const arrDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    function setAllAPI() {
        setLoading(true)
        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path.includes(location))
                setDataHeader(getData[0])
            })

        API.APIGetFindADoctor()
            .then(res => {
                setFindADoctor(res.data[0])
            })

        API.APIGetListDoctor()
            .then(res => {
                setLoading(false)
                const respons = res.data

                let newData = []
                const getSpeciality = respons.filter((v, i, a) => a.findIndex(t => (t.speciality === v.speciality)) === i)

                if (getSpeciality.length > 0) {
                    for (let i = 0; i < getSpeciality.length; i++) {
                        newData.push(getSpeciality[i].speciality)
                    }
                    setListSpeciality(newData)
                }
            })

        getListDoctor()
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setAllAPI();
        activeNavbar();
    }, [])

    const styleDetailPersonalized = {
        height: displayPersonalized ? elementPersonalized[0].scrollHeight + 15 + 'px' : '1px'
    }

    const styleUnselectDay = {
        display: filterDay.length > 0 ? 'flex' : 'none'
    }

    function getListDoctor() {
        API.APIGetListDoctor()
            .then(res => {
                const respons = res.data

                const nameFromNonSpeciality = respons.filter((e) => e.name.toLowerCase().includes(valueNameDr.toLowerCase()))
                const getDayFromNonSpeciality = respons.filter((e) => eval(filterDay) !== '-')
                const dayFromNameAndNonSpeciality = nameFromNonSpeciality.filter((e) => eval(filterDay) !== '-')

                const filterSpeciality = respons.filter((e) => e.speciality.includes(nameBtn))
                const nameFromSpeciality = filterSpeciality.filter((e) => e.name.toLowerCase().includes(valueNameDr.toLowerCase()))
                const getDayFromSpeciality = filterSpeciality.filter((e) => eval(filterDay) !== '-')
                const getDayFromName = nameFromSpeciality.filter((e) => eval(filterDay) !== '-')

                if (indexPaginate > 1) {
                    setIndexPaginate(1)
                }

                if (currentPage > 1) {
                    setCurrentPage(1)
                }

                setTimeout(() => {
                    if (nameBtn === 'Select Speciality') {
                        if (valueNameDr.length > 0) {
                            if (filterDay.length > 0) {
                                setListDoctor(dayFromNameAndNonSpeciality)
                            } else {
                                setListDoctor(nameFromNonSpeciality)
                            }
                        } else if (filterDay.length > 0) {
                            setListDoctor(getDayFromNonSpeciality)
                        } else {
                            setListDoctor(respons)
                        }
                    } else if (filterSpeciality.length > 0 && valueNameDr.length > 0) {
                        if (filterDay.length > 0) {
                            setListDoctor(getDayFromName)
                        } else {
                            setListDoctor(nameFromSpeciality)
                        }
                    } else {
                        if (filterDay.length > 0) {
                            setListDoctor(getDayFromSpeciality)
                        } else {
                            setListDoctor(filterSpeciality)
                        }
                    }
                }, 0);
            })
    }

    function clickBtnChoose(index, data) {
        const element = document.getElementsByClassName('btn-choose')
        setFilterDay(`e.doctorSchedule.${data}`)

        if (element.length > 0) {
            for (let i = 0; i < element.length; i++) {
                element[i].style.backgroundColor = '#fff'
                element[i].style.color = '#999'
            }
            element[index].style.backgroundColor = '#7a3561'
            element[index].style.color = '#fff'
        }
    }

    function unselect() {
        const element = document.getElementsByClassName('btn-choose')
        setFilterDay('')

        for (let i = 0; i < element.length; i++) {
            element[i].style.backgroundColor = '#fff'
            element[i].style.color = '#999'
        }
    }

    const indexOfLastPage = currentPage * perPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const currentList = listDoctor.slice(indexOfFirstPage, indexOfLastPage);

    function toPageHome() {
        history.push('/')
        updateParams('/')
    }

    function showDoctorSpeciality() {
        setModalList(!modalList)
    }

    function closeModalDoctorSpeciality() {
        setModalList(false)
    }

    function selectNameSpeciality(data, index) {
        const elementListSpeciality = document.getElementsByClassName('list-speciality')

        for (let i = 0; i < elementListSpeciality.length; i++) {
            elementListSpeciality[i].style.backgroundColor = '#fff'
            elementListSpeciality[i].style.color = '#333'
        }

        elementListSpeciality[index].style.backgroundColor = '#999'
        elementListSpeciality[index].style.color = '#fff'

        setNameBtn(data)

        setModalList(false)
    }

    function searchNameDoctor(e) {
        setValueNameDr(e.target.value)
    }

    function showPersonalizedSearch() {
        setDisplayPersonalized(!displayPersonalized)
        setDisplayBtn(!displayBtn)
    }

    function toPageDetailDoctor(e) {
        history.push(`doctor/${e.path}`)
        updateParams(`doctor/${e.path}`)
    }

    function numberPaginate(number) {
        setCurrentPage(number)
        setIndexPaginate(number)
    }

    return (
        <>
            <HelmetCard
                title={Object.keys(dataHeader).length > 0 ? dataHeader.namePage + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content="Rumah sakit permata Depok - Temukan Dokter yang biasa Anda Berobat dengan mesin pencarian kami"
            />

            <BannerHeader
                img={Object.keys(dataHeader).length > 0 ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />

            <div className="wrapp-find-a-doctor">
                <Headers
                    header1="Home"
                    arrow=">"
                    header2={dataHeader && dataHeader.namePage}
                    cursor1="pointer"
                    colorHeader2="#7e7e7e"
                    click1={toPageHome}
                />

                {findADoctor && Object.keys(findADoctor).length > 0 ? (
                    <>
                        <img src={`${Endpoint}/images/${findADoctor.image}`} alt="background top page" className="img-main-konten-find-doctor" width="960" height="470" />

                        <div className="container-konten-find-doctor">
                            <p className="title-konten-find-doctor">
                                {findADoctor.titleKonten}
                            </p>

                            <p className="deskripsi-find-doctor">
                                {findADoctor.deskripsi}
                            </p>

                            <div className="box-pink-search-find-doctor">
                                <div className="container-input-find-doctor">
                                    <div className="column-input-find-doctor">
                                        <Input
                                            displayLabel="none"
                                            displayInput="none"
                                            displayBtn="flex"
                                            nameBtn={nameBtn}
                                            nameClass="list-speciality"
                                            data={listSpeciality}
                                            topModal="40px"
                                            displayModal={modalList ? 'flex' : 'none'}
                                            clickBtnInput={showDoctorSpeciality}
                                            clickCloseModal={closeModalDoctorSpeciality}
                                            clickNameMenu={(data, index) => selectNameSpeciality(data, index)}
                                        />
                                    </div>

                                    <div className="column-input-find-doctor">
                                        <Input
                                            displayLabel="none"
                                            placeholder="Doctor Name"
                                            value={valueNameDr}
                                            handleChange={searchNameDoctor}
                                        />
                                    </div>

                                    <div className="column-input-find-doctor">
                                        <ButtonCard
                                            displayBtn={displayBtn ? 'flex' : 'none'}
                                            nameClassBtn="btn-card-two"
                                            title="FIND A DOCTOR"
                                            clickBtn={getListDoctor}
                                        />
                                    </div>
                                </div>

                                <button className="btn-personalized-search"
                                    onClick={showPersonalizedSearch}
                                >
                                    Personalized Search
                                    <i class="fas fa-sort-down"></i>
                                </button>

                                <div className="container-detail-personalized" style={styleDetailPersonalized}>
                                    <p className="choose-clinic-day"
                                    >
                                        Choose Clinic Day <span className="unselect-day" style={styleUnselectDay}
                                            onClick={unselect}
                                        >
                                            UNSELECT
                                        </span>
                                    </p>

                                    <div className="container-btn-choose">
                                        {arrDay.map((e, i) => {
                                            return (
                                                <button key={i} className="btn-choose" onClick={() => clickBtnChoose(i, e)}>
                                                    {e}
                                                    <i class="fas fa-check-circle"></i>
                                                </button>
                                            )
                                        })}
                                    </div>

                                    <div className="container-btn-search-choose">
                                        <ButtonCard
                                            nameClassBtn="btn-card-two"
                                            title="FIND A DOCTOR"
                                            clickBtn={getListDoctor}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="container-list-find-doctor">
                                <p className="doctors-found">
                                    {listDoctor.length} Doctors Found
                                </p>

                                {currentList && currentList.length > 0 ?
                                    currentList.map((e) => {
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
                                                    clickToPage={() => toPageDetailDoctor(e)}
                                                />
                                            </>
                                        )
                                    }) : (
                                        <div></div>
                                    )}
                            </div>

                            <Pagination
                                perPage={perPage}
                                totalData={listDoctor.length}
                                indexPaginate={indexPaginate}
                                clickBtn={(number) => numberPaginate(number)}
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

export default FindADoctor;