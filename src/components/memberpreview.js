import '../styles/memberpreview.css'

import status_key from '../constants.js'

function MemberPreview(props) {

    const preview_key = Object.keys(props.preview_stat)[0]
    const preview_value = Object.values(props.preview_stat)[0]

    let preview_stat = null

    if (preview_key === 'money') {
        preview_stat = `$${preview_value}`
    } else if (preview_key === 'level') {
        preview_stat = `Level ${preview_value}`
    }

    if (preview_stat) {
        preview_stat = <span className='preview-stat'>{preview_stat}</span>
    }

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

            {preview_stat}
            
            {props.boosting && <span className='boosting'>Premium</span>}
        </a>
    )
}


export default MemberPreview;