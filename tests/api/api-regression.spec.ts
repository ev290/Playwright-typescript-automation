import { test, expect } from '@playwright/test';

test('GET user API', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/2'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);

    expect(body.id).toBe(2);
    expect(body.name).toBeTruthy();
    expect(body.email).toBeTruthy();

});
   
test('POST create new user', async ({ request }) => {

    const response = await request.post(
        'https://jsonplaceholder.typicode.com/users',
        {
            data: {
                name: 'David Test User',
                username: 'davidqa',
                email: 'davidqa@example.com'
            }
        }
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    console.log(body);

    expect(body.name).toBe('David Test User');
    expect(body.username).toBe('davidqa');
    expect(body.email).toBe('davidqa@example.com');
    expect(body.id).toBeTruthy();
});
test('PUT update user', async ({ request }) => {

    const response = await request.put(
        'https://jsonplaceholder.typicode.com/users/2',
        {
            data: {
                id: 2,
                name: 'David Updated User',
                username: 'davidupdated',
                email: 'david.updated@example.com'
            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);

    expect(body.id).toBe(2);
    expect(body.name).toBe('David Updated User');
    expect(body.username).toBe('davidupdated');
    expect(body.email).toBe('david.updated@example.com');
});
test('DELETE user', async ({ request }) => {

    const response = await request.delete(
        'https://jsonplaceholder.typicode.com/users/2'
    );

    expect(response.status()).toBe(200);

});
test('GET non-existing user returns 404', async ({ request }) => {

    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/9999'
    );

    expect(response.status()).toBe(404);
});