import React from 'react';

//Bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const PlusMinus = (props) => {
  return (
    <ButtonGroup>
      <Button
        onClick={() => props.plus(props.id)}
        variant="primary">
        <span role="img" aria-label="+">➕</span>
      </Button>
      <Button
        onClick={() => props.minus(props.id)}
        variant="primary">
        <span role="img" aria-label="-">➖</span>
      </Button>
    </ButtonGroup>
  );
};

export default PlusMinus;