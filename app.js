import express from "express";
import webdriver from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
const port = 1011;
const app = express();
const __dirname = import.meta.dirname;

app.get("/", (req, res) => {
    console.log("---------default API--------------");
    res.send(`<html>
        <body>
            <div class="container" style="color:#ff00ff;">Hello from API SSR</div>
        </body>
    </html>`);
});

app.get("/test", (req, res) => {
    let service = new chrome.ServiceBuilder()
        // .loggingTo("chrome-logs.txt").enableVerboseLogging()
        .build();
    const By = webdriver.By;
    let options = new chrome.Options();
    options.addArguments("--no-sandbox");
    options.addArguments("--headless=chrome");
    options.addArguments("--remote-debugging-pipee");

    let driver = chrome.Driver.createSession(options, service);
    console.log("-----------------------------");
    console.log(__dirname);
    console.log("-----------------------------");
    driver.get(`file:///${__dirname}/test-file.html`).then(async function () {
        try {
            const res = await driver.findElement(By.className("container"));
            const text = await res.getText();
            const data = await res.getCssValue("color");
            console.log("\n✅ : text:", text);
            console.log("\n✅ : data:", data);
        } catch (err) {
            console.log(err);
        }
        driver.quit();
    });

    const date = new Date().toString();
    res.send(`<html><body><h1 style="color:purple;"}>App is running...</h1><p>${date}</p></body></html>`);
});

app.listen(port, () => {
    console.log(`------------ Server listening on port ${port} ---------`);
});
