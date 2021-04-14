import '../styles/gangpreview.css'
import React from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import RightArrow from '../images/right arrow.png'

class GangPreview extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            membersDropdown: false
        }

        this.toggleMembersDropdown = this.toggleMembersDropdown.bind(this)
    }

    toggleMembersDropdown() {
        this.setState({membersDropdown: !this.state.membersDropdown})
    }

    redirectIfNotDropdown() {
        
    }

    // `/stats/gangs/${this.props.gang.id}`

    render() {
        return (
            <div className='gang-preview' onClick={this.redirectIfNotDropdown} style={{border: `3px #${this.props.gang.color} solid`}}>

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
                    
                    <button className='gangs-members-dropdown-arrow' onClick={this.toggleMembersDropdown}>
                        <img src={RightArrow} alt='Dropdown Members Arrow' style={this.state.membersDropdown ? {transform: 'rotate(90deg)'} : {}}/>
                    </button>
                </div>
            </div>
        )
    }
}


export default GangPreview;