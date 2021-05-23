import React, { useState, createContext } from 'react'

export const PathContext = createContext()

const PathProvider = ({ children }) => {

    const [paramsGlobal, setParamsGlobal] = useState('')
    const [indexActive, setIndexActive] = useState()
    const [searchResult, setSearchResult] = useState('')
    const [searchValue, setSearchValue] = useState('')

    const location = window.location.pathname
    const removeLinePath = location !== '/' ? location.split('/')[1] : location

    function updateParams(path) {
        setParamsGlobal(`${path}`)
    }

    function activeNavbar() {
        const buttonNavbar = document.getElementsByClassName('btn-group-header-bottom-navbar')

        const widthBody = document.body.getBoundingClientRect().width
        const minimizeWidth = Math.floor(widthBody)

        if (minimizeWidth > 766 && buttonNavbar.length > 0) {
            for (let i = 0; i < buttonNavbar.length; i++) {
                const checkLocation = buttonNavbar[i].textContent.toLocaleLowerCase()
                buttonNavbar[i].classList.remove('is-active-navbar')

                if (location !== '/') {
                    if (checkLocation == removeLinePath) {
                        setIndexActive(i)
                        buttonNavbar[i].classList.add('is-active-navbar')
                    } else if (location === '/testimonial' || location === '/about') {
                        setIndexActive(1)
                        buttonNavbar[1].classList.add('is-active-navbar')
                    } else if (location.includes('/our-hospital')) {
                        setIndexActive(2)
                        buttonNavbar[2].classList.add('is-active-navbar')
                    } else if (location.includes('/findadoctor')) {
                        setIndexActive(5)
                        buttonNavbar[5].classList.add('is-active-navbar')
                    }
                } else if (location === '/') {
                    setIndexActive(0)
                    buttonNavbar[0].classList.add('is-active-navbar')
                }
            }
        } else if (minimizeWidth < 767) {
            setTimeout(() => {
                activeNavMobile();
            }, 1000);
        }
    }

    function activeNavMobile() {
        const btnNavMobile = document.getElementsByClassName('menu-dropdown-nav-mobile')

        for (let i = 0; i < btnNavMobile.length; i++) {
            const checkLocation = btnNavMobile[i].textContent.toLocaleLowerCase()
            btnNavMobile[i].classList.remove('hover-active-nav-mobile')

            if (location !== '/') {
                if (checkLocation == removeLinePath) {
                    setIndexActive(i)
                    btnNavMobile[i].classList.add('hover-active-nav-mobile')
                } else if (location === '/testimonial' || location === '/about') {
                    setIndexActive(1)
                    btnNavMobile[1].classList.add('hover-active-nav-mobile')
                } else if (location.includes('/our-hospital')) {
                    setIndexActive(2)
                    btnNavMobile[2].classList.add('hover-active-nav-mobile')
                } else if (location.includes('/findadoctor')) {
                    setIndexActive(5)
                    btnNavMobile[5].classList.add('hover-active-nav-mobile')
                }
            } else if (location === '/') {
                setIndexActive(0)
                btnNavMobile[0].classList.add('hover-active-nav-mobile')
            }
        }
    }

    return (
        <PathContext.Provider value={[paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive, searchResult, setSearchResult, searchValue, setSearchValue]}>
            {children}
        </PathContext.Provider>
    )
}

export default PathProvider