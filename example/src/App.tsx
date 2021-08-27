import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import Timer from 'react-native-timer';

export default function App() {
  return (
    <View style={styles.container}>
      <Timer seconds={5} autoStart  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
