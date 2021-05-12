import React from 'react'
import './NavMenu.scss'

function NavMenu({ name, clickNav, address, mouseEnter, mouseLeave, marginLeft, clickBtn, colorBtn, dataModalMenu, btnModalMenu, mouseEnterModal, mouseLeaveModal }) {
    return (
        <>
            <div className="wrapp-navmenu"
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                onClick={clickBtn}
            >
                <a href={address} className="btn-group-navmenu" onClick={clickNav} style={{
                    marginLeft: `${marginLeft}`,
                    color: `${colorBtn}`
                }}>
                    {name}
                </a>

                <div className="container-modal-navmenu" style={{
                    height: '1px'
                }}
                    onMouseEnter={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {dataModalMenu && dataModalMenu.length > 0 ?
                        dataModalMenu.map((e, i) => {
                            return (
                                <a key={e._id} href={'#'} className="btn-modal-navmenu"
                                    onClick={(p) => {
                                        p.stopPropagation();
                                        btnModalMenu(e, i)
                                    }}
                                    onMouseEnter={(x) => {
                                        x.stopPropagation()
                                        mouseEnterModal(i)
                                    }}
                                    onMouseLeave={(x) => {
                                        x.stopPropagation()
                                        mouseLeaveModal(i)
                                    }}
                                >
                                    {e.title}
                                </a>
                            )
                        }) : (
                            <div></div>
                        )}
                </div>
            </div>
        </>
    )
}

export default NavMenu;