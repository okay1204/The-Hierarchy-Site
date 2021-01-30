import '../styles/home.css'
import BannerRight from '../images/banner right.png'
import BannerMiddle from '../images/banner middle.png'
import BannerLeft from '../images/banner left.png'


function Home() {
    return(
        <div>
            <div className="banner">
                <img src={BannerLeft} alt="Hierarchy Banner"/>
                <img src={BannerMiddle} alt="Hierarchy Banner"/>
                <img src={BannerRight} alt="Hierarchy Banner"/>
            </div>
        </div>
    )
}

export default Home;