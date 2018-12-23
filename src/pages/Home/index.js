import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAccountBalance } from '../../actions/account';
import Link from '../../components/Link';
import Notice from '../../components/Notice';
import { undoUi } from '../../utils/ui';

import styles from './Home.scss';

class Home extends Component {
  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {
    const { getAccountBalanceAction } = this.props;
    getAccountBalanceAction();
  }

  render() {
    return (
      <div className={styles.home}>
        <div className={styles['top-bar']}>
          <Link to="/recharge" className={`${styles.money} `} />
          <Link to="/get_cash" className={`${styles.money} ${styles.get}`} />
        </div>
        <div className={styles.content}>
          <div className={styles.notice}>
            <Notice>充值请精确到小数点后两位，充值金额足额到账啦啦啦</Notice>
          </div>
          <div className={styles.main}>
            <div className={styles.line}>
              <Link
                to={{
                  pathname: '/game_home',
                  search: '?fastType=1&gameType=2',
                }}
                className={`${styles.card} ${styles.ba}`}
              />
              <Link to="/" className={`${styles.card} ${styles.sba}`} />
            </div>
            <div className={styles.line}>
              <Link to="/" className={`${styles.card} ${styles.dt}`} />
              <Link to="/" className={`${styles.card} ${styles.sdt}`} />
            </div>
            <div className={styles.line}>
              <Link to="/" className={styles.card} onClick={undoUi} />
              <Link to="/" className={styles.card} onClick={undoUi} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  state => ({
  }),
  {
    getAccountBalanceAction: getAccountBalance,
  },
)(Home);
