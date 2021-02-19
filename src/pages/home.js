import '../styles/home.css'
import '../styles/persuasivebox.css'

import BannerRight from '../images/banner right.png'
import BannerMiddle from '../images/banner middle.png'
import BannerLeft from '../images/banner left.png'
import PlaceHolder from '../images/placeholder.ico'
import PersuasiveBox from '../components/persuasivebox'

function Home() {
	const messages = [
		'An economy server taken to a whole new level',

		'200+ players to compete against',

		'Tons of different strategies to utilize',
	]

	return (
		<div className='home-body'>
			<h1 className='home-title'>Welcome to The Hierarchy!</h1>

			<hr className='banner-divider' />

			<div className='banner'>
				<img
					className='banner-left'
					src={BannerLeft}
					alt='Hierarchy Banner'
				/>
				<img
					className='banner-middle'
					src={BannerMiddle}
					alt='Hierarchy Banner'
				/>
				<img
					className='banner-right'
					src={BannerRight}
					alt='Hierarchy Banner'
				/>
			</div>

			<hr className='banner-divider' />

			{[...messages, ...messages].map((message, idx) => (
				<PersuasiveBox pos={idx % 2 ? 'left' : 'right'}>
					<img src={PlaceHolder} alt='placeholder'></img>
					<span>{message}</span>
				</PersuasiveBox>
			))}
		</div>
	)
}

export default Home
