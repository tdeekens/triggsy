# triggsy

[![Build Status](https://travis-ci.org/tdeekens/triggsy.svg?branch=master)](https://travis-ci.org/tdeekens/triggsy) ♦️
[![Dependency Status](https://david-dm.org/tdeekens/triggsy.svg?style=flat)](https://david-dm.org/tdeekens/triggsy) ♦️
[![devDependency Status](https://david-dm.org/tdeekens/triggsy/dev-status.svg)](https://david-dm.org/tdeekens/triggsy#info=devDependencies) ♦️
[![npm version](https://badge.fury.io/js/triggsy.svg)](http://badge.fury.io/js/triggsy)

> Triggers npm and bower installs on dependency changes.

[![NPM](https://nodei.co/npm/triggsy.png)](https://nodei.co/npm/triggsy/)

## The Idea & Concept

The point in time to run `npm i` and/or `bower i` is often unsure and either left to the developer or run on startup of an application. The first might introduce hard to inspect failures as dependencies are out of date on the development machine. The latter slows down the startup of the application.

Triggsy aims to solve those issues by reducing the cost of running an `npm i` and/or `bower i`. It takes "snapshots" (SHA hashes) of the dependencies and performs an early exit on the command if dependencies have not changed.

## CLI

### `triggsy <package-manager>`

Supported package managers are currently `npm` and `bower`.

Run `triggsy npm` to run an `npm i` only if dependencies have changed or perform an early exit if not.

## Config

The `.triggsyconfig` contains a dependency file mapping to an action.

```json
{
  "package.json": "npm i",
  "bower.json": "bower i"
}
```

## State

The `.triggsy` file contains a dependency file mapping to an state.

```json
{
  "package.json": "c219c4dc4b7ff6be7a7090459bc6d06a879a1577",
  "bower.json": "d77ebf68a4b10d3045829accb0d0bd6be996720a"
}
```

Indicating that the state before running `triggsy npm` the last time the `package.json` resolved to `c219c4dc4b7ff6be7a7090459bc6d06a879a1577`. Whenever hashing the current `package.json` shows a difference the trigger from the `.triggsyconfig` will be run and the `.triggsy` state will be upadted.

## Future Features

## Releases

- 0.0.0 Under development
