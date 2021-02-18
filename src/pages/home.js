import '../styles/home.css'
import '../styles/persuasivebox.css'

import BannerRight from '../images/banner right.png'
import BannerMiddle from '../images/banner middle.png'
import BannerLeft from '../images/banner left.png'
import PlaceHolder from '../images/placeholder.ico'
import PersuasiveBox from '../components/persuasivebox'

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

            <PersuasiveBox pos='left'>
                <img src={PlaceHolder} alt="placeholder"></img>
                <span>An economy server taken to a whole new level</span>
            </PersuasiveBox>

            <PersuasiveBox pos='right'>
                <img src={PlaceHolder} alt="placeholder"></img>
                <span>200+ players to compete against</span>
            </PersuasiveBox>

            <PersuasiveBox pos='left'>
                <img src={PlaceHolder} alt="placeholder"></img>
                <span>Tons of different strategies to utilize</span>
            </PersuasiveBox>

        </div>
    )
}

export default Home;