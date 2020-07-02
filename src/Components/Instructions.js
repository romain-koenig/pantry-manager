import React from 'react';
import Button from 'react-bootstrap/Button';

import InstructionsText from './InstructionsText';

const Instructions = (props) => {
  return (
<>
    <InstructionsText />
    <Button
        variant="info"
        onClick={props.hideInstructions}
        size="sm">
        OK, j'ai compris !</Button>

        </>
  );
};

export default Instructions;