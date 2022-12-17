import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './Faq.scss'
import API from '../../services/api'
import url from '../../services/api/url'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'
import { FaqContext } from '../../services/context/faq/Faq'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Headers from '../../components/headers/Headers'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import Loading from '../../components/loading/Loading'
import NavMenu from '../../components/navmenu/NavMenu'

function Faq() {
    const [titleMenuFaq, setTitleMenuFaq, indexActiveFaqGlobal, setIndexActiveFaqGlobal] = useContext(FaqContext)
    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar] = useContext(PathContext)
    const [dataHeader, setDataHeader] = useState({})
    const [dataGeneral, setDataGeneral] = useState([])
    const [dataFaq, setDataFaq] = useState([])
    const [navMenu, setNavMenu] = useState([])
    const [activeNavMenu, setActiveNavMenu] = useState(0)
    const [dataVisitorPatient, setDataVisitorPatient] = useState([])
    const [loading, setLoading] = useState(false)

    const location = window.location.pathname.toString().split('/')[1]

    const history = useHistory()

    function setAllAPI() {
        setLoading(true)

        const newData = []

        const newDataGeneral = []
        const newDataVisitor = []

        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path.includes(location))
                setDataHeader(getData[0])
            })

        API.APIGetGeneral()
            .then(res => {
                const respons = res.data
                setDataFaq(respons)
                setDataGeneral(respons)

                const filterTitle = respons.filter((v, i, a) => a.findIndex(t => t.title === v.title) === i)

                newData.push(filterTitle[0])

                respons.forEach((e) => {
                    newDataGeneral.push(e)
                })

                setTimeout(() => {
                    API.APIGetVisitorPatientInformation()
                        .then(res => {
                            setLoading(false)

                            const respons = res.data
                            setDataVisitorPatient(res.data)

                            const filterTitle = respons.filter((v, i, a) => a.findIndex(t => t.title === v.title) === i)
                            newData.push(filterTitle[0])

                            setNavMenu(newData)

                            respons.forEach((e) => {
                                newDataVisitor.push(e)

                                setTimeout(() => {
                                    if (titleMenuFaq !== undefined && titleMenuFaq !== null) {
                                        toPageFromNavmenu(indexActiveFaqGlobal, titleMenuFaq, false, newDataGeneral, newDataVisitor)
                                    }
                                }, 0);
                            })
                        })
                }, 0);
            })
    }

    function RenderHTML(data) {
        return (
            <p className="txt-answer-accordion-faq" dangerouslySetInnerHTML={{ __html: data.answer }}>

            </p>
        )
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        heightAccordion();
        setAllAPI();
        activeNavbar();
    }, [])

    function changeData(path, condition, general, visitor) {
        if (condition) {
            if (path === 'General') {
                setDataFaq(dataGeneral)
            } else {
                setDataFaq(dataVisitorPatient)
            }
        } else {
            if (path === 'General') {
                setDataFaq(general)
            } else {
                setDataFaq(visitor)
            }
        }
    }

    function toPageFromNavmenu(i, e, condition, general, visitor) {
        if (condition) {
            setActiveNavMenu(i)
            changeData(e.title, condition)
        } else {
            setActiveNavMenu(i)
            changeData(e, condition, general, visitor)
        }
    }

    const elementNavmenu = document.getElementsByClassName('wrapp-navmenu')

    function mouseEnterNavmenu(index) {
        if (elementNavmenu.length > 0) {
            for (let i = 0; i < elementNavmenu.length; i++) {
                elementNavmenu[i].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '0'
            }

            elementNavmenu[activeNavMenu].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '-7px'
            elementNavmenu[activeNavMenu].getElementsByClassName('btn-group-navmenu')[0].style.color = '#333'

            elementNavmenu[index].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '-7px'
            elementNavmenu[index].getElementsByClassName('btn-group-navmenu')[0].style.color = '#333'
        }
    }

    function mouseLeaveNavmenu() {
        if (elementNavmenu.length > 0) {
            for (let i = 0; i < elementNavmenu.length; i++) {
                elementNavmenu[i].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '0'
                elementNavmenu[i].getElementsByClassName('btn-group-navmenu')[0].style.color = '#b04579'
            }

            elementNavmenu[activeNavMenu].getElementsByClassName('btn-group-navmenu')[0].style.marginLeft = '-7px'
            elementNavmenu[activeNavMenu].getElementsByClassName('btn-group-navmenu')[0].style.color = '#333'
        }
    }

    function btnAccordion(index) {
        const element = document.getElementsByClassName('column-deskripsi-accordion-faq')

        const accordion = document.getElementsByClassName('box-accordion-faq')

        const iconSort = document.getElementsByClassName('icon-accordion')

        if (index === index && element[index].style.height === '1px') {
            element[index].style.height = element[index].scrollHeight + 15 + 'px'
            element[index].style.borderTop = '1px solid #b04579'
            accordion[index].style.backgroundColor = '#fff'
            accordion[index].style.border = '1px solid #b04579'
            iconSort[index].style.transform = 'rotate(0deg)'
        } else {
            element[index].style.height = element[index].style.height = '1px'
            element[index].style.borderTop = 'none'
            accordion[index].style.backgroundColor = '#f1f1f1'
            accordion[index].style.border = 'none'
            iconSort[index].style.transform = 'rotate(180deg)'
        }
    }

    function heightAccordion() {
        const element = document.getElementsByClassName('column-deskripsi-accordion-faq')

        if (element.length > 0) {
            for (let i = 0; i < element.length; i++) {
                element[i].style.height = element[i].scrollHeight + 15 + 'px'
            }
        }
    }

    function toPageHome() {
        history.push('/')
        updateParams('/')
    }

    return (
        <>
            <HelmetCard
                title={Object.keys(dataHeader).length > 0 ? dataHeader.namePage + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content="tanya jawab tentang sistem berobat dirumah sakit permata depok - permata keluarga husada grup"
                linkCanonical={`${url}faq`}
            />

            <BannerHeader
                img={Object.keys(dataHeader).length > 0 ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />

            <div className="wrapp-faq">
                <div className="container-faq">
                    <div className="column-kiri-faq">
                        {navMenu && navMenu.length > 0 ?
                            navMenu.map((e, i) => {
                                return (
                                    <>
                                        <NavMenu
                                            key={e._id}
                                            name={e.title}
                                            mouseEnter={() => mouseEnterNavmenu(i)}
                                            mouseLeave={() => mouseLeaveNavmenu()}
                                            marginLeft={activeNavMenu === i ? '-7px' : '0'}
                                            colorBtn={activeNavMenu === i ? '#333' : '#b04579'}
                                            clickBtn={() => toPageFromNavmenu(i, e, true)}
                                        />
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                    </div>

                    <div className="column-kanan-faq">
                        <Headers
                            header1="Home"
                            arrow=">"
                            header2={dataHeader && dataHeader.namePage}
                            cursor1="pointer"
                            colorHeader2="#7e7e7e"
                            click1={toPageHome}
                        />

                        {dataFaq && dataFaq.length > 0 ?
                            dataFaq.map((e, i) => {
                                return (
                                    <>
                                        <div key={e._id} className="box-accordion-faq">
                                            <button className="btn-accordion-faq"
                                                onClick={() => btnAccordion(i)}
                                            >
                                                {e.question}
                                                <i className="fas fa-sort-up icon-accordion"></i>
                                            </button>

                                            <div className="column-deskripsi-accordion-faq"
                                            >
                                                <RenderHTML answer={e.answer} />
                                            </div>
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

export default Faq;