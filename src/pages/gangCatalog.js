import '../styles/gangCatalog.css'
import axios from 'axios'
import React from 'react'
import LoadingWheel from '../images/loading wheel.gif'
import GangPreview from '../components/gangPreview.js'
import { Helmet } from 'react-helmet'
import InfiniteScroll from "react-infinite-scroll-component"
import ErrorBox from '../components/errorBox.js'

const sortByOptions = ['member_count', 'total_balance', 'recent', 'search']

class GangCatalog extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            data: [],
            page: 1,
            hasMore: true,
            endMessage: null,
            sortBy: null,
            search: null
        }

        this.fetchMoreGangs = this.fetchMoreGangs.bind(this)
        this.getInitialSearch = this.getInitialSearch.bind(this)
        this.updateSearch = this.updateSearch.bind(this)
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
 
        this.setState({ data: [], page: 1, hasMore: true })   
        
        this.fetchMoreGangs(sortBy)
    }

    fetchMoreGangs(sortByOverride=null, searchOverride=null) {

        const page = sortByOverride ? 1 : this.state.page
        const sortBy = sortByOverride ? sortByOverride : this.state.sortBy
        const search = searchOverride !== null ? searchOverride : this.state.search

        let query = null;
        if (sortBy !== 'search') {
            query = `https://api.thehierarchy.me/gangs/top/${sortBy}?page=${page}`
        } else {
            if (search) {
                query = `https://api.thehierarchy.me/gangs/search/${search}?page=${page}`
            } else {
                return this.setState({data: [], page: 1, hasMore: false})
            }
        }

        axios.get(query)
        .then((nextPage) => {

            nextPage = nextPage.data

            if (nextPage.length > 0) {

                if (sortBy === this.state.sortBy) {

                    if (sortBy === 'search' && page === 1) {
                        this.setState({data: []})
                    }
                    
                    this.setState({page: this.state.page + 1, data: this.state.data.concat(nextPage)})
                }
            } else {
                this.setState({hasMore: false, page: 1})

                if (sortBy === 'search' && this.state.sortBy === 'search' && page === 1) {
                    this.setState({data: []})
                }
            }
        })
        .catch((err) => {
            this.setState({
                hasMore: false,
                endMessage:
                <ErrorBox
                    header='Whoops!'
                    description='An internal error occured fetching members'
                    theme='dark'
                />
            })
        })
    }

    componentDidMount() {
        const initialSort = new URLSearchParams(this.props.location.search).get('sortBy')
        
        //if invalid sort param, set it to default which is money
        const updatedSort = this.setSortBy(sortByOptions.includes(initialSort) ? initialSort : 'member_count')
        
        this.setOption(updatedSort)

    }

    getInitialSearch() {
        if (!this.state.initialSearchValue) {
            const searchParams = new URLSearchParams(this.props.location.search)
            const search = searchParams.get('search')
            
            
            this.updateSearch({target: {value: search}})
            
            this.setState({initialSearchValue: true})
            return search
        } else {
            return this.state.search ? this.state.search : ''
        }
    }

    updateSearch(event) {
        const search = event.target.value
        this.setState({ hasMore: true, search })

        this.fetchMoreGangs('search', search)

        const searchParams = new URLSearchParams(this.props.location.search)
        searchParams.set('sortBy', 'search')
        searchParams.set('search', search)
        if (!search) {
            searchParams.delete('search')
        }

        this.props.history.push(window.location.pathname + "?" + searchParams.toString())
    }


    render() {

        let previewStat = (member) => null

        if (this.state.sortBy === 'member_count') {
            // + 1 including owner
            previewStat = (gang) => `${gang.member_count+1}`
        } else if (this.state.sortBy === 'total_balance') {
            previewStat = (gang) => `$${gang.total_balance}`
        } else if (this.state.sortBy === 'recent') {
            // parsing date
            previewStat = (gang) => {
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
                    {this.state.sortBy === 'search' && (
                        <input 
                            className='gang-catalog-search-box'
                            type='text'
                            value={this.getInitialSearch()}
                            placeholder='Search name or nickname...'
                            onChange={this.updateSearch}
                        />
                    )}
                </div>
                                        
                <div className='catalog-gang-listing'>
                    <InfiniteScroll
                        dataLength={this.state.data.length}
                        next={this.fetchMoreGangs}
                        hasMore={this.state.hasMore}
                        loader={this.state.sortBy === 'search' && this.state.page === 1 ? null : <img src={LoadingWheel} className='loading-wheel' alt='loading'/>}
                        endMessage={this.state.endMessage}
                        className='gang-infinite-scroll'
                    >
                    {
                        this.state.data.map((gang) => (
                            <GangPreview gang={gang} previewStat={previewStat(gang)}/>
                        ))
                    }

                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

export default GangCatalog;