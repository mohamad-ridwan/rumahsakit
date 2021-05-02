import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import ButtonCard from '../../components/buttoncard/ButtonCard'
import Card from '../../components/card/Card'
import Headers from '../../components/headers/Headers'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import Input from '../../components/input/Input'
import Loading from '../../components/loading/Loading'
import API from '../../services/api'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'
import './FindADoctor.scss'

function FindADoctor() {

    const [paramsGlobal, setParamsGlobal, updateParams] = useContext(PathContext)
    const [loading, setLoading] = useState(false)
    const [dataHeader, setDataHeader] = useState({})
    const [findADoctor, setFindADoctor] = useState({})
    const [listDoctor, setListDoctor] = useState([])
    const [displayPersonalized, setDisplayPersonalized] = useState(false)
    const [nameBtn, setNameBtn] = useState('Select Speciality')
    const [listSpeciality, setListSpeciality] = useState([])
    const [modalList, setModalList] = useState(false)
    const [topModal, setTopModal] = useState('')
    const [valueNameDr, setValueNameDr] = useState('')

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

        API.APIGetFindADoctor()
            .then(res => {
                setFindADoctor(res.data[0])
            })

        API.APIGetListDoctor()
            .then(res => {
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
    }, [])

    function getListDoctor() {
        API.APIGetListDoctor()
            .then(res => {
                const respons = res.data

                const filterSpeciality = respons.filter((e) => e.speciality.includes(nameBtn))
                const nameFromSpeciality = filterSpeciality.filter((e) => e.name.toLowerCase().includes(valueNameDr.toLowerCase()))

                if (nameBtn === 'Select Speciality') {
                    setListDoctor(respons)
                } else if (filterSpeciality.length > 0 && valueNameDr.length > 0) {
                    setListDoctor(nameFromSpeciality)
                } else {
                    setListDoctor(filterSpeciality)
                }
            })
    }

    const arrDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    function clickBtnChoose(index) {
        const element = document.getElementsByClassName('btn-choose')

        if (element.length > 0) {
            if (element[index].style.color === 'rgb(255, 255, 255)') {
                element[index].style.backgroundColor = '#fff'
                element[index].style.color = '#999'
            } else {
                element[index].style.backgroundColor = '#7a3561'
                element[index].style.color = '#fff'
            }
        }
    }

    return (
        <>
            <HelmetCard
                title={`${dataHeader && Object.keys(dataHeader).length > 0 ? dataHeader.namePage + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}`}
                content="Rumah sakit permata Depok - Testimoni para pasien loyal"
            />
            <BannerHeader
                img={dataHeader && dataHeader.img ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />
            <div className="wrapp-find-a-doctor">
                <Headers
                    header1={'Home'}
                    arrow={'>'}
                    header2={dataHeader && dataHeader.namePage}
                    cursor1={'pointer'}
                    colorHeader2={'#7e7e7e'}
                    click1={() => {
                        history.push('/')
                        updateParams('/')
                    }}
                />

                {findADoctor && Object.keys(findADoctor).length > 0 ? (
                    <>
                        <img src={`${Endpoint}/images/${findADoctor.image}`} alt="" className="img-main-konten-find-doctor" width={'960'} height={'470'} />

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
                                            displayLabel={'none'}
                                            displayInput={'none'}
                                            displayBtn={'flex'}
                                            nameBtn={nameBtn}
                                            nameClass={'list-speciality'}
                                            data={listSpeciality}
                                            topModal={'40px'}
                                            displayModal={modalList ? 'flex' : 'none'}
                                            clickBtnInput={() => {
                                                setModalList(!modalList)
                                            }}
                                            clickCloseModal={() => {
                                                setModalList(false)
                                            }}
                                            clickNameMenu={(data, index) => {
                                                const element = document.getElementsByClassName('list-speciality')

                                                for (let i = 0; i < element.length; i++) {
                                                    element[i].style.backgroundColor = '#fff'
                                                    element[i].style.color = '#333'
                                                }

                                                element[index].style.backgroundColor = '#999'
                                                element[index].style.color = '#fff'

                                                setNameBtn(data)

                                                setModalList(false)
                                            }}
                                        />
                                    </div>

                                    <div className="column-input-find-doctor">
                                        <Input
                                            displayLabel={'none'}
                                            placeholder={'Doctor Name'}
                                            value={valueNameDr}
                                            handleChange={(e) => setValueNameDr(e.target.value)}
                                        />
                                    </div>

                                    <div className="column-input-find-doctor">
                                        <ButtonCard
                                            nameClassBtn={'btn-card-two'}
                                            title={'FIND A DOCTOR'}
                                            clickBtn={getListDoctor}
                                        />
                                    </div>
                                </div>

                                <button className="btn-personalized-search"
                                    onClick={() => {
                                        setDisplayPersonalized(!displayPersonalized)
                                    }}
                                >
                                    Personalized Search
                                    <i class="fas fa-sort-down"></i>
                                </button>

                                <div className="container-detail-personalized" style={{
                                    height: `${displayPersonalized ? '200px' : '1px'}`
                                }}>
                                    <p className="choose-clinic-day"
                                    >
                                        Choose Clinic Day
                                    </p>

                                    <div className="container-btn-choose">
                                        {arrDay.map((e, i) => {
                                            return (
                                                <button key={i} className="btn-choose" onClick={() => {
                                                    clickBtnChoose(i)
                                                }}>
                                                    {e}
                                                    <i class="fas fa-check-circle"></i>
                                                </button>
                                            )
                                        })}
                                    </div>

                                    <div className="container-btn-search-choose">
                                        <ButtonCard
                                            nameClassBtn={'btn-card-two'}
                                            title={'FIND A DOCTOR'}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="container-list-find-doctor">
                                <p className="doctors-found">
                                    {listDoctor.length} Doctors Found
                                </p>

                                {listDoctor && listDoctor.length > 0 ?
                                    listDoctor.map((e) => {
                                        return (
                                            <Card
                                                key={e._id}
                                                widthCard={'calc(100%/3'}
                                                displayReadMore={'none'}
                                                flexDirection={'row'}
                                                displayIcon={'none'}
                                                heightImg="80px"
                                                heightCardImg="213"
                                                widthCardImg="80"
                                                radiusImg={'0'}
                                                paddingCard={'0'}
                                                fontFamilyTitle={'Mulish, sans-serif'}
                                                fontTitle={'16px'}
                                                marginImg={'0 10px 0 0'}
                                                marginCard={'0px 0px 40px 0'}
                                                img={`${Endpoint}/images/${e.image}`}
                                                title={e.name}
                                                date={e.speciality}
                                            // deskripsi={removeTagHTML}
                                            // clickToPage={() => this.goToPage(e.path)}
                                            />
                                        )
                                    }) : (
                                        <div></div>
                                    )}

                            </div>
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