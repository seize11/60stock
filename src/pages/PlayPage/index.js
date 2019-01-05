/* global window, document */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./Play.scss";
import { GoBack } from "../../utils/history";
import PearlRoad from "../../components/PearlRoad";
import BigRoad from "../../components/BigRoad";
import { decrypt } from "../../utils/info";
import { getURLParamsObject } from "../../utils/url";
import { getTableInitData, updateTableData } from "../../actions/table";
import SocketUtils from "../../utils/socket";
import Link from "../../components/Link";
import Page from "../../components/Page";
import PlayTopBar from "../../components/Play/PlayTopBar";
import PlaySecondBar from "../../components/Play/PlaySecondBar";
import Period from "../../components/Play/Period";
import List from "../../components/Play/List";
import MaskNav from "../../components/Play/MaskNav";
import TopBar from "../../components/TopBar";
import PopUpSelectResults from "../../components/Play/PopUpSelectResults";
import {
  getToatalList,
  get_lottery_info,
  get_Balance,
  changeLotteryInfo
} from "../../actions/play";
import SockJS from "../../lib/sockjs";

const propTypes = {};

const defaultProps = {
  leftContent: "北京赛车(PK10)"
};

class PlayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    // this.socketConnect({
    //   // url: "http://zyy.s3.natapp.cc/ws",
    //   url: "http://www.wanfengtest.com/wf/ws",
    //   subscribeUrl: "/topic/lottery/info/1",
    //   // subscribeUrl: "/topic/baccarat/trend/",
    //   callback: this.handleSocketData
    // });
    this.props.getToatalListAction();
    this.props.get_lottery_info();
    this.props.get_Balance();
  }

  componentWillUnmount() {
    SocketUtils.unsubscribe();
  }
  socketConnect = ({ url, subscribeUrl, callback }) => {
    // 链接Socket的endpoint名称为endpointWisely
    const socket = new SockJS(url);
    // 使用STOMP子协议的WebSocket客户端
    const stompClient = Stomp.over(socket);
    // 链接WebSocket服务端
    stompClient.connect(
      {},
      frame => {
        // 通过stompClient.subscribe订阅/topic/getResponse目标发送的消息，即控制器中的@SendTo
        stompClient.subscribe(subscribeUrl, response => {
          callback(response.body);
        });
      }
    );
  };
  handleSocketData = res => {
    // console.log(this.props);
    // console.log(res);
    const { base } = this.props;
    if (!base.wsKey) {
      return;
    }
    let data = JSON.parse(decrypt(res, base.wsKey));
    // console.log(data);
    this.props.changeLotteryInfo(data);
    // updateTableDataAction({ fastType: 1, gameType: 2, data });
  };

  renderTopBarContent = () => <div>存款</div>;

  handleIconClick() {
    this.setState({ show: !this.state.show });
  }
  handleExit() {
    this.setState({ show: false });
  }

  render() {
    const { userName, balance, table, leftContent } = this.props;
    console.log(this.props);
    return (
      <div className={styles.page}>
        <PlayTopBar
          {...this.props}
          handleClick={() => {
            this.handleIconClick();
          }}
        />
        <PlaySecondBar />
        <Period {...this.props} />
        <List {...this.props} />
        {this.props.changeSelectPops.length > 0 ? (
          <PopUpSelectResults {...this.props} />
        ) : null}
        <MaskNav
          isShow={this.state.show}
          handleExit={() => {
            this.handleExit();
          }}
          {...this.props}
        />
      </div>
    );
  }
}

PlayPage.propTypes = propTypes;
PlayPage.defaultProps = defaultProps;

export default connect(
  state => {
    // console.log(state, "*********");
    return {
      base: state.base,
      userName: state.user.name,
      balance: state.account.balance,
      table: state.table,
      changeSelectPops: state.play.selectIds,
      getTotalList: state.play.totalList,
      lottery_info: state.play.lottery_info,
      balanceInfo: state.play.balanceInfo
    };
  },
  {
    getTableInitDataAction: getTableInitData,
    updateTableDataAction: updateTableData,
    getToatalListAction: getToatalList,
    get_lottery_info,
    changeLotteryInfo,
    get_Balance
  }
)(PlayPage);
