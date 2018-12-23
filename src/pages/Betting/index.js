/* global SockJS, Stomp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';
import Page from '../../components/Page';
import Notice from '../../components/Notice';
import { decrypt } from '../../utils/info';
import { getTableInitData, updateTableData } from '../../actions/table';
import styles from './Betting.scss';


const propTypes = {
  getTableInitDataAction: PropTypes.func,
};
const road = new Array(6 * 15).fill(0);
const circleColor = {
  1: '#d40d08', // 庄
  2: '#113893', // 闲
};
const defaultProps = {
  getTableInitDataAction: () => {},
};

function socketConnect({
  url,
  subscribeUrl,
  callback,
}) {
  // 链接Socket的endpoint名称为endpointWisely
  const socket = new SockJS(url);
  // 使用STOMP子协议的WebSocket客户端
  const stompClient = Stomp.over(socket);
  // 链接WebSocket服务端
  stompClient.connect({}, (frame) => {
    // 通过stompClient.subscribe订阅/topic/getResponse目标发送的消息，即控制器中的@SendTo
    stompClient.subscribe(subscribeUrl, (response) => {
      callback(response.body);
    });
  });
}
class Betting extends Component {
  componentDidMount() {
    socketConnect({
      url: 'http://zyy.s3.natapp.cc/ws',
      subscribeUrl: '/topic/baccarat/trend',
      callback: this.handleSocketData,
    });
    const { getTableInitDataAction } = this.props;
    getTableInitDataAction({
      fastType: 1,
      gameType: 2,
    });
  }

  handleSocketData = (res) => {
    const { base, updateTableDataAction } = this.props;
    if (!base.wsKey) {
      return;
    }
    const data = JSON.parse(decrypt(res, base.wsKey));
    updateTableDataAction({
      fastType: 1,
      gameType: 2,
      data,
    });
  }

  renderTopBarContent = () => (
    <div className={styles.notice}>
      <Notice width="65%">充值请精确到小数点后两位，充值金额足额到账啦啦啦</Notice>
      <div className={styles.balance}>
        0.00
      </div>
      <div className={styles.balance}>
        0.00
      </div>
    </div>
  )

  render() {
    const { table } = this.props;
    const data = table['1_2'];
    const bigRoad = new Array(6 * 15).fill(0);
    return (
      <Page
        game
        className={styles.main}
        renderTopBarContent={this.renderTopBarContent}
      >
        {data && data.map((item) => {
          const bigRoadData = [];
          let tableStatus = '';
          let tableStatusStyle = '';
          let lastWin = null;
          let emptyLine = 0;
          let lastStep = null;
          item.resultArr.forEach((res) => {
            // debugger;
            const win = Number.parseFloat(res);
            if (!lastWin) {
              bigRoadData[0] = {
                win,
                tieCount: 0,
              };
              lastWin = win;
              lastStep = 0;
              return;
            }

            if (win === 3) {
              bigRoadData[lastStep].tieCount += 1;
            } else if (win === lastWin) {
              if (lastStep % 6 === 5 || bigRoadData[lastStep + 1]) {
                lastStep += 6;
                bigRoadData[lastStep] = {
                  win,
                  tieCount: 0,
                };
              } else {
                lastStep += 1;
                bigRoadData[lastStep] = {
                  win,
                  tieCount: 0,
                };
              }
            } else {
              lastWin = Number.parseFloat(res);
              emptyLine += 1;
              lastStep = emptyLine * 6;
              bigRoadData[lastStep] = {
                win,
                tieCount: 0,
              };
            }
          });

          if (item.status === 1) {
            tableStatus = '已完结';
            tableStatusStyle = 'over';
          } else if (item.milliscond > 0) {
            tableStatus = '请下注';
            tableStatusStyle = 'begin';
          } else {
            tableStatus = '待开牌';
            tableStatusStyle = 'open';
          }
          return (
            <div className={styles.wrap} key={item.tableId}>
              <div className={styles.card} key={item.tableId}>
                <div className={styles.type}>
                  <div className={styles.item}>
                    <span className={styles.name}>龙</span>
                    <span className={styles.count}>{item.dragonTotal}</span>
                  </div>
                  <div className={`${styles.item} ${styles.tie}`}>
                    <span className={styles.name}>和</span>
                    <span className={styles.count}>{item.evenTotal}</span>
                  </div>
                  <div className={`${styles.item} ${styles.tiger}`}>
                    <span className={styles.name}>虎</span>
                    <span className={styles.count}>{item.tigerTotal}</span>
                  </div>
                </div>

                <div className={styles.content}>
                  <div className={styles.header}>
                    <span className={styles.name}>
                      {item.tableName}
                    </span>
                    <span>
                      靴次
                      {item.shoe}
                    </span>
                    <span>
                      铺次
                      {item.gameNum}
                    </span>
                    <span
                      className={`${styles.status} ${styles[tableStatusStyle]}`}
                    >
                      {tableStatus}
                    </span>
                    <span>
                      {`限红 ${item.min}-${item.max}`}
                    </span>
                  </div>

                  <div className={styles.box}>
                    <div className={styles.dish}>
                      {road.map((dishItem, index) => {
                        const res = item.resultArr[index];
                        let cls = styles.item;
                        if (res) {
                          const type = Number.parseFloat(res);
                          cls += ` ${styles[`item_${type}`]}`;
                        }

                        return (
                          <div
                            className={cls}
                            key={dishItem + index}
                          />
                        );
                      })}
                    </div>

                    <div className={styles.bigRoad}>
                      {bigRoad.map((dishItem, index) => {
                        const res = bigRoadData[index];
                        return (
                          <div
                            className={`${styles.item} ${res && res.tieCount !== 0 && styles.hasTie}`}
                            key={dishItem + index}
                          >
                            {res && (
                              <svg
                                width="100%"
                                height="100%"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                className={styles.circle}
                              >
                                <circle
                                  cx="50%"
                                  cy="50%"
                                  r="40%"
                                  stroke={circleColor[res.win]}
                                  strokeWidth="2"
                                  fill="transparent"
                                />
                                {res.tieCount !== 0 && (
                                  <text
                                    className={styles.text}
                                    x="50%"
                                    y="100%"
                                  >
                                    {res.tieCount}
                                  </text>
                                )}
                              </svg>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      </Page>
    );
  }
}

Betting.propTypes = propTypes;
Betting.defaultProps = defaultProps;


export default connect(
  state => ({
    table: state.table,
    base: state.base,
  }),
  {
    getTableInitDataAction: getTableInitData,
    updateTableDataAction: updateTableData,
  },
)(Betting);
