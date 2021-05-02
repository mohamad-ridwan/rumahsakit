import React, { Component } from 'react'
import BannerHeader from '../../components/bannerheader/BannerHeader'
import './Article.scss'
import bgHeader from '../../images/bgheader.png'
import Headers from '../../components/headers/Headers'
import imgCard from '../../images/healtarticles1.png'
import Card from '../../components/card/Card'
import ButtonCard from '../../components/buttoncard/ButtonCard'
import { withRouter } from 'react-router-dom'
import { PathContext } from '../../services/context/path/Path'
import API from '../../services/api'
import Endpoint from '../../services/api/endpoint'
import Loading from '../../components/loading/Loading'
import HelmetCard from '../../components/helmetcard/HelmetCard'

class Article extends Component {

    static contextType = PathContext

    constructor(props) {
        super(props)
        this.state = {
            totalIndexData: 0,
            totalData: 6,
            loading: false,
            dataArticle: []
        }
    }

    setAllAPI() {
        this.setState({
            loading: true
        })
        API.APIGetHealthArticle()
            .then(res => {
                let newData = []
                if (res.data.length > 0) {
                    for (let i = 0; i < this.state.totalData; i++) {
                        newData.push(res.data[i])
                    }
                }
                this.setState({
                    dataArticle: newData,
                    loading: false,
                    totalIndexData: res.data.length
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.setAllAPI();
        window.scrollTo(0, 0)
    }

    goToPage(path) {
        this.props.history.push(`/articles/read/${path}`)
    }

    render() {

        const updateParams = this.context[2]

        return (
            <>
                <HelmetCard
                    title={`Article - Rumah Sakit Permata`}
                />
                <BannerHeader
                    img={bgHeader}
                    title={'ARTICLE'}
                />
                <div className="wrapp-article">
                    <Headers
                        header1={'Home'}
                        arrow={'>'}
                        header2={'Article'}
                        cursor1={'pointer'}
                        colorHeader2={'#999'}
                        click1={() => {
                            this.props.history.push('/')
                            updateParams('/')
                        }}
                    />

                    <div className="container-card-page-article">
                        {this.state.dataArticle && this.state.dataArticle.length > 0 ? this.state.dataArticle.map((e, i) => {

                            const removeTagHTML = e.deskripsi.includes('<br/>') ? e.deskripsi.split('<br/>').join(' ') : e.deskripsi

                            return (
                                <Card
                                    key={e._id}
                                    widthCard={'calc(90%/2'}
                                    heightImg="213px"
                                    heightCardImg="213"
                                    widthCardImg="425"
                                    paddingCard={'0'}
                                    marginCard={'0 0 40px 0'}
                                    img={`${Endpoint}/images/${e.image}`}
                                    title={e.title}
                                    date={e.date}
                                    deskripsi={removeTagHTML}
                                    clickToPage={() => this.goToPage(e.path)}
                                />
                            )
                        }) : (
                            <div></div>
                        )}
                    </div>

                    <div className="container-btn-load-more-article">
                        <ButtonCard
                            title={this.state.totalIndexData === this.state.totalData ? 'LESS' : 'LOAD MORE'}
                            nameClassBtn={'btn-card-two'}
                            clickBtn={() => {
                                if (this.state.totalIndexData > 6 && this.state.totalIndexData !== this.state.totalData) {
                                    this.setState({
                                        totalData: this.state.totalData + (this.state.totalIndexData - this.state.totalData)
                                    })
                                    setTimeout(() => {
                                        this.setAllAPI();
                                    }, 0);
                                } else if (this.state.totalIndexData === this.state.totalData) {
                                    this.setState({
                                        totalData: this.state.totalData - 6
                                    })
                                    setTimeout(() => {
                                        this.setAllAPI();
                                    }, 0);
                                }
                            }}
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