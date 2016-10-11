var quote = document.getElementById("quote");
var author = document.getElementById("author");
var newQuoteButton = document.getElementById("newQuoteButton");

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
		quote: "Gotta have opposites dark and light, light and dark in painting. It's like in life. Gotta have a little sadness once in a while so you know when the good times come. I'm waiting on the good times now.",
		author: "Bob Ross"
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
		quote: "I'd always end up broken down on the highway. When I stood there trying to flag someone down, nobody stopped. But when I pushed my own car, other drivers would get out and push with me. If you want help, help yourself - people like to see that.",
		author: "Chris Rock"
	}
];

generateQuote();

newQuoteButton.onclick = generateQuote;

function generateQuote() {
	var quoteIndex = Math.floor(Math.random() * quotes.length);
	quote.innerHTML = "\"" + quotes[quoteIndex].quote + "\"";
	author.innerHTML = "-" + quotes[quoteIndex].author;
}

