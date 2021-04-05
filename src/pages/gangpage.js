import '../styles/gangpage.css'
import axios from 'axios'

import React from 'react'
import NotFound from '../images/notfound.png'

import LoadingWheel from '../images/loading wheel.gif'

import MemberPreview from '../components/memberpreview.js'

class GangPage extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            error: false,
            data: {},
            owner: null,
            members: []
        }
    }
    
    componentDidMount() {

        const gangId = this.props.match.params.gangId.includes('/') ? '' : this.props.match.params.gangId
        
        axios.get(`https://api.thehierarchy.me/gangs/${gangId}`)
        
        .then(res => {
            
            const data = res.data
            this.setState({data})

            
            // getting owner
            axios.get(`https://api.thehierarchy.me/members/${data.owner.id}`)
            .then(owner_res => {
                const owner = owner_res.data
                this.setState({owner})
            })
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

                        <div id='gang-info' style={{border: `3px #${this.state.data.color} solid`}}>

                            <div className='header'>

                                {this.state.data.img_link &&

                                <div className='img-wrapper'>
                                    <img src={this.state.data.img_link} className='icon' alt='Gang icon' />
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
                                <span className='gang-stats'>Gang Balance: ${this.state.data.total_bal}</span>

                            </div>

                            <hr />

                            <div className='gang-member-list'>
                                <span className='gang-owner'>Owner</span>
                                {this.state.owner && <MemberPreview member={this.state.owner} />}
                            </div>

                        </div>
                    </div>
                )
            } else {
                return (
                    <div id='gang-page-error-body' className='body'>
                        <img src={LoadingWheel} className='loading-wheel' alt='loading'/>
                    </div>
                )
            }
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
                        <span>We couldn't find the gang you are looking for</span>
                    </div>
                </div>
            </div>
        )
    }
        
    }
}

export default GangPage;