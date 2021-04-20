import Home from './pages/home.js'
import Help from './pages/help.js'
import Stats from './pages/stats.js'

import MemberCatalog from './pages/memberCatalog.js'
import MemberPage from './pages/memberPage.js'

import parseRoutes from './utils/parser.js'

import GangCatalog from './pages/gangCatalog.js'
import GangPage from './pages/gangPage.js'

import AwardPage from './pages/awardPage.js'

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
				component: MemberCatalog,
				subRoutes: [
					{
						path: '/:userId',
						component: MemberPage,
					}
				],
			},
			{
				path: '/gangs',
				component: GangCatalog,
				subRoutes: [
					{
						path: '/:gangId',
						component: GangPage 
					}
				],
			},
			{
				path: '/awards',
				component: dflt,
				subRoutes: [
					{
						path: '/:id',
						component: AwardPage 
					}
				],
			},
		],
	},
	{
		path: '/help',
		component: Help,
	},
]

export default parseRoutes(routes);
