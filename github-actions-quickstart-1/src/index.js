import { toUpperCase } from './service/functions';

const target = document.getElementById('hello');
target.innerText = toUpperCase(target.innerText);