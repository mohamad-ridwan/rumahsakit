import React from 'react'
import './ModalSuccess.scss'

function ModalSuccess({ marginTop, bgColor, message }) {
    return (
        <>
            <div className="modal-success-subscribe" style={{
                marginTop: `${marginTop}`,
                backgroundColor: `${bgColor}`
            }}>
                <p className="txt-success-subscribe">
                    {message}
                </p>
            </div>
        </>
    )
}

export default ModalSuccess;