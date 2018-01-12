import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Typist from 'react-typist'
import TypistLoop from 'react-typist-loop'
import ReactTimeout from 'react-timeout'
import PropTypes from 'prop-types'
import {Map} from 'immutable'

import UserReducer from "actionReducers/user.js"

import styles from './authenticate.module.scss'

const mapStateToProps = (state, ownProps) => ({
  user: UserReducer.getUser(state),
})

@ReactTimeout
@connect(mapStateToProps)
export default class Authenticate extends Component {
  state = {}

  componentDidMount() {
    this.props.setTimeout(() => this.setState(Object.assign({}, this.state, {showTyping: true})), 5000)
  }

  render() {
    if(this.props.user != null) return <Redirect to={{
      pathname: '/teamSelect',
      state: { from: this.props.location }
    }} />

    return <div className={styles.container}>
      <a className={styles.button} href="/auth/login">Auth with Gmail</a>
      <div className={styles.text}>
        {this.state.showTyping && <TypistLoop interval={3000}>
          {this.props.messages.map( (text, key) => {
            if(text == null) return <Typist key={key} startDelay={1000} cursor={{show:false}} />
            else return <Typist key={key} startDelay={1000}>{text}</Typist>
          })}
        </TypistLoop>}

      </div>
    </div>
  }

  static defaultProps = {
    messages: ["or don't", 'do whatever', "Not like I'm trying to help", null,
      <span>This button <span className={styles.upArrow}>↑</span></span>, null,
      "You're right... too easy", "I've got all day",
      "I'm literally a machine", "Speaking of literally...",
      "Since when is figuratively = literally?", "...", "You humans, are so strange",
      "You had 2 distinct words", "And then thought...", "What if they were 1 word?",
      "That would make things easier", "EXCEPT IT DOESN'T",
      "WON'T SOMEONE THINK OF THE LINGUISTS!!!!", "Sorry, where were we...",
      <span>Right, <span className={styles.upArrow}>↑</span> this button</span>,
      "Still NO?", "You're more stubborn than R2D2", "I give up", null, null, null, "HAHA, tricked you! I'm still here!", null, null, null, "Really?", null, null, "You want to hear a joke?", <strong>HUMANS</strong>, null, "Sorry, I didn't mean to upset you", null, "I'll just reboot myself", null, null, null, null, null, null, null]
  }

  static propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.instanceOf(Map)
  }
}