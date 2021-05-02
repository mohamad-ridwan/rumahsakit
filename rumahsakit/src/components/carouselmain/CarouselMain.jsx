import React from 'react'
import './CarouselMain.scss'
import img from '../../images/bgcarousel.png'
import Endpoint from '../../services/api/endpoint'

function CarouselMain({ data, mouseEnter, mouseLeave, displayBtn, clickBtnLeft, clickBtnRight, fontSizeBtnArrow, leftBtnArrow, rightBtnArrow, displaykontenTestimony, dataTestimoni, iconQuotes }) {

    function RenderHTML(props) {
        return (
            <p className="deskripsi-konten-carousel-main" dangerouslySetInnerHTML={{ __html: props.konten }}></p>
        )
    }

    return (
        <>
            <div className="wrapp-carousel-main"
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
            >
                {data && data.length > 0 ?
                    data.map((e, i) => {
                        return (
                            <img key={e._id} name={i} src={`${Endpoint}/images/${e.img}`} alt="" width="1519" height="608" className="img-carousel-main" />
                        )
                    }) : (
                        <div></div>
                    )}

                {dataTestimoni && dataTestimoni.length > 0 ?
                    dataTestimoni.map((e) => {
                        return (
                            <div className="container-konten-carousel-main" style={{
                                display: `${displaykontenTestimony}`
                            }}>
                                <img src={iconQuotes} alt="" className="img-icon-quotes-carousel" />

                                <RenderHTML konten={e.deskripsi} />

                                <div className="column-profil-konten-carousel-main">
                                    <img src={`${Endpoint}/images/${e.image}`} alt="" className="img-profil-carousel" />

                                    <div className="column-name-profil-carousel">
                                        <p className="name-profil-carousel">
                                            {e.name}
                                        </p>
                                        <label htmlFor="label" className="label-profil-carousel">
                                            {e.label}
                                        </label>
                                        <div className="border-label-carousel">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : (
                        <div></div>
                    )}

                <button className="btn-left-carousel-main btn-carousel-main-group" style={{
                    display: `${displayBtn}`,
                    left: `${leftBtnArrow}`
                }}
                    onClick={clickBtnLeft}
                >
                    <i className="fas fa-chevron-left" style={{
                        fontSize: `${fontSizeBtnArrow}`
                    }}></i>
                </button>

                <button className="btn-right-carousel-main btn-carousel-main-group" style={{
                    display: `${displayBtn}`,
                    right: `${rightBtnArrow}`
                }}
                    onClick={clickBtnRight}
                >
                    <i className="fas fa-chevron-right" style={{
                        fontSize: `${fontSizeBtnArrow}`
                    }}></i>
                </button>
            </div>
        </>
    )
}

export default CarouselMain