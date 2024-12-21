const { test, expect, request } = require('@playwright/test');

test.describe('Reqres API Automation', () => {

  const BASE_URL = 'https://reqres.in/api';

  test('GET List Users', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users?page=2`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.page).toBe(2);
    expect(responseBody.data).toBeDefined();
    expect(responseBody.data.length).toBeGreaterThan(0);
  });

  test('GET Single User', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/2`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.email).toContain('@');
    expect(responseBody.data.first_name).toBeDefined();
    expect(responseBody.data.last_name).toBeDefined();
  });

  test('POST Create User', async ({ request }) => {
    const payload = {
      name: 'morpheus',
      job: 'leader',
    };

    const response = await request.post(`${BASE_URL}/users`, { data: payload });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.name).toBe(payload.name);
    expect(responseBody.job).toBe(payload.job);
    expect(responseBody.id).toBeDefined();
    expect(responseBody.createdAt).toBeDefined();
  });

  test('PUT Update User', async ({ request }) => {
    const payload = {
      name: 'morpheus',
      job: 'zion resident',
    };

    const response = await request.put(`${BASE_URL}/users/2`, { data: payload });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe(payload.name);
    expect(responseBody.job).toBe(payload.job);
    expect(responseBody.updatedAt).toBeDefined();
  });

  test('DELETE User', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/2`);
    expect(response.status()).toBe(204);
  });

});
