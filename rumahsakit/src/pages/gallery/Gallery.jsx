import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './Gallery.scss'
import API from '../../services/api'
import { PathContext } from '../../services/context/path/Path'
import HelmetCard from '../../components/helmetcard/HelmetCard'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Endpoint from '../../services/api/endpoint'
import Headers from '../../components/headers/Headers'
import Loading from '../../components/loading/Loading'
import ButtonCard from '../../components/buttoncard/ButtonCard'

function Gallery() {

    const [paramsGlobal, setParamsGlobal, updateParams, activeNavbar, indexActive, setIndexActive] = useContext(PathContext)
    const [dataHeader, setDataHeader] = useState({})
    const [totalGallery, setTotalGallery] = useState(0)
    const [totalLoadMore, setTotalLoadMore] = useState(0)
    const [loading, setLoading] = useState(false)
    const [perPage, setPerpage] = useState(2)
    const [column1, setColumn1] = useState([])
    const [column2, setColumn2] = useState([])
    const [column3, setColumn3] = useState([])

    const location = window.location.pathname.toString().split('/')[1]

    const history = useHistory()

    function setAllAPI() {
        setLoading(true)

        API.APIGetHeader()
            .then(res => {
                const getData = res.data.filter((e) => e.path === location)
                setDataHeader(getData[0])
            })

        API.APIGetGallery()
            .then(res => {
                const respons = res.data
                const getCollectionGallery = respons.filter((e) => e.id === 'collection-image')
                setLoading(false)

                setColumn1(getCollectionGallery[0].column1)
                setColumn2(getCollectionGallery[0].column2)
                setColumn3(getCollectionGallery[0].column3)
                setTotalGallery(getCollectionGallery[0].column1.length + getCollectionGallery[0].column2.length + getCollectionGallery[0].column3.length)
                getTotalLoadMore(2, 2, 2)
            })
    }

    useEffect(() => {
        setAllAPI();
        activeNavbar();
        setIndexActive();
    }, [])

    function getTotalLoadMore(totalColumn1, totalColumn2, totalColumn3) {
        setTotalLoadMore(totalColumn1 + totalColumn2 + totalColumn3)
    }

    // gallery column1
    const indexOfLastPageColumn1 = 1 * perPage;
    const indexOfFirstPageColumn1 = indexOfLastPageColumn1 - perPage;
    const currentListColumn1 = column1.slice(indexOfFirstPageColumn1, indexOfLastPageColumn1)

    // gallery column2
    const indexOfLastPageColumn2 = 1 * perPage;
    const indexOfFirstPageColumn2 = indexOfLastPageColumn2 - perPage;
    const currentListColumn2 = column2.slice(indexOfFirstPageColumn2, indexOfLastPageColumn2)

    // gallery column3
    const indexOfLastPageColumn3 = 1 * perPage;
    const indexOfFirstPageColumn3 = indexOfLastPageColumn3 - perPage;
    const currentListColumn3 = column3.slice(indexOfFirstPageColumn3, indexOfLastPageColumn3)

    function toPage(path) {
        history.push(path)
        updateParams(path)
    }

    function loadMore() {
        if (totalLoadMore < totalGallery) {
            setPerpage(perPage + 2)
            getTotalLoadMore(perPage + 2, perPage + 2, perPage + 2)
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

            <div className="wrapp-gallery">
                <Headers
                    header1="Home"
                    arrow=">"
                    header2={dataHeader && dataHeader.namePage}
                    cursor1="pointer"
                    colorHeader2="#7e7e7e"
                    click1={() => toPage('/')}
                />

                <div className="konten-gallery">
                    <div className="box-img-gallery">
                        {currentListColumn1 && currentListColumn1.length > 0 ? currentListColumn1.map((e) => {
                            return (
                                <>
                                    <a href={`${Endpoint}/images/${e.image1}`} target="_blank" className="btn-view-img">
                                        <img key={e._id} src={`${Endpoint}/images/${e.image1}`} alt="" className="img-konten-gallery" />
                                    </a>
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </div>

                    <div className="box-img-gallery">
                        {currentListColumn2 && currentListColumn2.length > 0 ? currentListColumn2.map((e) => {
                            return (
                                <>
                                    <a href={`${Endpoint}/images/${e.image2}`} target="_blank" className="btn-view-img">
                                        <img key={e._id} src={`${Endpoint}/images/${e.image2}`} alt="" className="img-konten-gallery" />
                                    </a>
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </div>

                    <div className="box-img-gallery">
                        {currentListColumn3 && currentListColumn3.length > 0 ? currentListColumn3.map((e) => {
                            return (
                                <>
                                    <a href={`${Endpoint}/images/${e.image3}`} target="_blank" className="btn-view-img">
                                        <img key={e._id} src={`${Endpoint}/images/${e.image3}`} alt="" className="img-konten-gallery" />
                                    </a>
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
                    </div>
                </div>

                <div className="column-btn-gallery">
                    <ButtonCard
                        displayBtn={totalLoadMore === totalGallery || totalLoadMore > totalGallery ? 'none' : 'flex'}
                        nameClassBtn="btn-card-two"
                        title={"LOAD MORE"}
                        clickBtn={loadMore}
                    />
                </div>
            </div>

            <Loading
                displayWrapp={loading ? 'flex' : 'none'}
            />
        </>
    )
}

export default Gallery;