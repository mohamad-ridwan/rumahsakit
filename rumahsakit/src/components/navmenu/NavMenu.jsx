import React from 'react'
import './NavMenu.scss'

function NavMenu({ name, clickNav, mouseEnter, mouseLeave, marginLeft, clickBtn, colorBtn, dataModalMenu, btnModalMenu, mouseEnterModal, mouseLeaveModal }) {
    return (
        <>
            <div className="wrapp-navmenu"
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                onClick={clickBtn}
            >
                <button className="btn-group-navmenu" onClick={clickNav} style={{
                    marginLeft: `${marginLeft}`,
                    color: `${colorBtn}`
                }}>
                    {name}
                </button>

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
                                <button key={e._id} className="btn-modal-navmenu"
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
                                </button>
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