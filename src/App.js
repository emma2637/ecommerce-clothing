import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import './App.css';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from './pages/checkout/checkout.component'
import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from "./redux/user/user.selector";
import {createStructuredSelector} from 'reselect'

class App extends React.Component {

  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth = null


  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //createUserProfileDocument(user);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          //get data related to user stored, or already stored
          // this.setState({
          //   currentUser: {
          //     id: snapshot.id,
          //     ...snapshot.data()
          //   }
          // },()=>  console.log(this.state))


          //redux
          this.props.setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div >
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={()=> this.props.currentUser ?(<Redirect to='/'></Redirect>):(<SignInAndSignUpPage></SignInAndSignUpPage>)} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
