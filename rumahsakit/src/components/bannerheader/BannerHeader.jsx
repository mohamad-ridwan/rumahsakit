import React from 'react'
import './BannerHeader.scss'

function BannerHeader({ img, title }) {
    return (
        <>
            <div className="wrapp-banner-header">
                <div className="container-banner-header">
                    <img src={img} alt="" className="img-banner" loading='lazy' />

                    <p className="title-banner-header">
                        {title}
                    </p>
                </div>
            </div>
        </>
    )
}

export default BannerHeader;