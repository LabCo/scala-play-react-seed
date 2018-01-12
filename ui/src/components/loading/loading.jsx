import React, {Component} from 'react';
import {PenguinIcon} from 'components/icons/icons.jsx'

import styles from './loading.module.scss'

export default class Loading extends Component {
  render() {
    return <div className={styles.container}>
      <PenguinIcon className={styles.loadingPenguin} />
    </div>
  }
}