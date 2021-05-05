import '../styles/help.css'
import { Helmet } from 'react-helmet'

function Help() {
    return(
        <div id="help-body" className='body'>

            <Helmet>
                <title>The Hierarchy • RICKROLLED</title>
            </Helmet>
            <iframe
                title='RICKROLL'
                id="video-frame"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?modestbranding=1&amp;controls=0&amp;enablejsapi=1&amp;autoplay=1&amp;mute=0&amp;loop=1"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen=""
                height="691">
            </iframe>
        </div>
    )
}

export default Help