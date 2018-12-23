import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.scss';

const propTypes = {};

const defaultProps = {};

function Button({ children, onClick, ...resProps }) {
  return (
    <div className={styles.button} onClick={onClick} {...resProps}>{children}</div>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
