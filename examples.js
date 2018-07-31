import React from 'react';
import {View, TouchableHighlight, Button, Text} from 'react-native';
const Wrapper = ({children})=>(<View style={{padding:30, flexDirection:'row'}}>{children}</View>)
const examples = {
  TouchExample:()=>(
    <Wrapper>
      <View style={{flex:1}}><TouchableHighlight><Text>TouchableHighlight</Text></TouchableHighlight></View>
      <View style={{flex:1}}><Button title="Button"/></View>
    </Wrapper>
  )
}

export default examples