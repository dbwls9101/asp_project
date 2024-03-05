getPrincipal().then(() => {
	partnerInfo(principal.member.m_idx);
})

function partnerInfo(m_idx) {
	fetch('/partner/partnerinfo', {
		method : 'post',
		body : m_idx,
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		let bank = json.bank;
		document.getElementById("bank").value = bank;
		
		let bank_number = json.bank_number;
		document.getElementById("bank_number").value = bank_number;
	})
	.catch(err => console.log(err));
}