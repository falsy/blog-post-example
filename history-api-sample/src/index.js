const currentHistoryState = () => {
	document.getElementById('state').innerText = JSON.stringify(history.state);
}

currentHistoryState();

document.getElementById('push-state1').addEventListener('click', () => {
	history.pushState({data: 'pushState1'}, '', '/push-state1');
	currentHistoryState();
});
document.getElementById('push-state2').addEventListener('click', () => {
	history.pushState({data: 'pushState2'}, '', '/push-state2');
	currentHistoryState();
});
document.getElementById('push-state3').addEventListener('click', () => {
	history.pushState({data: 'pushState3'}, '', '/push-state3');
	currentHistoryState();
});
document.getElementById('replace-state').addEventListener('click', () => {
	history.replaceState({data: 'replaceState'}, '', '/replace-state');
	currentHistoryState();
});
window.addEventListener('popstate', () => {
  currentHistoryState();
});