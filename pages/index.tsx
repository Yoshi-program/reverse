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

  const createNewBoard = (): number[][] => {
    const board = Array.from(new Array(8), () => new Array(8).fill(9))
    board[3][3] = 1
    board[3][4] = -1
    board[4][3] = -1
    board[4][4] = 1
    return board
  }
  const [board, setBoard] = useState(createNewBoard())

  const onClick = (x: number, y: number) => {
    // ひっくり返す関数
    const turnOver = (x: number, y: number) => {
      if (whiteTurn) {
        if (newBoard[y][x] == -1) setBlackNum((n) => n - 1)
        newBoard[y][x] = 1
        setWhiteNum((n) => n + 1)
      } else {
        if (newBoard[y][x] == 1) setWhiteNum((n) => n - 1)
        newBoard[y][x] = -1
        setBlackNum((n) => n + 1)
      }
    }
    // 置ける場所を調べる関数
    const searchCoordinate = (
      x: number,
      y: number
    ): [boolean, { [key: string]: number }[]] => {
      let list: {
        x: number
        y: number
      }[] = []
      let tmplist = []
      let yes = false
      const wb = whiteTurn ? 1 : -1
      let ry, rx
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          ry = y + dy
          rx = x + dx
          if (ry < 0 || 7 < ry || rx < 0 || 7 < rx) continue

          // 調べるマスが「相手の石」ならループ
          let i = 0
          while (newBoard[ry][rx] == -wb && i < 10) {
            i++
            tmplist.push({ x: rx, y: ry })
            ry += dy
            rx += dx
            if (ry < 0 || 7 < ry || rx < 0 || 7 < rx) break

            //自分の石に出会った時
            if (newBoard[ry][rx] == wb) {
              list = [...list, ...tmplist]
              yes = true
              break
              // return [true, tmplist]
            }
          }
          tmplist = []
        }
      }
      return [yes, list]
    }
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    if (newBoard[y][x] === 9) {
      // console.log(newBoard)
      const [b, list] = searchCoordinate(x, y)
      // console.log('list: ', list)
      if (!b) return false
      else {
        list.map((c) => {
          turnOver(c.x, c.y)
        })
        turnOver(x, y)
        setBoard(newBoard)
        setWhiteTurn(!whiteTurn)
        return true
      }
    } else {
      return false
    }
  }
  useEffect(() => {
    if (!whiteTurn) {
      for (let bx: number, by: number, i: number = 0; i < 100; i++) {
        bx = Math.floor(Math.random() * 8)
        by = Math.floor(Math.random() * 8)
        if (onClick(bx, by)) return
      }
      for (let bx: number = 0; bx < 8; bx++) {
        for (let by: number = 0; by < 8; by++) {
          if (onClick(bx, by)) {
            return
          }
        }
      }
      setWhiteTurn(!whiteTurn)
    }
  }, [whiteTurn])
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
