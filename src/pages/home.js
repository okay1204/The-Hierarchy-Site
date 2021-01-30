import '../styles/home.css'
import BannerRight from '../images/banner right.png'
import BannerMiddle from '../images/banner middle.png'
import BannerLeft from '../images/banner left.png'

const features_list = [
    'An interactive tutorial to help you get started',
    'Working with custom mini games',
    'Stealing from others, with a risk of choosing to steal more money',
    'A bank, to keep your money safe (or not?)',
    'Heists, that require multiple people to do so',
    'Games, for something fun to do with a reward for winning as well',
    'Gambling, to bet your money and potentially win or lose it all',
    'Fees and taxes, that are collected at a certain interval',
    'A shop, with stocks built into it for constantly changing prices',
    'Items, to assist you with getting more money',
    'Jail, along with bailing for some sort of punishment for crime',
    'Self assignable roles so people can get to know you',
    'Daily rewards that get better every day',
    'A wallet dropping system for competitiveness to claim the wallet first',
    'Gangs, to have groups compete against each other'
]

function Home() {
    return(
        <div className="home-body">

            <h1 className="home-title">Welcome to The Hierarchy!</h1>

            <hr className="banner-divider"/>

            <div className="banner">
                <img className="banner-left" src={BannerLeft} alt="Hierarchy Banner"/>
                <img className="banner-middle" src={BannerMiddle} alt="Hierarchy Banner"/>
                <img className="banner-right" src={BannerRight} alt="Hierarchy Banner"/>
            </div>

            <hr className="banner-divider"/>

            <div className="text-box">
                <strong>This server is one of a kind, I promise you</strong>
                <br/><br/>
                The Hierarchy is an economy server whose sole purpose is economy, and nothing else! 
                Ran by a ➡️ <strong>custom bot</strong> ⬅️!
                <br/><br/>

                <u>Some features are</u>
                <br/><br/>

                <ul className="featured-list">
                    {features_list.map(featured => (
                        <li>{featured}</li>
                    ))}
                </ul>

                <br/><br/>
                And so much more! There are always new updates so you will *never* get bored!
                <br/><br/>

                <em>So, you do think you have what it takes to become on top of The Hierarchy? Find out now!</em>
            </div>


        </div>
    )
}

export default Home;