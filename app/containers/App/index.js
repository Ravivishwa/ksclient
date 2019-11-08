/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import {
  Icon,
  Menu,
  Segment,
  Sidebar,
  Grid,
  Image,
  Button,
} from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage';
import SecureRoute from 'containers/User';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import logo from 'images/logo.png';

import GlobalStyle from '../../global-styles';
import makeSelectUser from '../User/selectors';
import Session from 'containers/Session/Loadable';

class App extends React.PureComponent {
  state = {
    showMenu: false,
  };

  goHome = () => {
    return this.props.history.push('/');
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <Sidebar.Pushable as={Segment} style={{ border: 0 }}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={() => this.setState({ showMenu: false })}
            vertical
            visible={this.state.showMenu}
            width="thin"
            direction="right"
          >
            <Menu.Item as="a">
              <Icon name="calendar alternate" />
              Events
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="users" />
              Guests
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="map marker alternate" />
              Location
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            style={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CompactGrid>
              <CompactRow>
                <CompactCol
                  width={2}
                  stretched
                  style={{ height: '100%', borderRight: '2px solid #fff' }}
                >
                  <CompactSegment basic secondary verticalalign="middle" onClick={() => this.goHome()}>
                    <Image src={logo} size="mini" style={{ margin: 'auto' }} />
                  </CompactSegment>
                </CompactCol>
                <CompactCol width={14} stretched>
                  <CompactSegment basic secondary>
                    <CompactHeader>Surf Ranch Manager</CompactHeader>
                    <Button
                      icon
                      disabled={!user.token}
                      labelPosition="right"
                      onClick={() => this.setState({ showMenu: true })}
                    >
                      Menu
                      <Icon name="bars" />
                    </Button>
                  </CompactSegment>
                  <Divider />
                  {!user.token ?
                    <CompactSegment basic secondary>
                    <CompactSectionHeader>
                    Login
                    </CompactSectionHeader>
                    </CompactSegment> :''
                  }
                </CompactCol>
              </CompactRow>
            </CompactGrid>
            <ContentContainer>
              <Switch>
                <SecureRoute exact path="/" >
                  <HomePage />
                </SecureRoute>
                <SecureRoute exact path="/manageSessions/:id">
                  <Session />
                </SecureRoute>
                <Route exact path="/login" component={LoginPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </ContentContainer>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <GlobalStyle />
      </div>
    );
  }
}

const CompactGrid = styled(Grid)`
  &&& {
    margin: 0;
  }
`;

const CompactHeader = styled.h2`
  &&& {
    margin: 0;
    text-align: left;
    flex: 1;
  }
`;

const CompactSectionHeader = styled.h3`
  &&& {
    margin: 0;
    text-align: left;
  }
`;

const Divider = styled.div`
  height: 2px;
  background-color: #fff;
`;

const CompactRow = styled(Grid.Row)`
  &&& {
    padding: 0 !important;
    flex: 1;
    justify-content: center;
  }
`;

const CompactCol = styled(Grid.Column)`
  &&& {
    padding: 0 !important;
  }
`;

const CompactSegment = styled(Segment)`
  &&& {
    margin: 0;
    padding: 10px;
    display: flex;
  }
`;

const ContentContainer = styled(Grid)`
  &&& {
    flex: 1;
    align-items: flex-start;
  }
`;

App.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect,withRouter)(App);
