import '../styles/join.css'

function Join() {
    return (
        <div className='join-body'>
            <div className='join-flex'>
                <div className='join-text disable-select'>
                    <span>Join and begin the 💸 now!</span>
                    <br /><a href='https://discord.gg/pZXFsSETnx' target='_blank' rel='noreferrer' className='join-button'>Connect</a>
                </div>
                <iframe title='widget' className='widget' src="https://discord.com/widget?id=692906379203313695&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" />
            </div>
        </div>
    )
} 

export default Join