/* global window, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Play.scss';
import { GoBack } from '../../utils/history';
import PearlRoad from '../../components/PearlRoad';
import BigRoad from '../../components/BigRoad';
import { decrypt } from '../../utils/info';
import { getURLParamsObject } from '../../utils/url';
import { getTableInitData, updateTableData } from '../../actions/table';
import SocketUtils from '../../utils/socket';
import Link from '../../components/Link';
import Page from '../../components/Page';
import PlayTopBar from '../../components/Play/PlayTopBar';
import PlaySecondBar from '../../components/Play/PlaySecondBar';
import Period from '../../components/Play/Period';
import List from '../../components/Play/List';
import MaskNav from '../../components/Play/MaskNav';
import TopBar from '../../components/TopBar';
import PopUpSelectResults from '../../components/Play/PopUpSelectResults';

const propTypes = {};

const defaultProps = {
	leftContent: '北京赛车(PK10)',
};

class PlayPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
	}

	componentDidMount() {}

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
	renderTopBarContent = () => <div>存款</div>;

	handleIconClick() {
		this.setState({ show: !this.state.show });
	}
	handleExit() {
		this.setState({ show: false });
	}

	render() {
		const { userName, balance, table, leftContent } = this.props;

		return (
			<div className={styles.page}>
				<PlayTopBar
					{...this.props}
					handleClick={() => {
						this.handleIconClick();
					}}
				/>
				<PlaySecondBar />
				<Period />
				<List {...this.props} />
				<PopUpSelectResults {...this.props} />
				<MaskNav
					isShow={this.state.show}
					handleExit={() => {
						this.handleExit();
					}}
				/>
			</div>
		);
	}
}

PlayPage.propTypes = propTypes;
PlayPage.defaultProps = defaultProps;

export default connect(
	state => ({
		base: state.base,
		userName: state.user.name,
		balance: state.account.balance,
		table: state.table,
	}),
	{
		getTableInitDataAction: getTableInitData,
		updateTableDataAction: updateTableData,
	}
)(PlayPage);
