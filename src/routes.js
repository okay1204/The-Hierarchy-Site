import Home from './pages/home'
import Help from './pages/help'
import Stats from './pages/stats'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/stats',
        component: Stats
    },
    {
        path: '/help',
        component: Help
    }
];


export default routes;