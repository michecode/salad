#  Salad

## Overview
This application is a simple e-commerce app that "sells" archival artwork from museums.

One can view available artwork with pagination and simple filtering to better navigate to artwork you wish to see. The application has a shopping cart managed through the database that allows for guest checkouts via localStorage to manage the cart ID. Additionally, you can place your order and view the cart summary that includes prices and quantities of each item in your cart.

## How To Run The App

Follow the .env.sample and fill `.env.local` with secrets I've given or your own API keys

```
nvm use
yarn
yarn db:migrate:dev
yarn db:generate
yarn seed

yarn dev
yarn test
```

## How It Works

Insert image HERE

Since Next.js is a full stack framework, you are managing both the server and the client all in one bundle. The line between server and client side can grow even fuzzier
when you take in to account the introduction of React Server Components. These are asynchronous components that allow for top level await and enforce server side rendering (SSR). In my app, I aim to use SSR whenever possible as it comes with benefits towards search enginge optimization (SEO) and faster initial load times which are important in an e-commerce environment.

However, there is still a requirement for client side rendering (CSR) with components that require state, browser APIs, interactivity etc. So, in these cases (for example my `<AddToCartButton/>`) we use CSR.

The data flow of the application changes based on the rendering model. In SSR, all queries and mutations run on the server, which permits the use of Prisma and top level awaits. The way the data flows in these components is that the server queries for data before rendering and then sends the client an HTML file. In the case of mutations, I used server actions which are RPC calls that run the mutations on the server and only send a simple request to be used on the client HTML file.

For example, the page `/cart/123` is a SSR rendered page that queries the Prisma ORM which queries our SQLite server on our behalf for the cart with ID: 123. The server then renders this into an HTML file and sends a complete page experience to the user without the need for them to parse and execute client side JavaScript.

Client side components however, need to fetch and mutate data differently. Prisma is off limits because it's only accessible from the server. Instead, we must rely on React Query hooks and API routes we've exposed for data fetching, and for data mutations we use Next.js' form of RPC calls, named  Server Actions.

## Approach to Problem Solving
Approach to Problem-Solving: Discuss your thought process when tackling this project and any challenges you faced.

## Choice of Language / Framework
Choice of Language/Framework: Justify your selection of programming language and framework (e.g., ease of use, performance, familiarity).

## Future Extensions
Future Extensions: Suggest how you would enhance the application for a more robust e-commerce experience (e.g., user authentication, payment processing, inventory management).

## Testing Strategy

Testing Strategy: Describe how you approached testing your application, including the types of tests you wrote and why.