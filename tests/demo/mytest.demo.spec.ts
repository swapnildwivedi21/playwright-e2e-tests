import {test,expect} from '@playwright/test';

test('my test demo',async ({page})=>{
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    const title = await page.title();
    expect(title).toBe('CURA Healthcare Service');
    await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');
})

test.only ("test demo locators",async({page}) =>{
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    let makeAppointmentBtn = page.getByRole('link',{name:'Make Appointment'});
    await makeAppointmentBtn.click();
    await expect(page.locator('h2')).toHaveText('Make Appointment');
    await page.getByRole('heading', { name: 'We Care About Your Health' }).click();




    
})