import loginStore from '../stores/LoginStore';

export function loginCheck(nextState, replace){
	console.log("got here on the helper login check",loginStore.isLoggedIn());
	if (!loginStore.isLoggedIn())
		replace('/login');
}
export function logoutCheck(nextState, replace){
	console.log("got here on the helper logout",loginStore.isLoggedIn());
	if (loginStore.isLoggedIn())
		replace('/');
}