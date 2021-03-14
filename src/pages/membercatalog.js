import '../styles/membercatalog.css'
import axios from 'axios'

import React from 'react'
import { Redirect } from "react-router-dom";

import LoadingWheel from '../images/loading wheel.gif'
import NotFound from '../images/notfound.png'

class MemberCatalog extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            error: false,
            data: [],
            redirect: false
        }
    }

    componentDidMount() {

        const search = this.props.location.search;
        const sortBy = new URLSearchParams(search).get("sortBy");

        if (!(['money', 'level', 'random'].indexOf(sortBy) > -1)) {
            this.setState({redirect: true})
            return
        }

        axios.get(`https://api.thehierarchy.me/members/top/${sortBy}`)
        
        .then(res => {
            this.setState({data: res.data});
        })
        .catch(err => {
            this.setState({error: true, data: err})
        })
    }

    render() {

        if (this.state.redirect) {
            return <Redirect from='catalog?sortBy=:error' to='catalog?sortBy=money' />
        }

        if (!this.state.error) {

            if (this.state.data.length > 0) {
                return (
                    <div id='member-catalog' className='body'>
                        <div className=''>

                        </div>
                    </div>
                )
            } else {
                return (
                    <div id='member-page-error-body' className='body'>
                        <img src={LoadingWheel} className='loading-wheel' alt='loading'/>
                    </div>
                )
            }
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