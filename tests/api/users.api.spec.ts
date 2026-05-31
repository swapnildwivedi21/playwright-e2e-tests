import {test, expect , request} from "@playwright/test";
test.describe("User API tests", () => {
    test("should get list of users", async () => {
        const apiContext = await request.newContext({
            baseURL: "https://reqres.in/api",
        });
        const response = await apiContext.get("/users");
        const users = await response.json();
        expect(response.status()).toBe(200);
        expect(users.data).toHaveLength(6);
    });

    test("should create a new user", async () => {
        const apiContext = await request.newContext({
            baseURL: "https://reqres.in/api",   
        });
        const newUser = {
            name: "John Doe",   
            job: "Software Engineer",
        };
        const response = await apiContext.post("/users", {
            data: newUser,
        });
        const createdUser = await response.json();
        expect(response.status()).toBe(201);
        expect(createdUser.name).toBe(newUser.name);
        expect(createdUser.job).toBe(newUser.job);
    });
});