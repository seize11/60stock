import React from 'react';
import PropTypes from 'prop-types';
import styles from './Notice.scss';

const propTypes = {
  width: PropTypes.string,
};

const defaultProps = {
  width: '85%',
};

function Notice({ width, children }) {
  return (
    <div className={styles.notice} style={{ width }}>
      <div>
        <span>{children}</span>
      </div>
    </div>
  );
}

Notice.propTypes = propTypes;
Notice.defaultProps = defaultProps;

export default Notice;
