import '../styles/memberpage.css'
import axios from 'axios'

import React from 'react'
import NotFound from '../images/notfound.png'


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

                    <div id='user-info'>
                        <div className='header'>
                            <div className='left'>
                                <div className='img-wrapper'>

                                    <div className='avatar-wrapper'>
                                        <img src={this.state.data.avatar_url} className='avatar' alt='Profile pic' />
                                    </div>
                                    <div className='status-wrapper'>
                                        <div className='status'> <wbr /> </div>
                                    </div>
                                    
                                </div>
                                <div className='name-wrapper'>
                                    <div className='main-name'>
                                        <span className='name'>{this.state.data.name}</span>
                                        <span className='discriminator'>#{this.state.data.discriminator}</span>
                                    </div>
                                    {this.state.data.nick && <span className='nick'>{this.state.data.nick}</span>}
                                </div>
                            </div>
                            <div className='right'>
                                <span>ID: {this.state.data.id}</span>
                            </div>

                        </div>
                        <hr />
                        <div className='main'>

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