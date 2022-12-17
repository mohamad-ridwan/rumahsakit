import React, { useContext, useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import './AboutUs.scss'
import API from '../../services/api';
import url from '../../services/api/url';
import Endpoint from '../../services/api/endpoint';
import { PathContext } from '../../services/context/path/Path';
import HelmetCard from '../../components/helmetcard/HelmetCard';
import BannerHeader from '../../components/bannerheader/BannerHeader';
import NavMenu from '../../components/navmenu/NavMenu';
import Headers from '../../components/headers/Headers';
import Loading from '../../components/loading/Loading';

function AboutUs() {
    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar] = useContext(PathContext)
    const [loading, setLoading] = useState(false)
    const [fixed, setFixed] = useState(false)
    const [indexBtn, setIndexBtn] = useState(null)
    const [dataHeader, setDataHeader] = useState({})
    const [dataKonten, setDataKonten] = useState([])

    const history = useHistory();

    const location = window.location.pathname.toString().split('/')[1]

    const elementNavmenu = document.getElementsByClassName('wrapp-navmenu')

    const widthBody = document.body.getBoundingClientRect().width
    const minimizeValue = Math.floor(widthBody)

    let pathElement = []

    function setAllAPI() {
        setLoading(true)
        API.APIGetAboutUs()
            .then(res => {
                setLoading(false)
                setDataKonten(res.data)
            })

        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path.includes(location))
                setDataHeader(getData[0])
            })
    }

    function RenderHTML(data, title) {
        return (
            <p className="text-konten-about-us" dangerouslySetInnerHTML={{ __html: data.data }}></p>
        )
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setAllAPI();
        activeNavbar();
    }, [])

    const styleNavmenu = {
        position: fixed ? 'fixed' : 'static',
        marginTop: fixed ? '190px' : '0',
    }

    const checkFixedNavmenu = fixed ? '23%' : 'auto'
    const sizeMobileNavmenu = minimizeValue < 767 ? '100%' : 'auto'

    const styleBoxFixedNavmenu = {
        width: minimizeValue > 766 && minimizeValue < 1024 ? checkFixedNavmenu : sizeMobileNavmenu
    }

    function toElement(path) {
        const element = document.getElementById(path)
        const getTopElement = element.getBoundingClientRect().top

        window.scrollBy({ top: getTopElement - 185 })
    }

    window.addEventListener('scroll', () => {
        if (minimizeValue > 766) {
            const pageYOffset = window.pageYOffset
            const minimize = Math.floor(pageYOffset)

            if (minimize > 320) {
                setFixed(true)
            } else if (minimize < 320) {
                setFixed(false)
            }
        }
    })

    function mouseEnterNavmenu(index) {
        if (elementNavmenu.length > 0) {
            for (let i = 0; i < elementNavmenu.length; i++) {
                elementNavmenu[i].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '0'

                if (indexBtn !== null) {
                    elementNavmenu[i].getElementsByClassName('btn-group-navmenu')[0].style.color = '#b04579'
                }
            }

            if (indexBtn !== null) {
                elementNavmenu[indexBtn].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '-7px'
                elementNavmenu[indexBtn].getElementsByClassName('btn-group-navmenu')[0].style.color = '#333'

                elementNavmenu[index].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '-7px'
                elementNavmenu[index].getElementsByClassName('btn-group-navmenu')[0].style.color = '#333'
            } else {
                elementNavmenu[index].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '-7px'
            }
        }
    }

    function mouseLeaveNavmenu() {
        if (elementNavmenu) {
            for (let i = 0; i < elementNavmenu.length; i++) {
                elementNavmenu[i].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '0'
                elementNavmenu[i].getElementsByClassName('btn-group-navmenu')[0].style.color = '#b04579'
            }

            if (indexBtn !== null) {
                elementNavmenu[indexBtn].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '-7px'
                elementNavmenu[indexBtn].getElementsByClassName('btn-group-navmenu')[0].style.color = '#333'
            }
        }
    }

    function clickBtnNavmenu(index) {
        for (let i = 0; i < elementNavmenu.length; i++) {
            elementNavmenu[i].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '0'
            elementNavmenu[i].getElementsByClassName('btn-group-navmenu')[0].style.color = '#b04579'
        }
        if (index !== undefined) {
            setIndexBtn(index)
            elementNavmenu[index].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '-7px'
            elementNavmenu[index].getElementsByClassName('btn-group-navmenu')[0].style.color = '#333'
        }
    }

    function toPageHome() {
        updateParams('/')
        history.push('/')
    }

    return (
        <>
            <HelmetCard
                title={Object.keys(dataHeader).length > 0 ? dataHeader.namePage + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content="Tentang kami bagaimana rumah sakit permata keluarga husada grup dibangun, beberapa pendiri dan dokter aktif kami dengan visi misinya untuk memajukan rumah sakit kami dan bagaimana history atau perjalanan dari rumah sakit ini."
                linkCanonical={`${url}about`}
            />

            <BannerHeader
                img={Object.keys(dataHeader).length > 0 ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />

            <div className="wrapp-about-us">
                <div className="container-about-us">
                    <div className="kolom-kiri-about-us">
                        <p className="title-rs-permata-keluarga">
                            RS PERMATA KELUARGA
                        </p>
                        <div className="container-box-fixed-navmenu" style={styleNavmenu}>
                            <div className="column-box-fixed-navmenu">
                                <div className="box-fixed-navmenu" style={styleBoxFixedNavmenu}
                                    onMouseLeave={mouseLeaveNavmenu}
                                >
                                    {dataKonten && dataKonten.length > 0 ?
                                        dataKonten.map((e, i) => {

                                            const getPath = e.path.split(' ').join('-')
                                            pathElement.push(getPath)

                                            return (
                                                <NavMenu
                                                    key={e._id}
                                                    name={e.path}
                                                    clickNav={() => toElement(getPath)}
                                                    mouseEnter={() => mouseEnterNavmenu(i)}
                                                    clickBtn={() => clickBtnNavmenu(i)}
                                                />
                                            )
                                        }) : (
                                            <div></div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="kolom-kanan-about-us">
                        <Headers
                            header1="Home"
                            arrow=">"
                            header2={dataHeader && dataHeader.namePage}
                            cursor1="pointer"
                            colorHeader2="#7e7e7e"
                            click1={toPageHome}
                        />

                        {dataKonten && dataKonten.length > 0 ?
                            dataKonten.map((e) => {

                                const getPath = e.path.split(' ').join('-')

                                return (
                                    <>
                                        <div key={e._id} className="konten-about-us" id={getPath}>
                                            <p className="title-konten-about-us">{e.title}</p>
                                            <RenderHTML
                                                data={e.konten}
                                                title={e.title}
                                            />
                                        </div>
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                    </div>
                </div>
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
            />
        </>
    )
}

export default withRouter(AboutUs);