/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import test from '../external/test';

console.log(test);
AppRegistry.registerComponent(appName, () => App);
