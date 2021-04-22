import '../styles/awardPage.css'
import axios from 'axios'
import React from 'react'
import LoadingWheel from '../images/loading wheel.gif'
import { Helmet } from 'react-helmet'
import ErrorBox from '../components/errorBox.js'

class AwardPage extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            error: false,
            data: {}
        }
    }
    
    componentDidMount() {
        
        this.in_use_interval = null;
        
        const awardId = this.props.match.params.awardId.includes('/') ? '' : this.props.match.params.awardId
        
        axios.get(`https://api.thehierarchy.me/awards/${awardId}`)
        
        .then(res => {
            const data = res.data

            this.setState({data});
        })
        .catch(err => {
            this.setState({error: true, data: err})
        })
    }
                    
    render() {

        if (!this.state.error) {
    
            if (this.state.data && Object.keys(this.state.data).length !== 0) {
                
                return (
                    <div id='award-page-body' className='body'>
    
                        <Helmet>
                            <title>The Hierarchy • {this.state.data.name}</title>
                        </Helmet>
    
                        <div id='award-info' style={{border: `3px #${this.state.data.color} solid`}}>

                        </div>
                    </div>
                )
            } else {
                return (
                    <div id='award-page-error-body' className='body'>
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
                <div id='award-page-error-body' className='body'>
                    <ErrorBox
                        header='Whoops!'
                        description="We couldn't find the award you are looking for"
                        theme='dark'
                    />
                </div>
            )
        }
        
    }
}

export default AwardPage;