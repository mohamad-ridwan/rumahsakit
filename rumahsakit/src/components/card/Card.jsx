import React from 'react'
import './Card.scss'

function Card({ img, title, date, deskripsi, widthCard, paddingCard, marginCard, heightImg, clickToPage, widthCardImg, heightCardImg, displayReadMore, displayIcon, flexDirection, marginImg, fontTitle, fontFamilyTitle, radiusImg, displayBtnDownload, iconPdf, linkDownloadPdf, displayImg, fontStyle, nameBtnReadMore, alignItemsWrapp, textAlignTitleContent, textAlignDatekonten, justifyContentDateKonten, justifyContentTitleContent, lazyLoadingImg }) {

    const RenderHTML = (props) => (
        <span className="render-deskripsi-card" dangerouslySetInnerHTML={{ __html: props.deskripsi }}></span>
    )

    return (
        <>
            <div className="wrapp-card" style={{
                width: `${widthCard}`,
                padding: `${paddingCard}`,
                margin: `${marginCard}`,
                flexDirection: `${flexDirection}`,
                alignItems: alignItemsWrapp
            }}>
                <img src={img} width={widthCardImg} height={heightCardImg} loading={lazyLoadingImg} className="img-card" style={{
                    height: `${heightImg}`,
                    margin: `${marginImg}`,
                    borderRadius: `${radiusImg}`,
                    display: `${displayImg}`
                }}
                    onClick={clickToPage}
                />

                <div className="container-konten-card">
                    <p className="title-konten" style={{
                        fontSize: `${fontTitle}`,
                        fontFamily: `${fontFamilyTitle}`,
                        fontStyle: `${fontStyle}`,
                        textAlign: textAlignTitleContent,
                        justifyContent: justifyContentTitleContent
                    }}
                        onClick={clickToPage}
                    >
                        {title}
                    </p>
                    <p className="date-konten" style={{
                        textAlign: textAlignDatekonten,
                        justifyContent: justifyContentDateKonten
                    }}>
                        <i className="far fa-calendar-alt" style={{
                            display: `${displayIcon}`
                        }}></i> {date}
                    </p>
                    <p className="deskripsi-konten">
                        <RenderHTML deskripsi={deskripsi} />
                    </p>

                    <a href={linkDownloadPdf} target="_blank" className="download-pdf" style={{
                        display: `${displayBtnDownload}`
                    }}
                    >
                        <img src={iconPdf} alt="" className="icon-pdf" />
                        View
                    </a>

                    <button className="btn-read-more" style={{
                        display: `${displayReadMore}`
                    }}
                        onClick={clickToPage}
                    >
                        {nameBtnReadMore}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Card;