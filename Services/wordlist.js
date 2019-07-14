// Parse Word File from https://www.wordgamedictionary.com/english-word-list/download/english.txt
const request = require('request');
var trie = require('./trie');

var noop = function() {}

exports.search =  function (word) {
    return trie.search(word);
};

exports.getwords = function(options, callback ) {
    
    callback = (callback || noop);

    console.log("Requesting data from " + options.fqdn);
    request(options.fqdn, function(error, response, body) {
        console.log(body.length);
        //var lines = (body.match(/\n/g)||[]).length;
        var data = body.split("\n");
        
        //console.log(lines);
        //console.log("Line 1 = " + data[0]);
        //var jsonString = JSON.stringify(data);
        //console.log(jsonString);

        var dataObject = [];
        for(var i = 0; len = data.length, i < len; i++) {
            
            if (validateWord(data[i])) {
                trie.add(data[i]);
                dataObject.push({ "word" : data[i] });
            }
        }

        callback();

        return;
    });

    function validateWord(theWord) {
        var regex1 = /\d|[-\_\.,'"\\<>//]/;
        var match = regex1.test(theWord);
        if (match) {
            return false;
        }
        return true;


    }
}