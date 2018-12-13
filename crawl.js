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
//, 'bing', 'microsoft', 'facebook', 'callrail', 'google', '.gov'

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http:" + url;
    }
    return url;
}

function addhttps(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "https:" + url;
    }
    return url;
}

function randurl(items) {
    return items[Math.floor(Math.random() * items.length)];
}

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
    axios.get(randurl(target)).then(function (response) {
        crawlcount++
        hopesanddreams++
        let $ = cheerio.load(response.data);
        $("[href*='https://']").each((i, element) => {
            if (links.includes((element.attribs.href), 0) == false) {
                links.push((element.attribs.href))
            }
        });
        let i = 0;
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
        if (links.length > 500){
            getter();
        }
        if (links.length > 1000){
            getter();
        }
        if (links.length > 1500){
            getter();
        }

        if (crawled.length > 1000){
            crawled.pop()
            crawled.pop()
            crawled.pop()
        }


        for(i=50;i>0;i--){
            console.log(crawled[i])    
        }        
        console.log(chalk.bgRed.bold('   TARGET >> ' + target[0]));
        console.log(chalk.inverse.bgWhite.black.bold('  LINKS LIST: ' + links.length + '  ATTEMPT # : ' + attempt + '   TARGETS ACTIVE : ' + target.length + '   CRAWLCOUNT : ' + crawlcount + '    CRAWLED : ' +crawled.length + '   PROMISES OPEN : ' + hopesanddreams + '    ' ))

    })
}

let wrapper = new Promise(function(resolve,reject){
    setTimeout(() => {
        resolve()
    }, 2000);
})



// INIT FUCK.EXE
getter();
















/*



const axios = require('axios');
const cheerio = require('cheerio');
const chalk = require('chalk');
const error = chalk.bold.red;
const remove = chalk.keyword('red');
const add = chalk.keyword('green');

const instance = axios.create();
instance.defaults.timeout = 2500;

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http:" + url;
    }
    return url;
}
function addhttps(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "https:" + url;
    }
    return url;
}


let links = [];
let crawled = [];
let target = ['https://www.logicalposition.com'];
let bl = [".png", ".jpg", ".gif", 'fonts.',  'font','bing','microsoft','facebook',   'css', 'favicon', '.js', '.php', 'logicalposition','google','.gov'];
let crawlcount = 0;
let attempt = 0;

function flycatcher() {
    links.forEach(function (element) {
        bl.forEach(function (elem) {
            if (element.includes(elem) == true) {
                console.log(remove('Removing >>>>> ' + links.splice(links.indexOf(element), 1)))
            }
        });
    });

}






function getter() {
    console.log(chalk.bgRed('Attempt:' + attempt + ' >> ' + target[0]));
  
    
   


    axios.get(target[0]).then(function (response) {

        let $ = cheerio.load(response.data);
        $("[href*='https://']").each((i, element) => {

            if (links.includes(element.attribs.href) == false) {
                console.log(chalk.bgGreen.black('ADDING -> Position:' + links.push((element.attribs.href)) + '  |  ' + element.attribs.href))
            }

        });

        links.forEach(function (element) {
            bl.forEach(function (elem) {
                if (element.includes(elem) == true) {
                    links.splice(links.indexOf(element), 1)
                }
            });
        });

        flycatcher();
        target.shift()
        target.shift()
        target.shift()
        let a = links.shift()

        console.log(chalk.bgYellow('Target Assign : ' + a + ' = ' + target.push(a)))

        console.log(chalk.bgRed('NEXT >>>' + target[0]))
        crawlcount++
    }).catch(error => {
        flycatcher()

        Promise.resolve(this)
        attempt++
        console.log(error.origin)
    }).then(function (response) {
        flycatcher()
        if (attempt > 1) {
       
            target[0] = target[0].replace(/(^\w+:|^)\/\//, '')
            console.log('Attempt Phase 1 : '+ target[0])
        
         if(attempt > 2){
            console.log('Kill Attempt')
            target.shift()
            target.push(links.shift())
            attempt = 0;
        }
        
        }
getter();
console.log(chalk.inverse.bgWhite.bold('  LINKS REMAINING: ' + links.length + '   '  ))
    })
}



// INIT FUCK.EXE
getter();


 



*/