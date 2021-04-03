import Home from './pages/home'
import Help from './pages/help'
import Stats from './pages/stats'

import MemberPage from './pages/memberpage'
import MemberCatalog from './pages/membercatalog'

import parseRoutes from './utils/parser'
import GangPage from './pages/gangpage'

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
				component: dflt,
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
				component: dflt,
				subRoutes: [{ path: '/:gangId', component: GangPage }],
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
