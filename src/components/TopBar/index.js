import React from "react";
import PropTypes from "prop-types";

import History from "../../utils/history";

import styles from "./TopBar.scss";

const propTypes = {
  leftContent: PropTypes.any,
  rightContent: PropTypes.any,
  content: PropTypes.any
};

const defaultProps = {
  leftContent: "大厅",
  rightContent: null,
  content: null
};

function TopBar({ rightContent, leftContent, content, game, ...restProps }) {
  const onClick = () => {
    History.goBack();
  };
  const cls = `${styles["top-bar"]} ${game ? styles.game : ""}`;
  return (
    <div className={cls} {...restProps}>
      <div className={styles.left} onClick={onClick}>
        <span className={styles.icon} />
        <span className={styles.leftContent}>{leftContent}</span>
      </div>
      <div className={styles.mid}>{content}</div>
      <div className={styles.right}>{rightContent}</div>
    </div>
  );
}

TopBar.propTypes = propTypes;
TopBar.defaultProps = defaultProps;

export default TopBar;
