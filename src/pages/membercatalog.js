import '../styles/membercatalog.css'
import axios from 'axios'

import React from 'react'

import LoadingWheel from '../images/loading wheel.gif'
import NotFound from '../images/notfound.png'

import MemberPreview from '../components/memberpreview'

class MemberCatalog extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            error: false,
            data: [],
            sortBy: null,
            redirect: false,
            loading: true,
        }
    }

    setSortBy(sortBySelection) {
        const searchParams = new URLSearchParams(this.props.location.search)
        searchParams.set('sortBy', sortBySelection)
        this.props.history.push(window.location.pathname + "?" + searchParams.toString())
        this.setState({ sortBy: sortBySelection })
        return sortBySelection
    }

    getSortBy() {
        return new URLSearchParams(this.props.location.search).get('sortBy')
    }

    setOption(sortOption) {
        this.setState({loading: true})

        this.setSortBy(sortOption)

        axios.get(`https://api.thehierarchy.me/members/top/${sortOption}`)
            
        
        .then(res => {
            this.setState({ data: res.data })
            this.setState({loading: false})
        })
        .catch(err => {
            this.setState({ error: true, data: err })
            this.setState({loading: false})
        })
    }

    componentDidMount() {
        const initialSort = this.getSortBy()
        
        //if invalid sort param, set it to default which is money
        const updatedSort = this.setSortBy(['money', 'level', 'random'].includes(initialSort) ? initialSort : 'money')
        
        this.setOption(updatedSort)

    }

    render() {

        if (!this.state.error) {

            let preview_stat = (member) => null

            if (this.state.sortBy === 'money') {
                preview_stat = (member) => `$${member.money + member.bank}`
            } else if (this.state.sortBy === 'level') {
                preview_stat = (member) => `Level ${member.level}`
            }

            return (
                <div id='member-catalog' className='body'>

                    <div className='sort-by-box'>
                        <label><span>Sort By:</span></label>
                        <br />
                        <select name = 'options' onChange = {(e) => this.setOption(e.target.value)}>
                            <option selected={this.state.sortBy === 'money'} value = 'money'>Money</option>
                            <option selected={this.state.sortBy === 'level'} value = 'level'>Level</option>
                            <option selected={this.state.sortBy === 'random'} value = 'random'>Random</option>
                        </select>
                    </div>

                    {this.state.loading ?

                    <div id='member-page-error-body' className='body'>
                        <img src={LoadingWheel} className='loading-wheel' alt='loading'/>
                        </div>
                        
                        :
                        
                    <div className='catalog-member-listing'>
                        {
                            this.state.data.map((member) => (
                                <MemberPreview id={member.id} avatar_url={member.avatar_url} status={member.status}
                                name={member.name} discriminator={member.discriminator} nick={member.nick}
                                boosting={member.boosting} preview_stat={preview_stat(member)}
                                />
                            ))
                        }
                    </div>
                    }
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