import Ship from '../modules/Ship.js';

test("Does it hit?", () => {
    const testShip = Ship(5);
    testShip.hit()
    return expect(testShip.hitAmount).toBe(1);

})

test("Did it sink?", () => {
    const testShip = Ship(1);
    testShip.hit()
    return expect(testShip.isSunk()).toBe(true);

})