import '../styles/navbar.css'

import Logo from '../images/logo.png'

const links = {
    Home: '/',
    Join: '/join',
    Stats: '/stats'
}

function NavBar() {

    const buttons = []

    for (const [key, value] of Object.entries(links)) {
        buttons.push(
            <a href={value} className={value === `/${window.location.pathname.split('/')[1]}` ? 'active' : ''}>{key}</a>
        )
    }

    return (
        <div className='navbar'>
            <a href='/'><img src={Logo} className='logo' alt='Logo'/></a>
            <div className='navbar-pages'>
                {buttons}
            </div>
        </div>
    )
}

export default NavBar