import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { withRouter } from 'react-router-dom'
import './Career.scss'
import API from '../../services/api'
import url from '../../services/api/url'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Headers from '../../components/headers/Headers'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import Loading from '../../components/loading/Loading'

function Career() {
    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar] = useContext(PathContext)
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
        window.scrollTo(0, 0);
        setAllAPI();
        activeNavbar();
    }, [])

    function toPage(path) {
        history.push(path)
        updateParams(path)
    }

    return (
        <>
            <HelmetCard
                title={Object.keys(dataHeader).length > 0 ? dataHeader.titleBanner + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content={`Kesempatan berkarir di rs permata, dengan menyertakan subjek posisi lowongan di lamaran anda, lalu kirim ke : hrd_rspd@rspermata.co.id`}
                linkCanonical={`${url}career`}
            />

            <BannerHeader
                img={Object.keys(dataHeader).length > 0 ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />

            <div className="wrapp-career">
                <Headers
                    header1="Home"
                    arrow=">"
                    header2={dataHeader && dataHeader.namePage}
                    cursor1="pointer"
                    colorHeader2="#7e7e7e"
                    click1={() => toPage('/')}
                />

                <div className="container-career">
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
                                        <a href={`mailto:${e.email}`} className="konten-email-career">
                                                {e.email} </a>
                                        </p>

                                        <div className="container-box-grey">
                                            <div className="box-grey-career">
                                                <p className="title-bidang-career">
                                                    {e.titleBidang}
                                                </p>

                                                <div className="container-date-career">
                                                    <i className="far fa-calendar-alt"></i>
                                                    <p className="date-job-career font-career-group">
                                                        {e.dateLamaran}
                                                    </p>
                                                </div>

                                                <p className="deskripsi-job">
                                                    {e.deskripsi}
                                                </p>

                                                <p className="view-detail"
                                                    onClick={() => toPage(`/career/details/${e.path}`)}
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
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
            />
        </>
    )
}

export default withRouter(Career);