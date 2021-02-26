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

        const userId = parseInt(this.props.match.params.userId);

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
                            <span>{this.state.data.name}</span>
                        </div>

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
                            <img src={NotFound} />
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