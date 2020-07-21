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
            <Button variant="primary" onClick={() => this.props.authenticate('Twitter')}>Login avec Twitter <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-twitter" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497 -3.753C20.18 7.773 21.692 5.25 22 4.009z" />
            </svg></Button>
          </div>
          {/*<Button variant="dark" onClick={() => this.props.authenticate('Github')}>Login avec GitHub</Button>*/}
          <div>
            <Button variant="danger" onClick={() => this.props.authenticate('Google')}>Login avec Google <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-google" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M17.788 5.108A9 9 0 1021 12h-8" />
            </svg></Button>
          </div>
        </nav>
      </>
    );
  }
}

export default Login;