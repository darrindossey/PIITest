const express = require('express');
const pii = require('./Services/pii.js');
const wordlist = require('./Services/wordlist.js');

var app = express();

var options = {
    host: 'www.wordgamedictionary.com',
    path: '/english-word-list/download/english.txt',
    method: 'GET',
    fqdn: 'https://www.wordgamedictionary.com/english-word-list/download/english.txt',
    headers: {
        "Content-Type": "application/text"
    }
};

load_dictionary(options);

var result = wordlist.search('dog');
// Pug View Templates
app.set('view engine', 'pug')

app.get('/', function(req,res) {
    res.send('Hello World');
});

app.get('/pii', function(req,res) {
    var result = wordlist.search('dog');
    res.send('Searching for dog: found ' + result);
});


app.listen(3000, function() {
    console.log('Example app running on port 3000!');
    console.log(pii.Parse("The quick red fox jumped over the lazy brown dog."));
});

async function load_dictionary(options)
{
    var response = wordlist.getwords(options, dictionary_done);
}

function dictionary_done() {
    console.log("Wordlist is done");
        
    wordSearch("DOG");
    wordSearch("APPLE");
    wordSearch("MCGREGOR");
    wordSearch("TANSTAAFFL");
    wordSearch("DALLAS");
    wordSearch("TEXAS");
    wordSearch("TX");
    wordSearch("Hi");
}

function wordSearch(word) {
    word = word.toLowerCase();
    var result = wordlist.search(word);
    console.log("Search for " + word + " and found " + result + " hits.");
}