let principal;
async function getPrincipal(){
	try {
		const response = await fetch('/member/api/currentUser.json'); // == fetch > then
		const userPrincipal = await response.json(); // == then
		principal = userPrincipal.principal;
	} catch (e) {
		console.log(e);
	}
}
getPrincipal();