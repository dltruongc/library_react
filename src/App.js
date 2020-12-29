import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Item from "./pages/Item";
import Items from './pages/Items';
import NetworkProvider from './hooks/NetworkProvider';
import CartProvider from './hooks/CartProvider';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Category from './pages/Category';
import Type from './pages/Type';
import AuthProvider from './hooks/AuthProvider';
import LoginAdmin from './pages/LoginAdmin';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NetworkProvider>
          <CartProvider>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/landing' component={Landing} />
              <Route exact path='/about' component={About} />
              <Route exact path='/books/:id' component={Item} />
              <Route exact path='/books' component={Items} />
              <Route exact path='/admin' component={Dashboard} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/me' component={Profile} />
              <Route exact path='/checkout' component={Checkout} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route path='/category' component={Category} />
              <Route path='/type' component={Type} />
              <Route path='/admin'>
                <Route exact path='/admin/login' component={LoginAdmin} />
              </Route>
              <Route path='*' component={NotFound} />
            </Switch>
          </CartProvider>
        </NetworkProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
