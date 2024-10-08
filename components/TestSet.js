import React, { useState, useCallback } from "react";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { Button, Typography, ThemeProvider } from "@mui/material";
import { Chess, SQUARES } from "chess.js";
import theme from "./Theme";
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'
import {useMutation} from 'react-query'
import Tactics from './Tactic'
import {useUser} from '@auth0/nextjs-auth0/client'

const Chessground = dynamic(
  () => import('@react-chess/chessground'),
  { ssr: false }
);

let puzzleStatus = 1;

const chess = new Chess(Tactics[0].fen);
let fenNoUpdate = Tactics[0].fen;
let origMove = Tactics[0].blunderMove;
let orientationColor = "black";
let firstRun = 1;
let incorrectPuzzle = false;
let numCorrect = 0;
let move = 1;
let level = [false, 0, []]
for(let i=0; i<Tactics.length; i++) {
  level[2][i]=false;
}

async function createLevelRequest(levelData) {
  const settings = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({level: levelData})
 };
 try {
  const response = await fetch("/api/users/create", settings);
  const data = await response.json();
  return data;
 } catch(e) {
    return e;
 }
}

function TestSet() {

  const mutation = useMutation(createLevelRequest 
    //     {
    //     onMutate: async sightingData => {
    //     //1) cancel queries
    //     await queryClient.cancelQueries("sightings");
    
    //     //2 save snapshot
    //     const previousSightings = queryClient.getQueryData("sightings");
        
    //     //3 optimistically update cache
    //     queryClient.setQueryData("sightings", old => [...(old || []), sightingData]);
    //     runFrame(!frame)
    //     //4 return rollback function which reset cache back to snapshot
    //     return {previousSightings};
    //   },
    //   onError: (err, sightingData, rollback) => rollback(),
    //   onSettled: () => queryClient.invalidateQueries("sightings"),
    // }
    );
    const {user} = useUser();

    const router = useRouter();
    const [frame, runFrame] = useState(false);
    const [showButton1, setShowButton1] = useState(false);
    const [showButton2, setShowButton2] = useState(false);
    const [showNoClueButton, setShowNoClueButton] = useState(true);
    const [showNextPuzzleMove, setShowNextPuzzleMove] = useState(false);

    const firstPuzzleMove = () => {
      // setTimeout(() => {
      chess.move(origMove);
      fenNoUpdate = chess.fen();
      runFrame(!frame);
      // }, 1000);
    };
    if (firstRun === 1) {
      firstRun++;
      firstPuzzleMove();
    }

    const NoClueButton = () => (
      <div className="button">
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            sx={{ bgcolor: "text.light" }}
            onClick={onClickNoClueButton}
          >
            I Don&apos;t Know
          </Button>
        </ThemeProvider>
      </div>
    );
    const Button1 = () => (
      <div className="button">
        <Button variant="contained" color="success" onClick={onClickButton1}>
          Continue
        </Button>
      </div>
    );

    const Button2 = () => (
      <div className="button">
        <Button variant="contained" color="error" onClick={onClickButton2}>
          Try Again.
        </Button>
      </div>
    );

    const onClickNoClueButton = () => {
      //bug occuring: on two move puzzles, if you click i don't know after the first move nothing happens.
      for(let i = 1; i<Tactics.length; i++) {
        if(puzzleStatus===i) {
          level[2][i-1]=false;
        }
        break;
      }
      if(puzzleStatus===Tactics.length) {
        level[2][Tactics.length-1]=false;
        level[1]=numCorrect;
        onTestCompletion();
         router.push({      
          pathname: '/dashboard',
          query: { newPlayer: 'false' },
        });
      }
      incorrectPuzzle=true;
      onClickButton1();

    };


    const onClickButton1 = () => {
      if (puzzleStatus !== Tactics.length) {
        move = 1;
        for(let i = 1; i<Tactics.length; i++) {

          if(puzzleStatus===i) {
            if(incorrectPuzzle===false) {
              level[2][i-1]=true;
              numCorrect++;
            }
            else {
              incorrectPuzzle=false;
              level[2][i-1]=false;
            }
            fenNoUpdate = Tactics[i].fen;
            origMove=Tactics[i].blunderMove;
            break;
          }
        }
        chess.load(fenNoUpdate);
        if(chess.turn()==='b') {
          orientationColor="white";
        }
        else {
          orientationColor="black";
        }
        //setTimeout
        firstPuzzleMove(origMove);
        setShowNoClueButton(true);
      
      }
      else if(puzzleStatus===Tactics.length) {
          if (incorrectPuzzle === false) {
            numCorrect++;
            level[2][Tactics.length-1] = true;
          } else {
            level[2][Tactics.length-1] = false;
            incorrectPuzzle=false;
          }
        level[1] = numCorrect;
        onTestCompletion();
        router.push({      
          pathname: '/dashboard',
          query: { newPlayer: 'false' },
        });
      }
      

      puzzleStatus++;
      setShowButton1(false);
    };
    const onClickButton2 = () => {
      incorrectPuzzle = true;
      chess.undo();
      fenNoUpdate = chess.fen();
      setShowButton2(false);
      setShowNoClueButton(true);
    };

    const checkOneMovePuzzle = (theMove, theCorrectMove) => {
      if (theMove === theCorrectMove) {
        setShowButton1(true);
        setShowNoClueButton(false);
      } else {
        setShowButton2(true);
        setShowNoClueButton(false);
      }
    };
    const checkTwoMovePuzzle = (
      theMove,
      correctFirstMove,
      theResponse,
      correctSecondMove
    ) => {
      if (move === 1) {
        if (theMove === correctFirstMove) {
          chess.move(theResponse);
          fenNoUpdate = chess.fen();
          move++;
          setShowNextPuzzleMove(true);
        } else {
          setShowButton2(true);
          setShowNoClueButton(false);
        }
      } else if (move === 2) {
        setShowNextPuzzleMove(false);
        if (theMove === correctSecondMove) {
          setShowButton1(true);
          setShowNoClueButton(false);
        } else {
          setShowButton2(true);
          setShowNoClueButton(false);
        }
      }
    };

    const squaros = SQUARES;
    const toDests = (chess) => {
      const dests = new Map();
      squaros.forEach((s) => {
        const ms = chess.moves({ square: s, verbose: true });
        if (ms.length)
          dests.set(
            s,
            ms.map((m) => m.to)
          );
      });
      return dests;
    };

    const handleMove = (from, to) => {
      let newMove = chess.move({ from, to });
      fenNoUpdate = chess.fen();
      for(let i = 1; i<=Tactics.length; i++) {
      if (puzzleStatus === i) {
        if(Tactics[i-1].solution.length===1) {
          checkOneMovePuzzle(newMove.san, Tactics[i-1].solution[0])
        }
        else if(Tactics[i-1].solution.length===3) {
          checkTwoMovePuzzle(newMove.san, Tactics[i-1].solution[0], Tactics[i-1].solution[1], Tactics[i-1].solution[2])
        }
        break;
      }
    }
      runFrame(!frame);
    };

    const onTestCompletion = React.useCallback(() => {
      localStorage.setItem('level', JSON.stringify(level))
      // mutation.mutate({
      //   userEmail: user.email,
      //   isNew: level[0],
      //   numCorrect: level[1],
      //   firstProbCorrect: level[2][0],
      //   secondProbCorrect: level[2][1],
      //   thirdProbCorrect: level[2][2],
      //   fourthProbCorrect: level[2][3],
      //   fifthProbCorrect: level[2][4],
      //   sixthProbCorrect: level[2][5],
      //   seventhProbCorrect: level[2][6]
      // })
    });

    return (
      <div className="container4">
        <ThemeProvider theme={theme}>
          <div className="item">
            <Chessground className="ground"
              width={600}
              height={600}
              config={{
                fen: fenNoUpdate,
                orientation: orientationColor,
                movable: {
                  // color: turnColor==='w' ? 'white' : "black",
                  free: false,
                  dests: toDests(chess),
                  showDests: true,
                },
                draggable: {
                  showGhost: true,
                  deleteOnDropOff: false,
                },
                events: {
                  move: handleMove,
                },
                drawable: {
                  defaultSnapToValidMove: false,
                  enabled: true,
                  visible: true,
                  eraseOnClick: false,
                },
              }}
            />
          </div>
          <div className="button-text">
            <div className="anItem">
              {orientationColor === "white" ? (
                <Typography variant="h3" color="greenShades.title">
                  White To Move
                </Typography>
              ) : (
                <Typography variant="h3" color="greenShades.title">
                  Black To Move
                </Typography>
              )}
              {showButton1 ? <Button1 /> : null}
              {showButton2 ? <Button2 /> : null}
              {showNoClueButton ? <NoClueButton /> : null}

              {puzzleStatus === 1 &&
              showButton1 === false &&
              showButton2 === false &&
              incorrectPuzzle === false ? (
                <div className="introText">
                  <Typography variant="h6" color="text.TestFirstQuestion">
                    What&apos;s the best move in this position? If you have no idea
                    what this is, just click I don&apos;t know. Don&apos;t spend more than
                    a minute or two per position.
                  </Typography>
                </div>
              ) : null}
              {showNextPuzzleMove ? (
                <div className="nextPuzzle">
                  <Typography color="green" variant="h6">
                    Correct! Can you find the next move?
                  </Typography>
                </div>
              ) : null}
            </div>
          </div>
        </ThemeProvider>
      </div>
    );
  }

  export default TestSet;