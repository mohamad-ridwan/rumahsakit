import React from 'react'
import './Loading.scss'

function Loading({ displayWrapp, displayLoadingForm }) {
    return (
        <>
            <div className="wrapp-loading" style={{
                display: `${displayWrapp}`
            }}>
                <div className="circle-loading">

                </div>
            </div>
            <div className="wrapp-loading-form" style={{
                display: `${displayLoadingForm}`
            }}>
                <div className="circle-loading-form">

                </div>
            </div>
        </>
    )
}

export default Loading;