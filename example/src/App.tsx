import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import Timer from 'react-native-timer';
import type { TimerHandle } from 'src/Timer';

export default function App() {
  const timer = React.createRef<TimerHandle>()
  return (
    <View style={styles.container}>
      <Timer ref={timer} seconds={5} />
      <Button title='START' onPress={() => timer.current?.start()} />
      <Button title='STOP' onPress={() => timer.current?.stop()} />
      <Button title='RESET' onPress={() => timer.current?.reset()} />
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
