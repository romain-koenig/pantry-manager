import React from 'react';
import PropTypes from 'prop-types';

//
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
                    <p>Autentification nécessaire pour gérer l'inventaire</p>
                    <Button variant="primary" onClick={() => this.props.authenticate('Twitter')}>Login avec Twitter</Button>
                    <Button variant="dark" onClick={() => this.props.authenticate('Github')}>Login avec GitHub</Button>
                    <Button variant="danger" onClick={() => this.props.authenticate('Google')}>Login avec Google</Button>
                </nav>
            </>
        );
    }
}

export default Login;