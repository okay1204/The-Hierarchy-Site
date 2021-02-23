import '../styles/home.css'
import '../styles/persuasivebox.css'

import BannerRight from '../images/banner right.png'
import BannerMiddle from '../images/banner middle.png'
import BannerLeft from '../images/banner left.png'

import PersuasiveBox from '../components/persuasivebox'
import ExplainSection from '../components/explainsection'

import MoneyBag from '../images/money bag.png'
import Crowd from '../images/crowd.png'
import Strategy_Board from '../images/strategy board.png'

import Tutorial from '../images/tutorial.png'
import Shop from '../images/shop.png'
import Universities from '../images/universities.png'
import Jobs from '../images/jobs.png'
import Fees from '../images/fees.png'
import Gang from '../images/gang.png'
import Checklist from '../images/checklist.png'


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
			
			<ExplainSection reverse={true}>
				<img src={Tutorial} alt='The shop on the discord server'/>
				<div>
					<h2>Interactive Tutorial</h2>
					<p>An interactive tutorial for a quickstart of how to play!</p>
				</div>
			</ExplainSection>

			<hr className='home-divider' />
			
			<ExplainSection reverse={false}>
				<img src={Shop} alt='The shop on the discord server'/>
				<div>
					<h2>Complex Shop System</h2>
					<p>A shop that sells items to aid you towards reaching the top of The Hierarchy. Prices go up and down every 3 hours!</p>
				</div>
			</ExplainSection>

			<hr className='home-divider' />

			<ExplainSection reverse={true}>
				<img src={Universities} alt='Different universities on the discord server'/>
				<div>
					<h2>Many Universities</h2>
					<p>Lots of Universities to study at to achieve different majors. Pass the final and get a new job!</p>
				</div>
			</ExplainSection>

			<hr className='home-divider' />

			<ExplainSection reverse={false}>
				<img src={Jobs} alt='Different jobs on the discord server'/>
				<div>
					<h2>Fun Jobs</h2>
					<p>Many Jobs each with their own amount of pay, cooldown, and difficulty. They all come with their own little minigames to play for cash!</p>
				</div>
			</ExplainSection>

			<hr className='home-divider' />

			<ExplainSection reverse={true}>
				<img src={Fees} alt='Fee timers on the discord server'/>
				<div>
					<h2>Daily/Bi-Daily Fees</h2>
					<p>Taxes and Bank Fees that are payed automatically. Be sure to make more than you lose each day!</p>
				</div>
			</ExplainSection>

			<hr className='home-divider' />

			<ExplainSection reverse={false}>
				<img src={Gang} alt='The Formula gang on the discord server'/>
				<div>
					<h2>Fully Customizable Gangs</h2>
					<p>Group up with other members of the server, join one or create your own! Fully customizable with the ability to set an icon, color, name, description, role, and more!</p>
				</div>
			</ExplainSection>

			<hr className='home-divider' />

			<ExplainSection reverse={true}>
				<img src={Checklist} alt='More Symbol'/>
				<div>
					<h2>..much, much more!</h2>
					<p>This bot is jam-packed with features, feel free to discover them for yourselves!</p>
				</div>
			</ExplainSection>



		</div>
	)
}

export default Home
