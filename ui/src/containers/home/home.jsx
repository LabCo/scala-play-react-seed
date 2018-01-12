import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Map} from 'immutable'
import Mousetrap from 'mousetrap';

import {KEYMAP} from 'conf/settings.js'

// import Loading from 'components/loading/loading.jsx'

import styles from './home.module.scss'


const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
  {}, ownProps, stateProps, dispatchProps, {}
)

@connect(mapStateToProps, mapDispatchToProps, mergeProps)
export default class Home extends Component {
  state = {}
  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.mousetrapEvent = this.mousetrapEvent.bind(this);
  }

  onMouseEnter() {
    this.setState(s => Object.assign(s, {shuffleHover: true}))
  }

  onMouseLeave() {
    this.setState(s => Object.assign(s, {shuffleHover: false}))
  }

  mousetrapEvent(shortcutType, shortcutSeq) {}

  componentDidMount() {
    const cards = KEYMAP.get('CARDS');
    if(cards != null) {
      cards.forEach( (v, k) => Mousetrap.bind(v, this.mousetrapEvent(k, v)) )
    }
  }

  componentWillUnmount() {
    const cards = KEYMAP.get('CARDS');
    if(cards != null) {
      cards.forEach( v => Mousetrap.unbind(v))
    }
  }

  render() {
    const name = this.props.user.get("name") || "unnamed user"

    return <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.welcome}>Welcome {name}</div>
      </div>
    </div>
  }

  static propTypes = {
    user: PropTypes.instanceOf(Map).isRequired
  }
}