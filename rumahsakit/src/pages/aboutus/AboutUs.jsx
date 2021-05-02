import React, { Component, useContext, useEffect, useState } from 'react'
import HelmetCard from '../../components/helmetcard/HelmetCard';
import './AboutUs.scss'
import BannerHeader from '../../components/bannerheader/BannerHeader';
import NavMenu from '../../components/navmenu/NavMenu';
import Headers from '../../components/headers/Headers';
import { useHistory, withRouter } from 'react-router-dom'
import API from '../../services/api';
import Loading from '../../components/loading/Loading';
import { PathContext } from '../../services/context/path/Path';
import Endpoint from '../../services/api/endpoint';

function AboutUs() {

    const [paramsGlobal, setParamsGlobal, updateParams] = useContext(PathContext)
    const [loading, setLoading] = useState(false)
    const [fixed, setFixed] = useState(false)
    const [indexBtn, setIndexBtn] = useState(null)
    const [dataHeader, setDataHeader] = useState({})
    const [dataKonten, setDataKonten] = useState([])

    const history = useHistory();

    const location = window.location.pathname.toString().split('/')[1]

    const elementNavmenu = document.getElementsByClassName('wrapp-navmenu')

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
            <p className={'text-konten-about-us'} dangerouslySetInnerHTML={{ __html: data.data }}></p>
        )
    }

    useEffect(() => {
        setAllAPI();
    }, [])

    function toElement(path) {
        const element = document.getElementById(path)
        const getTopElement = element.getBoundingClientRect().top

        window.scrollBy({ top: getTopElement - 185 })
    }

    window.addEventListener('scroll', () => {
        const pageYOffset = window.pageYOffset
        const minimize = Math.floor(pageYOffset)

        if (minimize > 320) {
            setFixed(true)
        } else if (minimize < 320) {
            setFixed(false)
        }

        // if (pathElement.length > 0) {
        //     const path1 = document.getElementById(pathElement[0]).getBoundingClientRect().top
        //     const minimizePath1 = Math.floor(path1)

        //     const path2 = document.getElementById(pathElement[1]).getBoundingClientRect().top
        //     const minimizePath2 = Math.floor(path2)

        //     const path3 = document.getElementById(pathElement[2]).getBoundingClientRect().top
        //     const minimizePath3 = Math.floor(path3)

        //     const path4 = document.getElementById(pathElement[3]).getBoundingClientRect().top
        //     const minimizePath4 = Math.floor(path4)

        //     if (minimize > minimizePath1) {
        //         setIndexBtn(0)
        //         clickBtnNavmenu(0);
        //     } else if (minimize < minimizePath1) {
        //         clickBtnNavmenu();
        //     }

        //     if (minimize > minimizePath2) {
        //         setIndexBtn(1)
        //         clickBtnNavmenu(1);
        //     }
        // }
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

    return (
        <>
            <HelmetCard
                title={`${dataHeader && dataHeader.namePage ? dataHeader.namePage + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}`}
                content="Rumah sakit permata Depok - Testimoni para pasien loyal"
            />
            <BannerHeader
                img={dataHeader && dataHeader.img ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />
            <div className="wrapp-about-us">
                <div className="kolom-kiri-about-us">
                    <p className="title-rs-permata-keluarga">
                        RS PERMATA KELUARGA
                    </p>
                    <div className="box-fixed-navmenu" style={{
                        position: `${fixed ? 'fixed' : 'static'}`,
                        marginTop: `${fixed ? '190px' : '0'}`,
                    }}
                        onMouseLeave={() => mouseLeaveNavmenu()}
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
                <div className="kolom-kanan-about-us">
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
                    // click2={() => this.props.history.push('/articles')}
                    />

                    {dataKonten && dataKonten.length > 0 ?
                        dataKonten.map((e) => {

                            const getPath = e.path.split(' ').join('-')

                            return (
                                <div key={e._id} className="konten-about-us" id={getPath}>
                                    <p className={'title-konten-about-us'}>{e.title}</p>
                                    <RenderHTML
                                        data={e.konten}
                                        title={e.title}
                                    />
                                </div>
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

export default withRouter(AboutUs);