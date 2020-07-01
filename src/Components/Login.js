import React from 'react';
import PropTypes from 'prop-types';

//Bootstrap
import Button from 'react-bootstrap/Button';

//Feather Bit
import Twitter from '@bit/feathericons.react-feather.twitter';
import Chrome from '@bit/feathericons.react-feather.chrome';


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
            <Button variant="primary" onClick={() => this.props.authenticate('Twitter')}>Login avec Twitter <Twitter/></Button>
          </div>
          {/*<Button variant="dark" onClick={() => this.props.authenticate('Github')}>Login avec GitHub</Button>*/}
          <div>
            <Button variant="danger" onClick={() => this.props.authenticate('Google')}>Login avec Google <Chrome /></Button>
          </div>
        </nav>
      </>
    );
  }
}

export default Login;