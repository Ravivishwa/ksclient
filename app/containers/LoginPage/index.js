/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Login from 'components/Login';

import makeSelectLoginPage from '../User/selectors';
import makeSelectUser from '../User/selectors';
import reducer from '../User/reducer';
import saga from '../User/saga';
import * as actions from '../User/actions';
import { Redirect } from 'react-router-dom';

function LoginPage({ login,loginPage,user }) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  if (user.token) {
    return <Redirect to="/" />;
  }

  return (
    <div style={{ width: '100%' }}>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login into Surf Ranch" />
      </Helmet>
      <Login onSubmit={login} />
    </div>
  );
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) =>
      dispatch(actions.authorize(username, password)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
