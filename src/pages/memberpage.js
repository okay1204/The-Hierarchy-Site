import '../styles/memberpage.css'
import axios from 'axios'

import React from 'react'
import NotFound from '../images/notfound.png'

import status_key from '../constants.js'

import LoadingWheel from '../images/loading wheel.gif'

const parseTime = (future, now) => {
    const seconds = future-now
    const remaining_seconds = seconds % 60
    
    const minutes = Math.floor(seconds / 60)
    const remaining_minutes = minutes % 60
    
    const hours = Math.floor(minutes / 60)
    
    return `${hours}:${remaining_minutes < 10 ? '0': ''}${remaining_minutes}:${remaining_seconds < 10 ? '0': ''}${remaining_seconds}`
}

class MemberPage extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            error: false,
            data: {},
            in_use: [],
            jail: null
        }
        
        this.inUseTimer = this.inUseTimer.bind(this)
        this.jailTimer = this.jailTimer.bind(this)
    }
    
    jailTimer() {

        const epoch_now = Math.floor(Date.now() / 1000)

        if (this.state.data.jailtime - epoch_now < 0) {
            this.setState({jail: null})
            clearInterval(this.jail_interval)
            delete this.jail_interval
            return
        }

        const time_text = parseTime(this.state.data.jailtime, epoch_now)
        const jail_element = <span className='jail-timer'>{time_text}</span>

        this.setState({jail: jail_element})
    }

    inUseTimer() {

        let in_use = []

        const epoch_now = Math.floor(Date.now() / 1000)
        
        for (const [item, value] of Object.entries(this.state.data.in_use)) {
            
            if (value.timer-epoch_now < 0) 
                continue


            const time_text = parseTime(value.timer, epoch_now)
            
            
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
            
            data.roles = data.roles.map(role => {

                let color = role.color

                if (color) {
                    color = color.toString(16)

                    while (color.length < 6) {
                        color = '0' + color
                    }

                    color = '#' + color
                    
                } else {
                    color = 'white'
                }

                return (
                    <div className='role' style={{color: color}}>
                        <div className='role-circle' style={{backgroundColor: color}}><wbr /></div>
                        <span className='role-text' style={{color: color}}>{role.name}</span>
                    </div>
                )
            })
            
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

            const epoch_now = Math.floor(Date.now() / 1000)

            let inJail = false;
            if (data.jailtime - epoch_now > 0)
                inJail = true;

            if (data.gang) {

                let color = data.gang.color.toString(16)

                while (color.length < 6) {
                    color = '0' + color
                }

                color = '#' + color


                data.gang = (
                    <a className='mini-gang-embed-wrapper' href={`/stats/gangs/${data.gang.name}`} >
                        <div className='mini-gang-embed' style={{border: `2px ${color} solid`}}>
                            <span>{data.gang.name}</span>
                            {data.gang.img_link && (
                            <div className='mini-gang-img-wrapper'>
                                <img src={data.gang.img_link} alt='gang icon'/>
                            </div>
                            )
                            }                   
                        </div>
                    </a>
                )
            } else {
                data.gang = <span className='member-gang-none'>None</span>
            }


            if (data.awards.length > 0) {
                data.awards = (
                    <div className='member-awards-container'>
                        {data.awards.map((award) => {

                            let color = award.color.toString(16)

                            while (color.length < 6) {
                                color = '0' + color
                            }

                            color = '#' + color

                            return (
                                <a className='mini-award-embed-wrapper' href={`/stats/awards/${award.id}`} >
                                <div className='mini-award-embed' style={{border: `2px ${color} solid`}}>
                                    <span>{award.name}</span>
                                    <div className='mini-award-img-wrapper'>
                                        <img src={award.image_link} alt='award icon'/>
                                    </div>
                                </div>
                                </a>
                            )
                        })}
                    </div>
                )

            } else {
                data.awards = <span className='member-awards-none'>None</span>
            }



            this.setState({data});
            




            this.inUseTimer()
            this.in_use_interval = setInterval(this.inUseTimer, 1000)

            if (inJail) {
                this.jailTimer()
                this.jail_interval = setInterval(this.jailTimer, 1000)
            }

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

                            {this.state.jail &&
                            <div className='jail section'>
                                <h2>Jail</h2>
                                {this.state.jail}
                                <hr className='section-divider' />
                            </div>
                            }


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

                            <hr className='section-divider' />

                            <div className='occupations section'>
                                <h2>Occupations</h2>

                                <div className='occupations-container'>
                                    <div>
                                        <h3>Job</h3>
                                        <span>{this.state.data.job ? this.state.data.job : 'None'}</span>
                                    </div>
                                    <div>
                                        <h3>University</h3>
                                        <span>{this.state.data.university ? this.state.data.university : 'None'}</span>
                                    </div>
                                </div>
                            </div>

                            <hr className='section-divider' />

                            <div className='majors section'>
                                <h2>Majors</h2>

                                <div>
                                    {this.state.data.majors.length > 0 ? this.state.data.majors.map((major) => (<span>{major}</span>)) : 'None'}
                                </div>
                            </div>

                            <hr className='section-divider' />

                            <div className='member-page-gang section'>
                                <h2>Gang</h2>

                                {this.state.data.gang}
                            </div>

                            <hr className='section-divider' />

                            <div className='member-page-awards section'>
                                <h2>Awards</h2>

                                {this.state.data.awards}
                            </div>

                        </div>
                        
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
                        <span>We couldn't find the member you are looking for</span>
                    </div>
                </div>
            </div>
        )
    }
        
    }
}

export default MemberPage;