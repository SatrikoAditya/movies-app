import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import {Home, Movies, Series, Favorites} from './pages/'
import {ApolloProvider} from '@apollo/client'
import client from './config/client'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div>
        <nav className="p-3" style={{backgroundColor: '#101010'}}>
          <Link style={{color: '#c2cdd4'}} to="/">Home</Link>
          <Link className="ml-5" style={{color: '#c2cdd4'}} className="ml-3" to="/movies">Movies</Link>
          <Link className="ml-5" style={{color: '#c2cdd4'}} className="ml-3" to="/series">Series</Link>
          <Link className="ml-5" style={{color: '#c2cdd4'}} className="ml-3" to="/favorites">Favorites</Link>
        </nav>
      </div>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/series">
          <Series />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
      </Switch>
    </Router>
    </ApolloProvider>
  );
}

export default App;
