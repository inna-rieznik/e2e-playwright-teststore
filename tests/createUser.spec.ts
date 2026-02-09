import { APIRequest, APIResponse, expect, test } from '@playwright/test';

interface UserToCreate {
  gender: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday?: string;
}

const userToCreate = {
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
    `https://teststore.automationtesting.co.uk/index.php?controller=registrationid_gender=${userToCreate.gender}&firstname=${userToCreate.firstName}&lastname=${userToCreate.lastName}&email=${userToCreate.email}&password=${userToCreate.password}&birthday=${userToCreate.birthday}&psgdpr=1&submitCreate=1`
  );

  const responseStatus = response.status();
  expect(responseStatus).toBe(200);
});

//TODO delete
test('authenticate via api', async ({ request }) => {
  const response: APIResponse = await request.post(
    `https://teststore.automationtesting.co.uk/index.php?controller=authentication?back=https%3A%2F%2Fteststore.automationtesting.co.uk%2Findex.php&email=${userToCreate.email}&password=${userToCreate.password}&submitLogin=1`
  );

  const responseStatus = response.status();
  const cook = response.headers()['set-cookie'];
  expect(responseStatus).toBe(200);
});
