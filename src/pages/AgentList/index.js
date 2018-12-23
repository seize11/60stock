/* global window, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import {
  Toast, Modal, List, InputItem, Icon,
} from 'antd-mobile';
import Page from '../../components/Page';
import RecordsItem from '../../components/RecordsItem';
import Button from '../../components/Button';
import { getAgentList, setAgentItem } from '../../actions/agent';

import styles from './AgentList.scss';

const Item = List.Item;
const alert = Modal.alert;
const propTypes = {};

const defaultProps = {};

class AgentList extends Component {
  static propTypes = {};

  static defaultProps = {};

  documentElement = document.documentElement;

  body = document.body;

  state = {
    pageNum: 1,
    pageSize: 10,
    isLoading: false,
    hasMore: true,
    search: '',
    data: [],
  }

  componentDidMount() {
    this.loadingData();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  loadingData = () => {
    const { getAgentListAction } = this.props;
    const {
      search, pageNum, pageSize, hasMore, isLoading,
    } = this.state;
    if (!hasMore || isLoading) {
      return;
    }
    this.setState({ isLoading: true });
    getAgentListAction({
      account: search,
      page: pageNum,
      limit: pageSize,
    }, this.loadingSucc);
  }

  loadingSucc = (res) => {
    this.setState(state => ({
      data: state.data.concat(res),
      isLoading: false,
      hasMore: res.length === state.pageSize,
      pageNum: state.pageNum + 1,
    }));
  }

  handleScroll = () => {
    const scrollTop = this.documentElement.scrollTop || window.pageYOffset || this.body.scrollTop;

    if (this.documentElement.scrollHeight - (this.documentElement.clientHeight + scrollTop) <= 100) {
      this.loadingData();
    }
  }

  onChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  doSearch = () => {
    this.setState({
      isLoading: false,
      hasMore: true,
      pageNum: 1,
      data: [],
    }, () => {
      this.loadingData();
    });
  }

  openModal = item => () => {
    const { setAgentItemAction } = this.props;
    alert('设置代理', (
      <List>
        <InputItem
          value={item.account}
          disabled
        >
          用户账户
        </InputItem>
        <InputItem
          defaultValue={item.settlementPoint}
          ref={(c) => { this.settlementPoint = c; }}
        >
          返点%
        </InputItem>
        <InputItem
          defaultValue={item.betMaxAmount}
          ref={(c) => { this.betMaxAmount = c; }}
        >
          限红
        </InputItem>
      </List>
    ), [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: () => {
          const betMaxAmount = this.betMaxAmount.state.value;
          const settlementPoint = this.settlementPoint.state.value;
          setAgentItemAction({
            betMaxAmount, settlementPoint, uid: item.uid,
          }, () => this.doSearch());
        },
      },
    ]);
  }

  renderTopBarContent = () => (
    <div className={styles.notice}>
      我的代理
    </div>
  )

  render() {
    const {
      search, data, isLoading, hasMore,
    } = this.state;

    return (
      <Page
        renderTopBarContent={this.renderTopBarContent}
      >
        <div className={styles['agent-list']}>
          <div className={styles.header}>
            <input
              type="text"
              value={search}
              className={styles.search}
              onChange={this.onChange}
              placeholder="按用户名搜索"
            />
            <div className={styles.btn} onClick={this.doSearch}>搜索</div>
          </div>
          <div className={styles.list}>
            {data.map(item => (
              <div
                className={styles.item}
                key={item.account}
                onClick={this.openModal(item)}
              >
                <div className={styles.left}>
                  <span>{`账号：${item.account}`}</span>
                  <span>{`返点：${item.settlementPoint}%`}</span>
                  <span>{`限红：${item.betMaxAmount}`}</span>
                  <span>{`余额：${item.balance}`}</span>
                </div>
                <div className={styles.right}>
                  设置
                </div>
              </div>
            ))}
          </div>

          <div className={styles.loading}>
            {hasMore ? (
              <span>
                <Icon type="loading" />
                正在加载
              </span>
            ) : '全部加载'}
          </div>
        </div>
      </Page>
    );
  }
}

AgentList.propTypes = propTypes;
AgentList.defaultProps = defaultProps;

export default connect(
  state => ({
    account: state.account,
  }),
  {
    getAgentListAction: getAgentList,
    setAgentItemAction: setAgentItem,
  },
)(createForm()(AgentList));
