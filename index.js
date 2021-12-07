const puppeteer = require('puppeteer');

const email = 'nazareno.g123@gmail.com';
const password = 'Nazareno123';

const indexUrl = 'https://prenotami.esteri.it/';
const bookingUrl = 'https://prenotami.esteri.it/Services/Booking/457';

async function startPage() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(indexUrl);

    await page.focus('#login-email');
    await page.keyboard.type(email);

    await page.focus('#login-password');
    await page.keyboard.type(password);

    await page.click('.button.primary.g-recaptcha');
    
    await page.waitForNavigation({waitUntil: 'networkidle2'}); // esperamos que termine la acción anterior 
    
    await page.goto(bookingUrl);

    await page.waitForNavigation({waitUntil: 'networkidle2'}); // esperamos que termine la acción anterior

    await page.screenshot({ path: 'example.png' });
    await browser.close();
    console.log('Listo!');
};

async function init() {
    try {
        await startPage();   
    } catch (error) {
        console.log(`Este es el error: ${error.message}`);
    }
};

init();