/**
 *
 * Login
 *
 */

import React from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onUsernameChange = this.onChange.bind(this, 'username');
    this.onPasswordChange = this.onChange.bind(this, 'password');
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(input, event) {
    this.setState({ [input]: event.target.value });
  }

  onSubmit() {
    const { username, password } = this.state;
    const { onSubmit } = this.props;
    onSubmit(username, password);
    return false;
  }

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: '100%' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form size="large" onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={this.onUsernameChange}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.onPasswordChange}
              />
              <Button fluid size="large" type="submit">
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
