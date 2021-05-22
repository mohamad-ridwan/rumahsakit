import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './NavbarMobile.scss'
import API from '../../services/api';
import { FaqContext } from '../../services/context/faq/Faq';
import { PathContext } from '../../services/context/path/Path';
import Endpoint from '../../services/api/endpoint';

function NavbarMobile() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive, searchResult, setSearchResult, searchValue, setSearchValue] = useContext(PathContext)
    const [titleMenuFaq, setTitleMenuFaq, indexActiveFaqGlobal, setIndexActiveFaqGlobal] = useContext(FaqContext)
    const [dataNavbar, setDataNavbar] = useState([])
    const [mainNavbar, setMainNabar] = useState({})
    const [dataCollapseNavbar, setDataCollapseNavbar] = useState([])
    const [pathMenuCollapseNav, setPathMenuCollapseNav] = useState([])
    const [indexDisplay, setIndexDisplay] = useState(0)
    const [heightDropdown, setHeightDropdown] = useState(false)
    const [displaySearch, setDisplaySearch] = useState(false)

    const history = useHistory()

    const elementBtnNavbar = document.getElementsByClassName('menu-dropdown-nav-mobile')
    const wrappNavMobile = document.getElementsByClassName('wrapp-navbar-mobile')

    function setAllAPI() {
        API.APIGetNavbar()
            .then(res => {
                const getMenuNavbar = res.data.filter((e) => e.id === 'menu')
                setDataNavbar(getMenuNavbar)

                const getMainNavbar = res.data.filter((e) => e.id === 'main-navbar-mobile')
                setMainNabar(getMainNavbar[0])
            })
    }

    useEffect(() => {
        setAllAPI();
        updateParams(history.location.pathname)
    }, [])

    window.addEventListener('scroll', () => {
        const position = window.pageYOffset
        const roundItUp = Math.floor(position)

        setTimeout(() => {
            if (paramsGlobal !== '/') {
                if (roundItUp > 40) {
                    wrappNavMobile[0].style.boxShadow = 'none'
                } else if (roundItUp < 40) {
                    wrappNavMobile[0].style.boxShadow = '0 3px 35px -1px rgba(0,0,0,0.4)'
                }
            }
            if (paramsGlobal == '/') {
                wrappNavMobile[0].style.boxShadow = 'none'
            }
        }, 0);
    })

    const styleDropdown = {
        maxHeight: heightDropdown ? '180px' : '1px'
    }

    const styleBtnCloseNavMobile = {
        display: heightDropdown ? 'flex' : 'none',
        top: heightDropdown ? '269px' : '0'
    }

    const styleSearch = {
        display: displaySearch ? 'flex' : 'none'
    }

    const styleWrappNavMobile = {
        boxShadow: `${paramsGlobal !== '/' ? '0 3px 35px -1px rgba(0,0,0,0.4)' : 'none'}`
    }

    function toPage(path, condition) {
        if (path !== '-') {
            if (path !== '/') {
                history.push(`/${path}`)
                updateParams(`/${path}`)
                setHeightDropdown(false)
                setDisplaySearch(false)

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
                setHeightDropdown(false)
                setDisplaySearch(false)

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

        setIndexDisplay(index)

        if (path !== '-') {
            setDataCollapseNavbar([])
        }

        return dataNavbar.filter((e) => {
            const tes = e.name === name

            if (tes) {
                if (e.collapse) {
                    Object.entries(e.collapse).map((e) => {
                        const getNameCollapse = Object.entries(e[1])
                        getNameCollapse.map((e) => {
                            dataCollapse.push(e[1])
                        })
                    })

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

    function toPageFromNameCollapse(s, index) {
        s.stopPropagation();

        history.push(`/${pathMenuCollapseNav[index]}`)
        updateParams(`/${pathMenuCollapseNav[index]}`)
        setSearchResult('')
        setSearchValue('')
        setDisplaySearch(false)

        if (pathMenuCollapseNav[index].includes('our-hospital')) {
            window.location.reload()
        }

        setHeightDropdown(false)
        setDataCollapseNavbar([])
    }

    function mouseOverBtnNavbar(index) {
        for (let i = 0; i < elementBtnNavbar.length; i++) {

            if (elementBtnNavbar[i].classList.length === 1) {
                elementBtnNavbar[i].classList.remove('hover-active-nav-mobile')
            }
        }

        elementBtnNavbar[index].classList.add('hover-active-nav-mobile')
    }

    function mouseLeaveBtnNavbar() {
        for (let i = 0; i < elementBtnNavbar.length; i++) {
            elementBtnNavbar[i].classList.remove('hover-active-nav-mobile')
        }

        if (indexActive !== null && indexActive !== undefined) {
            elementBtnNavbar[indexActive].classList.add('hover-active-nav-mobile')
        }
    }

    function showDropdownNavMobile() {
        setHeightDropdown(!heightDropdown)
        setDataCollapseNavbar([])
        setDisplaySearch(false)
    }

    function submitSearch(e) {
        e.preventDefault();
        setSearchResult(searchValue)
        toPage(`search?q=${searchValue}`, true)
        setDisplaySearch(false)

        window.scrollTo(0, 0)
    }

    function inputSearch(e) {
        setSearchValue(e.target.value)
    }

    function onDisplaySearch() {
        setDisplaySearch(!displaySearch)
    }

    return (
        <>
            <div className="wrapp-navbar-mobile" id="wrapp-navbar-mobile" style={styleWrappNavMobile}>
                <div className="btn-close-nav-mobile" style={styleBtnCloseNavMobile}
                    onClick={showDropdownNavMobile}
                ></div>
                <div className="column-nomer-telp-rs-nav-mobile">
                    <a href="#" className="online-reservation-nav-mobile page-group-nav-mobile"
                        onClick={() => toPage(mainNavbar && mainNavbar.pathOnlineReservation)}
                    >
                        {mainNavbar && mainNavbar.onlineReservation}
                    </a>
                    <a href={`tel:${mainNavbar && mainNavbar.pathNoTelpRS}`} className="telp-rs-nav-mobile page-group-nav-mobile">
                        {mainNavbar && mainNavbar.noTelpRS}
                    </a>
                </div>

                <div className="column-menu-nav-mobile">
                    <button className="btn-menu-nav-mobile btn-group-nav-mobile" onClick={showDropdownNavMobile}>
                        <i class="fas fa-bars"></i>
                    </button>
                    <img src={`${Endpoint}/images/${mainNavbar && mainNavbar.logo}`} width="201" height="49" alt="" className="logo-web-nav-mobile" onClick={() => toPage('/')} />
                    <button className="btn-search-nav-mobile btn-group-nav-mobile" onClick={onDisplaySearch}>
                        <i class="fas fa-search"></i>
                    </button>
                </div>

                <div className="container-dropdown-nav-mobile" style={styleDropdown}>
                    <div className="line-white-nav-mobile"></div>

                    <div className="container-scroll-dropdown-nav-mobile">
                        {dataNavbar && dataNavbar.length > 0 ? dataNavbar.map((e, i) => {
                            return (
                                <>
                                    <button key={e._id} className="menu-dropdown-nav-mobile"
                                        onClick={() => toPage(e.path)}
                                        onMouseEnter={() => getCollapseNavbar(e.name, i, e.path)}
                                        onMouseLeave={mouseLeaveBtnNavbar}
                                    >
                                        {e.name}

                                        <i className="fas fa-sort-down" style={{
                                            display: `${e.collapse ? 'flex' : 'none'}`
                                        }}></i>
                                    </button>

                                    {dataCollapseNavbar.length > 0 ? (
                                        <>
                                            <div className="container-menu-accordion-dropdown-nav-mobile" style={{
                                                display: e.collapse && i === indexDisplay ? 'flex' : 'none'
                                            }}>
                                                {dataCollapseNavbar.map((e, i) => {
                                                    return (
                                                        <>
                                                            <NavLink key={i} to={`/${pathMenuCollapseNav[i]}`} className="menu-accordion-nav-mobile" activeClassName="active-menu-nav-mobile"
                                                                onClick={(s) => toPageFromNameCollapse(s, i)}
                                                            >
                                                                {e}
                                                            </NavLink>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </>
                                    ) : (
                                        <div></div>
                                    )}
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </div>
                </div>

                <form onSubmit={submitSearch} className="container-search-nav-mobile" style={styleSearch}>
                    <input type="text" className="input-search-nav-mobile" placeholder="Search..." value={searchValue} onChange={inputSearch} />
                    <i class="fas fa-search" onClick={submitSearch}></i>
                </form>

                <div className="btn-close-search-nav-mobile" style={styleSearch} onClick={onDisplaySearch}></div>
            </div>
        </>
    )
}

export default NavbarMobile;