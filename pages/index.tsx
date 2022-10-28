import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, chakra } from '@chakra-ui/react'

const Container = styled.div`
  height: 100vh;
  background-color: lightblue;
`
const MainArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 640px;
  margin: 0;
  margin-right: -50%;
  background: yellow;
  background-color: #e3e3e3;
  border: solid 5px;
  border-color: #fff #3e3e3e #3e3e3e #fff;
  transform: translate(-50%, -50%);
`
const Board = styled.div`
  position: fixed;
  top: 57%;
  left: 50%;
  width: 498px;
  height: 498px;
  border: solid 5px;
  border-color: #fff #3e3e3e #3e3e3e #fff;
  transform: translate(-50%, -50%);
`
const Block = styled.button`
  float: left;
  width: 61px;
  height: 61px;
  line-height: 30px;
  vertical-align: baseline;
  background-color: #b0b0b0;
  background-repeat: no-repeat;
  background-size: 505px;
  border: solid 1px;
  border-color: '#707070';
`
const WhiteBlock = styled(Block)`
  background-color: #f9f9f9;
`
const BlackBlock = styled(Block)`
  background-color: #000000;
`
const WhiteCountArea = styled(MainArea)`
  top: 9%;
  left: 30%;
  width: 200px;
  height: 70px;
  background-color: #e2ffc9;
`
const BlackCountArea = styled(WhiteCountArea)`
  left: 70%;
`

const HomePage: NextPage = () => {
  const [whiteTurn, setWhiteTurn] = useState(true)
  const [whiteNum, setWhiteNum] = useState(2)
  const [blackNum, setBlackNum] = useState(2)
  // おける場所を調べる関数
  const search = () => {
    // おける座標を返す
  }
  const createNewBoard = (): number[][] => {
    const board = Array.from(new Array(8), () => new Array(8).fill(9))
    board[3][3] = 1
    board[3][4] = 2
    board[4][3] = 2
    board[4][4] = 1
    return board
  }
  const [board, setBoard] = useState(createNewBoard())

  const onClick = (x: number, y: number) => {
    const turnOver = () => {
      if (whiteTurn) {
        newBoard[y][x] = 1
        setWhiteNum(whiteNum + 1)
      } else {
        newBoard[y][x] = 2
        setBlackNum(blackNum + 1)
      }
    }
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    turnOver()
    setWhiteTurn(!whiteTurn)
    setBoard(newBoard)
  }
  return (
    <Container>
      <MainArea>
        <WhiteCountArea>{whiteNum}</WhiteCountArea>
        <BlackCountArea>{blackNum}</BlackCountArea>
        <Board>
          {board.map((row, y) =>
            row.map((num, x) =>
              num === 9 ? (
                <Block key={`${x}-${y}`} onClick={() => onClick(x, y)} />
              ) : num === 1 ? (
                <WhiteBlock key={`${x}-${y}`} />
              ) : (
                <BlackBlock key={`${x}-${y}`} />
              )
            )
          )}
        </Board>
      </MainArea>
    </Container>
  )
}

export default HomePage
