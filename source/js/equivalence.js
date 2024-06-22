document.querySelector("#email").focus();
var pf1 = document.querySelector("#pass1");
var pf2 = document.querySelector("#pass2");
function isEqual()
{
	if (pf1.value == pf2.value)
	{
		pf1.style.border = `1px solid black`;
		pf2.style.border = `1px solid black`;
	}
	else
	{
		pf1.style.border = `1px solid rgb(230, 5, 40)`;
		pf2.style.border = `1px solid rgb(230, 5, 40)`;
	}
}