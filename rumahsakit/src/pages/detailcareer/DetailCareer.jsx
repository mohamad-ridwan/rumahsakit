import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Headers from '../../components/headers/Headers'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import Loading from '../../components/loading/Loading'
import API from '../../services/api'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'
import './DetailCareer.scss'

function DetailCareer() {

    const [paramsGlobal, setParamsGlobal, updateParams] = useContext(PathContext)
    const [dataHeader, setDataHeader] = useState({})
    const [career, setCareer] = useState({})
    const [loading, setLoading] = useState(false)

    const location = window.location.pathname.toString().split('/')[1]
    const locationDetail = window.location.pathname.toString().split('/')[3]

    const history = useHistory()

    function setAllAPI() {
        setLoading(true)
        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path.includes(location))
                setDataHeader(getData[0])
            })

        API.APIGetCareer()
            .then(res => {
                setLoading(false)
                const getData = res.data.filter((e) => e.path.includes(locationDetail))
                setCareer(getData[0])
            })
    }

    useEffect(() => {
        setAllAPI();
    }, [])

    return (
        <>
            <HelmetCard
                title={`${career && Object.keys(career).length > 0 ? career.titleBidang + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}`}
                content="Rumah sakit permata Depok - Testimoni para pasien loyal"
            />
            <BannerHeader
                img={dataHeader && dataHeader.img ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />
            <div className="wrapp-detail-career">
                <Headers
                    header1={'Home'}
                    arrow={'>'}
                    arrow2={'>'}
                    header2={dataHeader && dataHeader.namePage}
                    header3={career && career.titleBidang}
                    cursor1={'pointer'}
                    cursor2={'pointer'}
                    colorHeader3={'#7e7e7e'}
                    click1={() => {
                        history.push('/')
                        updateParams('/')
                    }}
                    click2={() => {
                        history.push('/career')
                        updateParams('/career')
                    }}
                />

                {career && Object.keys(career).length > 0 ?
                    (
                        <>
                            <div className="main-konten-detail-career">
                                <p className="title-konten-detail-career">
                                    {career.title}
                                </p>

                                <p className="main-deskripsi-detail-career">
                                    {career.mainDeskripsi}
                                </p>

                                <p className="title-name-rs-detail-career">
                                    {career.nameRs}
                                </p>

                                <p className="hrd-rs-detail-career">
                                    {career.hrd}
                                </p>

                                <p className="address-detail-career">
                                    {career.address}
                                </p>

                                <p className="email-detail-career">
                                    atau email ke:
                                        <p className="konten-email-detail-career">
                                        {career.email} </p>
                                </p>

                                <div className="container-box-grey-detail-career">
                                    <div className="box-grey-detail-career">
                                        <p className="title-bidang-detail-career">
                                            {career.titleBidang}
                                        </p>

                                        <div className="container-date-detail-career">
                                            <i className="fas fa-medkit"></i>
                                            <p className="name-rs-career font-detail-career-group">
                                                {career.nameRs}
                                            </p>

                                            <i className="far fa-calendar-alt"></i>
                                            <p className="date-job-career font-detail-career-group">
                                                {career.dateLamaran}
                                            </p>
                                        </div>

                                        <p className="qualification">
                                            Qualification
                                            </p>

                                        <p className="deskripsi-job-detail-career">
                                            {career.qualification}
                                        </p>
                                    </div>
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

export default DetailCareer;