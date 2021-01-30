import '../styles/home.css'
import BannerRight from '../images/banner right.png'
import BannerMiddle from '../images/banner middle.png'
import BannerLeft from '../images/banner left.png'


function Home() {
    return(
        <div className="homeBody">
            <div className="banner">
                <img src={BannerLeft} alt="Hierarchy Banner"/>
                <img className="bannerMiddle" src={BannerMiddle} alt="Hierarchy Banner"/>
                <img src={BannerRight} alt="Hierarchy Banner"/>
            </div>

            <div className="textBox">
                <strong>This server is one of a kind, I promise you</strong>
                <br/><br/>
                The Hierarchy is an economy server whose sole purpose is economy, and nothing else! 
                Ran by a ➡️ <strong>custom bot</strong> ⬅️!
                <br/><br/>

                <u>Some features are</u>
                <br/><br/>

                <div className="featuredList">
                    <ul>
                        <li>An interactive tutorial to help you get started<br/></li>
                        <li>Working with custom mini games<br/></li>
                        <li>Stealing from others, with a risk of choosing to steal more money<br/></li>
                        <li>A bank, to keep your money safe <em>(or not?)</em><br/></li>
                        <li>Heists, that require multiple people to do so<br/></li>
                        <li>Games, for something fun to do with a reward for winning as well<br/></li>
                        <li>Gambling, to bet your money and potentially win or lose it all<br/></li>
                        <li>Fees and taxes, that are collected at a certain interval<br/></li>
                        <li>A shop, with stocks built into it for constantly changing prices<br/></li>
                        <li>Items, to assist you with getting more money<br/></li>
                        <li>Jail, along with bailing for some sort of punishment for crime<br/></li>
                        <li>Self assignable roles so people can get to know you<br/></li>
                        <li>Daily rewards that get better every day<br/></li>
                        <li>A wallet dropping system for competitiveness to claim the wallet first<br/></li>
                        <li>Gangs, to have groups compete against each other<br/></li>
                    </ul>
                </div>

                <br/><br/>
                And so much more! There are always new updates so you will *never* get bored!
                <br/><br/>

                <em>So, you do think you have what it takes to become on top of The Hierarchy? Find out now!</em>
            </div>
        </div>
    )
}

export default Home;