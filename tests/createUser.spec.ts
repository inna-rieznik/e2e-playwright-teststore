import { APIRequest, APIResponse, expect, test } from '@playwright/test';

interface UserToCreate {
  gender: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday?: string;
}

const userToCreate: UserToCreate = {
  gender: 2,
  firstName: 'Harry',
  lastName: 'Potter',
  email: 'ir' + Math.floor(Math.random() * 10000) + '@gmail.com', 
  password: 'hwh4Lnl0zB',
  birthday: '',
};

//move to global setup and write
test('create user via api', async ({ request }) => {
  const response: APIResponse = await request.post(
    `https://teststore.automationtesting.co.uk/index.php?controller=registration`,
    {
      form: {
        email: userToCreate.email,
        gender: userToCreate.gender,
        firstName: userToCreate.firstName,
        lastName: userToCreate.lastName,
        password: userToCreate.password,
        submitCreate: '1',
      },
      failOnStatusCode: true,
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'max-age=0',
        'content-type': 'application/x-www-form-urlencoded',
        priority: 'u=0, i',
        'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
    }
  );

  const responseBody = await response.text();
  expect(responseBody).not.toContain(
    'The email is already used, please choose another one or sign in'
  );
});

//TODO delete
test('authenticate via api', async ({ request }) => {
  const response: APIResponse = await request.post(
    `https://teststore.automationtesting.co.uk/index.php?controller=authentication?back=https%3A%2F%2Fteststore.automationtesting.co.uk%2Findex.php&email=${userToCreate.email}&password=${userToCreate.password}&submitLogin=1`,
    {
      failOnStatusCode: true,
    }
  );

  const responseStatus = response.status();
  const cook = response.headers()['set-cookie'];
  expect(responseStatus).toBe(200);
});
