import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Login from '../login/Login'
import WishList from '../wishList'
import WatchAuth from '../auth/WatchAuth'
import ChildInfo from '../childinfo/ChildInfo'
import CreateWish from '../landing/CreateWish'
import WishDetails from '../wishDetails/WishDetails';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null
    }

    this.setSignedInUser = this.setSignedInUser.bind(this)
  }

  setSignedInUser(username) {
    this.setState({username})
  }


  render() {
    return (
      <Router>
        <WatchAuth>
          <Switch>
            <Route exact path="/child-info" component={ChildInfo}/>
            <Route exact path="/landing" component={CreateWish}/>
            <Route
              exact path="/wish-summary"
              render={(props) => <WishList username={this.state.username} {...props} />}
            />
            <Route
              exact path="/wish-summary/:id"
              render={(props) => <WishDetails username={this.state.username} {...props} />}
            />
            <Route
              exact path="/logout"
              render={(props) => <Login setSignedInUser = {this.setSignedInUser} {...props} />}
            />
            <Route
              exact path="/"
              render={(props) => <Login setSignedInUser = {this.setSignedInUser} {...props} />}
            />
          </Switch>
        </WatchAuth>
      </Router>
    )
  }
}
