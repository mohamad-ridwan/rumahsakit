import React, { useContext, useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
import './CarouselMain.scss'
import Endpoint from '../../services/api/endpoint'
import Card from '../card/Card';
import { PathContext } from '../../services/context/path/Path';

function CarouselMain({ data, mouseEnter, mouseLeave, dataTestimoni, iconQuotes, displayCarouselImg, displayCarouselTestimony, displayCarouselListDoctor, dataListDoctor }) {

    var [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive, searchResult, setSearchResult, searchValue, setSearchValue, autoplayCarousel, playInterval, setPlayInterval] = useContext(PathContext)

    const history = useHistory()
    const ref = useRef();
    const ref2 = useRef();
    const ref3 = useRef();

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
    };

    const primaryOptionsTestimony = {
        autoplay: true,
        type: 'fade',
        width: '100%',
        rewind: true,
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

    const marginCardListDoctor = document.body.getBoundingClientRect().width < 769 ? '0 0 0 0' : '0 0 0 45px'

    const marginImgCardListDoctor = document.body.getBoundingClientRect().width < 769 ? '0 0 10px 0' : '0 10px 0 0'

    const flexDirectionCardListDoctor = document.body.getBoundingClientRect().width < 769 ? 'column' : 'row'

    const alignItemsCardListDoctor = document.body.getBoundingClientRect().width < 769 ? 'center' : 'start'

    function toPageDetailDoctor(e) {
        history.push(`/doctor/${e.path}`)
        updateParams(`/doctor/${e.path}`)
        setPlayInterval(true)
    }

    function getRef() {
        autoplayCarousel.current = window.setInterval(getSplide, 5000)
    }

    function getSplide() {
        ref.current.splide.go('>')
        ref2.current.splide.go('>')
        ref3.current.splide.go('>')
    }

    useEffect(() => {
        setTimeout(() => {
            getRef();
        }, 0);
    }, []);

    return (
        <>
            <div className="wrapp-carousel-main"
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
            >
                <div className="container-carousel-img" style={styleCarouselImg}>
                    <Splide options={primaryOptionsImg} ref={ref}>
                        {data && data.length > 0 ?
                            data.map((e, i) => {
                                return (
                                    <>
                                        <SplideSlide key={e._id}>
                                            <img key={e._id} name={i} src={`${Endpoint}/images/${e.img || e.image}`} alt="banner home" width="1519" height="608" className="img-carousel-main" />
                                        </SplideSlide>
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                    </Splide>
                </div>

                <div className="wrapp-carousel-testimony" style={styleCarouselTestimony}>
                    <Splide options={primaryOptionsTestimony} ref={ref2}>
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
                    <Splide options={primaryOptionsListDoctor} ref={ref3}>
                        {dataListDoctor && dataListDoctor.length > 0 ? dataListDoctor.map((e) => {
                            return (
                                <>
                                    <SplideSlide>
                                        <Card
                                            key={e._id}
                                            widthCard="100%"
                                            displayReadMore="none"
                                            flexDirection={flexDirectionCardListDoctor}
                                            alignItemsWrapp={alignItemsCardListDoctor}
                                            textAlignTitleContent={alignItemsCardListDoctor}
                                            textAlignDatekonten={alignItemsCardListDoctor}
                                            justifyContentDateKonten={alignItemsCardListDoctor}
                                            justifyContentTitleContent={alignItemsCardListDoctor}
                                            displayIcon="none"
                                            heightImg="80px"
                                            heightCardImg="213"
                                            widthCardImg="80"
                                            radiusImg="0"
                                            paddingCard="0"
                                            fontFamilyTitle="Mulish, sans-serif"
                                            fontTitle="16px"
                                            marginImg={marginImgCardListDoctor}
                                            marginCard={marginCardListDoctor}
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