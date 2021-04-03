import '../styles/gangpage.css'
import axios from 'axios'

import React from 'react'
import NotFound from '../images/notfound.png'

import LoadingWheel from '../images/loading wheel.gif'

class GangPage extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            error: false,
            data: {}
        }
    }
    
    componentDidMount() {

        const gangId = this.props.match.params.gangId.includes('/') ? '' : this.props.match.params.gangId

        console.log(gangId)
        
        axios.get(`https://api.thehierarchy.me/gangs/${gangId}`)
        
        .then(res => {
            
            const data = res.data;

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
                return (
                    <div id='gang-page-body' className='body'>

                    </div>
                )
            } else {
                return (
                    <div id='page-error-body' className='body'>
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