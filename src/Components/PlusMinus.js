import React from 'react';

//Bootstrap
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

//Icons
import { Plus } from 'tabler-icons-react';
import { Minus } from 'tabler-icons-react';

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
        <Plus
          size={24}
          strokeWidth={2}
          color={'currentColor'}
        />
      </Button>
      <Button
        onClick={() => props.minus(props.id)}
        variant="transparent"
        size="sm"
        className="px-1"
      >

        <Minus
          size={24}
          strokeWidth={2}
          color={'currentColor'}
        />

      </Button>
    </ButtonGroup>
  );
};

export default PlusMinus;