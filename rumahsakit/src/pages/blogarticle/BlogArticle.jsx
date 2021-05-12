import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './BlogArticle.scss'
import bgHeader from '../../images/bgheader.png'
import BannerHeader from '../../components/bannerheader/BannerHeader';
import Headers from '../../components/headers/Headers';
import { PathContext } from '../../services/context/path/Path';
import API from '../../services/api';
import Loading from '../../components/loading/Loading';
import Endpoint from '../../services/api/endpoint';
import HelmetCard from '../../components/helmetcard/HelmetCard';
import Card from '../../components/card/Card';

class BlogArticle extends Component {

    static contextType = PathContext

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataBlog: {},
            allDataArticle: [],
            currentPage: 1,
            perPage: 3
        }
    }

    setAllAPI() {
        this.idParams = this.props.match.params.id

        this.setState({
            loading: true
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
            window.location.reload();
        }
    }

    render() {

        const updateParams = this.context[2]

        const RenderHTML = (props) => (<p className={'deskripsi-blog-article'} dangerouslySetInnerHTML={{ __html: props.HTML }}></p>)

        const RenderHTML2 = (props) => (<p className="konten-blog-article" dangerouslySetInnerHTML={{ __html: props.HTML }}></p>)

        const indexOfLastPage = this.state.currentPage * this.state.perPage
        const indexOfFirstPage = indexOfLastPage - this.state.perPage
        const currentList = this.state.allDataArticle.slice(indexOfFirstPage, indexOfLastPage)

        return (
            <>
                <HelmetCard
                    title={Object.keys(this.state.dataBlog).length > 0 ? this.state.dataBlog.title + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                    content={this.state.dataBlog && this.state.dataBlog.deskripsi}
                />

                <BannerHeader
                    img={bgHeader}
                    title="ARTICLE"
                />

                <div className="wrapp-blog-article">
                    <Headers
                        header1="Home"
                        arrow=">"
                        arrow2=">"
                        header2="Article"
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
                                <img src={`${Endpoint}/images/${this.state.dataBlog.image}`} width="525" height="270" alt="image main blog articles" className="img-konten-column-main" />
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
                                    <Card
                                        key={e._id}
                                        widthCard="calc(100%/3)"
                                        img={`${Endpoint}/images/${e.image}`}
                                        title={e.title}
                                        date={e.date}
                                        deskripsi={e.deskripsi}
                                        heightImg="150px"
                                        clickToPage={() => this.toPageArticles(`/articles/read/${e.path}`)}
                                    />
                                </>
                            )
                        }) : (
                            <div></div>
                        )}
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
