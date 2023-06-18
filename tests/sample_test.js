const { test, expect } = require('@playwright/test');

test('When Browserstack live page is opened in incognito mode, it should redirect to signin page', async ({ page }, testInfo) => {
  try {
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: "setSessionName", arguments: { name: testInfo.project.name } })}`);
    await page.waitForTimeout(2000);
    await page.goto('https://live.browserstack.com/dashboard', { waitUntil: 'networkidle' });
    const pageTitle = await page.title();
    await expect(pageTitle).toEqual("BrowserStack Login | Sign Into The Best Mobile & Browser Testing Tool");
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'passed', reason: 'redirected to signin page' } })}`);
  } catch (e) {
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'failed', reason: 'Test failed' } })}`);
  }
});

test('When user enters invalid email id, it should show "Invalid Email" error message', async ({ page }, testInfo) => {
  try {
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: "setSessionName", arguments: { name: testInfo.project.name } })}`);
    await page.waitForTimeout(2000);
    await page.goto('https://live.browserstack.com/dashboard', { waitUntil: 'networkidle' });
    await page.locator('#user_email_login').type("psindhu1", {delay: 100});
    await page.locator('#user_password').type("bstackdemo@123", {delay:100});
    const errorMessageText =  await page.locator('#user_email_login + .error-msg').innerText();
    await expect(errorMessageText).toEqual("Invalid Email");
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'passed', reason: 'negative test case: passed' } })}`);
  } catch (e) {
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'failed', reason: 'Test failed' } })}`);
  }
});