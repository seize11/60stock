import React from 'react';
import styles from './index.scss';
import MaskNav from '../../components/Play/MaskNav';
import HeaderBar from '../../components/Play/HeaderBar';
const defaultProps = {
	leftContent: '游戏规则',
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
				<div className={styles.content}>
					<h3>游戏规则-北京赛车</h3>
					<p>
						{' '}
						该游戏的投注时间、开奖时间和开奖号码与“北京PK拾”完全同步，北京时间（GMT+8）每天从上午09：02开到晚上23：57，每5分钟开一次奖，每天开奖179期。
					</p>
					<h3>具体游戏规则如下：</h3>
					<h4>1~10两面指单、双、大、小：</h4>
					<ul>
						<li>· 单、双：号码为双数叫双，如4、8；号码为单数叫单，如5、9.</li>
						<li>· 大、小：开出之号码大于或等于6为大，小于或等于5为小。</li>
						<li>
							·
							第一名~第十名车号指定：每一个车号为一投注组合，开奖结果“投注车号”对应所投名次视为中奖，其余情形视为不中奖。
						</li>
					</ul>
					<h4>
						1~5龙虎<span>【注意规则】</span>为：
					</h4>
					<ul>
						<li>
							·
							冠军龙/虎：“第一名”车号大于“第十名”车号视为【龙】中奖、反之小于视为【虎中奖】，其余情形视为不中奖。
						</li>
						<li>
							·
							亚军龙/虎：“第二名”车号大于“第九名“车号视为【龙】中奖，反之小于视为【虎】中奖，其余情形视为不中奖。
						</li>
						<li>
							·
							第三名龙/虎：”第三名“车号大于”第八名“车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
						</li>
						<li>
							·
							第四名龙/虎：”第四名“车号大于”第七名“车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
						</li>
						<li>
							·
							第五名龙/虎：”第五名“车号大于”第六名“车号视为【龙】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
						</li>
					</ul>
					<h4>冠军车号+亚军车号=冠亚和值：</h4>
					<ul>
						<li>
							·
							冠亚和单双：”冠亚和值“为单视为投注”单”的注单位视为中奖，为双视为投注“双”的注单视为中奖，其余视为不中奖。
						</li>
						<li>
							·
							冠亚和大小：”冠亚和值“为大于11时投注”大”的注单位视为中奖，小于或等于11时投注“小”的注单位视为中奖，其余视为不中奖。
						</li>
						<li>
							·
							冠亚和指定：”冠亚和值“可能出现的结果为3~19，投中对应“冠亚和值”数字的视为中奖，其余视为不中奖。
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
Regular.defaultProps = defaultProps;
export default Regular;
