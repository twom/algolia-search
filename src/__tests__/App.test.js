import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
const searchFixture = require('./searchFixture.json');

let data;
beforeEach(() => {
  fetch.resetMocks();
  data = searchFixture.data;
});

test('Can search and display articles', async () => {
  const { getByText, getByLabelText } = render(<App />);
  // Mock a response from parsley's search
  fetch.mockResponseOnce(JSON.stringify(searchFixture));

  // Find search bar
  const inputElement = getByLabelText(/search bar/i);
  expect(inputElement).toBeInTheDocument();

  await waitFor(() => {
    // Start searching
    fireEvent.change(inputElement, { target: { value: 'a' } });

    // check API was called
    expect(fetch.mock.calls.length).toEqual(1);
    // Check every title is now showing
    data.forEach(({ title }) => {
      expect(getByText(title)).toBeInTheDocument();
    });
  });
});

test('Can handle empty response', async () => {
  const { getByText, getByLabelText } = render(<App />);
  fetch.mockResponseOnce(JSON.stringify({ data: [] }));

  const inputElement = getByLabelText(/search bar/i);
  expect(inputElement).toBeInTheDocument();

  await waitFor(() => {
    fireEvent.change(inputElement, { target: { value: 'a' } });
    expect(getByText(/No results found/)).toBeInTheDocument();
  });
});

test('Can handle errored API call', async () => {
  const { getByText, getByLabelText } = render(<App />);

  const error = 'fake error';
  fetch.mockReject(new Error(error));
  const inputElement = getByLabelText(/search bar/i);
  expect(inputElement).toBeInTheDocument();

  await waitFor(() => {
    fireEvent.change(inputElement, { target: { value: 'a' } });
    expect(getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
