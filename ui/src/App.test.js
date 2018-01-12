import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app';
import Client from "client";

jest.mock('Client');

// describe('App tests', () => {

//   it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<App />, div);
//     ReactDOM.unmountComponentAtNode(div);
//   });

//   it('getSummary function should called exactly once', () => {
//     expect(Client.getSummary.mock.calls.length).toBe(1);
//   });
// });
