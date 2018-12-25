/* global window, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './index.scss';
import { GoBack } from '../../utils/history';
import PearlRoad from '../../components/PearlRoad';
import BigRoad from '../../components/BigRoad';
import { decrypt } from '../../utils/info';
import { getURLParamsObject } from '../../utils/url';
import { getTableInitData, updateTableData } from '../../actions/table';
import SocketUtils from '../../utils/socket';
import Link from '../../components/Link';
import Page from '../../components/Page';
import MaskNav from '../../components/Play/MaskNav';
import HeaderBar from '../../components/Play/HeaderBar';
import { DatePicker, Icon } from 'antd-mobile';
import moment from 'moment';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const propTypes = {};
const colorConfig = {
	1: 'yellow',
	2: 'blue',
	3: 'gray',
	4: 'orange',
	5: 'lightblue',
	6: 'purple',
	7: 'lightgray',
	8: 'red',
	9: 'winered',
	10: 'green',
};

const headConfig = [
	{ type: 'num', name: '号码' },
	{ type: 'size', name: '大小' },
	{ type: 'double', name: '单双' },
	{ type: 'dragon', name: '冠亚/龙虎' },
];
const mockData = [
	{
		stage: '123123213',
		time: '08:18',
		list: ['大', '大', '大', '小', '小', '小', '小', '小', '大', '大'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['大', '大', '大', '小', '小', '小', '小', '小', '大', '大'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['大', '大', '大', '小', '小', '小', '小', '小', '大', '大'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['大', '大', '大', '小', '小', '小', '小', '小', '大', '大'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['大', '大', '大', '小', '小', '小', '小', '小', '大', '大'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['大', '大', '大', '小', '小', '小', '小', '小', '大', '大'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['大', '大', '大', '小', '小', '小', '小', '小', '大', '大'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['大', '大', '大', '小', '小', '小', '小', '小', '大', '大'],
	},
];

const mockData1 = [
	{
		stage: '123123213',
		time: '08:18',
		list: ['10', '6', '9', '1', '3', '2', '5', '4', '7', '8'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['10', '6', '9', '1', '3', '2', '5', '4', '7', '8'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['10', '6', '9', '1', '3', '2', '5', '4', '7', '8'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['10', '6', '9', '1', '3', '2', '5', '4', '7', '8'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['10', '6', '9', '1', '3', '2', '5', '4', '7', '8'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['10', '6', '9', '1', '3', '2', '5', '4', '7', '8'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['10', '6', '9', '1', '3', '2', '5', '4', '7', '8'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['10', '6', '9', '1', '3', '2', '5', '4', '7', '8'],
	},
];

const mockData2 = [
	{
		stage: '123123213',
		time: '08:18',
		list: ['单', '单', '双', '双', '双', '双', '双', '单', '单', '单'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['单', '单', '双', '双', '双', '双', '双', '单', '单', '单'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['单', '单', '双', '双', '双', '双', '双', '单', '单', '单'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['单', '单', '双', '双', '双', '双', '双', '单', '单', '单'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['单', '单', '双', '双', '双', '双', '双', '单', '单', '单'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['单', '单', '双', '双', '双', '双', '双', '单', '单', '单'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['单', '单', '双', '双', '双', '双', '双', '单', '单', '单'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['单', '单', '双', '双', '双', '双', '双', '单', '单', '单'],
	},
];

const mockData3 = [
	{
		stage: '123123213',
		time: '08:18',
		list: ['11', '单', '双', '双', '双', '双', '单', '单'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['11', '单', '双', '双', '双', '双', '单', '单'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['11', '单', '双', '双', '双', '双', '单', '单'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['11', '单', '双', '双', '双', '双', '单', '单'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['11', '单', '双', '双', '双', '双', '单', '单'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['11', '单', '双', '双', '双', '双', '单', '单'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['11', '单', '双', '双', '双', '双', '单', '单'],
	},
	{
		stage: '123123213',
		time: '08:18',
		list: ['11', '单', '双', '双', '双', '双', '单', '单'],
	},
];

const defaultProps = {
	leftContent: '北京赛车(PK10)',
};

class AwardResult extends Component {
	constructor(props) {
		super(props);
		this.state = { isShow: false, date: now, type: 'num', activeKey: 0, mockData: mockData1 }; // 十二月 24日 2018, 9:20:50 晚上
	}

	componentDidMount() {}

	componentWillUnmount() {
		SocketUtils.unsubscribe();
	}
	handleIconClick() {
		this.setState({ show: !this.state.show });
	}
	handleExit() {
		this.setState({ show: false });
	}
	showType = (type, key) => {
		if (key === 0) {
			this.setState({ type, activeKey: key, mockData: mockData1 });
		} else if (key === 1) {
			this.setState({ type, activeKey: key, mockData: mockData });
		} else if (key === 2) {
			this.setState({ type, activeKey: key, mockData: mockData2 });
		} else {
			this.setState({ type, activeKey: key, mockData: mockData3 });
		}
	};

	render() {
		const { userName, balance, table, leftContent } = this.props;

		return (
			<div className={styles.award_result}>
				<HeaderBar
					{...this.props}
					handleClick={() => {
						this.handleIconClick();
					}}
				/>
				<MaskNav
					{...this.props}
					isShow={this.state.show}
					handleExit={() => {
						this.handleExit();
					}}
				/>
				<div className={styles.award_result_header}>
					<div className={styles.award_result_header_left}>北京赛车</div>
					<div className={styles.award_result_header_right}>
						<DatePicker
							mode="date"
							format="YYYY:MM:DD"
							value={this.state.date}
							onChange={v => {
								console.log(v);
								this.setState({ date: v });
							}}
							extra="click to choose"
						>
							<span>
								{moment(this.state.date).format('YYYY-MM-DD')}
								<Icon type="right" />
							</span>
						</DatePicker>
					</div>
				</div>
				<div className={styles.award_result_thead}>
					<div className={styles.award_result_thead_td}>
						<p>期数</p>
					</div>
					<div className={styles.award_result_thead_td}>
						<p>时间</p>
					</div>
					{headConfig.map((item, index) => {
						return (
							<div className={styles.award_result_thead_td}>
								<span
									className={index === this.state.activeKey ? styles.thead_yellow : ''}
									onClick={() => {
										this.showType(item.type, index);
									}}
								>
									{item.name}
								</span>
							</div>
						);
					})}
				</div>
				<div className={styles.award_result_tbody}>
					{this.state.mockData.map((item, index) => {
						return (
							<div className={styles.award_result_tbody_tr} key={index}>
								<div className={styles.award_result_tbody_td}>
									<p>{item.stage}</p>
								</div>
								<div className={styles.award_result_tbody_td}>
									<p>{item.time}</p>
								</div>
								{item.list.map((item, index) => {
									return (
										<div className={styles.award_result_tbody_td} key={index}>
											<span
												className={
													this.state.activeKey === 0
														? styles[colorConfig[item]] + ' ' + styles.gray_side
														: item === '单' || item === '大'
														? styles.blue
														: styles.orange
												}
											>
												{item}
											</span>
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

AwardResult.propTypes = propTypes;
AwardResult.defaultProps = defaultProps;

export default connect()(AwardResult);
