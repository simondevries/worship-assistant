import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

let windowSpy;

beforeEach(() => {
  windowSpy = jest.spyOn(window, "window", "get");
});

afterEach(() => {
  windowSpy.mockRestore();
});

it('should render app', () => {
  windowSpy.mockImplementation(() => ({
    showOpenFilePicker: {
      origin: "https://example.com"
    }
  }));
  navigator.__defineGetter__('userAgent', function(){
    return 'Chrome/90.' // customized user agent
  });
  const { getByText } = render(<App />);
  const thing = getByText(/Unfortunately /i);
  expect(thing).toBeInTheDocument();
});
