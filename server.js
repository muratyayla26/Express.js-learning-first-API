const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get("/api/quotes/random", (req, res)=>{
    const randomQuote = getRandomElement(quotes);
    res.send({
        quote: randomQuote
    });
})

app.get("/api/quotes", (req, res)=>{
    if(req.query.person !== undefined) {
        const authorQuote = quotes.filter(quote => quote.person === req.query.person);
        res.send({
            quotes: authorQuote
        });
    } else {
        res.send({
            quotes: quotes
        });
    }
});

app.post("/api/quotes", (req, res)=>{
    const addedQuote = {
        quote: req.query.quote,
        person: req.query.person
    }
    if(addedQuote.quote !== undefined &&  addedQuote.person !== undefined) {
        quotes.push(addedQuote);
        res.send({
            quote: addedQuote
        })
    } else {
        res.status(400).send();
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});