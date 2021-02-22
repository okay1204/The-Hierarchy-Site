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
				<img src={value} alt='placeholder'></img>
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

			{/* <hr className='home-divider' />
			
			<ExplainBox pos='right'>
				<img src={Shop}/>
				<div>
					<h2>Shop with price changes by the hour</h2>
					<p>the shop is good the shop is g
						ood yesthe shop is good yesthe shop is
						 good yesthe shop is good yesyesthe shop is
						  good yesthe shop is good yesthe shop is good yes</p>
				</div>
			</ExplainBox> */}
			
		</div>
	)
}

export default Home
