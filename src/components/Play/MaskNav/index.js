import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router-dom';
import Route from '../../Route';
import History from '../../../utils/history';
import styles from './index.scss';
import rightIconImage from 'Images/type/playMenu.png';
const propTypes = {
	leftContent: PropTypes.any,
	rightContent: PropTypes.any,
	midcontent: PropTypes.any,
	leftNumber: PropTypes.any,
	rightNumber: PropTypes.any,
	midNumber: PropTypes.any,
};

const defaultProps = {
	leftContent: '额  度',
	TAB_LIST: [
		{
			name: '未结明细',
			key: 0,
			path: '/play/double',
			img: rightIconImage,
		},
		{
			name: '今日已结',
			key: 1,
			path: '/play/single',
			img: rightIconImage,
		},
		{
			name: '开奖结果',
			key: 3,
			path: '/play/championrunner',
			img: rightIconImage,
		},
		{
			name: '游戏规则',
			key: 4,
			path: '/play/championrunner',
			img: rightIconImage,
		},
	],
};

class MaskNav extends Component {
	state = {
		showNav: false,
	};
	componentDidMount() {
		// location.pathname
	}
	render() {
		return (
			<div className={styles.mask_nav} style={{ display: this.props.isShow ? 'block' : 'none' }}>
				<div className={styles.mask_nav_header}>
					<div className={styles.mask_nav_header_name}>sweet86576</div>
					<div className={styles.total}>总余额：1800.00</div>
				</div>
				<div className={styles.mask_nav_content}>
					{defaultProps.TAB_LIST.map((item, index) => {
						return (
							<div className={styles.mask_nav_content_item} key={item.key}>
								<img src={item.img} alt="" />
								{item.name}
							</div>
						);
					})}
				</div>
				<div className={styles.mask_nav_footer} onClick={this.props.handleExit}>
					<img src={rightIconImage} alt="" /> <span>退&nbsp;&nbsp;&nbsp;&nbsp;出</span>
				</div>
			</div>
		);
	}
}

MaskNav.propTypes = propTypes;
MaskNav.defaultProps = defaultProps;

export default MaskNav;
