import React from 'react';
import styles from './index.scss';
import MaskNav from '../../components/Play/MaskNav';
import HeaderBar from '../../components/Play/HeaderBar';
const defaultProps = {
	leftContent: '游戏规则',
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
class Regular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
	}
	handleIconClick() {
		this.setState({ show: !this.state.show });
	}
	handleExit() {
		this.setState({ show: false });
	}
	render() {
		return (
			<div className={styles.wrap}>
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
			</div>
		);
	}
}
Regular.defaultProps = defaultProps;
export default Regular;
