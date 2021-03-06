// Event.js

// eslint-disable-next-line no-var
var OregonH = OregonH || {};


class Event {
  randomInt(n) {
    const {floor, random} = Math;
    return floor(random() * n);
  }

  generateEvent() {
    // pick random one
    const eventIndex = this.randomInt(this.eventTypes.length);
    const eventData = this.eventTypes[eventIndex];

    // events that consist in updating a stat
    if (eventData.type === 'STAT-CHANGE') {
      this.stateChangeEvent(eventData);
    } else if (eventData.type === 'SHOP') {
    // shops
    // pause game
      this.game.pauseJourney();

      // notify user
      this.ui.notify(eventData.text, eventData.notification);

      // prepare event
      this.shopEvent(eventData);
    } else if (eventData.type === 'ATTACK') {
    // attacks
    // pause game
      this.game.pauseJourney();

      // notify user
      this.ui.notify(eventData.text, eventData.notification);

      // prepare event
      this.attackEvent(eventData);
    }
  }

  stateChangeEvent(eventData) {
    // can't have negative quantities
    if (eventData.value + this.caravan[eventData.stat] >= 0) {
      this.caravan[eventData.stat] += eventData.value;
      this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification);
    }
  }

  shopEvent(eventData) {
    // number of products for sale
    const numProds = Math.ceil(Math.random() * 4);

    // product list
    const products = [];
    let j;
    let priceFactor;

    for (let i = 0; i < numProds; i += 1) {
    // random product
      j = Math.floor(Math.random() * eventData.products.length);

      // multiply price by random factor +-30%
      priceFactor = 0.7 + 0.6 * Math.random();

      products.push({
        item: eventData.products[j].item,
        qty: eventData.products[j].qty,
        price: Math.round(eventData.products[j].price * priceFactor),
      });
    }

    this.ui.showShop(products);
  }

  // prepare an attack event
  attackEvent() {
    const firepower = Math.round((0.7 + 0.6 * Math.random()) * OregonH.ENEMY_FIREPOWER_AVG);
    const gold = Math.round((0.7 + 0.6 * Math.random()) * OregonH.ENEMY_GOLD_AVG);

    this.ui.showAttack(firepower, gold);
  }
}

OregonH.Event = new Event();

OregonH.Event.eventTypes = [
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'crew',
    value: -3,
    text: 'Your pokemon got knocked out in the trainer battle. Casualties: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'crew',
    value: -4,
    text: 'The wild pokemon knocked out your pokemon! Casualties: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'food',
    value: -10,
    text: 'Snorlax stole your food! Food lost: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'money',
    value: -50,
    text: 'You lost the battle. Pay the trainer ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'oxen',
    value: -1,
    text: 'The pokemon ran away! Pokeballs lost: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'food',
    value: 20,
    text: 'Found wild berries. Food added: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'food',
    value: 20,
    text: 'Found wild berries. Food added: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'oxen',
    value: 1,
    text: 'Found pokeballs. New pokeballs: ',
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'crew',
    value: 1,
    text: 'You captured the wild pokemon! Pokemon added: ',
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'You have found a shop',
    products: [
      { item: 'food', qty: 20, price: 50 },
      { item: 'pokeballs', qty: 1, price: 200 },
      { item: 'firepower', qty: 2, price: 50 },
      { item: 'revive', qty: 5, price: 80 },
    ],
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'You have found a shop',
    products: [
      { item: 'food', qty: 30, price: 50 },
      { item: 'pokeballs', qty: 1, price: 200 },
      { item: 'firepower', qty: 2, price: 20 },
      { item: 'revive', qty: 10, price: 80 },
    ],
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'Smugglers sell various goods',
    products: [
      { item: 'food', qty: 20, price: 60 },
      { item: 'pokeballs', qty: 1, price: 300 },
      { item: 'firepower', qty: 2, price: 80 },
      { item: 'revive', qty: 5, price: 60 },
    ],
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'Team Rocket is attacking you',
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'A wild pokemon appeared!',
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'A wild pokemon appeared!',
  },
];
