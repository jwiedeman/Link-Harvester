const axios = require('axios');
const cheerio = require('cheerio');
const chalk = require('chalk');
const instance = axios.create();
instance.defaults.timeout = 1000;
let links = [];
let crawled = [];
let target = ['https://www.pintrest.com'];
let bl = [".png", ".jpg", ".gif", 'font','css', 'favicon', '.js', '.php', ];


console.clear()

function getter() {
 
    axios.get(target).then(function (response) {
        let $ = cheerio.load(response.data);
        console.log($)
        $("[href*='https://'] , [href*='http://'").each((i, element) => {
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
        
        console.log(chalk.bgRed.bold.black('FUCK WE HIT A BAD LINK REEEE'))
    }).then(function (response) {
        
        getter();
        

        for(i=50;i>0;i--){
            console.log(crawled[i])    
        }        
        console.log(chalk.bgRed.bold('   TARGET >> ' + target[0]));
        console.log(chalk.inverse.bgWhite.black.bold('  LINKS LIST: ' + links.length + '  ATTEMPT # : '  + '   TARGETS ACTIVE : ' + target.length + '   CRAWLCOUNT : '  + '    CRAWLED : ' +crawled.length + '   PROMISES OPEN : '  + '    ' ))

    })
}






// INIT
getter();













