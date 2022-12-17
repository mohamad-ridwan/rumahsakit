import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './BlogArticle.scss'
import API from '../../services/api';
import url from '../../services/api/url';
import Endpoint from '../../services/api/endpoint';
import { PathContext } from '../../services/context/path/Path';
import BannerHeader from '../../components/bannerheader/BannerHeader';
import Headers from '../../components/headers/Headers';
import Loading from '../../components/loading/Loading';
import HelmetCard from '../../components/helmetcard/HelmetCard';
import Card from '../../components/card/Card';

class BlogArticle extends Component {

    static contextType = PathContext

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataBlog: {},
            header: {},
            allDataArticle: [],
            currentPage: 1,
            perPage: 3,
            pathLocal: ''
        }
    }

    location = this.props.match.path.split('/')[1]

    setAllAPI() {
        this.idParams = this.state.pathLocal.length === 0 ? this.props.match.params.id : this.state.pathLocal

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
                const getPath = res.data.filter((e) => e.path === this.idParams)
                const getAllDataArticle = res.data.filter((e) => e.path !== this.idParams)
                this.setState({
                    dataBlog: getPath[0],
                    loading: false,
                    allDataArticle: getAllDataArticle
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
        window.scrollTo(0, 0)
        this.setAllAPI();
        this.activeNavbar();
    }

    componentDidUpdate() {
        window.scrollTo(0, 0)
    }

    toPageArticles(path) {
        this.props.history.push(path)

        if (path.includes('read')) {
            const getIdPath = path.split('/articles/read/')
            this.setState({ pathLocal: getIdPath[1] })

            setTimeout(() => {
                this.setAllAPI();
            }, 0);
        }
    }

    render() {

        const updateParams = this.context[2]

        const RenderHTML = (props) => (<p className="deskripsi-blog-article" dangerouslySetInnerHTML={{ __html: props.HTML }}></p>)

        const RenderHTML2 = (props) => (<p className="konten-blog-article" dangerouslySetInnerHTML={{ __html: props.HTML }}></p>)

        const indexOfLastPage = this.state.currentPage * this.state.perPage
        const indexOfFirstPage = indexOfLastPage - this.state.perPage
        const currentList = this.state.allDataArticle.slice(indexOfFirstPage, indexOfLastPage)

        const widthBody = document.body.getBoundingClientRect().width
        const minimizeValue = Math.floor(widthBody)

        const heightImgCard1024 = minimizeValue > 766 && minimizeValue < 1024 ? '114px' : '150px'

        const heightImgCard = minimizeValue < 769 ? 'auto' : heightImgCard1024

        return (
            <>
                <HelmetCard
                    title={Object.keys(this.state.dataBlog).length > 0 ? this.state.dataBlog.title + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                    content={this.state.dataBlog && this.state.dataBlog.deskripsi ? this.state.dataBlog.deskripsi.slice(0, 200) + '...' : this.state.dataBlog.deskripsi}
                    linkCanonical={`${url}articles/read/${this.state.dataBlog.path}`}
                />

                <BannerHeader
                    img={Object.keys(this.state.header).length > 0 ? `${Endpoint}/images/${this.state.header.img}` : ''}
                    title={Object.keys(this.state.header).length > 0 ? `${this.state.header.titleBanner}` : ''}
                />

                <div className="wrapp-blog-article">
                    <Headers
                        header1="Home"
                        arrow=">"
                        arrow2=">"
                        header2={Object.keys(this.state.header).length > 0 ? `${this.state.header.namePage}` : ''}
                        cursor1="pointer"
                        cursor2="pointer"
                        header3={this.state.dataBlog && this.state.dataBlog.title}
                        colorHeader3="#7e7e7e"
                        click1={() => {
                            this.props.history.push('/')
                            updateParams('/')
                        }}
                        click2={() => this.toPageArticles('/articles')}
                    />

                    <div className="container-blog-article">
                        <div className="column-main-blog-article">
                            <div className="column-deskripsi-main-blog-article">
                                <p className="title-blog-article">
                                    {this.state.dataBlog && this.state.dataBlog.title}
                                </p>

                                <p className="date-blog-article">
                                    <i className="far fa-calendar-alt"></i> {this.state.dataBlog && this.state.dataBlog.date}
                                </p>

                                <RenderHTML HTML={this.state.dataBlog && this.state.dataBlog.deskripsi} />
                            </div>

                            {this.state.dataBlog && this.state.dataBlog.image ? (
                                <>
                                    <img src={`${Endpoint}/images/${this.state.dataBlog.image}`} width="525" height="270" alt="image main blog articles" className="img-konten-column-main" loading='lazy'/>
                                </>
                            ) : (
                                <div></div>
                            )}
                        </div>

                        <div className="container-content-blog-article">
                            {this.state.dataBlog && this.state.dataBlog.konten ? (
                                <>
                                    <RenderHTML2 HTML={this.state.dataBlog.konten} />
                                </>
                            ) : (
                                <div></div>
                            )}
                        </div>

                        <div className="container-card-blog-article">
                            {currentList && currentList.length > 0 ? currentList.map((e) => {
                                return (
                                    <>
                                        <div className="column-card-blog-article">
                                            <Card
                                                key={e._id}
                                                widthCard="100%"
                                                nameBtnReadMore="Read More"
                                                img={`${Endpoint}/images/${e.image}`}
                                                displayBtnDownload="none"
                                                linkDownloadPdf={`${url}articles/read/${e.path}`}
                                                altImg={e.title}
                                                title={e.title}
                                                date={e.date}
                                                deskripsi={e.deskripsi}
                                                heightImg={heightImgCard}
                                                clickToPage={() => this.toPageArticles(`/articles/read/${e.path}`)}
                                            />
                                        </div>
                                    </>
                                )
                            }) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>

                <Loading
                    displayWrapp={this.state.loading ? 'flex' : 'none'}
                />
            </>
        )
    }
}

export default withRouter(BlogArticle);
