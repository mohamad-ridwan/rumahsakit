import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Headers from '../../components/headers/Headers'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import Loading from '../../components/loading/Loading'
import API from '../../services/api'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'
import './DetailPromo.scss'

function DetailPromo() {

    const [paramsGlobal, setParamsGlobal, updateParams] = useContext(PathContext)
    const [dataHeader, setDataHeader] = useState({})
    const [detailPromo, setDetailPromo] = useState({})
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

        API.APIGetPromo()
            .then(res => {
                setLoading(false)
                const getData = res.data.filter((e) => e.path.includes(locationDetail))
                setDetailPromo(getData[0])
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setAllAPI();
    }, [])

    function RenderHTML(data) {
        return (
            <p className="txt-konten-detail-promo" dangerouslySetInnerHTML={{ __html: data.konten }}>

            </p>
        )
    }

    return (
        <>
            <HelmetCard
                title={`${detailPromo && Object.keys(detailPromo).length > 0 ? detailPromo.title + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}`}
                content="Rumah sakit permata Depok - Testimoni para pasien loyal"
            />
            <BannerHeader
                img={dataHeader && dataHeader.img ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />
            <div className="wrapp-detail-promo">
                <Headers
                    header1={'Home'}
                    arrow={'>'}
                    header2={dataHeader && dataHeader.namePage}
                    header3={detailPromo && detailPromo.title}
                    cursor1={'pointer'}
                    cursor2={'pointer'}
                    colorHeader3={'#7e7e7e'}
                    arrow2={'>'}
                    click1={() => {
                        history.push('/')
                        updateParams('/')
                    }}
                    click2={() => {
                        history.push('/promo')
                        updateParams('/promo')
                    }}
                />

                <div className="main-konten-detail-promo">
                    {detailPromo && Object.keys(detailPromo).length > 0 ? (
                        <>
                            <img src={`${Endpoint}/images/${detailPromo.image}`} alt="" className="img-detail-promo" width={'940'} height={'377'} />

                            <p className="title-detail-promo">
                                {detailPromo.title}
                            </p>

                            <p className="date-detail-promo">
                                <i className="far fa-calendar-alt"></i>
                                {detailPromo.date}
                            </p>
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>

                <div className="konten-detail-promo">
                    <RenderHTML
                        konten={detailPromo && detailPromo.konten}
                    />
                </div>
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
            />
        </>
    )
}

export default DetailPromo;