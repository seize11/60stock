import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { getRoute } from '../../utils/url';

const propTypes = {};

const defaultProps = {};

function Link({ to, ...resProps }) {
  let routeTo = null;
  if (typeof to === 'string') {
    routeTo = `${getRoute(to)}`;
  } else if (typeof to === 'object') {
    routeTo = {
      ...to,
      pathname: `${getRoute(to.pathname)}`,
    };
  }
  return (
    <RouteLink to={routeTo} {...resProps} />
  );
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
