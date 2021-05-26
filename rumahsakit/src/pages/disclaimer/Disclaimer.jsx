import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './Disclaimer.scss'
import API from '../../services/api'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Endpoint from '../../services/api/endpoint'
import Headers from '../../components/headers/Headers'
import { PathContext } from '../../services/context/path/Path'
import Loading from '../../components/loading/Loading'

function Disclaimer() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive] = useContext(PathContext)
    const [dataHeader, setDataHeader] = useState({})
    const [loading, setLoading] = useState(false)
    const [disclaimer, setDisclaimer] = useState({})

    const location = window.location.pathname.toString().split('/')[1]

    const history = useHistory()

    function setAllAPI() {
        setLoading(true)

        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path === location)
                setDataHeader(getData[0])
            })

        API.APIGetDisclaimer()
            .then(res => {
                setLoading(false)
                setDisclaimer(res.data[0])
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setAllAPI();
        setIndexActive();
        activeNavbar();
    }, [])

    function toPage(path) {
        history.push(path)
        updateParams(path)
    }

    return (
        <>
            <HelmetCard
                title={Object.keys(dataHeader).length > 0 ? dataHeader.namePage + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content="Rumah sakit permata Depok - Testimoni para pasien loyal"
            />

            <BannerHeader
                img={Object.keys(dataHeader).length > 0 ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />

            <div className="wrapp-disclaimer">
                <Headers
                    header1="Home"
                    arrow=">"
                    header2={dataHeader && dataHeader.namePage}
                    cursor1="pointer"
                    colorHeader2="#7e7e7e"
                    click1={() => toPage('/')}
                />

                {Object.keys(disclaimer).length > 0 ? (
                    <>
                        <p className="konten-disclaimer">
                            {disclaimer.paragraph}
                        </p>
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

export default Disclaimer;