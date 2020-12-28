import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Item from "./pages/Item";
import Items from './pages/Items';
import NetworkProvider from './hooks/NetwokProvider';

function App() {
  return (
    <Router>
      <NetworkProvider>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/landing' component={Landing} />
          <Route exact path='/about' component={About} />
          <Route exact path='/books/:id' component={Item}/>
          <Route exact path='/books' component={Items}/>
          <Route path='*' component={NotFound} />
        </Switch>
      </NetworkProvider>
    </Router>
  );
}

export default App;
