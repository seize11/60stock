/* global window, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import {
  Toast, Modal, Picker, DatePicker,
} from 'antd-mobile';
import Page from '../../components/Page';
import RecordsItem from '../../components/RecordsItem';
import Button from '../../components/Button';
import { getAccountDetails } from '../../actions/account';
import { getRecords } from '../../actions/user';
import { formatTimestamp } from '../../utils/time';

import styles from './BillRecord.scss';

const propTypes = {};

const defaultProps = {};

class BillRecord extends Component {
  static propTypes = {};

  static defaultProps = {};

  documentElement = document.documentElement;

  body = document.body;

  state = {
    timeType: 1,
    inited: false,
    pageNum: 1,
    pageSize: 10,
    isLoading: false,
    hasMore: true,
    data: [],
  }

  componentDidMount() {
    this.getAccountDetails();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  changeTimeType = timeType => () => {
    const { form: { setFieldsValue } } = this.props;
    this.setState({
      timeType,
    });
    setFieldsValue({
      begain: undefined,
      end: undefined,
    });
  }

  getAccountDetails = () => {
    Toast.loading('正在加载', 0);
    const {
      getAccountDetailsAction,
      form: { setFieldsValue },
    } = this.props;
    const { inited } = this.state;
    getAccountDetailsAction((res) => {
      Toast.hide();
      if (!inited) {
        setFieldsValue({
          type: [res[0].accountType],
        });
        this.setState({ inited: true });
        this.loadingData();
      }
    }, () => Toast.hide());
  }

  checkRecords = () => {
    this.setState({
      pageNum: 1,
      pageSize: 10,
      isLoading: false,
      hasMore: true,
      data: [],
    }, () => this.loadingData());
  }

  loadingData = () => {
    const {
      pageNum,
      pageSize,
      isLoading,
      hasMore,
      timeType,
    } = this.state;
    const { getRecordsAction, form: { validateFields } } = this.props;

    if (!hasMore || isLoading) {
      return;
    }
    this.setState({ isLoading: true });
    validateFields((error, value) => {
      getRecordsAction({
        accountType: value.type[0],
        startTime: value.begain && `${formatTimestamp(value.begain)} 00:00:00`,
        endTime: value.begain && `${formatTimestamp(value.begain)} 23:59:59`,
        timeType,
        page: pageNum,
        limit: pageSize,
      }, (res) => {
        this.setState(state => ({
          data: state.data.concat(res),
          isLoading: false,
          hasMore: res.length === state.pageSize,
          pageNum: state.pageNum + 1,
        }));
      });
    });
  }

  handleScroll = () => {
    const scrollTop = this.documentElement.scrollTop || window.pageYOffset || this.body.scrollTop;

    if (this.documentElement.scrollHeight - (this.documentElement.clientHeight + scrollTop) <= 100) {
      this.loadingData();
    }
  }

  renderTopBarContent = () => (
    <div className={styles.notice}>
      交易记录
    </div>
  )

  render() {
    const {
      account: { details },
      form: { getFieldProps, validateFields },
    } = this.props;
    const { timeType, data, hasMore } = this.state;
    let selectItem = {};
    let begainTime = null;
    let endTime = null;
    validateFields((error, value) => {
      if (!value.type) {
        return;
      }
      begainTime = formatTimestamp(value.begain);
      endTime = formatTimestamp(value.end);
      selectItem = details.find(item => value.type[0] === item.accountType);
    });
    const pickerData = details.map(item => ({
      value: item.accountType,
      label: item.accountName,
    }));
    return (
      <Page
        renderTopBarContent={this.renderTopBarContent}
      >
        <div className={styles.card}>
          <div className={styles.title}>选择账户类型</div>
          <Picker
            {...getFieldProps('type')}
            data={pickerData}
            cols={1}
          >
            <div className={styles.details}>
              <span className={styles.name}>{selectItem.accountName}</span>
              <span className={styles.icon} />
            </div>
          </Picker>

        </div>
        <div className={styles.card}>
          <div className={styles.title}>选择时间</div>
          <div className={styles.main}>
            <DatePicker
              {...getFieldProps('begain')}
              format="YYYY-MM-DD"
              mode="date"
            >
              <div className={styles.date}>
                {begainTime}
              </div>
            </DatePicker>
            <div className={styles.line}>
              <div />
            </div>
            <DatePicker
              {...getFieldProps('end')}
              format="YYYY-MM-DD"
              mode="date"
            >
              <div className={styles.date}>
                {endTime}
              </div>
            </DatePicker>
          </div>
        </div>

        <div className={styles.timeType}>
          <span
            className={timeType === 1 ? styles.active : ''}
            onClick={this.changeTimeType(1)}
          >
            今天
          </span>
          <span
            className={timeType === 2 ? styles.active : ''}
            onClick={this.changeTimeType(2)}
          >
            一周内
          </span>
          <span
            className={timeType === 3 ? styles.active : ''}
            onClick={this.changeTimeType(3)}
          >
            最近两周
          </span>
          <span
            className={timeType === 4 ? styles.active : ''}
            onClick={this.changeTimeType(4)}
          >
            最近一个月
          </span>
        </div>

        <Button onClick={this.checkRecords}>查询</Button>

        <div className={styles.list}>
          {data.map(item => (
            <RecordsItem
              balance={item.balance}
              amount={item.amount}
              code={item.code}
              createTime={item.createTime}
              remarks={item.remarks}
              typeText={item.typeText}
              key={item.createTime}
            />
          ))}
        </div>
        {(data.length !== 0 || !hasMore) && (
          <div className={styles.loadingPa}>{hasMore ? '正在加载' : '全部加载'}</div>
        )}
      </Page>
    );
  }
}

BillRecord.propTypes = propTypes;
BillRecord.defaultProps = defaultProps;

export default connect(
  state => ({
    account: state.account,
  }),
  {
    getRecordsAction: getRecords,
    getAccountDetailsAction: getAccountDetails,
  },
)(createForm()(BillRecord));
