/* global window, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './GameHome.scss';
import { GoBack } from '../../utils/history';
import PearlRoad from '../../components/PearlRoad';
import BigRoad from '../../components/BigRoad';
import { decrypt } from '../../utils/info';
import { getURLParamsObject } from '../../utils/url';
import { getTableInitData, updateTableData } from '../../actions/table';
import SocketUtils from '../../utils/socket';
import Link from '../../components/Link';

const propTypes = {};

const defaultProps = {};


class GameHome extends Component {
  static ScreenHeight = 0;

  static ScreenWidth = 0;

  static setBodyForGame = () => {
    if (!GameHome.ScreenHeight) {
      GameHome.ScreenHeight = window.screen.availHeight;
    }
    if (!GameHome.ScreenWidth) {
      GameHome.ScreenWidth = window.screen.width;
    }

    document.body.style.backgroundColor = 'transparent';
  }

  static setBodyAutoScroll = () => {
    document.body.style.overflow = 'auto';
  }

  static setBodyHideScroll = () => {
    document.body.style.overflow = 'hidden';
  }

  static setBodyToastRotate = () => {
    document.body.classList.add('rotate');
  }

  static setBodyToastBack = () => {
    document.body.classList.remove('rotate');
  }

  constructor(props) {
    super(props);
    GameHome.setBodyForGame();
    GameHome.setBodyAutoScroll();
  }

  componentDidMount() {
    this.initData();
    GameHome.setBodyToastRotate();
  }

  componentWillUnmount() {
    SocketUtils.unsubscribe();
    GameHome.setBodyToastBack();
  }

  initData = () => {
    const { getTableInitDataAction } = this.props;
    getTableInitDataAction({
      fastType: 1,
      gameType: 2,
    }, this.connectSocket);
  }

  connectSocket = () => {
    SocketUtils.subscribe('/topic/baccarat/trend', this.handleSocketData);
  }

  handleSocketData = (res) => {
    const { base, updateTableDataAction } = this.props;
    const { fastType, gameType } = getURLParamsObject();
    if (!base.wsKey) {
      return;
    }

    const data = JSON.parse(decrypt(res, base.wsKey));
    updateTableDataAction({
      fastType,
      gameType,
      data,
    });
  }

  render() {
    const { userName, balance, table } = this.props;
    const { fastType, gameType } = getURLParamsObject();
    const data = table[`${fastType}_${gameType}`];

    return (
      <div
        className={styles.gameHome}
        style={{
          width: GameHome.ScreenHeight + 1,
          height: GameHome.ScreenWidth + 1,
        }}
      >
        <div className={styles.header}>
          <div className={styles.back} onClick={GoBack}>返回</div>
          <div className={styles.notice}>
            <div>
              <span>充值请精确到小数点后两位，充值金额足额到账啦啦啦</span>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.account}>
              {userName}
            </div>
            <div className={styles.balance}>
              {balance}
            </div>
            <div className={styles.btn} />
          </div>
        </div>

        <div className={styles.list}>
          {data && data.map((tableItem) => {
            let tableStatusStyle = '';
            let tableStatus = '';
            if (tableItem.status === 1) {
              tableStatus = '已完结';
              tableStatusStyle = 'over';
            } else if (tableItem.milliscond > 0) {
              tableStatus = '请下注';
              tableStatusStyle = 'begin';
            } else {
              tableStatus = '待开牌';
              tableStatusStyle = 'open';
            }
            return (
              <Link
                className={styles.tableItem}
                key={tableItem.tableId}
                to={`/game_detail?fastType=${fastType}&gameType=${gameType}&id=${tableItem.tableId}`}
              >
                <div className={styles.type}>
                  <div className={styles.item}>
                    <span className={styles.name}>龙</span>
                    <span className={styles.count}>{tableItem.dragonTotal}</span>
                  </div>
                  <div className={`${styles.item} ${styles.tie}`}>
                    <span className={styles.name}>和</span>
                    <span className={styles.count}>{tableItem.evenTotal}</span>
                  </div>
                  <div className={`${styles.item} ${styles.tiger}`}>
                    <span className={styles.name}>虎</span>
                    <span className={styles.count}>{tableItem.tigerTotal}</span>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles['content-header']}>
                    <span className={styles.name}>
                      {tableItem.tableName}
                    </span>
                    <span>
                      靴次
                      {tableItem.shoe}
                    </span>
                    <span>
                      铺次
                      {tableItem.gameNum}
                    </span>
                    <span className={`${styles.status} ${styles[tableStatusStyle]}`}>
                      {tableStatus}
                    </span>
                    <span>
                      {`限红 ${tableItem.min}-${tableItem.max}`}
                    </span>
                  </div>
                  <div className={styles.road}>
                    <PearlRoad data={tableItem.resultArr} />
                    <BigRoad data={tableItem.resultArr} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

GameHome.propTypes = propTypes;
GameHome.defaultProps = defaultProps;

export default connect(
  state => ({
    base: state.base,
    userName: state.user.name,
    balance: state.account.balance,
    table: state.table,
  }),
  {
    getTableInitDataAction: getTableInitData,
    updateTableDataAction: updateTableData,
  },
)(GameHome);
