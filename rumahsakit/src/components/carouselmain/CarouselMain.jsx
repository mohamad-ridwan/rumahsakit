import React, { useContext } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
import { useHistory } from 'react-router';
import './CarouselMain.scss'
import Endpoint from '../../services/api/endpoint'
import Card from '../card/Card';
import { PathContext } from '../../services/context/path/Path';

function CarouselMain({ data, mouseEnter, mouseLeave, dataTestimoni, iconQuotes, displayCarouselImg, displayCarouselTestimony, displayCarouselListDoctor, dataListDoctor }) {

    const [paramsGlobal, setParamsGlobal, updateParams] = useContext(PathContext)

    const history = useHistory()

    function RenderHTML(props) {
        return (
            <p className="deskripsi-konten-carousel-main" dangerouslySetInnerHTML={{ __html: props.konten }}></p>
        )
    }

    const primaryOptionsImg = {
        autoplay: true,
        type: 'fade',
        rewind: true,
        width: '100%',
        perPage: 1,
        perMove: 1,
        gap: '1rem',
        pagination: false,
    };

    const primaryOptionsTestimony = {
        autoplay: true,
        type: 'fade',
        width: '100%',
        perPage: 1,
        perMove: 1,
        gap: '1rem',
        pagination: false,
    }

    const primaryOptionsListDoctor = {
        type: 'loop',
        width: '100%',
        perPage: 2,
        perMove: 1,
        gap: '1rem',
        pagination: false,
    }

    const styleCarouselImg = {
        display: displayCarouselImg
    }

    const styleCarouselTestimony = {
        display: displayCarouselTestimony
    }

    const styleCarouselListDoctor = {
        display: displayCarouselListDoctor
    }

    function toPageDetailDoctor(e) {
        history.push(`/doctor/${e.path}`)
        updateParams(`/doctor/${e.path}`)
    }

    return (
        <>
            <div className="wrapp-carousel-main"
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
            >
                <div className="container-carousel-img" style={styleCarouselImg}>
                    <Splide options={primaryOptionsImg}>
                        {data && data.length > 0 ?
                            data.map((e, i) => {
                                return (
                                    <>
                                        <SplideSlide>
                                            <img key={e._id} name={i} src={`${Endpoint}/images/${e.img}`} alt="banner home" width="1519" height="608" className="img-carousel-main" />
                                        </SplideSlide>
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                    </Splide>
                </div>

                <div className="wrapp-carousel-testimony" style={styleCarouselTestimony}>
                    <Splide options={primaryOptionsTestimony}>
                        {dataTestimoni && dataTestimoni.length > 0 ?
                            dataTestimoni.map((e) => {
                                return (
                                    <>
                                        <SplideSlide>
                                            <div className="container-konten-carousel-main">
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
                                        </SplideSlide>
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                    </Splide>
                </div>

                <div className="wrapp-carousel-list-doctor" style={styleCarouselListDoctor}>
                    <Splide options={primaryOptionsListDoctor}>
                        {dataListDoctor && dataListDoctor.length > 0 ? dataListDoctor.map((e) => {
                            return (
                                <>
                                    <SplideSlide>
                                        <Card
                                            key={e._id}
                                            widthCard="100%"
                                            displayReadMore="none"
                                            flexDirection="row"
                                            displayIcon="none"
                                            heightImg="80px"
                                            heightCardImg="213"
                                            widthCardImg="80"
                                            radiusImg="0"
                                            paddingCard="0"
                                            fontFamilyTitle="Mulish, sans-serif"
                                            fontTitle="16px"
                                            marginImg="0 10px 0 0"
                                            marginCard="0px 0px 0px 45px"
                                            img={`${Endpoint}/images/${e.image}`}
                                            title={e.name}
                                            date={e.speciality}
                                            clickToPage={() => toPageDetailDoctor(e)}
                                        />
                                    </SplideSlide>
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </Splide>
                </div>
            </div>
        </>
    )
}

export default CarouselMain