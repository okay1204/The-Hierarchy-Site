import '../styles/navbar.css'

import Logo from '../images/logo.png'
import Help from '../images/help.png'

const links = {
    Home: '/',
    Join: 'https://discord.gg/pZXFsSETnx',
    Stats: '/stats'
}

function NavBar() {

    const buttons = []

    for (const [key, value] of Object.entries(links)) {

        if (key !== 'Join') {
            buttons.push(
                <a href={value} className={value === `/${window.location.pathname.split('/')[1]}` ? 'active' : ''}>{key}</a>
            )
        } else {
            buttons.push(
                <a href={value} target='_blank' rel='noreferrer'>{key}</a>
            )
        }
    }

    /* eslint-disable */
    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <a href='/'><img src={Logo} className='logo' alt='Logo'/></a>
                <div className='navbar-pages'>
                    {buttons}
                </div>
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO'></a>
            </div>

            <a className='help-button' href='/help'><img src={Help} alt='help'/></a>
        </div>
    )
}

export default NavBar