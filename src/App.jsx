import React, { Suspense } from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import ApolloServiceProvider from './ApolloServiceProvider'
import ProtectedRoute from './utils/protectedRoute'
import AuthContextProvider from "./contexts/AuthContext"
import Header from './components/Header'
import Login from './pages/Login'
import Home from './pages/Home'
import Admins from './pages/Admins'
import Workers from './pages/Workers'
import Products from './pages/Products'
import Orders from './pages/Orders'
import AddOrder from './pages/AddOrder'
import NotFound from './pages/NotFound'



function App() {

  const pathname= window.location.pathname

  return (
    <AuthContextProvider>
      <ApolloServiceProvider>
        <Router>
          <Suspense fallback="loading">
            {pathname !== "/login" && <Header />}
            <main>
              <Switch>
                <ProtectedRoute exact path="/" component={Home} loggedIn/>
                <ProtectedRoute path="/login" component={Login} guest/>
                <ProtectedRoute path="/admins" component={Admins} loggedInAsAdmin />
                <ProtectedRoute path="/workers" component={Workers} loggedInAsAdmin />
                <ProtectedRoute path="/products" component={Products} loggedIn/>
                <ProtectedRoute path="/orders" component={Orders} loggedIn/>
                <ProtectedRoute path="/add-order/:code" component={AddOrder} loggedIn/>
                <Route component={NotFound} />
              </Switch>
            </main>
          </Suspense>
        </Router>
      </ApolloServiceProvider>
    </AuthContextProvider>
  )
}

export default App
