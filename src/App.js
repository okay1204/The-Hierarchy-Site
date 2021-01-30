import './App.css';
import routes from './routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
		<Router>
      <div className='App'>
          <Switch>
            {routes.map(route => (
              <Route
                path={route.path}
                exact
                component={props => (
                  <route.component {...props} />
                )}
              />
            ))}
          </Switch>
      </div>
		</Router>
	)
}

export default App;
