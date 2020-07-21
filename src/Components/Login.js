import React from 'react';
import PropTypes from 'prop-types';

//Bootstrap
import Button from 'react-bootstrap/Button';

//Icons
import { BrandTwitter } from 'tabler-icons-react';
import { BrandGoogle } from 'tabler-icons-react';

class Login extends React.Component {

  static propTypes = {
    authenticate: PropTypes.func.isRequired,
  }

  render() {

    return (
      <>
        <nav className="login">
          <h1>Authentification</h1>
          <p>Merci de vous identifier afin de pouvoir accéder à l'application</p>
          <div>
            <Button variant="primary" onClick={() => this.props.authenticate('Twitter')}>Login avec Twitter <BrandTwitter
              size={24}
              strokeWidth={2}
              color={'#1da1f2'} />
            </Button>
          </div>
          {/*<Button variant="dark" onClick={() => this.props.authenticate('Github')}>Login avec GitHub</Button>*/}
          <div>
            <Button variant="primary" onClick={() => this.props.authenticate('Google')}>Login avec Google <BrandGoogle
              size={24}
              strokeWidth={2}
              color={'#DB4437'} />
            </Button>
          </div>
        </nav>
      </>
    );
  }
}

export default Login;