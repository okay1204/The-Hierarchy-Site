import '../styles/awardPage.css'
import axios from 'axios'
import React from 'react'
import status_key from '../constants.js'
import LoadingWheel from '../images/loading wheel.gif'
import { Helmet } from 'react-helmet'
import GangPreview from '../components/gangPreview.js'
import ErrorBox from '../components/errorBox.js'

class AwardPage extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            error: false,
            data: {},
            in_use: [],
            jail: null
        }
    }
    
    componentDidMount() {
        
        this.in_use_interval = null;
        
        const userId = this.props.match.params.userId.includes('/') ? '' : this.props.match.params.userId
        
        axios.get(`https://api.thehierarchy.me/members/${userId}`)
        
        .then(res => {
            const data = res.data

            this.setState({data});
        })
        .catch(err => {
            this.setState({error: true, data: err})
        })
    }
    
    componentWillUnmount() {
    }
                    
    render() {

        if (!this.state.error) {

            if (this.state.data && Object.keys(this.state.data).length !== 0) {
                return (
                    <div id='member-page-body' className='body'>

                        <Helmet>
                            <title>The Hierarchy • {this.state.data.name}</title>

                            <meta property="og:title" content={this.state.data.name} />
                            <meta property="og:image" content={this.state.data.avatar_url} />
                            <meta property="og:type" content="website" />
                            <meta property="og:description" content={`${this.state.data.name}'s statistics`} />
                            
                            
                            <meta property="og:site_name" content="The Hierarchy" />
                            <meta property="theme-color" content="#7fcbab" />

                            <meta name="twitter:card" content="summary_large_image" />
                            <meta name="twitter:creator" content="@GhanbariZack" />
                            <meta name="twitter:image:alt" content="Discord Avatar" />
                        </Helmet>

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

                                    {this.state.data.gang ?
                                    <GangPreview gang={this.state.data.gang} className='member-page-gang-preview'/>
                                    :
                                    <span className='member-gang-none'>None</span>
                                    }
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
            <div id='member-page-error-body' className='body'>
                <Helmet>
                    <title>The Hierarchy • Member Not Found</title>
                </Helmet>

                <ErrorBox
                    header='Whoops!'
                    description="We couldn't find the member you are looking for"
                    theme='dark'
                />
            </div>
        )
    }
        
    }
}

export default AwardPage;