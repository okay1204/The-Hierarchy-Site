import '../styles/home.css'
import '../styles/persuasivebox.css'

import BannerRight from '../images/banner right.png'
import BannerMiddle from '../images/banner middle.png'
import BannerLeft from '../images/banner left.png'

import PersuasiveBox from '../components/persuasivebox'
import ExplainBox from '../components/explainbox'

import MoneyBag from '../images/money bag.png'
import Crowd from '../images/crowd.png'
import Strategy_Board from '../images/strategy board.png'

import Shop from '../images/shop.png'


function Home() {
	const messages = {
		'An economy server taken to a whole new level': MoneyBag,

		'200+ players to compete against': Crowd,

		'Tons of different strategies to utilize': Strategy_Board,
	}

	const persuasive_boxes = []
	let idx = 0
	for (const [key, value] of Object.entries(messages)) {
		persuasive_boxes.push(
			<PersuasiveBox reverse={Boolean(idx % 2)}>
				<img src={value} alt=''></img>
				<span>{key}</span>
			</PersuasiveBox>
		)

		idx++ 
	}

	return (
		<div className='home-body'>
			<h1 className='home-title'>Welcome to The Hierarchy!</h1>

			<hr className='home-divider' />

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

			<hr className='home-divider' />

			{persuasive_boxes}

			<hr className='home-divider' />
			
			<ExplainBox reverse={true}>
				<img src={Shop} alt='The shop on the discord server'/>
				<div>
					<h2>Complex Shop System</h2>
					<p>A shop that sells items to aid you towards reaching the top of The Hierarchy. Prices go up and down every 3 hours!</p>
				</div>
			</ExplainBox>
			
		</div>
	)
}

export default Home
