import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Headers from '../../components/headers/Headers'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import Loading from '../../components/loading/Loading'
import API from '../../services/api'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'
import './Career.scss'
import { withRouter } from 'react-router-dom'

function Career() {

    const [paramsGlobal, setParamsGlobal, updateParams] = useContext(PathContext)
    const [dataHeader, setDataHeader] = useState({})
    const [career, setCareer] = useState([])
    const [loading, setLoading] = useState(false)

    const location = window.location.pathname.toString().split('/')[1]

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
                setCareer(res.data)
            })
    }

    useEffect(() => {
        setAllAPI();
    }, [])

    return (
        <>
            <HelmetCard
                title={`${dataHeader && Object.keys(dataHeader).length > 0 ? dataHeader.titleBanner + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}`}
                content="Rumah sakit permata Depok - Testimoni para pasien loyal"
            />
            <BannerHeader
                img={dataHeader && dataHeader.img ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />
            <div className="wrapp-career">
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

                {career && career.length > 0 ?
                    career.map((e) => {

                        const checkTitle = e.title !== '' ? e.title : ''

                        return (
                            <>
                                <div key={e._id} className="main-konten-career">
                                    <p className="title-konten-career">
                                        {checkTitle}
                                    </p>

                                    <p className="main-deskripsi-career">
                                        {e.mainDeskripsi}
                                    </p>

                                    <p className="title-name-rs-career">
                                        {e.nameRs}
                                    </p>

                                    <p className="hrd-rs-career">
                                        {e.hrd}
                                    </p>

                                    <p className="address-career">
                                        {e.address}
                                    </p>

                                    <p className="email-career">
                                        atau email ke:
                                        <p className="konten-email-career">
                                            {e.email} </p>
                                    </p>

                                    <div className="container-box-grey">
                                        <div className="box-grey-career">
                                            <p className="title-bidang-career">
                                                {e.titleBidang}
                                            </p>

                                            <div className="container-date-career">
                                                <i className="fas fa-medkit"></i>
                                                <p className="name-rs-career font-career-group">
                                                    {e.nameRs}
                                                </p>

                                                <i className="far fa-calendar-alt"></i>
                                                <p className="date-job-career font-career-group">
                                                    {e.dateLamaran}
                                                </p>
                                            </div>

                                            <p className="deskripsi-job">
                                                {e.deskripsi}
                                            </p>

                                            <p className="view-detail"
                                                onClick={() => {
                                                    history.push(`/career/details/${e.path}`)
                                                    updateParams(`/career/details/${e.path}`)
                                                }}
                                            >
                                                View Detail
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }) : (
                        <div></div>
                    )}
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
            />
        </>
    )
}

export default withRouter(Career);