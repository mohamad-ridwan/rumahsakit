import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { withRouter } from 'react-router-dom'
import './ProfilDoctor.scss'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Headers from '../../components/headers/Headers'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import API from '../../services/api'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'
import Loading from '../../components/loading/Loading'

function ProfilDoctor() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive] = useContext(PathContext)
    const [loading, setLoading] = useState(false)
    const [dataHeader, setDataHeader] = useState({})
    const [dataDoctor, setDataDoctor] = useState({})
    const [scheduleDoctor, setScheduleDoctor] = useState({})

    const location = window.location.pathname.toString().split('/')[1]
    const location2 = window.location.pathname.toString().split('/')[2]

    const history = useHistory()

    function setAllAPI() {
        setLoading(true)
        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path === location)
                setDataHeader(getData[0])
            })

        API.APIGetListDoctor()
            .then(res => {
                setLoading(false)
                const filterName = res.data.filter((e) => e.path === location2)
                setDataDoctor(filterName[0])
                setScheduleDoctor(filterName[0].doctorSchedule)
            })
    }

    useEffect(() => {
        setAllAPI();
        activeNavbar();
        setIndexActive();
    }, [])

    function toPageHome() {
        history.push('/')
        updateParams('/')
    }

    return (
        <>
            <HelmetCard
                title={Object.keys(dataDoctor).length > 0 ? dataDoctor.name + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content="Rumah sakit permata Depok - Profil Doctor"
            />

            <BannerHeader
                img={Object.keys(dataHeader).length > 0 ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />

            <div className="wrapp-profil-doctor">
                <Headers
                    header1="Home"
                    arrow=">"
                    header2={dataDoctor && dataDoctor.name}
                    cursor1="pointer"
                    colorHeader2="#7e7e7e"
                    click1={toPageHome}
                />

                {Object.keys(dataDoctor).length > 0 ? (
                    <>
                        <div className="container-main-profil-doctor">
                            <img src={`${Endpoint}/images/${dataDoctor.image}`} alt="image profil doctor" className="img-profil-doctor" />

                            <div className="container-bio-profil-doctor">
                                <p className="name-profil-doctor">
                                    {dataDoctor.name}
                                </p>

                                <p className="speciality-profil-doctor">
                                    {dataDoctor.speciality}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div></div>
                )}

                <div className="profil-doctor-schedule">
                    <p className="title-doctor-schedule">
                        Doctor Schedule:
                    </p>

                    <ul>
                        {Object.keys(scheduleDoctor).length > 0 ?
                            Object.entries(scheduleDoctor).map((e, i) => {
                                return (
                                    <>
                                        <li key={i}>
                                            {e[0]}
                                            <p className="time-doctor">
                                                {e[1]}
                                            </p>
                                        </li>
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                    </ul>
                </div>
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
            />
        </>
    )
}

export default withRouter(ProfilDoctor);