# Cryptocurrency Order Book App

## Overview

This is a web application built using the T3 Stack, which includes React, Next.js, TailwindCSS, tRPC, Prisma, and PostgreSQL. The app displays live data for 5 cryptocurrencies (BTC, ETH, XRP, LTC, DOGE) and allows users to create a watchlist to track their favorite cryptocurrencies. Users can also view historical data and detailed information for individual cryptocurrencies.

## Technologies & Libraries Used

-   **TypeScript**: A superset of JavaScript that adds optional static typing.
-   **React**: A JavaScript library for building user interfaces.
-   **Next.js**: A React framework for building server-rendered applications.
-   **TailwindCSS**: A utility-first CSS framework for rapidly building custom user interfaces.
-   **tRPC**: A framework for building type-safe APIs with TypeScript.
-   **Prisma**: An open-source database toolkit that includes an ORM.
-   **PostgreSQL**: An open-source relational database management system.
-   **SHADCN**: The primary UI library used in the application.
-   **Ant Design**: A secondary UI library used in the application.
-   **useHooks**: A custom hooks library used in the application.
-   **DayJS**: A library for handling date and time operations.
-   **Phosphor Icons**: An icon library used in the application.
-   **Husky**: A tool for running scripts before Git commits and pushes.
-   **Prettier**: A code formatter that ensures consistent code style.
-   **ESLint**: A tool for identifying and reporting on patterns in JavaScript and TypeScript.

## Features

1. **Live Data of Cryptocurrencies**: The app displays live data for 5 cryptocurrencies (BTC, ETH, XRP, LTC, DOGE) using a WebSocket connection.
2. **Watchlist**: Users can create a watchlist to keep track of their favorite cryptocurrencies.
3. **Historical Data**: Users can view historical data for the cryptocurrencies.
4. **Individual Cryptocurrency Page**: Users can view detailed information about individual cryptocurrencies.
5. **Responsive Design**: The app is designed to be responsive, with a minimal information display on mobile devices and a more detailed display on desktop devices.

## How to Run the Project

1. Clone the repository.
2. Run `npm i` to install the dependencies.
3. Insert the environment variables in the `.env` file as seen in `.env.example`. // DB - POSTGRES
4. Note: Since the `WS_URL` is private and owned, only those with access can run the project.
5. Run `prisma migrate dev` to create the database schema.
6. Run `npm run dev` to start the development server.
7. Open `http://localhost:3000` in your browser to see the app running.

## Live Deployment

