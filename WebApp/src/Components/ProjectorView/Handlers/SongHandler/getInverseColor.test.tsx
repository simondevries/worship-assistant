import getInverseColor from './getInverseColor';

it('should get inverse hex', () => {
  const result = getInverseColor('#FFFFFF');
  expect(result).toBe('#000000');
});
