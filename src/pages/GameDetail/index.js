/* global window, document */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Toast } from "antd-mobile";
import classnames from "classnames";
import PearlRoad from "../../components/PearlRoad";
import BigRoad from "../../components/BigRoad";
import { doChip, getTableChiped, getTableInitData } from "../../actions/table";
import SocketUtils from "../../utils/socket";
import {
  TABLE_TCB,
  TABLE_BACCARAT,
  TABLE_BACCARAT_FAST,
  TABLE_TCB_FAST
} from "../../constants/api";
import { decrypt } from "../../utils/info";
import { getURLParamsObject } from "../../utils/url";
import { GoBack } from "../../utils/history";
import tableBg from "../../images/type/table_bg.png";
import tableBg1 from "../../images/type/table_bg_1.png";
import tableBg2 from "../../images/type/table_bg_2.png";
import tableBg3 from "../../images/type/table_bg_3.png";
import tableBg4 from "../../images/type/table_bg_4.png";
import tableBg5 from "../../images/type/table_bg_5.png";
import GameHome from "../GameHome";
import styles from "./GameDetail.scss";

const propTypes = {};

const defaultProps = {};

const COUNTER = [10, 50, 100, 500, 1000, 5000, 10000, 50000];
class GameDetail extends Component {
  /**
   * [getUrl description]
   * @param  {[type]} gameType [1.龙虎斗 2.百家乐]
   * @param  {[type]} fastType [1.普通 2.急速]
   * @return {[type]}          [description]
   */
  static getUrl = (gameType, fastType) => {
    if (gameType === 1) {
      return fastType === 1 ? TABLE_TCB : TABLE_TCB_FAST;
    }
    if (gameType === 2) {
      return fastType === 1 ? TABLE_BACCARAT : TABLE_BACCARAT_FAST;
    }
    return "";
  };

  constructor(props) {
    super(props);

    const { fastType, gameType, id } = getURLParamsObject();

    this.fastType = Number(fastType);
    this.gameType = Number(gameType);
    this.id = id;

    if (!GameHome.ScreenHeight) {
      GameHome.ScreenHeight = window.screen.availHeight;
    }
    if (!GameHome.ScreenWidth) {
      GameHome.ScreenWidth = window.screen.width;
    }
    document.body.style.backgroundColor = "transparent";

    this.state = {
      data: null,
      amount: 10,
      wagerType: null,
      details: []
    };
  }

  componentDidMount() {
    this.initDetails();
    GameHome.setBodyHideScroll();
    GameHome.setBodyToastRotate();
  }

  componentWillUnmount() {
    GameHome.setBodyAutoScroll();
    GameHome.setBodyToastBack();
    if (window.JsToJava) {
      window.JsToJava.appClose();
    }
  }

  selectCounter = value => () => {
    this.setState({ amount: value });
  };

  changeWagerType = type => () => {
    const { data, wagerType } = this.state;
    // if (!data.milliscond || data.milliscond <= 0) {
    //   Toast.info('当前不是下注时间', 1.5);
    //   return;
    // }
    if (type !== wagerType) {
      this.setState({
        wagerType: type
      });
      return;
    }
    this.setState(state => {
      const newDetail = state.details.concat();
      newDetail[1][type] += state.amount;
      return {
        wagerType: type,
        details: newDetail
      };
    });
  };

  initDetails = () => {
    const { getTableChipedAction, getTableInitDataAction } = this.props;
    const { fastType, gameType, id } = getURLParamsObject();

    getTableInitDataAction(
      {
        fastType: 1,
        gameType: 2,
        tableId: id
      },
      this.initSucc
    );
    getTableChipedAction(
      { tableId: id },
      data => {
        const details = this.getFormatDetails(data);
        this.setState({
          details
        });
      },
      err => console.log(err)
    );
  };

  initSucc = data => {
    if (window.JsToJava) {
      window.JsToJava.appSwitchSource(data.videoStream1);
    }
    this.connectSocket();
  };

  doChip = () => {
    const { doChipAction } = this.props;
    const { details, data } = this.state;
    if (!data.milliscond || data.milliscond <= 0) {
      Toast.info("当前不是下注时间", 1.5);
      return;
    }
    const chipDetails = Object.keys(details[1])
      .filter(key => details[key] !== 0)
      .map(item => ({
        amount: details[item],
        wagerType: item
      }));
    doChipAction(
      {
        details: chipDetails,
        gameType: this.gameType,
        tableId: this.id
      },
      this.chipSucc,
      this.chipErr
    );
  };

  cancelChip = () => {
    this.setState(state => ({
      details: [
        state.details[0],
        {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        }
      ]
    }));
  };

  getFormatDetails = data => {
    const initDetails = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };
    data.forEach(item => {
      initDetails[item.wagerType] = item.amount;
    });
    return [
      initDetails,
      {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    ];
  };

  chipSucc = data => {
    const details = this.getFormatDetails(data);
    this.setState({
      details
    });
  };

  chipErr = err => {};