The project is live at: [https://order-book-one.vercel.app/](https://order-book-one.vercel.app/)

## Discussion of Technologies Used

### TypeScript

TypeScript is a superset of JavaScript that adds optional static typing. It was chosen for this project because it provides several benefits:

1. **Type Safety**: The well-defined schema of the WebSocket payload can be easily represented using TypeScript's type system, ensuring type-safe handling of the data throughout the application.

### React

React is a popular JavaScript library for building user interfaces. It was chosen for this project because of its component-based architecture, which allows for the creation of reusable and modular UI components. React's virtual DOM and efficient rendering capabilities also make it a suitable choice for building a real-time data-driven application like this cryptocurrency order book app.

### Next.js

Next.js is a React framework that provides server-side rendering (SSR) and other features that improve the performance and SEO of web applications. It was chosen for this project because it allows for the creation of a fast and SEO-friendly web application, which is important for a public-facing application like this one.

### TailwindCSS

TailwindCSS is a utility-first CSS framework that makes it easy to build custom user interfaces. It was chosen for this project because it allows for rapid development of responsive and visually appealing user interfaces, while also providing a high degree of customization.

### tRPC

tRPC (TypeScript-RPC) provides several benefits that are particularly well-suited for the cryptocurrency order book application:

1. **Type-Safe API Design**:

    - The WebSocket payload has a well-defined schema, with specific data types for each field. tRPC's type-safe API design allows the application to represent this schema accurately, ensuring that the data is handled correctly throughout the codebase.
    - This type safety helps catch errors during development, reducing the risk of runtime issues and improving the overall code quality.

2. **Efficient Real-Time Data Handling**:

    - The application needs to display live, real-time updates of the order book data. tRPC's focus on efficiency and performance, including its support for WebSockets, makes it well-suited for this use case.
    - tRPC's WebSocket integration allows the application to receive and process the live data updates in a responsive and low-latency manner, providing a smooth user experience.

3. **Scalability and Maintainability**:

    - As the application grows and potentially adds more features or data sources, tRPC's modular and extensible architecture will be beneficial.
    - The type-safe API design and clear separation of concerns between the client and server make it easier to manage the complexity of the application and maintain its codebase over time.

4. **Testability and Reliability**:

    - The type-safe nature of tRPC and its clear API boundaries facilitate the creation of comprehensive tests for the application, including its security-critical components.
    - This improved testability helps ensure the reliability and robustness of the application, which is crucial for a real-time, data-driven application like the cryptocurrency order book.

5. **Integration with TypeScript**:
    - The use of TypeScript throughout the application, including in the tRPC API definitions, provides a seamless and consistent development experience.
    - The tight integration between tRPC and TypeScript allows for the generation of type-safe client-side code that mirrors the server-side API, reducing the potential for errors and improving developer productivity.

By leveraging tRPC's features, the cryptocurrency order book application can benefit from a type-safe and efficient API layer that is well-suited for handling real-time data updates, scaling as the application grows, and maintaining a high level of reliability and testability.

### Prisma

Prisma is an open-source database toolkit that includes an ORM. It was chosen for this project because it provides a type-safe and easy-to-use interface for interacting with the PostgreSQL database, which is used to store the data received from the connection.

### PostgreSQL

PostgreSQL is an open-source relational database management system. It was chosen for this project because it is a reliable and widely-used database that can handle the data storage requirements of the application.

### SHADCN and Ant Design

SHADCN and Ant Design are two UI libraries that were used in this project. SHADCN was chosen as the primary UI library because it provides a clean and modern design that aligns with the overall aesthetic of the application. Ant Design was used as a secondary UI library to provide additional UI components (Table).

### useHooks

useHooks is a custom hooks library that was used in this project to encapsulate common functionality and improve code reusability.

### DayJS

DayJS is a library for handling date and time operations. It was chosen for this project because it provides a simple and intuitive API for working with dates and times, which is important for displaying historical cryptocurrency data.

### Phosphor Icons

Phosphor Icons is an icon library that was used in this project to provide a consistent and visually appealing set of icons throughout the application.

### Husky, Prettier, and ESLint

In addition to the core technologies and libraries used in this project, I have also incorporated Husky, Prettier, and ESLint to enforce code quality and consistency.

**Husky**: Husky is a tool that allows you to run scripts before Git commits and pushes. In this project, Husky is used to run Prettier and ESLint checks before each commit, ensuring that the codebase maintains a consistent style and adheres to best practices.

**Prettier**: Prettier is a code formatter that automatically formats the code according to a set of predefined rules. By using Prettier, the project ensures that the codebase has a consistent code style, making it easier to read, understand, and maintain.

**ESLint**: ESLint is a tool that identifies and reports on patterns in JavaScript and TypeScript code. In this project, ESLint is used to enforce TypeScript-specific rules, catch potential errors, and promote best practices. This helps maintain the overall code quality and reliability of the application.

The use of these tools, in combination with TypeScript and tRPC, provides a robust development environment that promotes code quality, consistency, and maintainability. This is particularly important for a real-time, data-driven application like the cryptocurrency order book, where code reliability and scalability are crucial.

By enforcing code standards and best practices through Husky, Prettier, and ESLint, the project ensures that the codebase remains clean, readable, and easy to work with, even as the application grows in complexity. This, in turn, facilitates collaboration, simplifies future development and maintenance tasks, and helps prevent the introduction of bugs or security vulnerabilities.

## Assumptions Made

1. During the initial testing of the WebSocket connection, the data was outputted at a very high rate, and the browser was not able to handle the data. To address this, I had to throttle the data, assuming that only one object would be sent at a time in order to handle the data and be able to display it on the screen.
2. I placed the actual code that I tried as observable in the respective MD files in the `server/trpc/` directory. I was not able to render the UI at the rate of the data being sent by the WebSocket and save it to the database, so I had to throttle the data to be able to display it on the screen.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
