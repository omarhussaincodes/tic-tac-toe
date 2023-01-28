import React, { useRef } from 'react';

function Square({ idx, marker, winningIdxs, onBoardMarkerChange }) {

  const buttonElement = useRef();

  const handleButtonClick = () => {
    onBoardMarkerChange(idx, marker, buttonElement.current);
  };

  return (
    <>
      <button className='w-32 h-32 text-3xl cursor-pointer border border-gray-600
       hover:bg-slate-800 text-cyan-500 transition-transform ease-in-out duration-125
       hover:scale-y-105'
        ref={buttonElement} onClick={handleButtonClick} disabled={(marker.disable)}>
        <div className="text-slate-800 cursor-pointer 
         hover:text-cyan-500 scale-150 transition-transform ease-in-out">
          <span
            className={(winningIdxs && winningIdxs.some(x => x === idx)) ? "underline hover:scale-125 duration-150 ease-in-out" : ""} >
            {marker.value}
          </span>
        </div>
      </button>
    </>
  )
}

export default Square;
