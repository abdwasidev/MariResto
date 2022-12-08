/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking and Unliking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');
  // I.seeElement('.query');
  I.see('Tidak ada restoran untuk ditampilkan', '.item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.seeElement('#restaurant_data');
  I.see('Tidak ada restoran untuk ditampilkan', '.item__not__found');

  I.amOnPage('/');
  I.wait(2);

  I.waitForElement('.resto-card');
  I.seeElement('.resto-card p');

  const firstResto = locate('.resto-name p').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(firstResto);
  I.wait(2);

  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.wait(2);

  I.amOnPage('/#/favorites');
  I.wait(2);

  I.waitForElement('.resto-card');
  I.seeElement('.resto-card p');

  const likedRestoName = await I.grabTextFrom('.resto-name');

  assert.strictEqual(firstRestoName, likedRestoName);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.seeElement('#restaurant_data');
  I.see('Tidak ada restoran untuk ditampilkan', '.item__not__found');

  I.amOnPage('/');
  I.wait(2);

  I.waitForElement('.resto-card');
  I.seeElement('.resto-card p');

  const firstResto = locate('.resto-name p').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(firstResto);
  I.wait(2);

  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.wait(2);

  I.amOnPage('/#/favorites');
  I.wait(2);

  I.waitForElement('.resto-card');
  I.seeElement('.resto-card p');

  const firstRestoliked = locate('.resto-name p').first();
  const likedRestoName = await I.grabTextFrom(firstRestoliked);
  assert.strictEqual(firstRestoName, likedRestoName);
  I.click(firstRestoliked);
  I.wait(2);

  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.wait(2);

  I.amOnPage('/#/favorites');
  I.wait(2);

  I.seeElement('.item__not__found');
  const notFoundResto = await I.grabTextFrom('.item__not__found');
  assert.strictEqual(notFoundResto, 'Tidak ada restoran untuk ditampilkan');
});
