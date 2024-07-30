#  Salad

<img width="1440" alt="Screenshot 2024-07-30 at 12 41 04 AM" src="https://github.com/user-attachments/assets/56a0821d-aec3-4d38-ae05-6f39eec8b5c5">


## Overview
This application is a simple e-commerce app that "sells" archival artwork from museums.

Products can be explored through pagination and simple filtering. The application has a shopping cart managed through a database and localStorage that allows for guest checkouts that persists through user sessions. Additionally, you can place your order and view the cart summary that includes prices and quantities of each item in your cart.


## How To Run The App

Follow the `.env.sample` and fill `.env.local` with secrets I've given or your own API keys

1. Use node version defined by running `nvm use`
2. Install packages with `yarn`
3. Create `.env.local.` file with the keys shown in `.env.sample`. Supply the values provided or provide your own Unsplash developer API keys.
4. Apply database migrations with `yarn db:migrate:dev`
5. Generate Prisma client with `yarn db:generate`
6. Seed database with data from Unsplash by running `yarn seed`
7. Ready to boot with `yarn dev`!


```
nvm use
yarn
(create env file before using database commands)
yarn db:migrate:dev
yarn db:generate
yarn seed

yarn dev
yarn test
```

#### Troubleshooting
If you are getting "Cart Not Found" you most likely re-seeded the database in between checkouts. Delete the `salad-cart-id` from your localStorage and refresh, this will create a fresh cart for you to use.

Running the integration tests affects the database. Re-seed the database if you are going to run the app again.

## How It Works
![Untitled-2024-07-27-0013](https://github.com/user-attachments/assets/c92bd946-6454-4692-8d02-12c355245b26)

Since Next.js is a full stack framework, you are managing both the server and the client all in one bundle. The line between server and client side can grow even fuzzier
when you take in to account the introduction of React Server Components. These are asynchronous components that allow for top level await and enforce server side rendering (SSR). In my app, I aim to use SSR whenever possible as it comes with benefits towards search engine optimization (SEO) and faster initial load times which are important in an e-commerce environment.

However, there is still a requirement for client side rendering (CSR) with components that require state, browser APIs, interactivity etc. In these cases (for example my `<AddToCartButton/>`) we use CSR.

The data flow of the application changes based on the rendering model. In SSR, all queries and mutations run on the server, which permits the use of Prisma and top level awaits. The way the data flows in these components is that the server queries for data before rendering and then sends the client an HTML file. In the case of mutations, the app uses Next.js' Server Actions which are RPC calls that securely run the mutations on the server and embeds a request to be used on the client HTML forms that can run without JavaScript.

For example, the page `/cart/123` is a SSR rendered page that queries the Prisma ORM which queries the SQLite server on the app's behalf for the cart with ID: 123. The server then renders this into an HTML file and sends a complete page experience to the user without the need for them to parse and execute client side JavaScript. This improves user experience by decreasing page load times and taking advantage of progressive enhancement.

Client side components need to fetch and mutate data differently. Prisma is off limits because it's only accessible from the server. Instead, we must rely on React Query hooks and API routes we've exposed for data fetching. For data mutations we use Next.js' Server Actions.

In conclusion, data queries primarily use React Server Components' ability to top level await data from Prisma to serve pages without loading states, minimal JavaScript, and improved SEO. In client components like `<AddToCart/>` the app will send GET requests to exposed API routes which are querying the same Prisma backend. Mutations work similarly throughout the whole app by using the same Server Actions everywhere. These server actions are RPC calls that run a procedure on the server using Prisma to mutate data.

## Approach to Problem Solving
I knew immediately that I would need a back end to manage a SQLite database and knew that Next.js or SvelteKit  would be my best options due to my experience working with them. I opted to use Next.js as I wanted to showcase my ability working with React and it also gave me an opportunity to learn some more bleeding edge features of React such as Server Components.

After deciding on Next.js, I scaffolded the project using a popular stack named "T3" that uses Prisma and TailwindCSS which are my favorite methods to tackle these types of requirements. This is where I ran into my first large hurdle, the T3 stack is recommended to use a package called tRPC. tRPC is a RPC package that sits between Prisma and Next.js while providing full end to end type safety. The lofty promises made me opt in and ended up causing many headaches.

Even though the template app auto generated the tRPC boilerplate it still slowed down my entire development due to it's complex nature. Working with tRPC was great when it was working and awful when it wasn't, especially with testing. Eventually, I opted to remove tRPC from the app and was able to greatly speed up my development.

Another central issue was deciding on what kind of e-commerce app to create. The primary challenge in my head was having high quality product images as it's a good way to elevate the app. The first idea of a random clothing brand fell out favor quickly as I realized Unsplash had great assets if you know where to look. After exploring their archival section I noticed official musems we're uploading their public artworks and I instantly knew I wanted to create a simple art store where these museums were selling prints.

To achieve this, I used the Unsplash API to create a database seeding script to easily and programmatically create any amount of products I wished.

From there, most of the struggles came from the learning curve of using Server Components and the new development pattern that comes along with it. This issue extended into tests as well and really forced me to seek out solutions that I've never had to use before.

## Choice of Language / Framework
I chose Next.js and TypeScript

Next.js because I wanted SSR due to the nature of it being an e-commerce app. Taking advantage of improved SEO, social media sharing, and page load times. Additionally, e-commerce apps dont require as much interaction which is a con compared to SPAs.

TypeScript to ensure type safety throughout the app and speed up development.

## Future Extensions
###### Users
Add user profiles for cart management, past order history. Additionally, the user (if verified as a museum) could upload further pieces onto the storefront to expand offerings.
###### Payment Processing
I would use Stripe's API as they are an industry standard for payment processing
###### Improved Product Searching
I could expand the database schema and user interface to improve on product queries so that users can find the exact product they're looking for.
###### Reviews
Create a review database in tandem with users so users can find the best quality products / museums.
###### Product Recommendations
Create an API to get product recommendations based on users' past product views and orders.

## Testing Strategy
My initial strategy was to use Test Driven Development (TDD) but, this ended up slowing down my development and causing many issues. Unit testing the React Server Components in any meaningful way was fruitless so I tried focusing on unit testing the client components instead. However, at this time I was using tRPC still which requires a much larger contextual footprint that is extremely hard to mock using Vitest.

In the end, I opted then to remove tRPC and rely on just Prisma and focus on unit tests for critical components. I expanded upon these tests by integration testing my Prisma functions to ensure the front end is always working with a functional back end.

Also I've attached a GitHub action to this repo that runs on code pushes that auto runs tests. This would be a great place to further expand CI/CD capabilties of the app.

If I were to expand on this strategy, I would want to use an end to end testing framework like Cypress to test core browser based user flows such as adding items to cart and checking out.
