import React from 'react';
import BaseComponent from '../../base/component';

export default (active) => {
  return (
    <BaseComponent active={active}>
      <h2 className="text-center">Empty page</h2>
    </BaseComponent>
  );
};
