import React from 'react'
import './Card.scss'

function Card({ img, title, date, deskripsi, widthCard, paddingCard, marginCard, heightImg, clickToPage, widthCardImg, heightCardImg }) {

    const RenderHTML = (props) => (
        <span dangerouslySetInnerHTML={{ __html: props.deskripsi }}></span>
    )

    return (
        <>
            <div className="wrapp-card" style={{
                width: `${widthCard}`,
                padding: `${paddingCard}`,
                margin: `${marginCard}`
            }}>
                <img src={img} width={widthCardImg} height={heightCardImg} className="img-card" style={{
                    height: `${heightImg}`
                }}
                    onClick={clickToPage}
                />

                <div className="container-konten-card">
                    <p className="title-konten"
                        onClick={clickToPage}
                    >
                        {title}
                    </p>
                    <p className="date-konten">
                        <i className="far fa-calendar-alt"></i> {date}
                    </p>
                    <p className="deskripsi-konten">
                        <RenderHTML deskripsi={deskripsi} />
                    </p>

                    <button className="btn-read-more"
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