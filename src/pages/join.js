import '../styles/join.css'

function Join() {
    return (
        <div className='join-body'>
            <div className='join-flex'>
                <div className='join-text disable-select'>
                    <span className='big-emoji'>💸</span>
                    <br />
                    <span>Join and begin the grind now!</span>
                </div>
                <iframe title='widget' className='widget' src="https://discord.com/widget?id=692906379203313695&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" />
            </div>

            <a href='https://discord.gg/pZXFsSETnx' target='_blank' className='join-button'>Join</a>
        </div>
    )
} 

export default Join