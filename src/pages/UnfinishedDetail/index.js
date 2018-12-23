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
import PlayTopBar from '../../components/Play/PlayTopBar';

const propTypes = {};

const defaultProps = {
	leftContent: '北京赛车(PK10)',
};

class UnfinishedDetail extends Component {
	constructor(props) {
		super(props);
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

	render() {
		const { userName, balance, table, leftContent } = this.props;

		return (
			<div className={styles.page}>
				<PlayTopBar {...this.props} />
			</div>
		);
	}
}

UnfinishedDetail.propTypes = propTypes;
UnfinishedDetail.defaultProps = defaultProps;

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
)(UnfinishedDetail);
