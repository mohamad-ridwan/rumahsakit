import React from 'react'
import './ButtonCard.scss'

function ButtonCard({ title, border, colorIcon, colorNameBtn, clickBtn }) {
    return (
        <>
            <button className="btn-card" style={{
                border: `${border}`,
                color: `${colorNameBtn}`
            }}
                onClick={clickBtn}
            >
                {title}
                <i class="fas fa-play" style={{
                    color: `${colorIcon}`
                }}></i>
            </button>
        </>
    )
}

export default ButtonCard