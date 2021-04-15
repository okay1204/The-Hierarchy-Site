import '../styles/membercatalog.css'
import axios from 'axios'

import React from 'react'

import LoadingWheel from '../images/loading wheel.gif'
import NotFound from '../images/notfound.png'

import MemberPreview from '../components/memberpreview'

import { Helmet } from 'react-helmet'

import InfiniteScroll from "react-infinite-scroll-component";

const sortByOptions = ['money', 'level']

class MemberCatalog extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            error: false,
            data: [],
            page: 1,
            hasMore: true,
            sortBy: null
        }

        this.fetchMoreMembers = this.fetchMoreMembers.bind(this)
    }

    setSortBy(sortBySelection) {
        const searchParams = new URLSearchParams(this.props.location.search)
        searchParams.set('sortBy', sortBySelection)
        this.props.history.push(window.location.pathname + "?" + searchParams.toString())
        
        this.setState({ sortBy: sortBySelection })
        return sortBySelection
    }

    setOption(sortOption) {

        const sortBy = this.setSortBy(sortOption)
 
        this.setState({ error: false, data: [], page: 1, hasMore: true })   
        
        this.fetchMoreMembers(sortBy)
    }

    fetchMoreMembers(sortByOverride=null) {

        const page = sortByOverride ? 1 : this.state.page
        const sortBy = sortByOverride ? sortByOverride : this.state.sortBy

        axios.get(`https://api.thehierarchy.me/members/top/${sortBy}?page=${page}`)
        .then((nextPage) => {

            nextPage = nextPage.data

            if (nextPage.length > 0) {

                if (sortBy === this.state.sortBy) {
                    this.setState({page: this.state.page + 1, data: this.state.data.concat(nextPage)})
                }
            } else {
                this.setState({hasMore: false})
            }
        })
        .catch((err) => {
            this.setState({error: true, data: err})
        })
    }

    componentDidMount() {
        const initialSort = new URLSearchParams(this.props.location.search).get('sortBy')
        
        //if invalid sort param, set it to default which is money
        const updatedSort = this.setSortBy(sortByOptions.includes(initialSort) ? initialSort : 'money')
        
        this.setOption(updatedSort)

    }

    render() {

        if (!this.state.error) {

            let preview_stat = (member) => null

            if (this.state.sortBy === 'money') {
                preview_stat = (member) => `$${member.total}`
            } else if (this.state.sortBy === 'level') {
                preview_stat = (member) => `Level ${member.level}`
            }

            return (
                <div id='member-catalog' className='body'>

                    <Helmet>
                        <title>The Hierarchy • Member Catalog</title>
                    </Helmet>

                    <div className='member-sort-by-box'>
                        <label><span>Sort By:</span></label>
                        <br />
                        <select name = 'options' value={this.state.sortBy ? this.state.sortBy : ''} onChange = {(e) => this.setOption(e.target.value)}>
                            {sortByOptions.map((name) => (<option value = {name}>{name.charAt(0).toUpperCase() + name.slice(1)}</option>))}
                        </select>
                    </div>
                                            
                    <div className='catalog-member-listing'>
                        <InfiniteScroll
                            dataLength={this.state.data.length}
                            next={this.fetchMoreMembers}
                            hasMore={this.state.hasMore}
                            loader={<img src={LoadingWheel} className='loading-wheel' alt='loading'/>}
                            scrollThreshold='50%'
                        >
                        {
                            this.state.data.map((member) => (
                                <MemberPreview member={member} preview_stat={preview_stat(member)}
                                />
                            ))
                        }

                        </InfiniteScroll>
                    </div>
                </div>
            )
        }
    
        else {
            return (
                <div id='member-page-error-body' className='body'>
                    <div className='error-box'>
                        <div className='error-box-img-wrapper'>
                            <img src={NotFound} alt=''/>
                        </div>
                        <div className='error-text'>
                            <h3>Whoops!</h3>
                            <span>An internal error has occured, please try again later</span>
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}

export default MemberCatalog;