'use strict';

const analyser = require('./assertion-analyser');
const EventEmitter = require('events').EventEmitter;
const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

const mocha = new Mocha({ 
    timeout: 5000,
    ui: 'tdd'
});
const testDir = './tests';

let emitter = new EventEmitter();
emitter.run = function() {
    let tests = [];
    let context = "";
    let separator = ' -> ';

    // Check if tests directory exists
    if (!fs.existsSync(testDir)) {
        console.log('Tests directory not found - skipping tests');
        emitter.report = tests;
        emitter.emit('done', tests);
        return;
    }

    // Add each .js file to the mocha instance
    fs.readdirSync(testDir).filter(function(file) {
        // Only keep the .js files
        return file.substr(-3) === '.js';
    }).forEach(function(file) {
        mocha.addFile(
            path.join(testDir, file)
        );
    });

    // Run the tests
    try {
        let runner = mocha.run()
            .on('test end', function(test) {
                // remove comments
                let body = test.body.replace(/\/\/.*\r?\n|\/\*.*\*\//g, '');
                // collapse spaces
                body = body.replace(/\s+/g,' ');
                let obj = {
                    title: test.title,
                    context: context.slice(0, -separator.length),
                    state: test.state,
                    assertions: analyser(body)
                };
                tests.push(obj);
            })
            .on('end', function() {
                emitter.report = tests;
                emitter.emit('done', tests)
            })
            .on('suite', function(s) {
                context += (s.title + separator);
            })
            .on('suite end', function(s) {
                context = context.slice(0, -(s.title.length + separator.length))
            })
    } catch(e) {
        console.log('Error running tests:', e);
        emitter.report = tests;
        emitter.emit('done', tests);
    }
};

module.exports = emitter;