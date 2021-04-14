import '../styles/memberpreview.css'

import status_key from '../constants.js'

function MemberPreview(props) {

    let default_border = ''
    if (props.whiteBorder) {
        default_border = 'white-border'
    } 

    return (
        <a className={`member-preview ${props.member.boosting ? 'premium-border' : default_border} ${props.className}`} href={`/stats/members/${props.member.id}`}>

            <div className='left'>
                <div className='img-wrapper'>

                    <img src={props.member.avatar_url} className='avatar' alt='Profile pic' />
                    <img className='status' src={status_key[props.member.status]} alt={props.member.status}/>
                    
                </div>
                <div className='name-wrapper'>
                    <div className='main-name'>
                        <span className='name'>{props.member.name}</span>
                        <span className='discriminator'>#{props.member.discriminator}</span>
                    </div>
                    {props.member.nick && <span className='nick'>{props.member.nick}</span>}
                </div>
                
                {props.member.boosting && <span className='boosting'>Premium</span>}
            </div>
            
            <div className='right'>
                {props.preview_stat && (
                    <span className='preview-stat'>
                        {props.preview_stat}
                    </span>
                )}
            </div>
        </a>
    )
}


export default MemberPreview;