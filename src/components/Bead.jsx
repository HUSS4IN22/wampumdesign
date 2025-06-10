import React from 'react';

const Bead = React.memo(({ beadClasses, onClick, onMouseEnter }) => {
  return (
    <div
      className={`bead ${beadClasses} border border-[#CCCCCC]`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    ></div>
  );
});

export default Bead;