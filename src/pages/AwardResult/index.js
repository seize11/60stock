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

const mockData3 = [
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

const defaultProps = {
	leftContent: '北京赛车(PK10)',
};

class AwardResult extends Component {
	constructor(props) {
		super(props);
		this.state = { isShow: false, date: now, type: 'num' }; // 十二月 24日 2018, 9:20:50 晚上
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

	handleSocketData = res => {
		// const { base,  {
		//   return;
		// }updateTableDataAction } = this.props;
		// const { fastType, gameType } = getURLParamsObject();
		// if (!base.wsKey)
		// const data = JSON.parse(decrypt(res, base.wsKey));
		// updateTableDataAction({
		//   fastType,
		//   gameType,
		//   data
		// });
	};
	renderTopBarContent = () => <div>存款</div>;
	showType = type => {
		this.setState({ type });
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
					<div className={styles.award_result_thead_td}>
						<span
							onClick={() => {
								this.showType('num');
							}}
						>
							号码
						</span>{' '}
					</div>
					<div className={styles.award_result_thead_td}>
						<span
							onClick={() => {
								this.showType('size');
							}}
						>
							大小
						</span>
					</div>
					<div className={styles.award_result_thead_td}>
						<span
							onClick={() => {
								this.showType('double');
							}}
						>
							单双
						</span>
					</div>
					<div className={styles.award_result_thead_td}>
						<span
							onClick={() => {
								this.showType('dragon');
							}}
						>
							冠亚/龙虎
						</span>
					</div>
				</div>
				<div className={styles.award_result_tbody}>
					{mockData1.map((item, index) => {
						return (
							<div className={styles.award_result_tbody_tr} key={index}>
								<div className={styles.award_result_tbody_td}>
									<p>{item.stage}</p>
								</div>
								<div className={styles.award_result_tbody_td}>
									<p>{item.time}</p>
								</div>
								{item.list.map((item, index) => {
									let style;
									switch (item) {
										case '1':
											style = styles.yellow;
											break;
										case '2':
											style = styles.blue;
											break;
										case '3':
											style = styles.gray;
											break;
										case '4':
											style = styles.orange;
											break;
										case '5':
											style = styles.lightblue;
											break;
										case '6':
											style = styles.purple;
											break;
										case '7':
											style = styles.lightgray;
											break;
										case '8':
											style = styles.red;
											break;
										case '9':
											style = styles.winered;
											break;
										case '10':
											style = styles.green;
											break;
										default:
											style = styles.blue;
											break;
									}

									return (
										<div className={styles.award_result_tbody_td} key={index}>
											<span className={style}>{item}</span>
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
