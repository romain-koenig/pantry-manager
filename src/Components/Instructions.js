import React from 'react';
import Button from 'react-bootstrap/Button';

const Instructions = (props) => {
  return (
    <>
    <p>Programme pour tracer le stock de nouriture dans le placard et planifier les achats</p>
    <p>Cliquez sur un produit pour en voir les détails et gérer sa quantité</p>
    <p>
        <Button 
        variant="info" 
        onClick={props.hideJumbo}
        size = "sm">
        OK, j'ai compris !</Button>
    </p>
</>
  );
};

export default Instructions;