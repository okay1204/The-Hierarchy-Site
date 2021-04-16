import '../styles/explainSection.css'
import React from 'react'
import { Animated } from 'react-animated-css'

function ExplainSection({children, reverse=false}) {

    const elementRef = React.useRef(null)
	const [visible, setVisible] = React.useState(true)

	React.useEffect(() => {
		const scrollFunc = () => setVisible(getY() < getWindowY())

		window.addEventListener('scroll', scrollFunc)

		return _ => {
			window.removeEventListener('scroll', scrollFunc)
		}
	}, [])

	const getY = () => elementRef.current.getBoundingClientRect().y
	const getWindowY = () =>
		window.scrollY + document.documentElement.clientHeight

    return (
            <div className={`explain-box ${reverse ? 'reverse' : ''}`}>
                <Animated
                    animationIn={reverse ? 'fadeInRight' : 'fadeInLeft'}
                    animationOut='fadeOut'
                    isVisible={visible}
                    innerRef={elementRef}
                    className='explain-img-wrapper'
                >
                {children[0]}
                </Animated>
                <Animated
                    animationIn={reverse ? 'fadeInLeft' : 'fadeInRight'}
                    animationOut='fadeOut'
                    isVisible={visible}
                    innerRef={elementRef}
                    className='explain-text-wrapper'
                >
                {children[1]}
                </Animated>
            </div>
    )
}

export default ExplainSection;