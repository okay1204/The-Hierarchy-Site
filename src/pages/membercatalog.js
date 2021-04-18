import '../styles/memberCatalog.css'
import axios from 'axios'
import React from 'react'
import LoadingWheel from '../images/loading wheel.gif'
import MemberPreview from '../components/memberPreview.js'
import ErrorBox from '../components/errorBox.js'
import { Helmet } from 'react-helmet'
import InfiniteScroll from "react-infinite-scroll-component";


const sortByOptions = ['money', 'level', 'search']
class MemberCatalog extends React.Component {

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

        this.fetchMoreMembers = this.fetchMoreMembers.bind(this)
    }

    setSortBy(sortBySelection) {
        const searchParams = new URLSearchParams(this.props.location.search)
        searchParams.set('sortBy', sortBySelection)

        if (sortBySelection !== 'search') {
            searchParams.delete('search')
        }

        this.props.history.push(window.location.pathname + "?" + searchParams.toString())
        
        this.setState({ sortBy: sortBySelection })
        return sortBySelection
    }

    setOption(sortOption) {

        const sortBy = this.setSortBy(sortOption)
 
        this.setState({ data: [], page: 1, hasMore: true })   
        
        this.fetchMoreMembers(sortBy)
    }

    fetchMoreMembers(sortByOverride=null, searchOverride=null) {

        const page = sortByOverride ? 1 : this.state.page
        const sortBy = sortByOverride ? sortByOverride : this.state.sortBy
        const search = searchOverride ? searchOverride : this.state.search

        let query = null;
        if (sortBy !== 'search') {
            query = `https://api.thehierarchy.me/members/top/${sortBy}?page=${page}`
        } else if (search) {
            query = `https://api.thehierarchy.me/members/search/${search}?page=${page}`
        } else {
            return this.setState({hasMore: false})
        }

        axios.get(query)
        .then((nextPage) => {

            nextPage = nextPage.data

            if (nextPage.length > 0) {

                if (sortBy === this.state.sortBy) {

                    if (sortBy !== 'search') {
                        this.setState({page: this.state.page + 1, data: this.state.data.concat(nextPage)})
                    } else if (this.state.search === search) {
                        this.setState({page: this.state.page + 1, data: this.state.data.concat(nextPage)})
                    }
                }
            } else {
                this.setState({hasMore: false})
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
        const updatedSort = this.setSortBy(sortByOptions.includes(initialSort) ? initialSort : 'money')
        
        this.setOption(updatedSort)

    }

    render() {

        let previewStat = (member) => null

        if (this.state.sortBy === 'money') {
            previewStat = (member) => `$${member.total}`
        } else if (this.state.sortBy === 'level') {
            previewStat = (member) => `Level ${member.level}`
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
                    {this.state.sortBy === 'search' && (
                        <input 
                            className='member-catalog-search-box'
                            type='text'
                            placeholder='Search name or nickname...'
                            onChange={(event) => {
                                const search = event.target.value
                                this.setState({ data: [], page: 1, hasMore: search ? true : false, search })

                                if (search) {
                                    this.fetchMoreMembers('search', search)
                                }

                                const searchParams = new URLSearchParams(this.props.location.search)
                                searchParams.set('sortBy', 'search')
                                searchParams.set('search', search)
                                this.props.history.push(window.location.pathname + "?" + searchParams.toString())
                            }}
                        />
                    )}
                </div>
                                        
                <div className='catalog-member-listing'>
                    <InfiniteScroll
                        dataLength={this.state.data.length}
                        next={this.fetchMoreMembers}
                        hasMore={this.state.hasMore}
                        loader={<img src={LoadingWheel} className='loading-wheel' alt='loading'/>}
                        endMessage={this.state.endMessage}
                    >
                    {
                        this.state.data.map((member) => (
                            <MemberPreview member={member} previewStat={previewStat(member)}
                            />
                        ))
                    }

                    </InfiniteScroll>
                </div>
            </div>
        )
        
    }
}

export default MemberCatalog;