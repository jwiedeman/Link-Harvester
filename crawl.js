const axios = require('axios');
const cheerio = require('cheerio');
const chalk = require('chalk');
const error = chalk.bold.red;
const remove = chalk.keyword('red');
const add = chalk.keyword('green');
const instance = axios.create();
instance.defaults.timeout = 1000;
let links = [];
let crawled = [];
let target = ['https://www.google.com'];
let bl = [".png", ".jpg", ".gif", 'font','css', 'favicon', '.js', '.php', ];
let crawlcount = 0;
let attempt = 0;
let hopesanddreams = 0; 





function getter() {
    if (attempt > 1) {
        target[0] = target[0].replace(/(^\w+:|^)\/\//, '')
        console.log('Attempt Phase 1 : ' + target[0])

        if (attempt > 2) {
            console.log('Kill Attempt')
            target.shift()
            target.push(links.shift())
            attempt = 0;
        }

    }
    axios.get(target).then(function (response) {
        crawlcount++
        hopesanddreams++
        let $ = cheerio.load(response.data);
        $("[href*='https://']").each((i, element) => {
            if (links.includes((element.attribs.href), 0) == false) {
                links.push((element.attribs.href))
            }
        });
        
        links.forEach(function (a) {
            bl.forEach(function (elem) {
                if (a.includes(elem) == true) {
                    links.splice(links.indexOf(a), 1)
                }
            });
        });
        
        crawled.unshift(target.shift())
        links.forEach(function (a) {
            crawled.forEach(function (elem) {
                if (a.includes(elem) == true) {
                     links.splice(links.indexOf(a), 1)
                }
            });
        });
        
        let a = links.shift()
        target.push(a)
        console.log('    TARGET ASSIGNED  >> ' + a)
      
    }).catch(error => {
        attempt++
        console.log(chalk.bgRed.bold.black('FUCK WE HIT A BAD LINK REEEE'))
    }).then(function (response) {
        hopesanddreams--
        getter();
        

        for(i=50;i>0;i--){
            console.log(crawled[i])    
        }        
        console.log(chalk.bgRed.bold('   TARGET >> ' + target[0]));
        console.log(chalk.inverse.bgWhite.black.bold('  LINKS LIST: ' + links.length + '  ATTEMPT # : ' + attempt + '   TARGETS ACTIVE : ' + target.length + '   CRAWLCOUNT : ' + crawlcount + '    CRAWLED : ' +crawled.length + '   PROMISES OPEN : ' + hopesanddreams + '    ' ))

    })
}

let wrapper = new Promise(function(resolve,reject){
        resolve()
})



// INIT FUCK.EXE
getter();













