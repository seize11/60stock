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
import { getAwardResult, getToatalList } from '../../actions/play';
import SocketUtils from '../../utils/socket';
import Link from '../../components/Link';
import Page from '../../components/Page';
import MaskNav from '../../components/Play/MaskNav';
import HeaderBar from '../../components/Play/HeaderBar';
import { DatePicker, Icon, Toast } from 'antd-mobile';
import dateImage from '../../images/agent/date.png';
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

const defaultProps = {
	leftContent: '北京赛车(PK10)',
};

class AwardResult extends Component {
	constructor(props) {
		super(props);
		this.state = { isShow: false, date: now, type: 'num', activeKey: 0 }; // 十二月 24日 2018, 9:20:50 晚上
	}

	componentDidMount() {
		Toast.loading('加载中', 0, null, true);
		this.props
			.getAwardResultAction({ lotteryId: 1, date: moment(new Date()).format('YYYY-MM-DD') })
			.then(() => {
				setTimeout(() => {
					Toast.hide();
				}, 300);
			})
			.catch(() => {
				alert('请求出错!');
			});
	}

	componentWillUnmount() {
		SocketUtils.unsubscribe();
	}
	handleIconClick() {
		this.setState({ show: !this.state.show });
	}
	handleExit() {
		this.setState({ show: false });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.loading) {
		}
	}
	showType = (type, key) => {
		if (key === 0) {
			this.setState({ type, activeKey: key });
		} else if (key === 1) {
			this.setState({ type, activeKey: key });
		} else if (key === 2) {
			this.setState({ type, activeKey: key });
		} else {
			this.setState({ type, activeKey: key });
		}
	};

	handleDateChange(v) {
		this.setState({ date: v });
		Toast.loading('加载中', null, null, true);
		this.props.getAwardResultAction({ lotteryId: 1, date: moment(v).format('YYYY-MM-DD') }).then(() => {
			setTimeout(() => {
				Toast.hide();
			}, 300);
		});
	}

	render() {
		console.log(this.props);
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
								this.handleDateChange(v);
							}}
							extra="click to choose"
						>
							<span>
								{moment(this.state.date).format('YYYY-MM-DD')}
								<img src={dateImage} alt="" style={{ width: '0.4rem', verticalAlign: '-3%',marginLeft:'0.2rem' }} />
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
				{!this.props.awardResult.length && !this.props.loading ? (
					<span style={{ margin: '2rem auto' }}>暂无数据</span>
				) : null}
				<div />
				<div className={styles.award_result_tbody}>
					{this.props.awardResult.map((item, index) => {
						let data = [];
						if (this.state.activeKey === 0) {
							data = item.openCode.split(',');
						} else if (this.state.activeKey === 1) {
							data = item.smallOrBig.split(',');
						} else if (this.state.activeKey === 2) {
							data = item.singleOrDouble.split(',');
						} else {
							data = item.dragonOrTiger.split(',');
						}
						return (
							<div className={styles.award_result_tbody_tr} key={index}>
								<div className={styles.award_result_tbody_td}>
									<p>{item.expect}</p>
								</div>
								<div className={styles.award_result_tbody_td}>
									<p>{item.gyNum}</p>
								</div>
								{this.state.activeKey === 3 ? (
									<div className={styles.award_result_tbody_td} style={{ marginRight: '0.6rem' }}>
										<span
											style={{
												color: 'red',
												fontSize: '0.32rem',
												fontStyle: 'initial',
												fontWeight: 'initial',
											}}
										>
											{item.gyNum}
										</span>
									</div>
								) : null}

								{this.state.activeKey === 3 ? (
									<div className={styles.award_result_tbody_td}>
										<span
											className={
												this.state.activeKey === 0
													? styles[colorConfig[item * 1]] + ' ' + styles.gray_side
													: item.gymallOrBig === '大'
													? styles.blue
													: styles.orange
											}
										>
											{item.gymallOrBig}
										</span>
									</div>
								) : null}
								{this.state.activeKey === 3 ? (
									<div className={styles.award_result_tbody_td} style={{ marginRight: '0.6rem' }}>
										<span
											className={
												this.state.activeKey === 0
													? styles[colorConfig[item * 1]] + ' ' + styles.gray_side
													: item.gySingleOrDouble === '单'
													? styles.blue
													: styles.orange
											}
										>
											{item.gySingleOrDouble}
										</span>
									</div>
								) : null}

								{data.map((item1, index) => {
									if (item1 === '') {
									} else {
										return (
											<div className={styles.award_result_tbody_td} key={index}>
												<span
													className={
														this.state.activeKey === 0
															? styles[colorConfig[item1 * 1]] + ' ' + styles.gray_side
															: item1 === '单' || item1 === '大' || item1 === '龙'
															? styles.blue
															: styles.orange
													}
												>
													{item1}
												</span>
											</div>
										);
									}
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

export default connect(
	state => ({
		awardResult: state.play.awardResult,
		loading: state.play.loading,
	}),
	{
		getAwardResultAction: getAwardResult,
	}
)(AwardResult);
