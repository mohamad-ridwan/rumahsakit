import React, { useState } from 'react'
import { createContext } from "react";

export const PathContext = createContext()

const PathProvider = ({ children }) => {

    const [paramsGlobal, setParamsGlobal] = useState('')
    const [indexActive, setIndexActive] = useState()

    const location = window.location.pathname
    const removeLinePath = location !== '/' ? location.split('/')[1] : location

    function updateParams(path) {
        setParamsGlobal(`${path}`)
    }

    function activeNavbar() {
        const buttonNavbar = document.getElementsByClassName('btn-group-header-bottom-navbar')

        if (buttonNavbar.length > 0) {
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
        }
    }

    return (
        <PathContext.Provider value={[paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive]}>
            {children}
        </PathContext.Provider>
    )
}

export default PathProvider