import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { FLY_WIDTH, FLY_HEIGHT, FLY_IMG_PATH } from './constants';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.flyAnimation = new Animated.ValueXY({ x: FLY_WIDTH, y: FLY_HEIGHT })
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  moveFly() {
    const newX = this.getRndInteger(FLY_WIDTH, Dimensions.get('window').width - FLY_WIDTH);
    const newY = this.getRndInteger(FLY_HEIGHT, Dimensions.get('window').height - FLY_HEIGHT);
    console.log(newX, newY);
    Animated.spring(
      this.flyAnimation,
      {
        toValue: {x: newX, y: newY},
      }
    ).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.flyContainer, this.flyAnimation.getLayout()]}>
          <TouchableOpacity onPress={() => {this.moveFly()}}>
            <Image
              style={styles.fly}
              source={require(FLY_IMG_PATH)}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0',
  },
  flyContainer: {
    width: FLY_WIDTH,
    height: FLY_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fly: {
    width: FLY_WIDTH,
    height: FLY_HEIGHT,
  }
});
