import '../styles/memberpage.css'
import axios from 'axios'

import React from 'react'


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
                <div id='member-page-body' className='body'>
                    Member Not Found
                </div>
            )
        }
        
    }
}

export default MemberPage;