import '../styles/gangpreview.css'

function GangPreview(props) {

    return (
        <a className='gang-preview' style={{border: `3px #${props.gang.color} solid`}} href={`/stats/gangs/${props.gang.id}`}>

            <div className='left'>
                {
                    props.gang.img_link
                    &&
                    <div className='img-wrapper' style={{border: `1px #${props.gang.color} solid`}}>
                        <img src={props.gang.img_link} className='avatar' alt='Gang Icon' />
                    </div>
                }
                <div className='name-wrapper'>
                    <span className='name' style={!props.gang.img_link ? {marginLeft: '0'} : {}}>{props.gang.name}</span>
                </div>
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


export default GangPreview;