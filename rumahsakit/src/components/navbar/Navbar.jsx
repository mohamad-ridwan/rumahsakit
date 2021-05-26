import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import './Navbar.scss'
import { PathContext } from '../../services/context/path/Path'
import API from '../../services/api'
import Endpoint from '../../services/api/endpoint'
import { FaqContext } from '../../services/context/faq/Faq'

function Navbar() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive, searchResult, setSearchResult, searchValue, setSearchValue] = useContext(PathContext)
    const [titleMenuFaq, setTitleMenuFaq, indexActiveFaqGlobal, setIndexActiveFaqGlobal] = useContext(FaqContext)
    const [dataNavbar, setDataNavbar] = useState([])
    const [mainNavbar, setMainNabar] = useState({})
    const [dataCollapseNavbar, setDataCollapseNavbar] = useState([])
    const [pathMenuCollapseNav, setPathMenuCollapseNav] = useState([])
    const [displayCloseCollapse, setDisplayCloseCollapse] = useState(false)

    const history = useHistory()

    const elementBtnNavbar = document.getElementsByClassName('btn-group-header-bottom-navbar')
    const elementModalCollapse = document.getElementsByClassName('modal-collapse-navbar')
    const getElement = document.getElementsByClassName('wrapp-navbar')

    const widthBody = document.body.getBoundingClientRect().width
    const minimizeValue = Math.floor(widthBody)

    function setAllAPI() {
        API.APIGetNavbar()
            .then(res => {
                const getMenuNavbar = res.data.filter((e) => e.id === 'menu')
                setDataNavbar(getMenuNavbar)
                activeNavbar();

                const getMainNavbar = res.data.filter((e) => e.id === 'main-navbar')
                setMainNabar(getMainNavbar[0])
            })
    }

    window.addEventListener('scroll', () => {
        const position = window.pageYOffset
        const roundItUp = Math.floor(position)

        setTimeout(() => {
            if (paramsGlobal !== '/') {
                if (roundItUp > 40) {
                    getElement[0].style.boxShadow = 'none'
                } else if (roundItUp < 40) {
                    getElement[0].style.boxShadow = '0 3px 35px -1px rgba(0,0,0,0.4)'
                }
            }
            if (paramsGlobal == '/') {
                getElement[0].style.boxShadow = 'none'
            }
        }, 0);
    })

    useEffect(() => {
        setAllAPI();
        updateParams(history.location.pathname);
    }, []);

    const styleCloseCollapseNav = {
        display: displayCloseCollapse ? 'flex' : 'none'
    }

    const styleWrappNavbar = {
        boxShadow: `${paramsGlobal !== '/' ? '0 3px 35px -1px rgba(0,0,0,0.4)' : 'none'}`
    }

    const styleMenuCollapse = {
        top: minimizeValue > 766 && minimizeValue < 1024 ? '150px' : '173px',
        border: displayCloseCollapse ? '1px solid #d17aa5' : 'none'
    }

    function toPage(path, condition) {
        if (path !== '-') {
            if (path !== '/') {
                history.push(`/${path}`)
                updateParams(`/${path}`)

                if (path === 'faq') {
                    setTitleMenuFaq()
                    setIndexActiveFaqGlobal(0)
                }

                if (condition === undefined) {
                    setSearchResult('')
                    setSearchValue('')
                }

            } else {
                history.push(path)
                updateParams(path)

                if (condition === undefined) {
                    setSearchResult('')
                    setSearchValue('')
                }

                setTimeout(() => {
                    window.scrollTo(0, 0)
                }, 0);
            }
        }
    }

    let newPathCollapse = []
    let newNameCollapse = []

    let dataCollapse = []

    function getCollapseNavbar(name, index, path) {
        mouseOverBtnNavbar(index);

        if (path !== '-') {
            setDisplayCloseCollapse(false)
            setDataCollapseNavbar([])
        }

        return dataNavbar.filter((e) => {
            const tes = e.name === name

            if (tes) {
                if (e.collapse) {
                    setDisplayCloseCollapse(true)
                    Object.entries(e.collapse).map((e) => {
                        const getNameCollapse = Object.entries(e[1])
                        getNameCollapse.map((e) => {
                            dataCollapse.push(e[1])
                        })
                    })

                    getPositionMenuNavbar(index)

                    if (dataCollapse.length > 0) {
                        dataCollapse.map((e) => {
                            const getNameCollapse = e !== e.toLowerCase() ? e : ''
                            const getPathCollapse = e == e.toLowerCase() ? e : ''

                            if (getNameCollapse !== '') {
                                newNameCollapse.push(getNameCollapse)
                                setDataCollapseNavbar(newNameCollapse)
                            }

                            if (getPathCollapse !== '') {
                                newPathCollapse.push(getPathCollapse)
                                setPathMenuCollapseNav(newPathCollapse)
                            }
                        })
                    }
                }
            }
        })
    }

    function mouseOverBtnNavbar(index) {
        for (let i = 0; i < elementBtnNavbar.length; i++) {

            if (elementBtnNavbar[i].classList.length === 1) {
                elementBtnNavbar[i].classList.remove('is-active-navbar')
            }
        }

        elementBtnNavbar[index].classList.add('is-active-navbar')
    }

    function mouseLeaveBtnNavbar() {
        for (let i = 0; i < elementBtnNavbar.length; i++) {
            elementBtnNavbar[i].classList.remove('is-active-navbar')
        }

        if (indexActive !== null && indexActive !== undefined) {
            elementBtnNavbar[indexActive].classList.add('is-active-navbar')
        }
    }

    function noneDisplayModalNav() {
        setDisplayCloseCollapse(false)
        setDataCollapseNavbar([])
    }

    function getPositionMenuNavbar(i) {
        const minimizeValue = Math.floor(elementBtnNavbar[i].getBoundingClientRect().left)

        elementModalCollapse[0].style.left = `${minimizeValue}px`
    }

    function toPageFromNameCollapse(s, index) {
        s.stopPropagation();

        history.push(`/${pathMenuCollapseNav[index]}`)
        updateParams(`/${pathMenuCollapseNav[index]}`)
        setSearchResult('')
        setSearchValue('')
        noneDisplayModalNav();

        if (pathMenuCollapseNav[index].includes('our-hospital')) {
            window.location.reload()
        }
    }

    function inputSearch(e) {
        setSearchValue(e.target.value)
    }

    function submitSearch() {
        setSearchResult(searchValue)
        toPage(`search?q=${searchValue}`, true)

        window.scrollTo(0, 0)
    }

    return (
        <>
            <div className="wrapp-navbar" style={styleWrappNavbar}>
                <div className="column-atas-navbar">
                    <p className="txt-group-information-navbar"
                        onClick={() => toPage(`${mainNavbar && mainNavbar.pathOnlineReservation}`)}
                    >
                        {mainNavbar && mainNavbar.onlineReservation}
                    </p>
                    <p className="txt-group-information-navbar">
                        |
                    </p>
                    <a href={`tel:${mainNavbar && mainNavbar.pathNoTelpRS}`} className="txt-group-information-navbar">
                        {mainNavbar && mainNavbar.noTelpRS}
                    </a>
                </div>

                <div className="container-column-bawah-navbar">
                    <div className="column-bawah-navbar">
                        <img src={`${Endpoint}/images/${mainNavbar && mainNavbar.logo}`} alt="" className="logo-rs"
                            onClick={() => toPage('/')}
                        />

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            submitSearch()
                        }} className="form-input-search">
                            <input type="text" className="input-search-home" placeholder="Search..." value={searchValue}
                                onChange={inputSearch}
                            />
                            <i class="fas fa-search" onClick={submitSearch}></i>
                        </form>
                    </div>
                </div>

                <div className="container-header-bottom-navbar">
                    <div className="header-bottom-navbar">
                        {dataNavbar && dataNavbar.length > 0 ? dataNavbar.map((e, i) => {
                            return (
                                <>
                                    <button key={e._id} className="btn-group-header-bottom-navbar"
                                        onClick={() => toPage(e.path)}
                                        onMouseOver={() => getCollapseNavbar(e.name, i, e.path)}
                                        onMouseLeave={mouseLeaveBtnNavbar}
                                    >
                                        {e.name}

                                        <i className="fas fa-sort-down" style={{
                                            display: `${e.collapse ? 'flex' : 'none'}`
                                        }}></i>
                                    </button>
                                </>
                            )
                        }) : (
                            <div></div>
                        )}

                        <ul className="modal-collapse-navbar" style={styleMenuCollapse}
                        >
                            <div className="column-tambahan-collapse-nav" style={styleCloseCollapseNav}
                                onMouseEnter={noneDisplayModalNav}
                            ></div>
                            {dataCollapseNavbar.length > 0 ? dataCollapseNavbar.map((v, a) => {
                                return (
                                    <>
                                        <NavLink key={a} to={`/${pathMenuCollapseNav[a]}`} className="menu-collapse-navbar" activeClassName="active-menu-collapse-nav"
                                            onClick={(s) => toPageFromNameCollapse(s, a)}
                                        >{v}
                                        </NavLink>
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;