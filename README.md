# react-native-timer

Timer component

## Installation

```sh
npm install react-native-timer
```

## Usage

```js
import Timer from "react-native-timer";

// ...

export default function App() {
  const timer = React.createRef<TimerHandle>()
  return (
    <View style={styles.container}>
      <Timer ref={timer}
        hours={1} minutes={30} seconds={5}
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
        {/* reset timer with other values */}
        <Button title='RESET' onPress={() => timer.current?.reset({ seconds: 7 })} />
      </View>
      <Button title='isRunning?' onPress={() => console.log('is run: ', timer.current?.isRunning())} />
    </View>
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
