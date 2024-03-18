# React Burger Project

[![GitHub Pages Deployment](https://img.shields.io/badge/deploy-GitHub%20Pages-green.svg)](https://creamlaflare.github.io/react-burger)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://creamlaflare.github.io/react-burger)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React Version](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript Version](https://img.shields.io/badge/typescript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Redux Version](https://img.shields.io/badge/redux-4.2.1-blue.svg)](https://redux.js.org/)

Check out the live version here: [React Burger](https://creamlaflare.github.io/react-burger).

## Introduction

React Burger is a dynamic and interactive web application that allows users to build their custom burger by dragging and dropping ingredients. The project is crafted using a modern tech stack, emphasizing React, TypeScript, and Redux, providing a robust and maintainable codebase.

## Key Features

- **Drag and Drop Interface**: Utilize React DnD to offer an intuitive interface for constructing burgers.
- **Routing**: Employ React Router for seamless navigation across different components and pages.
- **State Management**: Redux and @reduxjs/toolkit are at the core, ensuring predictable state management.
- **Functional Testing**: Cypress is integrated to conduct end-to-end functional tests, ensuring the application's reliability.
- **Unit Testing**: Jest, along with React Testing Library, is used for unit testing, promoting code quality and bug-free releases.
- **Language Translation**: Leverage the Context API for implementing language translation, enhancing accessibility and user experience.
- **Authentication**: Implement JWT tokens for authorization, with tokens securely stored in localStorage.
- **WebSockets**: Two types of WebSocket implementations for real-time order feeds, one public and one private, demonstrating efficient real-time data handling.
- **Continuous Deployment**: The project is deployed on GitHub Pages, enabling continuous integration and delivery.

## Technologies Used

- React 18.2.0
- TypeScript 4.9.5
- Redux 4.2.1 & React Redux 8.1.3
- React Router DOM 6.17.0
- React DnD 16.0.1
- Cypress 13.6.1
- Jest 27.5.1 & @testing-library/react 13.4.0
- Context API for state management
- JWT for authorization

## Getting Started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/creamlaflare/react-burger.git
cd react-burger
npm install
```

To start the development server:
```bash
npm start
```
To build the project:
```bash
npm run build
```
For running unit tests:
```bash
npm test
```
To open Cypress for functional testing:
```bash
npm run cypress
```

## Contributing
Contributions are welcome! Please read the contributing guidelines before submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
