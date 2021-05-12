import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import './Navbar.scss'
import logoRs from '../../images/logo-rs.jpg'
import { PathContext } from '../../services/context/path/Path'
import API from '../../services/api'

function Navbar() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive] = useContext(PathContext)
    const [dataNavbar, setDataNavbar] = useState([])
    const [dataCollapseNavbar, setDataCollapseNavbar] = useState([])
    const [pathMenuCollapseNav, setPathMenuCollapseNav] = useState([])
    const [displayCloseCollapse, setDisplayCloseCollapse] = useState(false)

    const history = useHistory()

    const elementBtnNavbar = document.getElementsByClassName('btn-group-header-bottom-navbar')
    const elementModalCollapse = document.getElementsByClassName('modal-collapse-navbar')
    const getElement = document.getElementsByClassName('wrapp-navbar')

    function setAllAPI() {
        API.APIGetNavbar()
            .then(res => {
                setDataNavbar(res.data)
                activeNavbar();
            })
    }

    window.addEventListener('scroll', () => {
        const position = window.pageYOffset
        const roundItUp = Math.floor(position)

        setTimeout(() => {
            if (paramsGlobal !== '/' && getElement.length > 0) {
                if (roundItUp > 40) {
                    getElement[0].style.boxShadow = 'none'
                } else if (roundItUp < 40) {
                    getElement[0].style.boxShadow = '0 3px 35px -1px rgba(0,0,0,0.4)'
                }
            }
            if (paramsGlobal == '/' && getElement.length > 0) {
                getElement[0].style.boxShadow = 'none'
            }
        }, 0);
    })

    useEffect(() => {
        setAllAPI();
        updateParams(history.location.pathname)
    }, [])

    const styleCloseCollapseNav = {
        display: displayCloseCollapse ? 'flex' : 'none'
    }

    const styleWrappNavbar = {
        boxShadow: `${paramsGlobal !== '/' ? '0 3px 35px -1px rgba(0,0,0,0.4)' : 'none'}`
    }

    function toPage(path) {
        if (path !== '-') {
            if (path !== '/') {
                history.push(`/${path}`)
                updateParams(`/${path}`)
            } else {
                history.push(path)
                updateParams(path)

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

    function mouseLeaveBtnNavbar(e) {
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

        if (pathMenuCollapseNav[index].includes('our-hospital')) {
            window.location.reload()
        }
    }

    return (
        <>
            <div className="wrapp-navbar" style={styleWrappNavbar}>
                <div className="column-atas-navbar">
                    <p className="txt-group-information-navbar"
                        onClick={() => toPage('online-reservation')}
                    >
                        Online Reservation
                    </p>
                    <p className="txt-group-information-navbar">
                        |
                    </p>
                    <p className="txt-group-information-navbar">
                        RS Permata Depok +62813-8395-9452
                    </p>
                </div>

                <div className="column-bawah-navbar">
                    <img src={logoRs} alt="" className="logo-rs"
                        onClick={() => toPage('/')}
                    />

                    <form className="form-input-search">
                        <input type="text" className="input-search-home" placeholder="Search..." />
                        <i class="fas fa-search"></i>
                    </form>
                </div>
                <div className="header-bottom-navbar">
                    {dataNavbar && dataNavbar.length > 0 ? dataNavbar.map((e, i) => {
                        return (
                            <>
                                <button key={e._id} className="btn-group-header-bottom-navbar"
                                    onClick={() => toPage(e.path)}
                                    onMouseEnter={() => getCollapseNavbar(e.name, i, e.path)}
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

                    <ul className="modal-collapse-navbar"
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
        </>
    )
}

export default Navbar;