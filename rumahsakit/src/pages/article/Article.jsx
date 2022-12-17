import React, { Component, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './Article.scss'
import API from '../../services/api'
import url from '../../services/api/url'
import Endpoint from '../../services/api/endpoint'
import { PathContext } from '../../services/context/path/Path'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import Headers from '../../components/headers/Headers'
import Card from '../../components/card/Card'
import ButtonCard from '../../components/buttoncard/ButtonCard'
import Loading from '../../components/loading/Loading'
import HelmetCard from '../../components/helmetcard/HelmetCard'

class Article extends Component {

    static contextType = PathContext

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            header: {},
            perPage: 6,
            currentPage: 1,
            dataArticle: [],
        }

        this.loadMore = this.loadMore.bind(this)
    }

    location = this.props.match.path.split('/')[1]

    setAllAPI() {
        this.setState({
            loading: true
        })

        API.APIGetHeader()
            .then(res => {
                const getPath = res.data.filter((e) => e.path === this.location)
                this.setState({
                    header: getPath[0]
                })
            })

        API.APIGetHealthArticle()
            .then(res => {
                this.setState({
                    dataArticle: res.data,
                    loading: false,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    activeNavbar() {
        const getActiveNavbar = this.context[3]
        const setIndexActive = this.context[5]

        getActiveNavbar();
        setIndexActive();
    }

    componentDidMount() {
        this.setAllAPI();
        window.scrollTo(0, 0)
        this.activeNavbar();
    }

    goToPage(path) {
        this.props.history.push(`/articles/read/${path}`)
    }

    loadMore() {
        if (this.state.perPage < this.state.dataArticle.length) {
            this.setState({
                perPage: this.state.perPage + 6
            })
        }
    }

    render() {

        const updateParams = this.context[2]

        const indexOfLastPage = this.state.currentPage * this.state.perPage;
        const indexOfFirstPage = this.indexOfLastPage - this.state.perPage;
        const currentList = this.state.dataArticle.slice(indexOfFirstPage, indexOfLastPage)

        const displayBtn = this.state.perPage === this.state.dataArticle.length || this.state.perPage > this.state.dataArticle.length ? 'none' : 'flex'

        const widthBody = document.body.getBoundingClientRect().width
        const minimizeValue = Math.floor(widthBody)

        const heightCardImg1024 = minimizeValue > 766 && minimizeValue < 1024 ? 'auto' : '213px'
        const widthCardImg1024 = minimizeValue > 766 && minimizeValue < 1024 ? 'auto' : '425'

        const heightCardImg = minimizeValue < 767 ? 'auto' : heightCardImg1024
        const widthCardImg = minimizeValue < 767 ? 'auto' : widthCardImg1024

        return (
            <>
                <HelmetCard
                    title={Object.keys(this.state.header).length > 0 ? `${this.state.header.namePage} - Rumah Sakit Permata` : 'Rumah Sakit Permata'}
                    content="seputar artikel kesehatan dari rumah sakit permata depok - rumah sakit permata keluarga husada grup"
                    linkCanonical={`${url}articles`}
                />

                <BannerHeader
                    img={Object.keys(this.state.header).length > 0 ? `${Endpoint}/images/${this.state.header.img}` : ''}
                    title={Object.keys(this.state.header).length > 0 ? `${this.state.header.titleBanner}` : ''}
                />

                <div className="wrapp-article">
                    <Headers
                        header1="Home"
                        arrow=">"
                        header2={Object.keys(this.state.header).length > 0 ? `${this.state.header.namePage}` : ''}
                        cursor1="pointer"
                        colorHeader2="#999"
                        click1={() => {
                            this.props.history.push('/')
                            updateParams('/')
                        }}
                    />

                    <div className="wrapp-card-page-article">
                        <div className="container-card-page-article">
                            {currentList && currentList.length > 0 ? currentList.map((e) => {

                                const removeTagHTML = e.deskripsi.includes('<br/>') ? e.deskripsi.split('<br/>').join(' ') : e.deskripsi

                                return (
                                    <>
                                        <div className="column-card-page-article">
                                            <Card
                                                key={e._id}
                                                widthCard="100%"
                                                heightImg={heightCardImg}
                                                heightCardImg="213"
                                                lazyLoadingImg="lazy"
                                                widthCardImg={widthCardImg}
                                                paddingCard="0"
                                                marginCard="0 0 40px 0"
                                                nameBtnReadMore="Read More"
                                                img={`${Endpoint}/images/${e.image}`}
                                                title={e.title}
                                                date={e.date}
                                                deskripsi={removeTagHTML}
                                                displayBtnDownload="none"
                                                altImg={e.title}
                                                linkDownloadPdf={`${url}${e.path}`}
                                                clickToPage={() => this.goToPage(e.path)}
                                            />
                                        </div>
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                        </div>
                    </div>

                    <div className="container-btn-load-more-article">
                        <ButtonCard
                            displayBtn={displayBtn}
                            title="LOAD MORE"
                            nameClassBtn="btn-card-two"
                            clickBtn={this.loadMore}
                        />
                    </div>
                </div>

                <Loading
                    displayWrapp={this.state.loading ? 'flex' : 'none'}
                />
            </>
        )
    }
}

export default withRouter(Article);