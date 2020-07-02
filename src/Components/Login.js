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
        <nav className="login">
          <h2>Authentification</h2>
          <p>Merci de vous identifier afin de pouvoir accéder à l'application</p>
          <div>
            <Button variant="primary" onClick={() => this.props.authenticate('Twitter')}>Login avec Twitter</Button>
          </div>
          {/*<Button variant="dark" onClick={() => this.props.authenticate('Github')}>Login avec GitHub</Button>*/}
          <div>
            <Button variant="danger" onClick={() => this.props.authenticate('Google')}>Login avec Google</Button>
          </div>
        </nav>
      </>
    );
  }
}

export default Login;