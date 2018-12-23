import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router-dom';
import Link from '../../components/Link';
import Route from '../../components/Route';

import HomePage from '../../pages/Home';
import MinePage from '../../pages/Mine';
import AgentPage from '../../pages/Agent';
import PlayPage from '../../pages/PlayPage';
import UnfinishedDetail from '../../pages/UnfinishedDetail';
import AwardResult from '../../pages/SideMenuPage';

import { undoUi } from '../../utils/ui';
import styles from './BasicLayout.scss';

const TAB_LIST = [
	{
		path: '/',
		name: '首页',
		key: 'home',
		icon: require('../../images/home/home.png'),
		disable: false,
	},
	{
		path: '/play',
		key: 'play',
		name: '玩法',
		icon: require('../../images/home/play.png'),
		disable: false,
	},
	{
		path: '/service',
		key: 'service',
		name: '客服',
		icon: require('../../images/home/service.png'),
		disable: true,
	},
	{
		path: '/agent',
		key: 'agent',
		name: '代理',
		icon: require('../../images/home/service.png'),
		disable: false,
	},
	{
		path: '/mine',
		key: 'mine',
		name: '我的',
		icon: require('../../images/home/mine.png'),
		disable: false,
	},
];

class BasicLayout extends Component {
	static propTypes = {};

	static defaultProps = {};

	componentDidMount() {}

	isLinkDisable = disable => e => {
		if (disable) {
			undoUi(e);
		}
	};

	render() {
		return (
			<div className={styles.base}>
				<div className={styles.main}>
					<Switch>
						<Route path="/" exact component={HomePage} />
						<Route path="/mine" component={MinePage} />
						<Route path="/agent" component={AgentPage} />
						<Route path="/play" component={PlayPage} />
						<Route path="/unfinishedDetail" component={UnfinishedDetail} />
						<Route path="/awardResult" component={AwardResult} />
					</Switch>
				</div>
				<div className={styles.tab}>
					{TAB_LIST.map(item => (
						<Link
							to={item.path}
							className={`${styles.link} ${styles[item.key]}`}
							key={item.key}
							onClick={this.isLinkDisable(item.disable)}
						>
							<span className={styles.icon} style={{ backgroundImage: `url(${item.icon})` }} />
							<span>{item.name}</span>
						</Link>
					))}
				</div>
			</div>
		);
	}
}
export default BasicLayout;
