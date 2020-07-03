import React from 'react';

//Bootstrap
import Button from 'react-bootstrap/Button';

//Styled Components
import styled from 'styled-components';

const User = (props) => {
  const RightSpan=styled.span`float:right;`;
  const LargeDiv = styled.div`margin-bottom: 10px;`;
  return (
    <LargeDiv>
      <span>Vous être bien connecté avec {props.authProvider} {props.userName}</span>
      <RightSpan><Button 
      variant="danger" 
      onClick={props.logout}
      size="sm">Déconnexion</Button></RightSpan>  
    </LargeDiv>
  );
};

export default User;