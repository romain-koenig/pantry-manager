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
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <circle cx="12" cy="12" r="9" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="12" y1="9" x2="12" y2="15" />
        </svg>
      </Button>
      <Button
        onClick={() => props.minus(props.id)}
        variant="transparent"
        size="sm"
        className="px-1"
      >

        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <circle cx="12" cy="12" r="9" />
          <line x1="9" y1="12" x2="15" y2="12" />
        </svg>

      </Button>
    </ButtonGroup>
  );
};

export default PlusMinus;