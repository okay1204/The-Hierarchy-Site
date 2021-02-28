import '../styles/memberpage.css'
import axios from 'axios'

import React from 'react'
import NotFound from '../images/notfound.png'

import Online from '../images/online.png'
import Offline from '../images/offline.png'
import Idle from '../images/idle.png'
import Dnd from '../images/do not disturb.png'

const status_key = {
    'online': Online,
    'offline': Offline,
    'idle': Idle,
    'dnd': Dnd
}


class MemberPage extends React.Component {
    
    state = {
        error: false,
        data: {}
    }
    
    componentDidMount() {

        const userId = this.props.match.params.userId.includes('/') ? '' : this.props.match.params.userId

        axios.get(`https://api.thehierarchy.me/members/${userId}`)

        .then(res => {
            const data = res.data;

            data.roles.reverse()

            data.roles = data.roles.map(role => (
                <div className='role' style={{color:`#${role.color ? role.color.toString(16) : '#white'}`}}>
                    <div className='role-circle' style={{backgroundColor: `#${role.color ? role.color.toString(16) : 'fffffe'}`}}><wbr /></div>
                    <span className='role-text' style={{color:`#${role.color ? role.color.toString(16) : '#white'}`}}>{role.name}</span>
                </div>
            ))

            this.setState({data: data});

        })
        .catch(err => {
            this.setState({error: true, data: err})
        })

    }
    
    render() {

        if (!this.state.error) {
            return (
                <div id='member-page-body' className='body'>

                    <div id='user-info' className={`${this.state.data.boosting ? 'premium-border' : ''}`} >
                        <div className='header'>

                            <div className='img-wrapper'>

                                <img src={this.state.data.avatar_url} className='avatar' alt='Profile pic' />
                                <img className='status' src={status_key[this.state.data.status]} alt={this.state.data.status}/>
                                
                            </div>
                            <div className='name-wrapper'>
                                <div className='main-name'>
                                    <span className='name'>{this.state.data.name}</span>
                                    <span className='discriminator'>#{this.state.data.discriminator}</span>
                                </div>
                                {this.state.data.nick && <span className='nick'>{this.state.data.nick}</span>}
                            </div>
                            
                            {this.state.data.boosting && <span className='boosting'>Premium</span>}

                            <div className='userid-wrapper'>
                                <span className='userid'>ID: {this.state.data.id}</span>
                            </div>

                        </div>

                        <hr className='header-main-divider' />

                        <div className='main'>

                            <div className='roles section'>
                                <h2>Roles</h2>
                                <div className='roles-container'>
                                    {this.state.data.roles}
                                </div>
                            </div>

                            <hr className='section-divider' />

                            <div className='balance section'>
                                <h2>Balance</h2>
                                <div className='balance-values'>
                                    <div>
                                        <h3>Cash</h3>
                                        <span>${this.state.data.money}</span>
                                    </div>
                                    <div>
                                        <h3>Bank</h3>
                                        <span>${this.state.data.bank}</span>
                                    </div>
                                    <div>
                                        <h3>Total</h3>
                                        <span>${this.state.data.money + this.state.data.bank}</span>
                                    </div>
                                </div>
                            </div>

                            <hr className='section-divider' />

                            <div className='level section'>
                                <h2>Level</h2>

                                <span>{this.state.data.level}</span>
                                <br />

                                <meter className='level-meter' min='0' max='100' value={String(this.state.data.progress)} />
                            </div>
                        </div>
                        
                    </div>

                </div>
            )
        } else {
            return (
                <div id='member-page-error-body' className='body'>
                    <div className='error-box'>
                        <div className='error-box-img-wrapper'>
                            <img src={NotFound} alt=''/>
                        </div>
                        <div className='error-text'>
                            <h3>Whoops!</h3>
                            <span>We couldn't find the member you are looking for</span>
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}

export default MemberPage;