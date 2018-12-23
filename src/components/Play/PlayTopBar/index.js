import React from "react";
import PropTypes from "prop-types";

import History from "../../../utils/history";

import styles from "./PlayTopBar.scss";
import rightIconImage from "Images/type/playMenu.png";

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

function PlayTopBar({
  rightContent,
  leftContent,
  content,
  game,
  ...restProps
}) {
  const onClick = () => {
    History.goBack();
  };
  const cls = `${styles["top-bar"]} ${game ? styles.game : ""}`;
  return (
    <div className={cls} {...restProps}>
      <div className={styles.left} onClick={onClick}>
        {/* <span className={styles.icon} /> */}
        <span className={styles.leftContent}>{leftContent}</span>
      </div>
      <div className={styles.right}>
        <img src={rightIconImage} className={styles.icon} alt="" />
        {/* <span className={styles.icon} />
        {rightContent} */}
      </div>
    </div>
  );
}

PlayTopBar.propTypes = propTypes;
PlayTopBar.defaultProps = defaultProps;

export default PlayTopBar;
