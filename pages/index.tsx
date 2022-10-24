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
  width: 488px;
  height: 488px;
  margin: 0;
  margin-right: -50%;
  background: yellow;
  background-color: #e3e3e3;
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
const White = styled(Block)`
  background-color: #f9f9f9;
`
const Black = styled(Block)`
  background-color: #000000;
`

const HomePage: NextPage = () => {
  const [board, setBoard] = useState(Array.from(new Array(8), () => new Array(8).fill(9)))
  const [whiteNum, setWhiteNum] = useState(0)
  const [balckNum, setBlackNum] = useState(0)
  // おける場所を調べる関数
  const search = () => {
    // おける座標を返す
  }
  const newBoard: number[][] = JSON.parse(JSON.stringify(board))
  useEffect(() => {
    // 初期設定
    newBoard[4][4] = 1
    newBoard[4][5] = 2
    newBoard[5][4] = 2
    newBoard[5][5] = 1
  }, [])
  return (
    <Container>
      <MainArea>
      {board.map((row, y) =>
          row.map((num, x) =>
            num === 9 ? <Block key={`${x}-${y}`} /> : <Block key={`${x}-${y}`} /> 
          )
        )}
      </MainArea>
    </Container>
  )
}

export default HomePage
