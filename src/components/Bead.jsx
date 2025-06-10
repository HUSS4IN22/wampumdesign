import React from 'react';

const Bead = React.memo(({ beadClasses, onClick, onMouseEnter }) => {
  return (
    <div
      className={`bead ${beadClasses} border-white border-[0.5px]`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    ></div>
  );
});

export default Bead;