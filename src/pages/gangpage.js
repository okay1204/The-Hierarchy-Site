import '../styles/gangPage.css'
import axios from 'axios'
import React from 'react'
import MemberPreview from '../components/memberPreview.js'
import LoadingWheel from '../images/loading wheel.gif'
import { Helmet } from 'react-helmet'
import InfiniteScroll from 'react-infinite-scroll-component'
import ErrorBox from '../components/errorBox.js'
class GangPage extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            error: false,
            data: {},
            members: [],
            hasMore: true,
            page: 1,
            endMessage: null
        }

        this.fetchMoreMembers = this.fetchMoreMembers.bind(this)
    }
    
    componentDidMount() {

        const gangId = this.props.match.params.gangId.includes('/') ? '' : this.props.match.params.gangId
        
        axios.get(`https://api.thehierarchy.me/gangs/${gangId}`)
        
        .then(res => {
            
            const data = res.data
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

    fetchMoreMembers() {
        axios.get(`https://api.thehierarchy.me/gangs/${this.state.data.id}/members?page=${this.state.page}`)
        .then((nextPage) => {

            nextPage = nextPage.data

            if (nextPage.length > 0) {
                this.setState({page: this.state.page + 1, members: this.state.members.concat(nextPage)})
            } else {
                this.setState({hasMore: false})
            }
        })
        .catch((err) => {
            this.setState({
                hasMore: false,
                endMessage:
                <ErrorBox
                    header='Whoops!'
                    description='An internal error occured fetching members'
                    theme='light'
                />
            })
        })
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
   
                        <Helmet>
                            <title>The Hierarchy • {this.state.data.name}</title>
                        </Helmet>

                        <div id='gang-info' style={{border: `3px #${this.state.data.color} solid`}}>

                            <div className='header'>
                                <div className='gangid-wrapper'>
                                    <span className='gangid'>ID: {this.state.data.id}</span>
                                </div>

                                {this.state.data.img_link &&

                                <div className='img-wrapper'>
                                    <img src={this.state.data.img_link} style={{border: `1px #${this.state.data.color} solid`}} className='icon' alt='Gang icon' />
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
                                <span className='gang-stats'>Gang Balance: ${this.state.data.total_balance}</span>

                            </div>

                            <hr />

                            <div className='gang-owner-div'>
                                <span className='gang-owner'>Owner</span>
                                <MemberPreview className='gang-page-owner-preview' member={this.state.data.owner} whiteBorder/>
                            </div>
                            
                            <hr />
                            <div className='gang-page-member-div'>
                                <span className='gang-page-members-title'>Members</span>
                                <InfiniteScroll
                                    dataLength={this.state.members.length}
                                    next={this.fetchMoreMembers}
                                    hasMore={this.state.hasMore}
                                    loader={<img src={LoadingWheel} className='loading-wheel' alt='loading'/>}
                                    endMessage={this.state.endMessage}
                                    className='gang-page-members-list'
                                >
                                    {this.state.members.map((member) => <MemberPreview member={member} whiteBorder className='gang-page-member-preview'/>)}
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div id='gang-page-error-body' className='body'>
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
            <div id='gang-page-error-body' className='body'>
                <ErrorBox
                    header='Whoops!'
                    description="We couldn't find the gang you are looking for"
                    theme='dark'
                />
            </div>
        )
    }
        
    }
}

export default GangPage;