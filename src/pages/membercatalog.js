import '../styles/membercatalog.css'
import axios from 'axios'

import React from 'react'
import { Redirect } from "react-router-dom";

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
            redirect: false
        }
    }

    componentDidMount() {

        const search = this.props.location.search;
        const searchParams = new URLSearchParams(search)
        const sortBy = searchParams.get("sortBy")
        this.setState( {sortBy} )

        if (!(['money', 'level', 'random'].indexOf(sortBy) > -1)) {
            searchParams.set('sortBy', 'money')
            this.props.history.push(window.location.pathname + "?" + searchParams.toString())
        }

        axios.get(`https://api.thehierarchy.me/members/top/${searchParams.get('sortBy')}`)
        
        .then(res => {
            this.setState({data: res.data});
        })
        .catch(err => {
            this.setState({error: true, data: err})
        })

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
                        <span>Sort By:</span>
                        <br />
                        <select>
                            <option>Money</option>
                            <option>Level</option>
                            <option>Random</option>
                        </select>
                    </div>

                    { this.state.data.length > 0 ?

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
                    : 
                    
                    <div id='member-page-error-body' className='body'>
                        <img src={LoadingWheel} className='loading-wheel' alt='loading'/>
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