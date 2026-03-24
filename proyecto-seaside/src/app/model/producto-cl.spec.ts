import { ProductoCl } from './producto-cl';

describe('ProductoCl', () => {
  it('should create an instance', () => {
    expect(new ProductoCl(1, 'Test', 'Desc', 10, 1, 5, false, '')).toBeTruthy();
  });
});
