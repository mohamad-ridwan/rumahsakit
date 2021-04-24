import React from 'react'
import './BannerHeader.scss'

function BannerHeader({ img, title }) {
    return (
        <>
            <div className="wrapp-banner-header">
                <img src={img} alt="" className="img-banner" />

                <p className="title-banner-header">
                    {title}
                </p>
            </div>
        </>
    )
}

export default BannerHeader;