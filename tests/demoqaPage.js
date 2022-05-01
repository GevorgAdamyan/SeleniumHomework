const {By, Key, Builder} = require("selenium-webdriver");
require("chromedriver");
const assert = require("assert");

async function submitForm (){
    
        //Input variables

    let url = "https://demoqa.com/text-box"
    let fullName = "Name Surename";
    let testEmail = "email@gmail.com";
    let adress = "40, 18 Bagratunyats ave., Yerevan, RA";

    let driver = await new Builder().forBrowser("chrome").build();

        //Visiting DemoQA.com

     await driver.get(url);

        // Assertion that we are in the correct page

    let currentUrl = await driver.getCurrentUrl().then(function(val) {
        return val;
    });
    assert.strictEqual(currentUrl, url);

        //Filling the Submit Form
    
     let userNameField = await driver.findElement(By.id("userName"));
     let userEmailField = await driver.findElement(By.id("userEmail"));
     let currentAddressField = await driver.findElement(By.id("currentAddress"));
     let permanentAddressField = await driver.findElement(By.id("permanentAddress"));
    

     userNameField.sendKeys(fullName);
     await driver.sleep(1000);
     userEmailField.sendKeys(testEmail);
     await driver.sleep(1000);
     currentAddressField.sendKeys(adress);
     await driver.sleep(1000);
     permanentAddressField.sendKeys(adress);
     await driver.sleep(1000);

        //Submitting the Form

     await driver.findElement(By.id("submit")).click();
     await driver.sleep(2000);

        //Assertions

    let name = await driver.findElement(By.id("name")).getText().then(function (val) {
        return val;
    });
    let email = await driver.findElement(By.id("email")).getText().then(function (val) {
        return val;
    });
    let currentAddressCheck = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[6]/div/p[3]')).getText().then(function (val) {
        return val;
    });
    let permanentAddressCheck = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[2]/div[2]/div[2]/form/div[6]/div/p[4]')).getText().then(function (val) {
        return val;
    });
    assert.equal(name, ("Name:" + fullName));
    assert.equal(email, ("Email:" + testEmail));
    assert.equal(currentAddressCheck, ("Current Address :" + adress));
    assert.equal(permanentAddressCheck, ("Permananet Address :" + adress));

        //Closing the browser

    await driver.quit();

}
submitForm();