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

    constructor(props) {
        super(props)
    
        this.state = {
            error: false,
            data: {},
            in_use: [],
            inUseLoading: true
        }
        
        this.inUseTimer = this.inUseTimer.bind(this)
    }
    
    

    inUseTimer() {

        let in_use = []

        const epoch_now = Math.floor(Date.now() / 1000)
        
        for (const [item, value] of Object.entries(this.state.data.in_use)) {
            
            const seconds = value.timer-epoch_now
            const remaining_seconds = seconds % 60
            
            const minutes = Math.floor(seconds / 60)
            const remaining_minutes = minutes % 60
            
            const hours = Math.floor(minutes / 60)
            
            const time_text = `${hours}:${remaining_minutes < 10 ? '0': ''}${remaining_minutes}:${remaining_seconds < 10 ? '0': ''}${remaining_seconds}`

            if (seconds < 0) 
                continue
            
            
            // if emoji is unicode
            if (value.emoji.text) 
                in_use.push(
                    <span className='shop-item'>{value.emoji.text} {item.charAt(0).toUpperCase() + item.slice(1)} {time_text}</span>
                )
                
                
            // if emoji is custom
            else 
                in_use.push(
                    <span className='shop-item'><img src={value.emoji.image} alt='in use item' className='shop-emoji' /> {item.charAt(0).toUpperCase() + item.slice(1)} {time_text}</span>
                )
                
        }
        
        if (in_use.length === 0) {
            in_use = <span className='shop-item'>None</span>
        }
        
        this.setState({in_use})
    }
    
    componentDidMount() {
        
        this.in_use_interval = null;
        
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
            
            let items = []
            
            for (const [item, value] of Object.entries(data.items)) {
                
                // if emoji is unicode
                if (value.emoji.text) {
                    items.push(
                        <span className='shop-item'>{value.emoji.text} {item.charAt(0).toUpperCase() + item.slice(1)} x{value.count}</span>
                    )
                }
                    
                // if emoji is custom
                else {
                    items.push(
                        <span className='shop-item'><img src={value.emoji.image} alt='shop item' className='shop-emoji' /> {item.charAt(0).toUpperCase() + item.slice(1)} x{value.count}</span>
                    )
                }
            }
                    
            if (items.length === 0) {
                items = <span className='shop-item'>None</span>
            }
                
            data.items = items

            this.setState({data});
            
            this.inUseTimer()
            this.in_use_interval = setInterval(this.inUseTimer, 1000)
        })
        .catch(err => {
            this.setState({error: true, data: err})
        })
    }
    
    componentWillUnmount() {
        if (this.in_use_interval) {
            return clearInterval(this.in_use_interval)
        }
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
                            <h2>Rank</h2>

                            <span>{this.state.data.level}</span>

                            <h3 className='level-indicator-text'>{this.state.data.progress}% of the way to the next level</h3>

                            <div className='level-meter'>
                                <div className='level-progress' style={{width: `${this.state.data.progress}%`}} />
                            </div>
                        </div>

                        <hr className='section-divider' />

                        <div className='shop-items section'>
                            <h2>Items</h2>

                            <div className='items-container'>
                                {this.state.data.items}
                            </div>
                        </div>

                        <hr className='section-divider' />

                        <div className='shop-items section'>
                            <h2>In Use</h2>

                            <div className='items-container'>
                                {this.state.in_use}
                            </div>
                        </div>

                    </div>
                    
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
                        <span>We couldn't find the member you are looking for</span>
                    </div>
                </div>
            </div>
        )
    }
        
    }
}

export default MemberPage;