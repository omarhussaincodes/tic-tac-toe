import React, { useEffect, useState } from 'react';
import Square from './Square';
import { v4 as uuidv4 } from 'uuid';
import checkWinner from '../shared/tictactoe';
import DisplayWinner from './DisplayWinner';
import useSound from 'use-sound';

function Board() {

    const boardSize = 3;
    const [boardValues, setBoardValues] = useState(Array(boardSize * boardSize).fill({ value: '', disable: false }));
    const [isUserTurn, setUserTurn] = useState(true);
    const [winner, setWinner] = useState("");
    const [winningIdxs, setWinningIdxs] = useState();

    useEffect(() => {
    }, [])

    const handleMarkerChange = (idx, marker, el) => {
        // check if it's user turn
        if (isUserTurn) {
            boardValues[idx] = { value: "X", disable: true };
            setBoardValues(boardValues);
            setUserTurn(!isUserTurn);
        }
        // if computer turn, generate random index and make value '0'
        else {
            boardValues[idx] = { value: "O", disable: true };
            setBoardValues(boardValues);
            setUserTurn(true);
        }
        // check for winner during the game
        const turnCounts = getTurnCounts(boardValues);
        if (turnCounts && (turnCounts['X'] >= boardSize || turnCounts['O'] >= boardSize)) {
            const { winner, winningIndexes } = checkWinner(boardValues, boardSize) || {};
            if (winner === 'X') {
                setWinningIdxs(winningIndexes);
                disableAllMarkers();
                setWinner("X");
            } else if (winner === 'O') {
                setWinningIdxs(winningIndexes);
                disableAllMarkers();
                setWinner("O");
            }
        }
        // check if game over
        if ((boardValues.filter(x => x.value === '')).length === 0) {
            setWinner(null);
        }
    }

    function getTurnCounts(boardValues) {
        return boardValues.reduce((accObj, curr, idx) => {
            accObj[curr.value] = ++accObj[curr.value] || 1;
            return accObj;
        }, {});
    }

    function disableAllMarkers() {
        setBoardValues(boardValues.map(x => ({ ...x, disable: true })));
    }

    function displayMessage() {
        if (winner === "") {
            return (isUserTurn) ?
                "X's turn" :
                "O's turn"
        } else {
            return "Game Over"
        }
    }

    const reset = () => {
        setBoardValues(Array(boardSize * boardSize).fill({ value: '', disable: false }));
        setUserTurn(true);
        setWinner("");
        setWinningIdxs([]);
    };

    return (
        <div id="conatiner" className="flex flex-col items-center text-center text-cyan-300 justify-center">
            <div className='p-2 m-2 text-cyan-300'>
                <DisplayWinner winner={winner} />
            </div>
            <h1 className="p-1 m-1 font-mono text-2xl text-cyan-400 drop-shadow-xl shadow-white brightness-150
            animate-bounce duration-700 ease-in-out transition-shadow">
                {
                    displayMessage()
                }
            </h1>
            <div className='flex flex-wrap justify-center bg-cyan-500 shadow-lg shadow-cyan-700 m-1 w-96 h-96'>
                {
                    boardValues.map((marker, idx) => (
                        < Square key={uuidv4()} idx={idx} marker={marker} winningIdxs={winningIdxs} onBoardMarkerChange={handleMarkerChange} />
                    ))
                }
            </div>
            {
                winner !== "" &&
                < button className="rounded-none my-2 mx-3 px-4 py-1 bg-cyan-500 font-mono text-xl text-slate-800 border border-slate-800
            hover:bg-slate-800 hover:text-cyan-500 hover:border-cyan-500 hover:scale-110 duration-150 ease-in-out"
                    onClick={reset}>
                    Play Again
                </button>
            }
        </div >
    )
}

export default Board;

