import Home from './pages/home'
import Help from './pages/help'
import Stats from './pages/stats'
import parseRoutes from './utils/parser'

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
						path: '/:id',
						component: dflt,
					},
					{
						path: '/top',
						component: dflt,
						subRoutes: [
							{ path: '/money', component: dflt },
							{ path: '/level', component: dflt },
							{ path: '/random', component: dflt },
						],
					},
				],
			},
			{
				path: '/gangs',
				component: dflt,
				subRoutes: [{ path: '/:name', component: dflt }],
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

export default parseRoutes(routes)
