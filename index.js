/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AddEmployee from './src/screens/EditEmployee'
// import {StackContainer } from './src/routes/StackRoot'
import {StackContainer} from './src/routes/StackRoot'
import {name as appName} from './app.json';
import App from './App'

AppRegistry.registerComponent(appName, () => App);
