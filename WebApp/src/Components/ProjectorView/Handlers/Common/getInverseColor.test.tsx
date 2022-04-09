import getInverseColor from './getInverseColor';
//sss s
it('should get inverse hex', () => {
  const result = getInverseColor('#FFFFFF');
  expect(result).toBe('#000000');
});
