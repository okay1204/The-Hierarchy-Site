import '../styles/gangpreview.css'
import React from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import RightArrow from '../images/right arrow.png'

import { Redirect } from 'react-router-dom'
import axios from 'axios'

import MemberPreview from '../components/memberpreview'
import LoadingWheel from '../images/loading wheel.gif'
class GangPreview extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            membersDropdown: false,
            dropdownAnimation: null,
            hoveringButton: false,
            redirect: null,
            members: [this.props.gang.owner],
            page: 1,
            hasMore: false,
            allMembers: false
        }

        this.toggleMembersDropdown = this.toggleMembersDropdown.bind(this)
        this.hoverButton = this.hoverButton.bind(this)
        this.unHoverButton = this.unHoverButton.bind(this)
        this.redirectIfNotDropdown = this.redirectIfNotDropdown.bind(this)
        this.fetchMoreMembers = this.fetchMoreMembers.bind(this)
    }

    toggleMembersDropdown() {
        this.setState({membersDropdown: !this.state.membersDropdown, dropdownAnimation: Date.now(), hasMore: this.state.allMembers ? false : true})

        if (this.state.members.length <= 1) {
            this.fetchMoreMembers()
        }
    }

    hoverButton() {
        this.setState({hoveringButton: true})
    }
    
    unHoverButton() {
        this.setState({hoveringButton: false})
    }

    redirectIfNotDropdown() {
        if (!this.state.hoveringButton) {
            this.setState({redirect: `/stats/gangs/${this.props.gang.id}`})
        }
    }

    fetchMoreMembers() {
        axios.get(`https://api.thehierarchy.me/gangs/${this.props.gang.id}/members?page=${this.state.page}`)
        .then((nextPage) => {

            nextPage = nextPage.data

            if (nextPage.length > 0) {
                this.setState({page: this.state.page + 1, members: this.state.members.concat(nextPage)})
            } else {
                this.setState({hasMore: false, allMembers: true})
            }
        })
        .catch((err) => {
            // this.setState({error: true, data: err})
        })
    }

    render() {

        return (
            <div className='gang-preview'>
                <div className='gang-preview-main' onClick={this.redirectIfNotDropdown} style={{border: `3px #${this.props.gang.color} solid`}}>

                    {this.state.redirect && <Redirect to={this.state.redirect} />}

                    <div className='left'>
                        {
                            this.props.gang.img_link
                            &&
                            <div className='img-wrapper' style={{border: `1px #${this.props.gang.color} solid`}}>
                                <img src={this.props.gang.img_link} className='avatar' alt='Gang Icon' />
                            </div>
                        }
                        <div className='name-wrapper'>
                            <span className='name' style={!this.props.gang.img_link ? {marginLeft: '0'} : {}}>{this.props.gang.name}</span>
                        </div>
                    </div>
                    
                    <div className='right'>

                        {this.props.preview_stat && (
                            <span className='preview-stat'>
                                {this.props.preview_stat}
                            </span>
                        )}
                        
                        <button className='gangs-members-dropdown-arrow' onMouseEnter={this.hoverButton} onMouseLeave={this.unHoverButton} onClick={this.toggleMembersDropdown}>
                            <img src={RightArrow} alt='Dropdown Members Arrow' style={this.state.membersDropdown ? {transform: 'rotate(90deg)'} : {}}/>
                        </button>
                    </div>
                </div>
                
                <div className='gang-member-list'
                style={this.state.membersDropdown ? {border: `3px #${this.props.gang.color} solid`, borderTop: 'none', maxHeight: Date.now() - this.state.dropdownAnimation >= 0.15 ? 'none' : '200px', backgroundColor: this.state.membersDropdown ? '#23272A' : 'none'} : {}}>
                    <InfiniteScroll
                        dataLength={this.state.members.length}
                        next={this.fetchMoreMembers}
                        hasMore={this.state.hasMore}
                        loader={<img src={LoadingWheel} className='loading-wheel' alt='loading'/>}
                        scrollThreshold='50%'
                    >
                    {this.state.members.map((member) => <MemberPreview member={member} whiteBorder className='gang-member-preview' />)}
                    </InfiniteScroll>
                </div>

            </div>
        )
    }
}


export default GangPreview;