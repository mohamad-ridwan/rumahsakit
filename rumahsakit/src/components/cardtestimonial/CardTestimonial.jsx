import React from 'react'
import './CardTestimonial.scss'

function CardTestimonial({ background, imgProfil, paragraph, name, label }) {

    function RenderHTML(props) {
        return (
            <p className="paragraph-konten-card-testimonial" dangerouslySetInnerHTML={{ __html: props.data }}>
            </p>
        )
    }

    return (
        <>
            <div className="wrapp-card-testimonial">
                <div className="konten-card-testimonial" style={{
                    backgroundImage: `url(${background})`
                }}>
                    <div className="column-deskripsi-konten">
                        <i class="fas fa-quote-left"></i>

                        <RenderHTML
                            data={paragraph}
                        />
                    </div>

                    <img src={imgProfil} alt="" className="img-profil-card-testimonial" />
                </div>

                <p className="name-profil-card-testimonial">
                    {name}
                </p>

                <label htmlFor="label" className="title-profil-card-testimonial">
                    {label}
                    <div className="border-label">

                    </div>
                </label>
            </div>
        </>
    )
}

export default CardTestimonial;