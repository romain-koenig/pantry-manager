import React from 'react';
import PropTypes from 'prop-types';

//Bootstrap
import Button from 'react-bootstrap/Button';

class Login extends React.Component {

  static propTypes = {
    authenticate: PropTypes.func.isRequired,
  }

  render() {

    return (
      <>
        <div className="container">
          <nav className="login">
            <h2>Authentification</h2>
            <p>Autentification nécessaire pour gérer votre Stock</p>
            <Button
              variant="primary"
              onClick={() => this.props.authenticate('Twitter')}>
              Login avec Twitter
            </Button>
            <Button
              variant="dark"
              onClick={() => this.props.authenticate('Github')}>
              Login avec GitHub
            </Button>
            <Button
              variant="danger"
              onClick={() => this.props.authenticate('Google')}>
              Login avec Google
            </Button>
          </nav>
        </div>
      </>
    );
  }
}

export default Login;