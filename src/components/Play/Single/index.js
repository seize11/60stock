import React, { Component } from "react";
import PropTypes from "prop-types";
import History from "../../../utils/history";
import { Accordion, List, Grid, Icon } from "antd-mobile";
import styles from "./Single.scss";
import "./Single.scss";
import right_botttom_Image from "Images/type/right_botttom.png";

const propTypes = {
  leftContent: PropTypes.any,
  rightContent: PropTypes.any,
  midcontent: PropTypes.any,
  leftNumber: PropTypes.any,
  rightNumber: PropTypes.any,
  midNumber: PropTypes.any
};

const defaultProps = {
  leftContent: "额  度",
  numberList: [
    {
      id: 10,
      data: [
        {
          name: 1,
          selected: true,
          id: 0
        },
        {
          name: 2,
          selected: false,
          id: 1
        },
        {
          name: 3,
          selected: false,
          id: 2
        }
      ]
    },
    {
      id: 11,
      data: [
        {
          name: 1,
          selected: false,
          id: 3
        },
        {
          name: 2,
          selected: false,
          id: 4
        },
        {
          name: 3,
          selected: false,
          id: 5
        }
      ]
    },
    {
      id: 22,
      data: [
        {
          name: 1,
          selected: false,
          id: 6
        },
        {
          name: 2,
          selected: false,
          id: 7
        },
        {
          name: 3,
          selected: false,
          id: 8
        }
      ]
    },
    {
      id: 33,
      data: [
        {
          name: 1,
          selected: false,
          id: 9
        },
        {
          name: 2,
          selected: false,
          id: 10
        },
        {
          name: 3,
          selected: false,
          id: 11
        }
      ]
    }
  ]
};

class Single extends Component {
  state = {
    showPlaySecondBar: true,
    selectIds: [],
    isShowSonsIds: []
  };
  componentDidMount() {}
  onChange = key => {
    console.log(key);
  };
  toggleNum = dataItem => {
    if (this.state.isShowSonsIds.indexOf(dataItem.id) > -1) {
      let delIndex = this.state.selectIds.filter(item => item != dataItem.id);
      this.setState({ isShowSonsIds: delIndex });
    } else {
      let aRR = this.state.isShowSonsIds;
      aRR.push(dataItem.id);
      this.setState({ isShowSonsIds: aRR });
    }
  };
  toggleBorder = dataItem => {
    if (this.state.selectIds.indexOf(dataItem.id) > -1) {
      let delIndex = this.state.selectIds.filter(item => item != dataItem.id);
      this.setState({ selectIds: delIndex });
    } else {
      let aRR = this.state.selectIds;
      aRR.push(dataItem.id);
      this.setState({ selectIds: aRR });
    }
  };

  render() {
    const { numberList } = this.props;
    return (
      <div className={styles.Single}>
        {numberList.map((item, index) => (
          <div className={styles.rightItem} key={index}>
            <div
              className={styles.heads}
              onClick={this.toggleNum.bind(this, item)}
            >
              headers &nbsp;
              {this.state.isShowSonsIds.indexOf(item.id) > -1 ? (
                <Icon type="down" />
              ) : (
                <Icon type="up" />
              )}
            </div>
            <div
              className={styles.sonWarpper}
              style={{
                display: `${
                  this.state.isShowSonsIds.indexOf(item.id) > -1
                    ? "none"
                    : "block"
                }`
              }}
            >
              <Grid
                data={item.data}
                columnNum={2}
                itemStyle={{ height: "1rem" }}
                renderItem={(dataItem, i) => (
                  <div
                    className={styles.grid}
                    style={
                      this.state.selectIds.indexOf(dataItem.id) > -1
                        ? { border: "0.1rem solid yellow" }
                        : null
                    }
                    onClick={this.toggleBorder.bind(this, dataItem)}
                  >
                    <span>{dataItem.name}</span>
                    <span className={styles.redNum}>{dataItem.name}</span>
                    {this.state.selectIds.indexOf(dataItem.id) > -1 ? (
                      <img src={right_botttom_Image} />
                    ) : null}
                  </div>
                )}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Single.propTypes = propTypes;
Single.defaultProps = defaultProps;

export default Single;
