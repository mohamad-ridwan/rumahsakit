import React from 'react'
import './NavMenu.scss'

function NavMenu({ name, clickNav, address, mouseEnter, mouseLeave, marginLeft, clickBtn }) {
    return (
        <>
            <div className="wrapp-navmenu"
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                onClick={clickBtn}
            >
                <a href={address} className="btn-group-navmenu" onClick={clickNav} style={{
                    marginLeft: `${marginLeft}`
                }}>
                    {name}
                </a>
            </div>
        </>
    )
}

export default NavMenu;