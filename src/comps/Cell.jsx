import { View, Text,StyleSheet,Pressable } from 'react-native'
import React from 'react'
import Cross from './Cross'
const Cell = (props) => {

  const {cell,onPress} = props
  return (
    <Pressable onPress={onPress} style={styles.cell}>
    {
      cell==='o' && <View style={styles.circle}/>
    }
    {
      cell==='x' &&  <Cross/>
    }
 </Pressable> 
  )
}

const styles = StyleSheet.create({
    circle:{
        flex:1,
        borderRadius:100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:8,
        borderColor:'white',
        margin:14
      },
      cell:{
        flex:1,
        width:100,
        height:100,
     
      },
})
export default Cell