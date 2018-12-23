import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './BigRoad.scss';

const LINE = 12;
const bigRoad = new Array(LINE * 15).fill(0);
const circleColor = {
  1: '#d40d08', // 庄
  2: '#113893', // 闲
};
const propTypes = {
  size: PropTypes.number,
  data: PropTypes.array,
};

const defaultProps = {
  size: 12,
  data: [],
};

function PearlRoad({ data, size }) {
  const bigRoadData = [];
  let lastWin = null;
  let emptyLine = 0;
  let lastStep = null;
  data.forEach((res) => {
    // debugger;
    const win = Number.parseFloat(res);
    if (!lastWin) {
      bigRoadData[0] = {
        win,
        tieCount: 0,
      };
      lastWin = win;
      lastStep = 0;
      return;
    }

    if (win === 3) {
      bigRoadData[lastStep].tieCount += 1;
    } else if (win === lastWin) {
      if (lastStep % LINE === 5 || bigRoadData[lastStep + 1]) {
        lastStep += LINE;
        bigRoadData[lastStep] = {
          win,
          tieCount: 0,
        };
      } else {
        lastStep += 1;
        bigRoadData[lastStep] = {
          win,
          tieCount: 0,
        };
      }
    } else {
      lastWin = Number.parseFloat(res);
      emptyLine += 1;
      lastStep = emptyLine * LINE;
      bigRoadData[lastStep] = {
        win,
        tieCount: 0,
      };
    }
  });

  return (
    <div
      className={styles.bigRoad}
      style={{
        height: size * LINE,
        width: size * 15,
      }}
    >
      {bigRoad.map((dishItem, index) => {
        const res = bigRoadData[index];
        return (
          <div
            className={`${styles.item} ${res && res.tieCount !== 0 && styles.hasTie}`}
            key={dishItem + index}
            style={{
              width: size,
              height: size,
            }}
          >
            {res && (
              <svg
                width="100%"
                height="100%"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.circle}
              >
                <circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  stroke={circleColor[res.win]}
                  strokeWidth="2"
                  fill="transparent"
                />
                {res.tieCount !== 0 && (
                  <text
                    className={styles.text}
                    x="50%"
                    y="100%"
                  >
                    {res.tieCount}
                  </text>
                )}
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}

PearlRoad.propTypes = propTypes;
PearlRoad.defaultProps = defaultProps;

export default PearlRoad;
