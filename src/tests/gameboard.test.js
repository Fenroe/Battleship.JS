import gameboard from "../gameboard";

describe('verifying ship placement methods', () => {
  let testboard = gameboard();

  const oneElement = 'A1';
  const oneElementInArray = ['A1'];
  const twoElementsInArray = ['A2', 'B2'];
  const threeElementsInArray = ['A1', 'A2', 'A3'];
  const fourElementsInArray = ['A1', 'A2', 'A3', 'A4'];
  const sixElementsInArray = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'];
  const fiveElementsInArrayInvalid = ['A1', 'A2', 'A3', 'A4', 'A55'];
  const fiveElementsInArray = ['A1', 'A2', 'A3', 'A4', 'A5'];
  const fiveElementsInArrayAlt = ['B1', 'B2', 'B3', 'B4', 'B5'];
  const fiveElementsInArrayAltTwo = ['C1', 'D1', 'E1', 'F1', 'G1'];
  const fiveElementsInArrayInvalidSequence = ['A7', 'A8', 'A9', 'A10', 'B1'];
  const fiveElementsInArrayInvalidSequenceAlt = ['A1', 'B2', 'C3', 'D4', 'E5'];


  afterEach(() => {
    testboard.clearCoordinatesInUse();
  })

  test('throws array error', () => {
    expect(() => { testboard.placeCarrier(oneElement); }).toThrow('coordinates argument must be an array');
  })
  
  test('does not throw array error', () => {
    expect(() => { testboard.placeCarrier(oneElementInArray); }).not.toThrow('coordinates argument must be an array');
  })
  
  test('throws invalid array length error', () => {
    expect(() => { testboard.placeCarrier(oneElementInArray); }).toThrow('too few or too many coordinates for ship');
  })
  
  test('throws invalid array length error #2',() => {
    expect(() => { testboard.placeCarrier(sixElementsInArray); }).toThrow('too few or too many coordinates for ship');
  })
  
  test('does not throw invalid array length error', () => {
    expect(() => { testboard.placeCarrier(fiveElementsInArrayInvalid); }).not.toThrow('too few or too many coordinates for ship');
  })
  
  test('throws invalid coordinate error', () => {
    expect(() => { testboard.placeCarrier(fiveElementsInArrayInvalid); }).toThrow('one or more coordinates elements are invalid');
  })
  
  test('does not throw invalid coordinate error', () => {
    expect(() => { testboard.placeCarrier(fiveElementsInArray); }).not.toThrow('one or more coordinates elements are invalid');
  })
  
  test('throws coordinates already in use error', () => {
    testboard.placeCarrier(fiveElementsInArray);
    expect(() => { testboard.placeCarrier(fiveElementsInArray); }).toThrow('one or more coordinates elements are in use');
  })

  test('does not throw coordinates already in use error', () => {
    testboard.placeCarrier(fiveElementsInArray);
    expect(() => { testboard.placeCarrier(fiveElementsInArrayAlt); }).not.toThrow('one or more coordinates elements are in use');
  })
  
  test('throws invalid coordinate sequence error', () => {
    expect(() => { testboard.placeCarrier(fiveElementsInArrayInvalidSequence); }).toThrow('invalid coordinates sequence');
  })

  test('throws invalid coordinate sequence error #2', () => {
    expect(() => { testboard.placeCarrier(fiveElementsInArrayInvalidSequenceAlt); }).toThrow('invalid coordinates sequence');
  })

  test('does not throw invalid coordinate sequence error', () => {
    expect(() => { testboard.placeSubmarine(threeElementsInArray); }).not.toThrow('invalid coordinates sequence');
  })

  test('does not throw invalid coordinate sequence error #2', () => {
    expect(() => { testboard.placeDestroyer(twoElementsInArray); }).not.toThrow('invalid coordinates sequence');
  })

  test('function resolves fully', () => {
    testboard.placeCruiser(threeElementsInArray);
    expect(testboard.getShipCoordinates('cruiser')).toEqual(threeElementsInArray);
  })

  test('function resolves fully', () => {
    testboard.placeBattleship(fourElementsInArray);
    expect(testboard.getCoordinatesInUse()).toEqual(fourElementsInArray);
  })
})

describe('confirming recieved attack functionality', () => {
  let testboard = gameboard();
  testboard.placeCarrier(['B2', 'B3', 'B4', 'B5', 'B6']);
  testboard.placeSubmarine(['F6', 'G6', 'H6']);
  testboard.placeDestroyer(['C7', 'C8']);

  test('recieves successful attack', () => {
    expect(testboard.recievedAttack('F6')).toBe(true);
  })

  test('recognises unsuccessful attack', () => {
    expect(testboard.recievedAttack('J10')).toBe(false);
  })

  test('marks correct ship segment as attacked', () => {
    testboard.recievedAttack('B3');
    expect(testboard.checkShipToken('carrier').getSegments()[1]).toBe(true);
  })

  test('above does not return true if not attacked', () => {
    expect(testboard.checkShipToken('carrier').getSegments()[2]).toBe(false);
  })
})

describe('confirming ships still floating functionality', () => {
  let testboard = gameboard();
  test('returns false when ships are not sunk', () => {
    expect(testboard.shipsStillFloating()).toBe(true);
  })

  test('returns true when all ships are sunk', () => {
    testboard.sinkAllShips();
    expect(testboard.shipsStillFloating()).toBe(false);
  })
})