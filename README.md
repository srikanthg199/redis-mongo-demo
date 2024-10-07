# REDIS-MONGO-DEMO

# Redis Implementation in a Node.js Project with MongoDB

-   In this project, Redis is integrated to optimize performance by implementing caching for MongoDB queries using Mongoose. Redis acts as an in-memory data store, helping reduce load times for frequently accessed data and minimizing the number of database queries.

## Steps:

-   Initialize the Node.js project.
-   Install required dependencies: express, mongoose, redis, and dotenv for environment management.
-   Redis Client Creation:

-   Install and configure the Redis client (redis package).
-   Create a Redis client to connect to the Redis server and handle caching operations.
-   Efficient Caching with Mongoose:

-   Intercept MongoDB queries using Mongoose.
-   Before querying the database, check if the data is present in the Redis cache.
-   If present, return the cached result to avoid querying the database.
-   If not present, fetch the data from MongoDB, store it in Redis with a proper key (based on query parameters), and return the result.
-   Cache Invalidation:

-   Implement logic to invalidate or update the cache when new data is added or existing data is modified to ensure the cached data is always up to date.
-   This setup enhances the performance of MongoDB queries, especially for frequently accessed data, by reducing latency and server load.

### Setup

-   Run `npm install` in the root of the project to install server dependencies
-   Change into the client directory and run `npm install --legacy-peer-deps`
-   Change back into the root of the project and run `npm run dev` to start the server
-   Access the application at `localhost:5000` in your browser
