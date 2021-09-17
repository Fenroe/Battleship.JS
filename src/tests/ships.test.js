import ships from "../ships";

it('returns length test #1', () => {
  const cruiser = ships(5);
  expect(cruiser.getLength()).toBe(5);
});

it('returns length test #2', () => {
  const patrolBoat = ships(2);
  expect(patrolBoat.getLength()).toBe(2);
});

it('returns segments test #1', () => {
  const submarine = ships(3);
  expect(submarine.getSegments().length).toBe(3);
});

it('returns segments test #2', () => {
  const submarine = ships(3);
  expect(submarine.getSegments()[1]).toBe(false);
});

it('returns hit test #1', () => {
  const cruiser = ships(4);
  cruiser.isHit(3);
  expect(cruiser.getSegments()[3]).toBe(true);
});

it('returns sunk test #1', () => {
  const cruiser = ships(5);
  expect(cruiser.isSunk()).toBe(false);
});

it('returns sunk test #2', () => {
  const cruiser = ships(5);
  cruiser.isHit(3);
  expect(cruiser.isSunk()).toBe(false);
});

it('returns sunk test #3', () => {
  const cruiser = ships(5);
  for(let i = 0; i < cruiser.getSegments().length; i += 1) {
    cruiser.isHit(i);
  }
  expect(cruiser.isSunk()).toBe(true);
});