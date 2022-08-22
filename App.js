import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ImageBackground,Pressable, Alert,Button } from 'react-native';
import { useState } from 'react';
import tictac from './assets/tictac.jpg'
import Cell from './src/comps/Cell';
export default function App() {

  const [moves,setmoves] = useState([   ['','',''],
  ['','',''],
  ['','','']])

  const [currentMove,setcurrentMove] = useState('x')
  const onPress = (rowIndex,colIndex) =>{
    if(moves[rowIndex][colIndex]!=='')
    {
      Alert.alert('Postion already occupied')
      return
    }
    setmoves((prevmove)=>{
      const newmoves  = [...prevmove]
      newmoves[rowIndex][colIndex] = currentMove
      return newmoves

    })
setcurrentMove(currentMove==='x' ? 'o' : 'x')
  const player  = winningCondition()
  if(player)
  {
    gameWon(player)
  }
  else
  {
    itsaTie()
  }
  }

  const itsaTie = () => {
    if(!moves.some(row => row.some(cell => cell==='')))
    {
      Alert.alert(`It's a tie`,'tie',[
        {
          text:'Restart',
          onPress:resetGame
        }
      ])
    }
  }

  const winningCondition = ()=> {
    //row

    for(let i = 0;i < 3;i++)
    {
      const xWon = moves[i].every(cell => cell==='x')
      const oWon = moves[i].every(cell=>cell==='o')

      if(xWon)
      {
        return 'X'
      }
      if(oWon)
      {
        return 'O'
      }
    }

    //col
    for(let col = 0; col < 3;col++)
    {
      let xWonColumn = true
      let oWonColumn = true

      for(let row = 0; row < 3;row++)
      {
        if(moves[row][col]!=='x')
        xWonColumn =  false

        if(moves[row][col]!=='o')
        oWonColumn = false

        
      }
      if(xWonColumn)
        {
          return 'X'
          break;
        }
        if(oWonColumn)
        {
          return 'O'
          break;
        }
    }

    //diagonal
    let diag1Xwon = true
    let diag1Owon = true
    let diag2Xwon = true
    let diag2Owon = true

    for(let i = 0;i<3;i++)
    {
      if(moves[i][i]!='o')
      diag1Xwon = false
      if(moves[i][i]!='x')
      diag1Owon = false

      if(moves[i][2-i]!='o')
      diag2Xwon = false
      if(moves[i][2-i]!='x')
      diag2Owon = false

    }

    if(diag1Xwon ||diag2Xwon)
    {
      return'X'
    }
    if(diag1Owon || diag2Owon)
    {
      return'O'
    }


  }


  const gameWon = (player) => {
    Alert.alert('Congrats!',` Player ${player} won`,[
      {
        text:'Restart',
        onPress:resetGame
      }
    ])
  }

  const resetGame = () => {
    setmoves( [   ['','',''],
    ['','',''],
    ['','','']])
    setcurrentMove('x')
  }

  return (
    <View style={styles.container}>
      <ImageBackground source = {tictac} style={styles.background} resizeMode="contain">
        <Text
          style={{
            fontSize:24,
            color:'white',
            position:'absolute',
            top:50
          }}
        >
          Current Turn : {currentMove.toUpperCase()}
        </Text>
     
        <View style={styles.align}>
          {
            moves.map((row,rowIndex)=>
              <View key={`row - ${rowIndex}`} style={styles.row}>
              {row.map((cell,colIndex) =>
                 <Cell cell={cell} onPress={()=>onPress(rowIndex,colIndex)}/>
              )}
              </View>
             
            )
          }
        </View> 
        <Pressable style={styles.button} onPress={()=>resetGame()}>
      <Text >Reset</Text>
    </Pressable>
        </ImageBackground>
     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#190F25',

  },
  button: {
    position:'absolute',
    alignItems:'flex-end',
    justifyContent: 'flex-end',
    top:100,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#E3AE67',
  },
  align:{
    width:"80%",
    aspectRatio:1


  },

  background:{
    width:'100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:18,
  },
  row:{
    flex:1,
    flexDirection:'row'
  },
  circle:{
    flex:1,
    borderRadius:100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:8,
    borderColor:'white',
    margin:14
  }

});
