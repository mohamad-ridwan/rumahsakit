import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './FindADoctor.scss'
import API from '../../services/api'
import url from '../../services/api/url'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import ButtonCard from '../../components/buttoncard/ButtonCard'
import Card from '../../components/card/Card'
import Headers from '../../components/headers/Headers'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import Input from '../../components/input/Input'
import Loading from '../../components/loading/Loading'
import Pagination from '../../components/pagination/Pagination'

function FindADoctor() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar] = useContext(PathContext)
    const [loading, setLoading] = useState(false)
    const [dataHeader, setDataHeader] = useState({})
    const [findADoctor, setFindADoctor] = useState({})
    const [listDoctor, setListDoctor] = useState([])
    const [nameBtn, setNameBtn] = useState('Select Speciality')
    const [listSpeciality, setListSpeciality] = useState([])
    const [modalList, setModalList] = useState(false)
    const [valueNameDr, setValueNameDr] = useState('')
    const [displayBtn, setDisplayBtn] = useState(true)
    const [filterDay, setFilterDay] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [indexPaginate, setIndexPaginate] = useState(1)
    const [searchDocSpeciality, setSearchDocSpeciality] = useState('')
    const [activeSelectDay, setActiveSelectDay] = useState(null)
    const [loadingDoctorsFound, setLoadingDoctorsFound] = useState(false)

    const location = window.location.pathname.toString().split('/')[1]

    const history = useHistory()

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
        window.scrollTo(0, 0);
        setAllAPI();
        activeNavbar();
    }, [])

    const styleUnselectDay = {
        display: filterDay.length > 0 ? 'flex' : 'none'
    }

    function getListDoctor() {
        setLoadingDoctorsFound(true);

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

                    setLoadingDoctorsFound(false)
                }, 0);
            })
    }

    function clickBtnChoose(index, data) {
        const element = document.getElementsByClassName('btn-choose')
        setFilterDay(`e.doctorSchedule.${data}`)
        setActiveSelectDay(index)

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
        setActiveSelectDay(null)

        for (let i = 0; i < element.length; i++) {
            element[i].style.backgroundColor = '#fff'
            element[i].style.color = '#999'
        }
    }

    const indexOfLastPage = currentPage * perPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const currentList = listDoctor.slice(indexOfFirstPage, indexOfLastPage);

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
        const elementPersonalized = document.getElementsByClassName('container-detail-personalized')
        if (elementPersonalized[0].style.height === '1px') {
            elementPersonalized[0].style.height = elementPersonalized[0].scrollHeight + 15 + 'px'
        } else {
            elementPersonalized[0].style.height = '1px'
        }
        setDisplayBtn(!displayBtn)
    }

    function toPage(path) {
        history.push(path)
        updateParams(path)
    }

    function numberPaginate(number) {
        setCurrentPage(number)
        setIndexPaginate(number)
    }

    const filterSearchDocSpeciality = listSpeciality.filter((e) => e.toLowerCase().includes(searchDocSpeciality.toLocaleLowerCase()))

    function inputSearchDocSpeciality(e) {
        setSearchDocSpeciality(e.target.value)
    }

    function mouseOverSelectDay(idx) {
        const element = document.getElementsByClassName('btn-choose')

        if (element.length > 0) {
            for (let i = 0; i < element.length; i++) {
                element[i].style.backgroundColor = '#fff'
                element[i].style.color = '#999'
            }

            if (activeSelectDay !== null) {
                element[activeSelectDay].style.backgroundColor = '#7a3561'
                element[activeSelectDay].style.color = '#fff'
            }
            element[idx].style.backgroundColor = '#7a3561'
            element[idx].style.color = '#fff'
        }
    }

    function mouseLeaveSelectDay() {
        const element = document.getElementsByClassName('btn-choose')

        if (element.length > 0) {
            for (let i = 0; i < element.length; i++) {
                element[i].style.backgroundColor = '#fff'
                element[i].style.color = '#999'
            }

            if (activeSelectDay !== null) {
                element[activeSelectDay].style.backgroundColor = '#7a3561'
                element[activeSelectDay].style.color = '#fff'
            }
        }
    }

    return (
        <>
            <HelmetCard
                title={Object.keys(dataHeader).length > 0 ? dataHeader.namePage + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content="Beberapa dokter spesialis dan berupa jadwalnya yang Anda bisa temukan dipencarian kami, rumah sakit permata depok - permata keluarga husada grup"
                linkCanonical={`${url}findadoctor`}
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
                    click1={() => toPage('/')}
                />

                <div className="container-find-a-doctor">
                    {findADoctor && Object.keys(findADoctor).length > 0 ? (
                        <>
                            <img src={`${Endpoint}/images/${findADoctor.image}`} alt="background top page find a doctor rs permata" className="img-main-konten-find-doctor" width="960" height="470" loading='lazy'/>

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
                                                data={filterSearchDocSpeciality}
                                                marginBtn="0"
                                                topModal="40px"
                                                searchMenuInput={inputSearchDocSpeciality}
                                                displayModal={modalList ? 'flex' : 'none'}
                                                clickBtnInput={showDoctorSpeciality}
                                                clickCloseModal={closeModalDoctorSpeciality}
                                                clickNameMenu={(data, index) => selectNameSpeciality(data, index)}
                                            />
                                        </div>

                                        <div className="column-input-find-doctor">
                                            <Input
                                                marginInputForm="0"
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

                                    <div className="container-detail-personalized" style={{ height: '1px' }}>
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
                                                    <button key={i} className="btn-choose"
                                                        onClick={() => clickBtnChoose(i, e)}
                                                        onMouseOver={() => mouseOverSelectDay(i)}
                                                        onMouseLeave={mouseLeaveSelectDay}
                                                    >
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
                                    {loadingDoctorsFound ? (
                                        <div className="column-loading-doctors-found">
                                            <p className="txt-loading-find-doctors">
                                                Loading
                                            </p>

                                            <div className="loading-find-doctors">

                                            </div>
                                        </div>
                                    ) : (
                                        <p className="doctors-found">
                                            {listDoctor.length} Doctors Found
                                        </p>
                                    )}

                                    {currentList && currentList.length > 0 ?
                                        currentList.map((e) => {
                                            return (
                                                <>
                                                    <div className="column-card-find-a-doctor">
                                                        <Card
                                                            key={e._id}
                                                            widthCard="100%"
                                                            lazyLoadingImg="lazy"
                                                            displayReadMore="none"
                                                            displayBtnDownload="none"
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
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
            />
        </>
    )
}

export default FindADoctor;