import express from "express";
import webdriver from "selenium-webdriver";

const port = 1011;
const app = express();

app.get("/home", (req, res) => {
    res.send(`<html>
        <body>
            <div class="container" style="color:orange;">Hello</div>
        </body>
    </html>`);
});

app.get("/", (req, res) => {
    const date = new Date().toString();
    const By = webdriver.By;
    const until = webdriver.until;
    // capabilities.setPageLoadStrategy("normal");

    var driver = new webdriver.Builder().withCapabilities({ PageLoadStrategy: "normal" }).forBrowser("chrome").build();

    driver.get(`http://localhost:${port}/home`).then(async function () {
        try {
            const res = await driver.findElement(By.className("container"));
            console.log("\n✅ : res:", res.innerText);
        } catch (err) {
            console.log(err);
        }
        driver.quit();
    });

    res.send(`<html><body><h1 style="color:purple;"}>App is running...</h1><p>${date}</p></body></html>`);
});

app.listen(port, () => {
    console.log(`------------ Server listening on port ${port} ---------`);
});
