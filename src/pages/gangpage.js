import '../styles/gangpage.css'
import axios from 'axios'

import React from 'react'
import NotFound from '../images/notfound.png'

import MemberPreview from '../components/memberpreview.js'

import LoadingWheel from '../images/loading wheel.gif'

import { Helmet } from 'react-helmet'

import InfiniteScroll from 'react-infinite-scroll-component'
class GangPage extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            error: false,
            data: {},
            members: []
        }
    }
    
    componentDidMount() {

        const gangId = this.props.match.params.gangId.includes('/') ? '' : this.props.match.params.gangId
        
        axios.get(`https://api.thehierarchy.me/gangs/${gangId}`)
        
        .then(res => {
            
            const data = res.data
            this.setState({data})
        })
        .catch(err => {
            this.setState({error: true, data: err})
        })
    }
    
    componentWillUnmount() {
        if (this.in_use_interval) {
            clearInterval(this.in_use_interval)
        }

        if (this.jail_timer) {
            clearInterval(this.jail_interval)
        }
    }

    render() {

        if (!this.state.error) {

            if (this.state.data && Object.keys(this.state.data).length !== 0) {
                
                // parsing date
                let created_at = this.state.data.created_at.split(' ')[0]
                let [year, month, day] = created_at.split('-')
                
                created_at = `${month}/${day}/${year}`
                
                return (
                    <div id='gang-page-body' className='body'>
   
                        <Helmet>
                            <title>The Hierarchy • {this.state.data.name}</title>
                        </Helmet>

                        <div id='gang-info' style={{border: `3px #${this.state.data.color} solid`}}>

                            <div className='header'>

                                {this.state.data.img_link &&

                                <div className='img-wrapper'>
                                    <img src={this.state.data.img_link} style={{border: `1px #${this.state.data.color} solid`}} className='icon' alt='Gang icon' />
                                </div>

                                }

                                <span className='name'>{this.state.data.name}</span>
                                
                                {this.state.data.description ?
                                <p className='description'>
                                    {this.state.data.description}
                                </p>
                                :
                                <span className='description'><em>No description set.</em></span>
                                }

                            </div>

                            <hr/>

                            <div className='gang-stats-section'>

                                <span className='gang-stats'>Created At:<br />{created_at}</span>
                                <span className='gang-stats'>Gang Role: {this.state.data.role_id ? '✅' : '❌'}</span>
                                <span className='gang-stats'>All Invite: {this.state.data.all_invite ? '✅' : '❌'}</span>
                                <span className='gang-stats'>Gang Balance: ${this.state.data.total_balance}</span>

                            </div>

                            <hr />

                            <div className='gang-owner-div'>
                                <span className='gang-owner'>Owner</span>
                                <MemberPreview className='gang-page-owner-preview' member={this.state.data.owner} whiteBorder/>
                            </div>
                            
                            <hr />
                            <div className='gang-page-member-div'>
                                <span className='gang-page-members-title'>Members</span>
                                
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div id='gang-page-error-body' className='body'>
                        <Helmet>
                            <title>The Hierarchy •</title>
                        </Helmet>

                        <img src={LoadingWheel} className='loading-wheel' alt='loading'/>
                    </div>
                )
            }
    }
    
    else {
        return (
            <div id='gang-page-error-body' className='body'>
                <Helmet>
                    <title>The Hierarchy • Gang Not Found</title>
                </Helmet>
                
                <div className='error-box'>
                    <div className='error-box-img-wrapper'>
                        <img src={NotFound} alt=''/>
                    </div>
                    <div className='error-text'>
                        <h3>Whoops!</h3>
                        <span>We couldn't find the gang you are looking for</span>
                    </div>
                </div>
            </div>
        )
    }
        
    }
}

export default GangPage;