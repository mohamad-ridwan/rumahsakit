import React from 'react'
import './ButtonCard.scss'

function ButtonCard({ title, border, colorIcon, colorNameBtn, clickBtn, nameClassBtn, displayBtn }) {
    return (
        <>
            <button className={nameClassBtn} style={{
                display: `${displayBtn}`,
                border: `${border}`,
                color: `${colorNameBtn}`
            }}
                onClick={clickBtn}
            >
                <p className="txt-btn-card">
                    {title}
                </p>
                <i class="fas fa-play" style={{
                    color: `${colorIcon}`
                }}></i>
            </button>
        </>
    )
}

export default ButtonCard