  getBackgroundImage = () => {
    /* 12345   庄闲和庄对闲对 */
    const { wagerType } = this.state;
    switch (wagerType) {
      case 1:
        return tableBg1;
      case 2:
        return tableBg2;
      case 3:
        return tableBg3;
      case 4:
        return tableBg4;
      case 5:
        return tableBg5;
      default:
        return tableBg;
    }
  };

  connectSocket = () => {
    Toast.loading("正在加载", 0);
    const { fastType, gameType, id } = getURLParamsObject();
    const url = `${GameDetail.getUrl(this.gameType, this.fastType)}/${this.id}`;
    SocketUtils.subscribe(url, this.handleSocketData);
  };

  handleSocketData = res => {
    Toast.hide();
    const { base, updateTableDataAction } = this.props;
    const { fastType, gameType } = getURLParamsObject();
    if (!base.wsKey) {
      return;
    }
    const data = JSON.parse(decrypt(res, base.wsKey));
    this.setState({ data });
  };

  getUIdetails = details => {
    const format = {};
    details.forEach(detail => {
      Object.keys(detail).forEach(key => {
        if (format[key] === undefined) {
          format[key] = 0;
        }
        format[key] += detail[key];
      });
    });
    return format;
  };

  render() {
    const { data } = this.state;
    const { amount, details } = this.state;
    const formatDetails = this.getUIdetails(details);
    const backgroundImage = this.getBackgroundImage();
    if (!data) {
      return null;
    }
    const { status, milliscond } = data;
    let statusTitle = "";
    if (milliscond > 0) {
      statusTitle = "请下注";
    } else if (status === 0 && milliscond <= 0) {
      statusTitle = "待开牌";
    } else if (status === 1 && milliscond <= 0) {
      statusTitle = "已完结";
    }
    return (
      <div
        className={styles.gameDetail}
        style={{
          width: GameHome.ScreenHeight + 1,
          height: GameHome.ScreenWidth + 1
        }}
      >
        <img src={tableBg} alt="" style={{ display: "none" }} />
        <img src={tableBg1} alt="" style={{ display: "none" }} />
        <img src={tableBg2} alt="" style={{ display: "none" }} />
        <img src={tableBg3} alt="" style={{ display: "none" }} />
        <img src={tableBg4} alt="" style={{ display: "none" }} />
        <img src={tableBg5} alt="" style={{ display: "none" }} />
        <div className={styles.header}>
          <div className={styles.back} onClick={GoBack}>
            返回
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.status}>{statusTitle}</div>
          <div className={styles.road}>
            <PearlRoad data={data.resultArr} size={20} />
            <BigRoad data={data.resultArr} size={10} />
          </div>
          <div className={styles.counterWraper}>
            <div className={styles.counter}>
              {COUNTER.map(value => {
                const cls = classnames(styles.item, {
                  [styles[`item_${value}`]]: true,
                  [styles.active]: value === amount
                });

                return (
                  <div
                    className={cls}
                    key={value}
                    onClick={this.selectCounter(value)}
                  />
                );
              })}
            </div>
          </div>

          {/* 下注区域 */}
          {/* 12345   庄闲和庄对闲对 */}
          <div className={styles.chip}>
            <div
              className={styles.table}
              style={{ backgroundImage: `url(${backgroundImage})` }}
            >
              <div className={styles.line_1}>
                <div
                  className={styles.xiandui}
                  onClick={this.changeWagerType(5)}
                >
                  <span>1赔11</span>
                  <span className={styles.value}>{formatDetails[5]}</span>
                </div>
                <div className={styles.he} onClick={this.changeWagerType(3)}>
                  <span>1赔8</span>
                  <span className={styles.value}>{formatDetails[3]}</span>
                </div>
                <div
                  className={styles.zhuangdui}
                  onClick={this.changeWagerType(4)}
                >
                  <span>1赔11</span>
                  <span className={styles.value}>{formatDetails[4]}</span>
                </div>
              </div>
              <div className={styles.line_2}>
                <div className={styles.xian} onClick={this.changeWagerType(2)}>
                  <span>1赔1</span>
                  <span className={styles.value}>{formatDetails[2]}</span>
                </div>
                <div
                  className={styles.zhuang}
                  onClick={this.changeWagerType(1)}
                >
                  <span>1赔0.95</span>
                  <span className={styles.value}>{formatDetails[1]}</span>
                </div>
              </div>
            </div>

            <div className={styles.btn}>
              <div
                className={`${styles.item} ${styles.cancel}`}
                onClick={this.cancelChip}
              />
              <div
                className={`${styles.item} ${styles.sure}`}
                onClick={this.doChip}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GameDetail.propTypes = propTypes;
GameDetail.defaultProps = defaultProps;

export default connect(
  state => ({
    base: state.base,
    userName: state.user.name,
    balance: state.account.balance,
    table: state.table
  }),
  {
    doChipAction: doChip,
    getTableChipedAction: getTableChiped,
    getTableInitDataAction: getTableInitData
  }
)(GameDetail);
