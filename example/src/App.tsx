import * as React from 'react';

import { StyleSheet, View, Button, Text } from 'react-native';
import Timer from 'react-native-timer';
import type { TimerHandle } from 'src/Timer';

export default function App() {
  const timer = React.createRef<TimerHandle>()
  return (
    <View style={styles.container}>
      <Timer
        ref={timer}
        seconds={5}
        onStart={() => { console.log('Timer Start !!!!!'); }}
        onEnd={() => { console.log('Timer Finished !!!!!'); }}
        style={{ fontSize: 40, padding: 5, fontWeight: 'bold' }}
        onPress={() => { console.log('Timer pressed'); }}
      />
      <Button title='START' onPress={() => timer.current?.start()} />
      <Button title='STOP' onPress={() => timer.current?.stop()} />
      <Button title='RESET' onPress={() => timer.current?.reset()} />
      <View style={styles.row}>
        <Text>seconds: 7</Text>
        <Button title='RESET' onPress={() => timer.current?.reset({ seconds: 7 })} />
      </View>
      <Button title='isRunning?' onPress={() => console.log('is run: ', timer.current?.isRunning())} />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
