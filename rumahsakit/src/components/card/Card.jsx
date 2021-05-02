import React from 'react'
import './Card.scss'

function Card({ img, title, date, deskripsi, widthCard, paddingCard, marginCard, heightImg, clickToPage, widthCardImg, heightCardImg, displayReadMore, displayIcon, flexDirection, marginImg, fontTitle, fontFamilyTitle, radiusImg }) {

    const RenderHTML = (props) => (
        <span dangerouslySetInnerHTML={{ __html: props.deskripsi }}></span>
    )

    return (
        <>
            <div className="wrapp-card" style={{
                width: `${widthCard}`,
                padding: `${paddingCard}`,
                margin: `${marginCard}`,
                flexDirection: `${flexDirection}`
            }}>
                <img src={img} width={widthCardImg} height={heightCardImg} className="img-card" style={{
                    height: `${heightImg}`,
                    margin: `${marginImg}`,
                    borderRadius: `${radiusImg}`
                }}
                    onClick={clickToPage}
                />

                <div className="container-konten-card">
                    <p className="title-konten" style={{
                        fontSize: `${fontTitle}`,
                        fontFamily: `${fontFamilyTitle}`
                    }}
                        onClick={clickToPage}
                    >
                        {title}
                    </p>
                    <p className="date-konten">
                        <i className="far fa-calendar-alt" style={{
                            display: `${displayIcon}`
                        }}></i> {date}
                    </p>
                    <p className="deskripsi-konten">
                        <RenderHTML deskripsi={deskripsi} />
                    </p>

                    <button className="btn-read-more" style={{
                        display: `${displayReadMore}`
                    }}
                        onClick={clickToPage}
                    >
                        Read more
                    </button>
                </div>
            </div>
        </>
    )
}

export default Card;