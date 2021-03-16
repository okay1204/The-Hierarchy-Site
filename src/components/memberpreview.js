import '../styles/memberpreview.css'

import status_key from '../constants.js'

function MemberPreview(props) {

    return (
        <a className={`member-preview ${props.boosting ? 'premium-border' : ''}`} href={`/stats/members/${props.id}`}>
            <div className='img-wrapper'>

                <img src={props.avatar_url} className='avatar' alt='Profile pic' />
                <img className='status' src={status_key[props.status]} alt={props.status}/>
                
            </div>
            <div className='name-wrapper'>
                <div className='main-name'>
                    <span className='name'>{props.name}</span>
                    <span className='discriminator'>#{props.discriminator}</span>
                </div>
                {props.nick && <span className='nick'>{props.nick}</span>}
            </div>
            
            {props.boosting && <span className='boosting'>Premium</span>}
        </a>
    )
}


export default MemberPreview;