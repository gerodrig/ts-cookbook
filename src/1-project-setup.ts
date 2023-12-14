//? 1.1 Type Checking Javascript
// At the top of the file, add the following line:
// @ts-check

//? 1.2 Installing Typescript
// npm init -y
// npm install typescript --save-dev

//* create config file
// npx tsc --init

//? 1.3 Keeping types on the side
// @types/person.d.ts --<-- this is a type definition file
// ** @typedef { import ("../@types/person").Person } Person */ <-- this is a way to import the type using js
// ** /** @param {Person} person */ <-- this is a way to import the type using js

//? 1.4 Migration from Javascript to Typescript
// Rename your modules file by file from .js to .ts. Use several compiler options and features that help you iron out errors.

//? 1.5 Loading Types from  DefinitelyTyped
// npm install --save-dev @types/node this is an example of a type definition file installed from npm

//? 1.6 Setting up a full stack Typescript project
// Create two tsconfig files for each frontend and backend, and load shared dependencies as composites.

//? 1.7 Setting up tests
//* Create a separate tsconfig for development and build, and exclude all test files in the latter one.

//? 1.8 Typing ECMAScript modules form URLs
// Use the @types/node package to import types from the web.
//  target and module in your tsconfig’s compiler options to esnext and point to your modules with a .js extension

//? 1.9 Loading Different Modules Types in Node
//* Set TypeScript’s module resolution to "nodeNext" and name your files .mts or .cts.

//? 1.10 Working with Deno and Dependencies
//* Nothing needs to be done as TS is the default language for Deno

//? 1.11 Using Predefined Configurations
// Use a predefined configuration from tsconfig/bases and extend from there.