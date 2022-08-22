import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const Cross = () => {
  return (
    <View style={styles.cross}>
    <View style={styles.crossLine}/>
    <View style={[styles.crossLine,styles.crossLineOther]}/>
  </View>
  )
}

const styles = StyleSheet.create({
    cross:{
        flex:1,
      },
      crossLine:{
        position:'absolute',
        width:8,
        left:'50%',
        height:'100%',
        backgroundColor:'white',
        transform: [
          { rotateZ: "45deg" },
        ]
        
      },
      crossLineOther:{
        transform: [
          { rotateZ: "135deg" },
        ]
      } 
})
export default Cross
