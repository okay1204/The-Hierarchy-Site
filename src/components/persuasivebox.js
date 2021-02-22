import '../styles/persuasivebox.css'
import React from 'react'
import { Animated } from 'react-animated-css'

function PersuasiveBox({ children, reverse }) {
	const [dimensions, setDimensions] = React.useState({
		width: window.innerWidth
	})
	const elementRef = React.useRef(null)
	const [visible, setVisible] = React.useState(true)

	React.useEffect(() => {
		const resizeFunc = () => setDimensions({ width: window.innerWidth })
		const scrollFunc = () => setVisible(getY() < getWindowY())

		window.addEventListener('resize', resizeFunc)
		window.addEventListener('scroll', scrollFunc)

		return _ => {
			window.removeEventListener('resize', resizeFunc)
			window.removeEventListener('scroll', scrollFunc)
		}
	}, [])

	const getY = () => elementRef.current.getBoundingClientRect().y
	const getWindowY = () =>
		window.scrollY + document.documentElement.clientHeight

	console.log(`persuasive-box ${reverse ? 'reverse' : ''}`)

	return (
		<Animated
			animationIn={reverse ? 'bounceInRight' : 'bounceInLeft'}
			animationOut='fadeOut'
			isVisible={visible}
			innerRef={elementRef}
		>
			<div className={`persuasive-box ${reverse && 'reverse'}`}>{children}</div>
		</Animated>
	)
}

export default PersuasiveBox
