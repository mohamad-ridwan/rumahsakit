import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './DetailCareer.scss'
import API from '../../services/api'
import url from '../../services/api/url'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Headers from '../../components/headers/Headers'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import Loading from '../../components/loading/Loading'

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
                const getData = res.data.filter((e) => e.path === location)
                setDataHeader(getData[0])
            })

        API.APIGetCareer()
            .then(res => {
                setLoading(false)
                const getData = res.data.filter((e) => e.path === locationDetail)
                setCareer(getData[0])
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setAllAPI();
    }, [])

    function toPage(path) {
        history.push(path)
        updateParams(path)
    }

    return (
        <>
            <HelmetCard
                title={Object.keys(career).length > 0 ? career.titleBidang + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content="Kesempatan berkarir di rs permata, dengan menyertakan subjek posisi lowongan di lamaran anda, lalu kirim ke : hrd_rspd@rspermata.co.id, lihat lebih detail deskripsi pada pekerjaannya disini."
                linkCanonical={`${url}career/details/${career && career.path}`}
            />

            <BannerHeader
                img={Object.keys(dataHeader).length > 0 ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />

            <div className="wrapp-detail-career">
                <Headers
                    header1="Home"
                    arrow=">"
                    arrow2=">"
                    header2={dataHeader && dataHeader.namePage}
                    header3={career && career.titleBidang}
                    cursor1="pointer"
                    cursor2="pointer"
                    colorHeader3="#7e7e7e"
                    click1={() => toPage('/')}
                    click2={() => toPage('/career')}
                />

                <div className="container-detail-career">
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
                                        <a href={`mailto:${career.email}`} className="konten-email-detail-career">
                                            {career.email} </a>
                                    </p>

                                    <div className="container-box-grey-detail-career">
                                        <div className="box-grey-detail-career">
                                            <p className="title-bidang-detail-career">
                                                {career.titleBidang}
                                            </p>

                                            <div className="container-date-detail-career">
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
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
            />
        </>
    )
}

export default DetailCareer;