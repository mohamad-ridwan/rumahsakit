import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './Footer.scss'
import API from '../../services/api'
import { PathContext } from '../../services/context/path/Path'

function Footer() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive] = useContext(PathContext)
    const [dataFooter, setDataFooter] = useState([])
    const [dataFooterTwo, setDataFooterTwo] = useState({})

    const history = useHistory()

    function setAllAPI() {
        API.APIGetFooter()
            .then(res => {
                const getMenuPageFooter = res.data.filter((e) => e.id === 'footer-one')
                setDataFooter(getMenuPageFooter)

                const getFooterTwo = res.data.filter((e) => e.id === 'footer-two')
                setDataFooterTwo(getFooterTwo[0])
            })
    }

    useEffect(() => {
        setAllAPI();
    }, [])

    function toPage(path) {
        history.push(`/${path}`)
        updateParams(`/${path}`)

        if (path.includes('our-hospital')) {
            window.location = window.location
        }
    }

    return (
        <>
            <div className="wrapp-footer">
                <div className="wrapp-menu-footer">
                    <div className="container-menu-footer">
                        {dataFooter && dataFooter.length > 0 ? dataFooter.map((e, i) => {

                            const getPages = e.pages

                            return (
                                <>
                                    <ul key={e._id}>
                                        <p className="title-menu-footer">
                                            {e.title}
                                        </p>
                                        {getPages.length > 0 ? getPages.map((e, i) => {
                                            return (
                                                <>
                                                    <li key={e._id} className="link-page-footer"
                                                        onClick={() => toPage(e.path)}
                                                    >
                                                        {e.name}
                                                    </li>
                                                </>
                                            )
                                        }) : (
                                            <div></div>
                                        )}
                                    </ul>
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </div>
                </div>

                <div className="wrapp-footer-copy-right">
                    <div className="container-footer-copy-right">
                        <div className="footer-copy-right">
                            <p className="title-footer-copy-right">
                                © {dataFooterTwo && dataFooterTwo.copyRight}. Developed by : {dataFooterTwo && dataFooterTwo.developedBy}
                            </p>

                            <div className="container-contact-us">
                                <p className="title-footer-copy-right">
                                    Contact us on
                                </p>

                                <ul>
                                    <li>
                                        <a target='_blank' href={dataFooterTwo && dataFooterTwo.urlFacebook}>
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a target='_blank' href={dataFooterTwo && dataFooterTwo.urlInstagram}>
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a target='_blank' href={dataFooterTwo && dataFooterTwo.urlTwitter}>
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;