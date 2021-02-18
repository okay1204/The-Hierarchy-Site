import '../styles/persuasivebox.css'
import React from 'react'

function PersuasiveBox({children, pos}) {

    const [dimensions, setDimensions] = React.useState({
        width: window.innerWidth
    });

    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                width: window.innerWidth
            })
        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const elements = (pos === 'right' && dimensions.width > 900) ? [...children].reverse() : children

    let fade = ''

    if (dimensions.width > 900) {
        fade = pos === 'right' ? 'fade-in-right' : 'fade-in-left'
    }

    return (
        <div className={`persuasive-box ${fade}`}>
            {elements}
        </div>
    );
}

export default PersuasiveBox;