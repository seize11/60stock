import React from 'react';
import PropTypes from 'prop-types';
import TopBar from '../TopBar';
import styles from './Page.scss';

const propTypes = {
  renderTopBarContent: PropTypes.func,
  renderTopBarRightContent: PropTypes.func,
};

const defaultProps = {
  renderTopBarContent: () => null,
  renderTopBarRightContent: () => null,
};

function Page({
  children, className, game, renderTopBarContent, renderTopBarRightContent, ...restProps
}) {
  return (
    <div className={`${className} ${styles.page} ${game ? styles.game : ''}`} {...restProps}>
      <TopBar
        game={game}
        content={renderTopBarContent()}
        rightContent={renderTopBarRightContent()}
      />
      {children}
    </div>
  );
}

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
