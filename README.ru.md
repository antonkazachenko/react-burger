# React Burger Project

[English](README.md) | Russian

[![GitHub Pages Deployment](https://img.shields.io/badge/deploy-GitHub%20Pages-green.svg)](https://creamlaflare.github.io/react-burger)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://creamlaflare.github.io/react-burger)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React Version](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript Version](https://img.shields.io/badge/typescript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Redux Version](https://img.shields.io/badge/redux-4.2.1-blue.svg)](https://redux.js.org/)

Посмотрите актуальную версию здесь: [React Burger](https://creamlaflare.github.io/react-burger).

## Введение

React Burger — это динамичное и интерактивное веб-приложение, которое позволяет пользователям создавать свои индивидуальные бургеры, перетаскивая ингредиенты. Проект создан с использованием современного технологического стека с акцентом на React, TypeScript и Redux, обеспечивая надежную и легко поддерживаемую кодовую базу.

## Основные функции

- **Интерфейс перетаскивания**: Использован React DnD для предоставления интуитивно понятного интерфейса для конструирования бургеров.
- **Маршрутизация**: Использован React Router для навигации по различным компонентам и страницам.
- **Управление состоянием**: В основном использованы Redux и @reduxjs/toolkit, обеспечивая управление состоянием и осуществляя правильное функционирование бизнес-логики приложения.
- **Функциональное тестирование**: Cypress интегрирован для проведения функциональных тестов end-to-end, обеспечивая надежность приложения.
- **Модульное тестирование**: Jest используется для модульного тестирования, способствуя качеству кода и выпуску без ошибок.
- **Перевод языков**: Использован Context API для реализации перевода языков, повышая доступность и удобство использования.
- **Аутентификация**: Реализованы токены JWT для авторизации, безопасно храня токены в localStorage.
- **WebSockets**: Использованы две реализации WebSocket для лент заказов в реальном времени, одна публичная и одна приватная, демонстрируя эффективную обработку данных в реальном времени.
- **Continuous Deployment (CD)**: Проект развернут на GitHub Pages, что обеспечивает непрерывную интеграцию и доставку.

## Используемые технологии

- React 18.2.0
- TypeScript 4.9.5
- Redux 4.2.1 & React Redux 8.1.3
- React Router DOM 6.17.0
- React DnD 16.0.1
- Cypress 13.6.1
- Jest 27.5.1
- Context API для управления состоянием
- JWT для авторизации

## Начало работы

Клонируйте репозиторий и установите зависимости:
```bash
git clone https://github.com/creamlaflare/react-burger.git
cd react-burger
npm install
```
Чтобы запустить сервер разработки:
```bash
npm start
```
Для сборки проекта:
```bash
npm run build
```
Для запуска модульных тестов:
```bash
npm test
```
Для запуска Cypress для функционального тестирования:
```bash
npm run cypress
```

## Вклад
Ваш вклад приветствуется! Не стесняйтесь отправлять запрос на pull request.

## Лицензия
Этот проект лицензирован в соответствии с условиями лицензии MIT - подробности смотрите в файле LICENSE.
