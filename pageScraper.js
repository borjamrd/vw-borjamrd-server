
var uniqid = require('uniqid'); 


const scraperObject = {
	url: 'https://www.dasweltauto.es/esp/',
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);
        let scrapedData = [];

        // Wait for the required DOM to be rendered


        async function scrapeCurrentPage(){
            await page.waitForSelector('.dwa-ui-header__inner');
            // Get the link to all the required books
            let urls = await page.$$eval('.swiper-wrapper', links => {
                // Make sure the book to be scraped is in stock
                
                // Extract the links from the data
                links = links.map(el => el.querySelector('.enlaceficha').href)
                return links;
            });
            let pagePromise = (link) => new Promise(async(resolve, reject)=>{
                let dataObj = {};
                let newPage = await browser.newPage();
                await newPage.goto(link);

                let idUnique = uniqid()

                dataObj['carID'] = await idUnique
                dataObj['carImage'] = await newPage.$eval('#gallery > div.swiper-slide.swiper-slide-active > a > picture > img', image => image.src)
                   
                dataObj['carNameParams'] = await newPage.$eval('.file-ttl> h1', text => {
                text = text.textContent.replace(/(\r\n\t|\n|\r|\t|\s)/gm, "");
                
                return text; 
                });
                dataObj['carName'] = await newPage.$eval('.file-ttl> h1', text => {
                    text = text.textContent.replace(/(\r\n\t|\n|\r|\t|)/gm, "");
                    
                    return text; 
                    });
                dataObj['carPrice'] = await newPage.$eval('.file-cost #precio_con_finan', text => text.textContent)
                dataObj['carFee'] = await newPage.$eval('.cuotaDesde', text => text.textContent)
                dataObj['carLocation'] = await newPage.$eval('.itemLocation > p', text => text.textContent)
                dataObj['carLocationLink'] = await newPage.$eval('.itemLocation > p > a', text => text.href)
                dataObj['carKms'] = await newPage.$eval('.grid-gen li span', text => {
                    text = text.textContent.replace(/(\r\n\t|\n|\r|\t|)/gm, "");
                    
                    return text;
                    
                });
                dataObj['carData1'] = await newPage.$eval('#ancla-generales > ul:nth-child(2) > li:nth-child(2) > span', text => text.textContent)
                dataObj['carData2'] = await newPage.$eval('#ancla-generales > ul:nth-child(2) > li:nth-child(3) > span', text => text.textContent)
                dataObj['carData3'] = await newPage.$eval('#ancla-generales > ul:nth-child(2) > li:nth-child(4) > span', text => text.textContent)
                dataObj['carData4'] = await newPage.$eval('#ancla-generales > ul:nth-child(2) > li:nth-child(5) > span', text => text.textContent)
                dataObj['carData5'] = await newPage.$eval('#ancla-generales > ul:nth-child(2) > li:nth-child(6) > span', text => text.textContent)
                resolve(dataObj);
                await newPage.close();
            });
            for(link in urls){
                let currentPageData = await pagePromise(urls[link]);
                scrapedData.push(currentPageData);
                
		}
        let nextButtonExist = false;
        try{
            const nextButtonExist = await page.$eval('#id_pbth_showmore', a => a.textContent);
            nextButtonExist = true;
        }
        catch(err){
            nextButtonExist = false;
        }
        if(nextButtonExist){
            await page.click('#id_pbth_showmore');	
            return scrapeCurrentPage(); // Call this function recursively
        }
        await page.close();
        return scrapedData;
    }
    let data = await scrapeCurrentPage();
    console.log(typeof(data));

    return data;

	}

}

module.exports = scraperObject;



