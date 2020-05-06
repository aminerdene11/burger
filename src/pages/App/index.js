import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom"
import css from "./style.module.css";

import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage";
import SideBar from "../../components/SideBar";
import OrderPage from "../OrderPage";
import { Route, Switch } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import Burger from "../../components/Burger";
import LoginPage from "../LoginPage";
import Signup from "../SignupPage";
import { connect } from "react-redux"
import Logout from "../../components/Logout";
import * as actions from "../../redux/action/loginActions";
import * as signupActions from "../../redux/action/signupActions";

class App extends Component {
  state = {
    showSidebar: false
  };

  toggleSideBar = () => {
    this.setState(prevState => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  componentDidMount = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId')
    const refreshToken = localStorage.getItem('refreshToken');
    const expireDate =  new Date (localStorage.getItem('expireDate'))
    if(token){
      if(expireDate > new Date()){
        //hugatsaa duusaagvi token auto login hiine
      this.props.autoLogin(token,userId);
      //token hvchingvi bolhod vldej bgaa hugatsaag tootsoolj auto logout hiine
      this.props.autoLogoutAfterMillisec(
        expireDate.getTime() - new Date().getTime())
      } else {
        //token hugatsaaa duussan,logout hiine

      }
    }
  };

  render() {
    return (
      <div>
        <Toolbar toggleSideBar={this.toggleSideBar} />

        <SideBar
          showSidebar={this.state.showSidebar}
          toggleSideBar={this.toggleSideBar}
        />

        <main className={css.Content}>
          {this.props.userId ? (
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/orders" component={OrderPage} />
              <Route path="/ship" component={ShippingPage} />
              <Route path="/" component={BurgerPage} />
            </Switch>
          ) : (
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={Signup} />
                <Redirect to="/login" />
              </Switch>
            )}
        </main>  
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.signupReducer.userId
  }
}
const mapDispatchToProps = dispatch =>{
  return{
  autoLogin: (token,userId) => dispatch (actions.loginUserSuccess(token,userId)),
  logout: () => dispatch(signupActions.logout()),
  autoLogoutAfterMillisec: () => dispatch(signupActions.autoLogoutAfterMillisec()),
}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
