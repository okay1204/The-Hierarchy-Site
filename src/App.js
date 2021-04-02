import './App.css';
import routes from './routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/navbar'
import Footer from './components/footer'
import { Redirect } from "react-router-dom";

function App() {
  return (
		<Router>
      <div className='App'>
      <NavBar/>
      
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

      <Footer />
      </div>
		</Router>
	)
}

export default App;
