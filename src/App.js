import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/landing' component={Landing} />
        <Route exact path='/about' component={About} />

        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
