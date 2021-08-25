import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/header'
import Footer from './components/footer'
import HomeScreen from './screens/homeScreen'
import ProductScreen from './screens/ProductScreen/productScreen'
import LoginScreen from './screens/loginScreen'
import CartScreen from './screens/cartScreen'
import RegisterScreen from './screens/registerScreen'

import EditProfile from './screens/UpdateUserInfo/editProfile'
import ChangePassword from './screens/UpdateUserInfo/changePassword'
import Settings from './screens/UpdateUserInfo/settings'

import OrderHistoryScreen from './screens/orderHistoryScreen'
import ShippingScreen from './screens/shippingScreen'
import PaymentScreen from './screens/paymentScreen'
import PlaceOrderScreen from './screens/placeOrderScreen'
import OrderScreen from './screens/orderScreen'
import OrderSuccessScreen from './screens/orderSuccessScreen'

// Admin Actions
import UserListScreen from './screens/Admin/userListScreen'

import './index.css'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/register" exact component={RegisterScreen} />
          <Route path="/profile" exact component={EditProfile} />
          <Route
            path="/profile/change-password"
            exact
            component={ChangePassword}
          />
          <Route path="/profile/settings" exact component={Settings} />
          <Route path="/orderHistory" exact component={OrderHistoryScreen} />
          <Route path="/product/:id" exact component={ProductScreen} />
          <Route path="/cart/:id?" exact component={CartScreen} />
          <Route path="/shipping" exact component={ShippingScreen} />
          <Route path="/payment" exact component={PaymentScreen} />
          <Route path="/placeorder" exact component={PlaceOrderScreen} />
          <Route path="/order/:id" exact component={OrderScreen} />
          <Route
            path="/order/:id/success"
            exact
            component={OrderSuccessScreen}
          />
          <Route path="/" exact component={HomeScreen} />
          {/*Admin actions */}
          <Route path="/admin/userlist" exact component={UserListScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
