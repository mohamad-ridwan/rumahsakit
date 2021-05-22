import React, { useContext, useEffect, useState } from 'react'
import HelmetCard from '../../components/helmetcard/HelmetCard';
import { useHistory, useParams } from 'react-router';
import { withRouter } from 'react-router-dom'
import './Testimonial.scss'
import BannerHeader from '../../components/bannerheader/BannerHeader';
import Headers from '../../components/headers/Headers';
import { PathContext } from '../../services/context/path/Path';
import API from '../../services/api';
import Endpoint from '../../services/api/endpoint';
import CardTestimonial from '../../components/cardtestimonial/CardTestimonial';
import Loading from '../../components/loading/Loading';
import ButtonCard from '../../components/buttoncard/ButtonCard';

function Testimonial() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar] = useContext(PathContext)
    const [dataHeader, setDataHeader] = useState({})
    const [dataTestimonial, setDataTestimonial] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(3)

    const history = useHistory();

    const location = window.location.pathname.toString().split('/')[1]

    function setAllAPI() {
        setLoading(true)
        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path === location)
                setDataHeader(getData[0])
            })

        API.APIGetTestimonial()
            .then(res => {
                setLoading(false)
                setDataTestimonial(res.data)
            })
    }

    useEffect(() => {
        setAllAPI();
        activeNavbar();
    }, [])

    const indexOfLastPage = currentPage * perPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const currentList = dataTestimonial.slice(indexOfFirstPage, indexOfLastPage)

    function toPageHome() {
        history.push('/')
        updateParams('/')
    }

    function loadMore() {
        if (perPage < dataTestimonial.length) {
            setPerPage(perPage + 3)
        }
    }

    return (
        <>
            <HelmetCard
                title={Object.keys(dataHeader).length > 0 ? dataHeader.namePage + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                content="Rumah sakit permata Depok - Testimoni para pasien loyal"
            />

            <BannerHeader
                img={Object.keys(dataHeader).length > 0 ? `${Endpoint}/images/${dataHeader.img}` : ''}
                title={dataHeader && dataHeader.titleBanner}
            />

            <div className="wrapp-testimonial">
                <Headers
                    header1="Home"
                    arrow=">"
                    header2={dataHeader && dataHeader.namePage}
                    cursor1="pointer"
                    colorHeader2="#7e7e7e"
                    click1={toPageHome}
                />

                <div className="konten-testimonial">
                    {currentList && currentList.length > 0 ?
                        currentList.map((e) => {
                            return (
                                <CardTestimonial
                                    key={e._id}
                                    background={`${Endpoint}/images/${e.background}`}
                                    imgProfil={`${Endpoint}/images/${e.image}`}
                                    label={e.label}
                                    paragraph={e.deskripsi}
                                    name={e.name}
                                />
                            )
                        }) : (
                            <div></div>
                        )}

                    <div className="column-bawah-konten-testimonial">
                        <ButtonCard
                            displayBtn={perPage === dataTestimonial.length || perPage > dataTestimonial.length ? 'none' : 'flex'}
                            title="LOAD MORE"
                            nameClassBtn="btn-card-two"
                            clickBtn={loadMore}
                        />
                    </div>
                </div>
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
            />
        </>
    )
}

export default withRouter(Testimonial);