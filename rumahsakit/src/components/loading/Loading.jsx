import React from 'react'
import './Loading.scss'

function Loading({ displayWrapp }) {
    return (
        <>
            <div className="wrapp-loading" style={{
                display: `${displayWrapp}`
            }}>
                <div className="circle-loading">

                </div>
            </div>
        </>
    )
}

export default Loading;