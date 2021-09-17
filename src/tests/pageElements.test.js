import pageElements from "../page-elements";

it('returns a value', () => {
  expect(pageElements.fillElement()).toBeTruthy();
})

const mockCallBack = jest.fn((a, b) => a + b);
pageElements.fillElement(mockCallBack);

it('calls callback', () => {
  expect(mockCallBack).toBeCalled(); 
})

it('calls callback every time', () => {
  expect(mockCallBack.mock.calls.length).toBe(100);
})

it('callback output test #1', () => {
  expect(mockCallBack.mock.results[0].value).toBe('A1');
})

it('callback output test #2', () => {
  expect(mockCallBack.mock.results[9].value).toBe('A10');
})

it('callback output test #3', () => {
  expect(mockCallBack.mock.results[10].value).toBe('B1');
})

it('callback output test #4', () => {
  expect(mockCallBack.mock.results[99].value).toBe('J10');
})