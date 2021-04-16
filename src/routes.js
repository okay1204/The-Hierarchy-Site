import Home from './pages/home'
import Help from './pages/help'
import Stats from './pages/stats'

import MemberCatalog from './pages/memberCatalog.js'
import MemberPage from './pages/memberPage.js'

import parseRoutes from './utils/parser'

import GangCatalog from './pages/gangCatalog.js'
import GangPage from './pages/gangPage.js'

const dflt = (props) => <div style = {{height: '50vh', fontSize: '50px'}}> Hello Zghan, recieved props of {JSON.stringify(props)} </div>

const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/stats',
		component: Stats,
		subRoutes: [
			{
				path: '/members',
				component: 'None',
				subRoutes: [
					{
						path: '/catalog',
						component: MemberCatalog
					},
					{
						path: '/:userId',
						component: MemberPage,
					}
				],
			},
			{
				path: '/gangs',
				component: 'None',
				subRoutes: [
					{
						path: '/catalog',
						component: GangCatalog
					},
					{
						path: '/:gangId',
						component: GangPage 
					}
				],
			},
			{
				path: '/awards',
				component: dflt,
				subRoutes: [{ path: '/:id', component: dflt }],
			},
		],
	},
	{
		path: '/help',
		component: Help,
	},
]

export default parseRoutes(routes);
