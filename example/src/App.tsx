import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  useWindowDimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import CameraScreenExample from './CameraScreenExample';
import BarcodeScreenExample from './BarcodeScreenExample';
import CameraExample from './CameraExample';

const isOrientationPortrait = ({ width, height }) => height >= width;

interface ISVWrapperProps {
  children: any;
  goHome: () => void;
}
function SimpleContainer(props: ISVWrapperProps) {
  const viewStyle1: ViewStyle = { flexDirection: 'row', backgroundColor: '#ccc' };
  const { height, width } = useWindowDimensions();
  const isPortrait = isOrientationPortrait({ height, width });
  const orientationStr = isPortrait ? 'portrait' : 'landscape';
  const tipText = `width:${width},height:${height},orientation:${orientationStr}`;
  const viewStyle2: ViewStyle = { flex: 1, borderWidth: 1, borderColor: 'red' };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={viewStyle1}>
          <TouchableOpacity onPress={props.goHome} style={{ marginRight: 20 } as any}>
            <Text style={{ color: 'blue' }}>Go Home</Text>
          </TouchableOpacity>
          <Text>{tipText}</Text>
        </View>
        <View style={viewStyle2}>{props.children}</View>
      </View>
    </SafeAreaView>
  );
}

interface IState {
  example?: Function;
}
export default function App(props: any) {
  const [state, setState] = useState<IState>({ example: null });
  const goHome = () => setState({ example: null });
  if (state.example) {
    const Example: any = state.example;
    return (
      <SimpleContainer goHome={goHome}>
        <Example />
      </SimpleContainer>
    );
  } else {
    return (
      <SimpleContainer goHome={goHome}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={{ fontSize: 60 }}>🎈</Text>
            <Text style={styles.headerText}>React Native Camera Kit</Text>
          </View>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => setState({ example: CameraExample })}>
              <Text style={styles.buttonText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setState({ example: CameraScreenExample })}>
              <Text style={styles.buttonText}>Camera Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setState({ example: BarcodeScreenExample })}>
              <Text style={styles.buttonText}>Barcode Scanner</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SimpleContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F5FCFF',
    marginHorizontal: 24,
  },
  headerContainer: {
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  headerText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    height: 60,
    borderRadius: 30,
    marginVertical: 12,
    backgroundColor: '#dddddd',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
  },
});
