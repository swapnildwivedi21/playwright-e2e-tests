import {test,expect} from '@playwright/test';

test('Should login successfully',async ({page})=>{
    //Launch the url and assert the title and header
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    const title = await page.title();
    expect(title).toBe('CURA Healthcare Service');
    await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');

    //Clicking on the Make appointment
    await page.getByRole('link', { name: 'Make Appointment' }).click();
    await expect(page.getByText("Please login to make appointment.")).toBeVisible();

    //Login with valid credentials
    await page.getByPlaceholder('Username').fill('John Doe');
    await page.getByPlaceholder('Password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    //Asser a text
    await expect(page.locator('h2')).toHaveText('Make Appointment');
})

test('Should not login with invalid credentials',async ({page})=>{
    //Launch the url and assert the title and header
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    const title = await page.title();
    expect(title).toBe('CURA Healthcare Service');
    await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');

    //Clicking on the Make appointment
    await page.getByRole('link', { name: 'Make Appointment' }).click();
    await expect(page.getByText("Please login to make appointment.")).toBeVisible();

    //Login with valid credentials
    await page.getByPlaceholder('Username').fill('John Doe');
    await page.getByPlaceholder('Password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    //Asser a text
    await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
})

