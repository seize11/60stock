import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './PearlRoad.scss';

const road = new Array(6 * 15).fill(0);
const propTypes = {
  size: PropTypes.number,
};

const defaultProps = {
  size: 24,
};

function PearlRoad({ data, size }) {
  return (
    <div
      className={styles.dish}
      style={{
        width: size * 15,
        height: size * 6,
      }}
    >
      {road.map((dishItem, index) => {
        const res = data[index];
        let cls = styles.item;
        if (res) {
          const type = Number.parseFloat(res);
          cls += ` ${styles[`item_${type}`]}`;
        }
        return (
          <div
            className={cls}
            style={{
              width: size,
              height: size,
            }}
            key={dishItem + index}
          />
        );
      })}
    </div>
  );
}

PearlRoad.propTypes = propTypes;
PearlRoad.defaultProps = defaultProps;

export default PearlRoad;
