import React, { Component } from 'react'
import './BlogArticle.scss'
import bgHeader from '../../images/bgheader.png'
import BannerHeader from '../../components/bannerheader/BannerHeader';
import Headers from '../../components/headers/Headers';
import { withRouter } from 'react-router-dom'
import healtharticle2 from '../../images/healtharticles2.png'
import healtharticle3 from '../../images/healtharticles3.png'
import healtharticle4 from '../../images/healtharticles4.png'
import healtharticle5 from '../../images/healtharticles5.png'
import { PathContext } from '../../services/context/path/Path';
import API from '../../services/api';
import Loading from '../../components/loading/Loading';
import Endpoint from '../../services/api/endpoint';
import HelmetCard from '../../components/helmetcard/HelmetCard';

class BlogArticle extends Component {

    static contextType = PathContext

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataBlog: {}
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
                this.setState({
                    dataBlog: getPath[0],
                    loading: false
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.setAllAPI();
    }

    componentDidUpdate() {
        window.scrollTo(0, 0)
    }

    render() {

        const updateParams = this.context[2]

        const RenderHTML = (props) => (<p className={'deskripsi-blog-article'} dangerouslySetInnerHTML={{ __html: props.HTML }}></p>)

        const RenderHTML2 = (props) => (<p className="konten-blog-article" dangerouslySetInnerHTML={{ __html: props.HTML }}></p>)

        return (
            <>
                <HelmetCard
                    title={this.state.dataBlog && this.state.dataBlog.title ? this.state.dataBlog.title + ' ' + '-' + ' ' + 'Rumah Sakit Permata' : ''}
                    content={this.state.dataBlog && this.state.dataBlog.deskripsi}
                />
                <BannerHeader
                    img={bgHeader}
                    title={'ARTICLE'}
                />
                <div className="wrapp-blog-article">
                    <Headers
                        header1={'Home'}
                        arrow={'>'}
                        arrow2={'>'}
                        header2={'Article'}
                        cursor1={'pointer'}
                        cursor2={'pointer'}
                        header3={this.state.dataBlog && this.state.dataBlog.title}
                        colorHeader3={'#7e7e7e'}
                        click1={() => {
                            this.props.history.push('/')
                            updateParams('/')
                        }}
                        click2={() => this.props.history.push('/articles')}
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
                            <img src={`${Endpoint}/images/${this.state.dataBlog.image}`} width={'525'} height={'270'} alt="" className="img-konten-column-main" />
                        ) : (
                            <div></div>
                        )}
                    </div>

                    <div className="container-content-blog-article">
                        {this.state.dataBlog && this.state.dataBlog.konten ? (
                            <RenderHTML2 HTML={this.state.dataBlog.konten} />
                        ) : (
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
