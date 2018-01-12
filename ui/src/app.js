import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom'

import 'rxjs'
// import { switchMap } from 'rxjs/operator/switchMap';

import UserReducer from 'actionReducers/user.js'

import Authenticate from 'containers/authenticate/authenticate.jsx'
import Home from 'containers/home/home.jsx'

import styles from './app.module.scss'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

const mapStateToProps = (state, ownProps) => ({
  user: UserReducer.getUser(state)
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCurrentUser: () => dispatch(UserReducer.fetchCurrentUser())
})

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends React.Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    const {router: Router} = this.props;
    return <div className={styles.container}>
      <Router.type {...Router.props}>
        <Switch>
          <Route path="/auth" component={Authenticate} />
          <RouteWithUser path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </Router.type>
    </div>
  }

  static propTypes = {
    router: PropTypes.node,
    history: PropTypes.object,
  }

  static defaultProps = {
    router: <BrowserRouter />
  }
}

@connect(mapStateToProps)
class RouteWithUser extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;

    return <Route {...rest} render={props => (
      this.props.user?<Component {...this.props} {...props}/>:<Redirect to={{
        pathname: '/auth',
        state: { from: props.location }
      }} />
    )} />
  }
}