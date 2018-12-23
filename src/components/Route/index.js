import React from 'react';
import { Route } from 'react-router-dom';
import { getRoute } from '../../utils/url';

const propTypes = {};

const defaultProps = {};

function RouterWithDefault({ path, ...resProps }) {
  return (
    <Route path={`${getRoute(path)}`} {...resProps} />
  );
}

RouterWithDefault.propTypes = propTypes;
RouterWithDefault.defaultProps = defaultProps;

export default RouterWithDefault;
