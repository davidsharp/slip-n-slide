import React from 'react';
import { View, ScrollView, Text, Button, Image, ImageBackground, StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native';

import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions';
import Markdown from 'react-native-markdown-renderer';

import Expo from 'expo'
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);

import Examples, {TouchExample} from './examples'
console.log(Examples)

StatusBar.setHidden(true)

//consider borders/ options in first page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 0,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  footer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 16,
  },
  text: {
    textAlign: 'center',
  },
  textBold: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
  },
  circlesContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const Circle = (props) => (
  <View style={{
    backgroundColor: props.background,
    width: props.size,
    height: props.size,
    borderRadius: props.size / 2,
    margin: 14 }}
  />
);

const Splash = (props) => (
  <View style={styles.container}>
    <View style={[styles.top, { flex:1, backgroundColor: '#AA3939' }]}>
      <TouchableWithoutFeedback onPress={() => props.navigation.navigate('slide-0')}>
      <ImageBackground source={require('./title-photo.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={styles.content}>
      <Transition appear="horizontal">
        <View style={{top:100}}>
          <Text style={[styles.textBold,{color:'white'}]}>App Development for Web Developers</Text>
          <Text style={[styles.text,{color:'white'}]}>
            Why you should write apps, and what to watch out for
          </Text>
          <Text style={[styles.textBold,{color:'white'}]}>David Sharp </Text>
        </View>
      </Transition>
    </View>
      </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  </View>
);

const Fin = (props) => (
  <View style={styles.container}>
    <View style={[styles.top, { backgroundColor: '#88CC88' }]}>
      <Transition appear="horizontal">
        <Circle background="#2D882D" size={140} />
      </Transition>
      <View style={styles.circlesContainer}>
        <Transition appear="horizontal" delay>
          <Circle background="#550000" size={40} />
        </Transition>
        <Transition appear="horizontal" delay>
          <Circle background="#550000" size={40} />
        </Transition>
        <Transition appear="horizontal" delay>
          <Circle background="#550000" size={40} />
        </Transition>
      </View>
    </View>
    <View style={styles.content}>
      <Transition appear="horizontal">
        <View>
          <Text style={styles.textBold}>Fin</Text>
        </View>
      </Transition>
    </View>
    <View style={styles.footer}>
      <Transition appear="horizontal">
        <Button title="Back" onPress={() => props.navigation.goBack()} />
      </Transition>
    </View>
  </View>
);

const createScreen = ({title,content,next}) => (props) => (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => props.navigation.navigate(next)}>
        <View style={[styles.header, { backgroundColor: '#FFE04D' }]}>
          <Text>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
      <ScrollView style={{margin:20}/*styles.content*/}>
        <Transition appear="horizontal">
          <Markdown>{content}</Markdown>
        </Transition>
      </ScrollView>
    </View>
);

const createExampleScreen = ({title, next, Example}) => (props) => (
  <View style={styles.container}>
    <View style={[styles.header, { backgroundColor: '#FFE04D' }]}>
      <Text>{title}</Text>
    </View>
    <ScrollView style={{margin:20}}>
      <Example/>
    </ScrollView>
    <View style={styles.footer}>
    <Transition appear="horizontal">
        <Button title="<" onPress={() => props.navigation.goBack()} />
      </Transition>
      <View style={{ width: 20 }} />
      <Transition appear="horizontal">
        <Button title=">" onPress={() => props.navigation.navigate(next)} />
      </Transition>
      </View>
  </View>
);

//This isn't being used, it's basically here because we really on the Navigator's router for some reason
const Navigator = FluidNavigator({screen1: { screen: Splash }}, {
  mode: 'card',
  navigationOptions: {
    gesturesEnabled: true,
  },
});
// end of garbage

class App extends React.Component {
  static router = Navigator.router;
  state = {slides:[],ThisNavigator:false,fourByThree:true,leftOffset:0,padding:20}
  constructor(props){
    super(props)
    this.getSlides().then(slides=>{
      const screens={
        //blah: { screen: createExampleScreen({title:'touch',Example:Examples.TouchExample,next:'intro'}) },
        intro: { screen: Splash },
        fin: { screen: Fin }
      }
      slides.forEach((c,i,a)=>{
        const {title,copy:content,next,component}=c
        screens['slide-'+i]={screen: createScreen({title,content:content.split('\\n').join('\n').split('!!').join('\n'),next:i!=a.length-1?'slide-'+(i+1):'fin',component})}
      })
      this.setState({
      slides,
      ThisNavigator:
      FluidNavigator(screens, {
      mode: 'card',
      navigationOptions: {
        gesturesEnabled: true,
      },
    })
  })})
  }
  getSlides() {
    return fetch('https://happy-garage.glitch.me')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const fourByThree = this.state.fourByThree
    const ThisNavigator = this.state.ThisNavigator
    const leftOffset = this.state.leftOffset
    const padding = this.state.padding
    return (<View style={{flex: 1, flexDirection: 'row'}}>
      <Expo.KeepAwake />
      {fourByThree && <View style={{flex: 2, backgroundColor:'black'}}/>}
      <View style={{flex: 12, backgroundColor:'black', padding, paddingLeft:padding+leftOffset}}>
        <View style={{flex:1, backgroundColor:'white'}}>
          {ThisNavigator && <ThisNavigator navigation={this.props.navigation} />}
        </View>
      </View>
      {fourByThree && <View style={{flex: 2, backgroundColor:'black'}}/>}
    </View>);
  }
}

export default App;
