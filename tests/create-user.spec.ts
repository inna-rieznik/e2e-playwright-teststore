import { expect } from '@playwright/test';
import { test } from '../fixture';
import { UserToCreate } from '../types/userTypes';
import { Tags } from '../enums/tags';

const usersToCreate: UserToCreate[] = [
  {
    gender: 2,
    firstName: 'Harry',
    lastName: 'Potter',
    email: 'hp' + Math.floor(Math.random() * 10000) + '@gmail.com',
    password: 'hwh4Lnl0zB',
    birthday: '',
  },
  {
    gender: 2,
    firstName: 'Hermione',
    lastName: 'Granger',
    email: 'hg@gmail.com',
    password: 'hwh4Lnl0zB',
    birthday: '',
  },
];

test('[E2E-CRT-001] create user with unique email via api', { tag: [Tags.Smoke, Tags.Regression] }, async ({ createUserViaApi }) => {
  const response = await createUserViaApi(usersToCreate[0]);

  const responseBody = await response.text();
  expect(responseBody).not.toContain(
    'The email is already used, please choose another one or sign in'
  );
});


