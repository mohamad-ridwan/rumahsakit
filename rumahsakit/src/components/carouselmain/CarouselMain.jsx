import React from 'react'
import './CarouselMain.scss'
import img from '../../images/bgcarousel.png'

function CarouselMain() {
    return (
        <>
            <div className="wrapp-carousel-main">
                <img src={img} alt="" className="img-carousel-main" />
            </div>
        </>
    )
}

export default CarouselMain