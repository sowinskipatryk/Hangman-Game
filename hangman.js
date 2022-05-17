function drawKeyword(data)
{	
	const keywordIndex = Math.floor(Math.random()*928) + 1;
	const keywordRaw = data[keywordIndex];
	const keyword = keywordRaw.toUpperCase();
	return keyword;
}

function coverUpKeyword(keyword)
{
	let currentKeyword = "";
	
	for (i=0; i<keyword.length; i++)
	{
		if (keyword.charAt(i)==" ") currentKeyword = currentKeyword + " ";
		else if (keyword.charAt(i)==".") currentKeyword = currentKeyword + ".";
		else if (keyword.charAt(i)==",") currentKeyword = currentKeyword + ",";
		else if (keyword.charAt(i)==":") currentKeyword = currentKeyword + ":";
		else currentKeyword = currentKeyword + "_";
	}
	return currentKeyword;
}

function printKeyword(currentKeyword)
{
	document.getElementById("keyword").innerHTML = currentKeyword;
}

function killBtnFunctions()
{
	for (letter in letters)
	{
		let elementId = "letter" + letter;
		document.getElementById(elementId).setAttribute("onclick", ";");
		document.getElementById(elementId).style.cursor = "default";
	}
}

function displayLetterButtons()
{
	let divContent = "";
	
	for (i=0; i<35; i++)
	{
		let divId = "letter" + i;
		divContent = divContent + '<div class="letter" onclick="checkLetter(keyword,'+i+')" id="'+divId+'">'+letters[i]+'</div>';
		if ((i+1) % 7 == 0) divContent = divContent + '<div style="clear:both;"';
	}
	
	document.getElementById("letters").innerHTML = divContent;
}

String.prototype.setLetter = function(position, letter)
{
	if (position > this.length - 1) return this.toString();
	else return this.substr(0, position) + letter + this.substr(position + 1);
}

function checkLetter(keyword, x)
{
	let correctLetter = false;
	let currentKeyword = document.getElementById("keyword").innerHTML;
	
	for (i=0; i<keyword.length; i++)
	{
		if (letters[x] == keyword.charAt(i)) 
		{
			currentKeyword = currentKeyword.setLetter(i, letters[x]);
			correctLetter = true;
		}
	}
	
	if (correctLetter == true)
	{
		yesSound.play();
		
		let elementId = "letter" + x;
		
		document.getElementById(elementId).style.background = "#003300";
		document.getElementById(elementId).style.color = "#00C000";
		document.getElementById(elementId).style.border = "3px solid #00C000";
		document.getElementById(elementId).style.cursor = "default";
		document.getElementById(elementId).setAttribute("onclick", ";");
		
		printKeyword(currentKeyword);
	}
	else
	{
		noSound.play();
		
		let elementId = "letter" + x;
		
		document.getElementById(elementId).style.background = "#330000";
		document.getElementById(elementId).style.color = "#C00000";
		document.getElementById(elementId).style.border = "3px solid #C00000";
		document.getElementById(elementId).style.cursor = "default";
		document.getElementById(elementId).setAttribute("onclick", ";");
		document.getElementById("picture").innerHTML = '<img src="'+hangmanState+'.png" alt="" />';
		
		hangmanState++;
	}

	if (keyword == currentKeyword) 
	{
		document.getElementById("gameStatus").innerHTML = 'YOU WIN! <br><span class="reset" onclick="location.reload()">PLAY AGAIN</span>';
		killBtnFunctions();
	}
	else if (hangmanState>=10) 
	{
		document.getElementById("gameStatus").innerHTML = 'GAME OVER! YOU LOSE! <br><span class="reset" onclick="location.reload()">PLAY AGAIN</span>';
		killBtnFunctions();
	}
	
	return hangmanState;
}

const yesSound = new Audio("correct_answer.wav"); 
const noSound = new Audio("wrong_answer.wav");

let hangmanState = 0;

const dictionary = ['A','Ą','B','C','Ć','D','E','Ę','F','G','H','I','J','K','L','Ł','M','N','Ń','O','Ó','P','Q','R','S','Ś','T','U','V','W','X','Y','Z','Ż','Ź'];

let letters = new Array(35);
for (let i = 0; i < 35; i++)
{
	letters[i] = dictionary[i];
}

let keyword;
let currentKeyword;

fetch('./data.json')
	.then(response => 
	{
		let data = response.json()
		return data;
	})
	.then(data =>
	{
		keyword = drawKeyword(data)
		return keyword;
	})
	.then(keyword => 
	{
		currentKeyword = coverUpKeyword(keyword)
		currentKeyword = printKeyword(currentKeyword)
		displayLetterButtons()
		return currentKeyword;
	});
