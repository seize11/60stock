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
import { getUnfinishedDetail, deleteUnfinishedDetail, updateUnfinishedDetail } from '../../actions/play';
import SocketUtils from '../../utils/socket';
import Link from '../../components/Link';
import Page from '../../components/Page';
import MaskNav from '../../components/Play/MaskNav';
import HeaderBar from '../../components/Play/HeaderBar';
import { SwipeAction, List, Flex } from 'antd-mobile';

const propTypes = {};

const defaultProps = {
	leftContent: '未结明细',
	nav: [
		{
			name: '时间',
		},
		{
			name: '类型',
		},
		{
			name: '玩法',
		},
		{
			name: '下注',
		},
		{
			name: '可赢',
		},
	],
	list: [
		{
			time: '2018-12-16',
			time_detail: '12:53:52',
			name: '北京赛车(pk10)',
			stamp: '86532',
			level: '冠军',
			level_num: '9.95',
			chip_in: '20',
			can_win: '179.0',
		},
		{
			time: '2018-12-16',
			time_detail: '12:53:52',
			name: '北京赛车(pk10)',
			stamp: '86532',
			level: '冠军',
			level_num: '9.95',
			chip_in: '20',
			can_win: '179.0',
		},
		{
			time: '2018-12-16',
			time_detail: '12:53:52',
			name: '北京赛车(pk10)',
			stamp: '86532',
			level: '冠军',
			level_num: '9.95',
			chip_in: '20',
			can_win: '179.0',
		},
		{
			time: '2018-12-16',
			time_detail: '12:53:52',
			name: '北京赛车(pk10)',
			stamp: '86532',
			level: '冠军',
			level_num: '9.95',
			chip_in: '20',
			can_win: '179.0',
		},
		{
			time: '2018-12-16',
			time_detail: '12:53:52',
			name: '北京赛车(pk10)',
			stamp: '86532',
			level: '冠军',
			level_num: '9.95',
			chip_in: '20',
			can_win: '179.0',
		},
	],
};

class UnfinishedDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
		};
	}

	componentDidMount() {
		this.props.getUnfinishedDetailAction();
	}

	componentWillUnmount() {
		SocketUtils.unsubscribe();
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
	handleIconClick() {
		this.setState({ show: !this.state.show });
	}
	handleExit() {
		this.setState({ show: false });
	}
	renderTopBarContent = () => <div>存款</div>;
	deleteOne(id) {
		this.props.deleteUnfinishedDetailAction({ id }).then(() => {
			const data = [];
			this.props.unfinishedDetail.forEach(item => {
				if (item.id !== id) {
					data.push(item);
				}
			});
			console.log(data);
			this.props.updateUnfinishedDetailAction(data);
		});
	}
	render() {
		const { userName, balance, table, leftContent } = this.props;
		console.log(this.props);
		return (
			<div className={styles.unfinished_detail}>
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
				<div className={styles.unfinished_detail_nav}>
					{defaultProps.nav.map((item, index) => {
						return <div className={styles.unfinished_detail_nav_item}>{item.name}</div>;
					})}
				</div>
				<div className={styles.unfinished_detail_content}>
					{this.props.unfinishedDetail.map((item, index) => {
						return (
							<SwipeAction
								style={{
									backgroundColor: 'gray',
									height: '100%',
									display: 'flex',
									height: '1.12rem',
									borderBottom: '1px solid rgb(244, 244, 244)',
								}}
								autoClose
								right={[
									{
										text: '删除',
										onPress: () => {
											this.deleteOne(item.id);
										},
										style: {
											backgroundColor: '#F4333C',
											color: 'white',
											fontSize: '0.32rem',
											width: '5rem',
											textAlign: 'center',
										},
									},
									{
										text: '取消',
										onPress: () => console.log('delete'),
										style: {
											backgroundColor: '#cccccc',
											color: 'white',
											fontSize: '0.32rem',
											width: '5rem',
											textAlign: 'center',
										},
									},
								]}
								onOpen={() => console.log('global open')}
								onClose={() => console.log('global close')}
							>
								<List.Item arrow={false} onClick={() => console.log('List.Item clicked!')}>
									<div className={styles.unfinished_detail_content_item}>
										<div className={styles.unfinished_detail_content_item_cell}>
											{item.betTime.split(' ')[0]}
											<br />
											{item.betTime.split(' ')[1]}
										</div>
										<div className={styles.unfinished_detail_content_item_cell}>
											{item.lotteryName}
											<br />第<span>{item.expect}</span>期
										</div>
										<div className={styles.unfinished_detail_content_item_cell}>
											{item.betName}
											<br />@<span>{item.odds}</span>
										</div>
										<div className={styles.unfinished_detail_content_item_cell}>{item.amount}</div>
										<div className={styles.unfinished_detail_content_item_cell}>{item.win}</div>
									</div>
								</List.Item>
							</SwipeAction>
						);
					})}
				</div>
				<div className={styles.unfinished_detail_footer}>
					<ul>
						<li>注数：{this.props.otherData.total}</li>
						<li>下注金额：{this.props.otherData.betAmount}</li>
						<li>
							结果(总计)：<span>{this.props.otherData.win}</span>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

UnfinishedDetail.propTypes = propTypes;
UnfinishedDetail.defaultProps = defaultProps;

export default connect(
	state => ({
		unfinishedDetail: state.play.unfinishedDetail,
		otherData: state.play.unfinishedOtherData,
	}),
	{
		getUnfinishedDetailAction: getUnfinishedDetail,
		deleteUnfinishedDetailAction: deleteUnfinishedDetail,
		updateUnfinishedDetailAction: updateUnfinishedDetail,
	}
)(UnfinishedDetail);
