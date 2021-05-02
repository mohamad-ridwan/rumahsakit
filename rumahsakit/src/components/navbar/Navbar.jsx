import React, { useContext, useEffect } from 'react'
import './Navbar.scss'
import logoRs from '../../images/logo-rs.jpg'
import { useHistory, useParams } from 'react-router'
import { PathContext } from '../../services/context/path/Path'

function Navbar() {

    const [paramsGlobal, setParamsGlobal, updateParams] = useContext(PathContext)

    const history = useHistory()

    const getElement = document.getElementsByClassName('wrapp-navbar')

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
        updateParams(history.location.pathname)
    }, [])

    return (
        <>
            <div className="wrapp-navbar" style={{
                boxShadow: `${paramsGlobal !== '/' ? '0 3px 35px -1px rgba(0,0,0,0.4)' : 'none'}`
            }}>
                <div className="column-atas-navbar">
                    <p className="txt-group-information-navbar"
                        onClick={() => {
                            history.push('online-reservation')
                            updateParams('/online-reservation')
                        }}
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
                        onClick={() => {
                            updateParams('/')
                            history.push('/')
                            setTimeout(() => {
                                window.scrollTo(0, 0)
                            }, 0);
                        }}
                    />

                    <form className="form-input-search">
                        <input type="text" className="input-search-home" placeholder={'Search...'} />
                        <i class="fas fa-search"></i>
                    </form>
                </div>
                <div className="header-bottom-navbar">
                    <button className="btn-group-header-bottom-navbar"
                        onClick={() => {
                            history.push('/')
                        }}
                    >
                        HOME
                    </button>
                    <button className="btn-group-header-bottom-navbar"
                        onClick={() => {
                            history.push('/about')
                        }}
                    >
                        ABOUT US
                    </button>
                    <button className="btn-group-header-bottom-navbar">
                        OUR HOSPITAL
                    </button>
                    <button className="btn-group-header-bottom-navbar">
                        PROMO
                    </button>
                    <button className="btn-group-header-bottom-navbar">
                        FAQ
                    </button>
                    <button className="btn-group-header-bottom-navbar">
                        FIND A DOCTOR
                    </button>
                    <button className="btn-group-header-bottom-navbar">
                        CAREER
                    </button>
                    <button className="btn-group-header-bottom-navbar">
                        CONTACT US
                    </button>
                </div>
            </div>
        </>
    )
}

export default (Navbar);