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
import PlayTopBar from '../../components/Play/PlayTopBar';
import { DatePicker, Icon } from 'antd-mobile';

const propTypes = {};

const defaultProps = {
	leftContent: '北京赛车(PK10)',
};

class AwardResult extends Component {
	constructor(props) {
		super(props);
		this.state = { isShow: false, date: new Date() };
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

	render() {
		const { userName, balance, table, leftContent } = this.props;

		return (
			<div className={styles.award_result}>
				<PlayTopBar
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
							value={this.state.customChildValue}
							onChange={v => this.setState({ customChildValue: v })}
							extra="click to choose"
						>
							<span>
								2018-12-16
								<Icon type="right" />
							</span>
						</DatePicker>
					</div>
				</div>
				<div className={styles.award_result_thead}>
					<div className={styles.award_result_thead_td}>期数</div>
					<div className={styles.award_result_thead_td}>时间</div>
					<div className={styles.award_result_thead_td}>
						<span>号码</span>{' '}
					</div>
					<div className={styles.award_result_thead_td}>
						<span>大小</span>
					</div>
					<div className={styles.award_result_thead_td}>
						<span>单双</span>
					</div>
					<div className={styles.award_result_thead_td}>
						<span>冠亚/龙虎</span>
					</div>
				</div>
				<div className={styles.award_result_tbody}>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(() => {
						return (
							<div className={styles.award_result_tbody_tr}>
								<div className={styles.award_result_tbody_td}>123456789</div>
								<div className={styles.award_result_tbody_td}>14:34</div>
								<div className={styles.award_result_tbody_td}>
									<span>大</span>
								</div>
								<div className={styles.award_result_tbody_td}>
									<span>大</span>
								</div>
								<div className={styles.award_result_tbody_td}>
									<span>大</span>
								</div>
								<div className={styles.award_result_tbody_td}>
									<span>小</span>
								</div>
								<div className={styles.award_result_tbody_td}>
									<span>小</span>
								</div>
								<div className={styles.award_result_tbody_td}>
									<span>小</span>
								</div>
								<div className={styles.award_result_tbody_td}>
									<span>小</span>
								</div>
								<div className={styles.award_result_tbody_td}>
									<span>小</span>
								</div>
								<div className={styles.award_result_tbody_td}>
									<span>大</span>
								</div>
								<div className={styles.award_result_tbody_td}>
									<span>大</span>
								</div>
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
