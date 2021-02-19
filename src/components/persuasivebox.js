import '../styles/persuasivebox.css'
import React from 'react'
import { Animated } from 'react-animated-css'

function PersuasiveBox({ children, pos, animate = false }) {
	const [dimensions, setDimensions] = React.useState({
		width: window.innerWidth,
	})
	const elementRef = React.useRef(null)
	const [visible, setVisible] = React.useState(true)

	React.useEffect(() => {
		const resizeFunc = () => setDimensions({ width: window.innerWidth })
		const scrollFunc = () => setVisible(getY() < getWindowY())

		window.addEventListener('resize', resizeFunc)
		window.addEventListener('scroll', scrollFunc)

		return e => {
			window.removeEventListener('resize', resizeFunc)
			window.removeEventListener('scroll', scrollFunc)
		}
	}, [])

	const elements =
		pos === 'right' && dimensions.width > 900
			? [...children].reverse()
			: children

	const getY = () => elementRef.current.getBoundingClientRect().y
	const getWindowY = () =>
		window.scrollY + document.documentElement.clientHeight

	return (
		<Animated
			animationIn={pos === 'right' ? 'bounceInRight' : 'bounceInLeft'}
			animationOut='fadeOut'
			isVisible={visible}
			innerRef={elementRef}
		>
			<div className='persuasive-box'>{elements}</div>
		</Animated>
	)
}

export default PersuasiveBox
