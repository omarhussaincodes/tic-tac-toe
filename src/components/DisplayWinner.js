import React from 'react'

function DisplayWinner({ winner }) {
    return (
        <div className='text-xl text-cyan-400 animate-ping ease-in-out duration-200'>
            <h1>{winner && `Player ${winner} Won!`}</h1>
            <h1>{winner === null && "Match Draw!"}</h1>
        </div>
    )
}

export default DisplayWinner
