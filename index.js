let axios = require('axios');
let cheerio = require('cheerio');

let links = ['https://www.logicalposition.com'];
let crawled =[];
let crawlcount = 0;
let target = [];

//call();





function axiosgetter(){}


let myVar = setInterval(myTimer, 500);
function myTimer() {
    


    axios.get(links[0]).then((response) => {
        links.shift()
        console.log('Removed ---')
        let $ = cheerio.load(response.data);
        
        $("[href*='https://'],[href*='http://']").each((i, element) => {
            console.log(crawlcount + ' | '+ links.length + ' | '+  element.attribs.href)
            if(links.includes(element.attribs.href)==false){links.push(JSON.stringify(element.attribs.href));
                console.log('ADDED ++++')
             
            }
                          
            
            
                  
            crawlcount++ 
               
          });
        return(links);

        
      })
      .then ( (links) => {   
          
      }).catch(error => {
        console.log('ERROR LINK, SHIFTING OUT')
        links.shift()
       
      })
     
}




/*
if(links.includes(element.attribs.href)!=true){
    links.push(element.attribs.href);
    console.log(crawlcount + ' | '+ element.attribs.href)
}
*/














function sort (){
    call();
    for(i=0;i>links.length;i++){
        
    }
}

function call (){
    if (typeof(links[crawlcount]) == 'undefined') {
        console.log('out of links');
    } else {

    axios.get(links[crawlcount]).then((response) => {
        let $ = cheerio.load(response.data);
        $("[href*='www']").each((i, element) => {
              links.push(element.attribs.href);
                  crawlcount++;
          });
        return(links);
      })
      .then ( (links) => {      
      }).catch((error) => {
          console.log(error);
      });
    }    
}

