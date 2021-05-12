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
    const [indexData, setIndexData] = useState(3)
    const [totalData, setTotalData] = useState(0)

    const history = useHistory();

    const location = window.location.pathname.toString().split('/')[1]

    function setAllAPI() {
        setLoading(true)
        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path === location)
                setDataHeader(getData[0])
            })

        getTestimonial(3);
    }

    function getTestimonial(index) {
        setLoading(true)

        let totalIndex = index

        setTimeout(() => {
            API.APIGetTestimonial()
                .then(res => {
                    setLoading(false)
                    const respons = res.data
                    setTotalData(respons.length)

                    let newData = []
                    if (respons.length > 0) {
                        for (let i = 0; i < totalIndex; i++) {
                            newData.push(respons[i])
                        }

                        setTimeout(() => {
                            setDataTestimonial(newData)
                        }, 0);
                    }
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                })
        }, 0);
    }

    useEffect(() => {
        setAllAPI();
        activeNavbar();
    }, [])

    function toPageHome() {
        history.push('/')
        updateParams('/')
    }

    function loadMore() {
        let changeIndex = 3

        if (indexData < totalData) {
            setIndexData(indexData + 3)
            changeIndex = changeIndex + 3

            setTimeout(() => {
                if (totalData >= changeIndex) {
                    getTestimonial(changeIndex);
                }
            }, 0);
        } else {
            setIndexData(indexData - 3)

            setTimeout(() => {
                getTestimonial(indexData - 3);
            }, 0);

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
                    {dataTestimonial && dataTestimonial.length > 0 ?
                        dataTestimonial.map((e) => {
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
                            title={indexData < totalData ? 'LOAD MORE' : 'LESS'}
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