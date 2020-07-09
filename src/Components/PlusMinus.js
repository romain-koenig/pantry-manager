import React from 'react';

//Bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const PlusMinus = (props) => {
  return (
    <ButtonGroup
      className="btn-sm border px-0"
      size="sm"
    >
      <Button
        onClick={() => props.plus(props.id)}
        variant="transparent"
        size="sm"
        className="px-1"
        >
        <span role="img" aria-label="+">➕</span>
      </Button>
      <Button
        onClick={() => props.minus(props.id)}
        variant="transparent"
        size="sm"
        className="px-1"
        >
        <span role="img" aria-label="-">➖</span>
      </Button>
    </ButtonGroup>
  );
};

export default PlusMinus;