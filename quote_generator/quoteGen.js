/*
	TODO: backgroudn pictures
	no repeats
	twitter button
*/


var quote = document.getElementById("quote");
var author = document.getElementById("author");
var newQuoteButton = document.getElementById("newQuoteButton");
var background = document.getElementById("background");

var quotes = [
	{
		quote: "Nate is the best",
		author: "Nate"
	},
	{
		quote: "At the end of the day I say to myself, 'Did I make a difference?' I hope the answer is always yes.",
		author: "Lenny Robinson AKA Route 29 Batman"
	},
	{
		quote: "Service to others is the rent you pay for your room here on Earth.",
		author: "Muhammed Ali"
	},
	{
		quote: "Don't cling to a mistake just because you spent a lot of time making it.",
		author: "unknown"
	},
	{
		quote: "Somtimes you will never know the value of a moment until it becomes a memory.",
		author: "Dr. Seuss"
	},
	{
		quote: "I like you just the way you are.",
		author: "Mr. Rogers"
	},
	{
		quote: "No such thign as spare time. No such thing as free time. No such thing as down time. All you got is life time. Go.",
		author: "Henry Rollins"
	},
	{
		quote: "The trouble is, you think you have time.",
		author: "Buddha"
	},
	{
		quote: "Talent is pursued interest.",
		author: "Bob Ross"
	},
	{
		quote: "Every day may not be good, but there's something good in every day.",
		author: "chibird"
	}
];

var colors = [
	"rgb(155, 89, 182)",
	"rgb(119, 177, 169)",
	"rgb(189, 187, 153)",
	"rgb(52, 34, 36)",
	"rgb(243, 156, 18)",
	"rgb(71, 46, 50)",
	"rgb(115, 168, 87)",
	"rgb(22, 160, 133)",

]

generateQuote();

newQuoteButton.onclick = generateQuote;

function generateQuote() {
	var quoteIndex = Math.floor(Math.random() * quotes.length);
	var colorIndex = Math.floor(Math.random() * colors.length);
	quote.innerHTML = "\"" + quotes[quoteIndex].quote + "\"";
	author.innerHTML = "-" + quotes[quoteIndex].author;
	quote.style.color = colors[colorIndex];
	author.style.color = colors[colorIndex];
	background.setAttribute("style", "background-color:" + colors[colorIndex]);
	newQuoteButton.setAttribute("style", "background-color:" + colors[colorIndex]);
	
}

