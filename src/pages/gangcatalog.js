import '../styles/gangcatalog.css'
import axios from 'axios'

import React from 'react'

import LoadingWheel from '../images/loading wheel.gif'
import NotFound from '../images/notfound.png'

import GangPreview from '../components/gangPreview.js'

import { Helmet } from 'react-helmet'
import InfiniteScroll from "react-infinite-scroll-component";

const sortByOptions = ['member_count', 'total_balance', 'recent']

class GangCatalog extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            error: false,
            data: [],
            page: 1,
            hasMore: true,
            sortBy: null
        }

        this.fetchMoreGangs = this.fetchMoreGangs.bind(this)
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
        
        this.fetchMoreGangs(sortBy)
    }

    fetchMoreGangs(sortByOverride=null) {

        const page = sortByOverride ? 1 : this.state.page
        const sortBy = sortByOverride ? sortByOverride : this.state.sortBy

        axios.get(`https://api.thehierarchy.me/gangs/top/${sortBy}?page=${page}&limit=10`)
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
        const updatedSort = this.setSortBy(sortByOptions.includes(initialSort) ? initialSort : 'member_count')
        
        this.setOption(updatedSort)

    }

    render() {

        if (!this.state.error) {

            let preview_stat = (member) => null

            if (this.state.sortBy === 'member_count') {
                // + 1 including owner
                preview_stat = (gang) => `${gang.member_count+1}`
            } else if (this.state.sortBy === 'total_balance') {
                preview_stat = (gang) => `$${gang.total_balance}`
            } else if (this.state.sortBy === 'recent') {
                // parsing date
                preview_stat = (gang) => {
                    let created_at = gang.created_at.split(' ')[0]
                    let [year, month, day] = created_at.split('-')
                    
                    return `${month}/${day}/${year}`
                }
            }

            return (
                <div id='gang-catalog' className='body'>

                    <Helmet>
                        <title>The Hierarchy • Member Catalog</title>
                    </Helmet>

                    <div className='gang-sort-by-box'>
                        <label><span>Sort By:</span></label>
                        <br />
                        <select name = 'options' value={this.state.sortBy ? this.state.sortBy : ''} onChange = {(e) => this.setOption(e.target.value)}>
                            {sortByOptions.map((name) => {

                                // getting rid of underscores and capitalizing each word
                                let displayName = name.split('_').map((name) => (name.charAt(0).toUpperCase() + name.slice(1)))
                                displayName = displayName.join(' ')

                                return <option value = {name}>{displayName}</option>
                            })}
                        </select>
                    </div>
                                            
                    <div className='catalog-gang-listing'>
                        <InfiniteScroll
                            dataLength={this.state.data.length}
                            next={this.fetchMoreGangs}
                            hasMore={this.state.hasMore}
                            loader={<img src={LoadingWheel} className='loading-wheel' alt='loading'/>}
                            className='gang-infinite-scroll'
                        >
                        {
                            this.state.data.map((gang) => (
                                <GangPreview gang={gang} preview_stat={preview_stat(gang)}/>
                            ))
                        }

                        </InfiniteScroll>
                    </div>
                </div>
            )
        }
    
        else {
            return (
                <div id='gang-page-error-body' className='body'>
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

export default GangCatalog;