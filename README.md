## KITCHEN

This is a Node.js project designed to provide a comprehensive restaurant management solution using ExpressJs, TypeScript, TypeORM, and Jest for unit testing adopting dependency injection methodology

### Documentation

For endpoints documentation, please visit the [Postman Documentation](https://documenter.getpostman.com/view/25518294/2sA3drGu5Q).

### Environment Variables

The following environment variables are required for the project to run:

- `JWT_SECRET`: The secret key used for signing JWT tokens.
- `PORT`: The port on which the server will run (default: 3000).
- `DB_USERNAME`: The username for the database.
- `DB_PASSWORD`: The password for the database.
- `DB_HOST`: The host address of the database.
- `DB_PORT`: The port number of the database.
- `DB_DATABASE`: The name of the database.

### Getting Started

#### Install Dependencies

First, install the project dependencies:

```sh
npm install
```

#### Start the Project

To start the project in development mode, run the following command:

```sh
npm run start:dev
```

This will start the server using `nodemon`, which will automatically restart the server when changes are detected in the source files.

### Building the Project

To build the project for production, run:

```sh
npm run build
```

This will compile the TypeScript code into JavaScript and output the files into the `dist` directory.

### Starting the Project in Production

After building the project, you can start the server in production mode using:

```sh
npm run start:prod
```

### Running Tests

The project uses Jest for unit testing. You can run the tests with the following commands:

- To run all tests once:

  ```sh
  npm test
  ```

- To run tests in watch mode (re-runs tests when changes are detected):

  ```sh
  npm run test:watch
  ```
