//const { ApolloServer } = require("apollo-server");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");

//const server = new ApolloServer({ schema });

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

const PORT = 4000;
const app = express();
const server = new ApolloServer({ schema });

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// // ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
// httpServer.listen(PORT, () => {
//   console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
//   console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
// })

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@test-shard-00-00-gocty.mongodb.net:27017,test-shard-00-01-gocty.mongodb.net:27017,test-shard-00-02-gocty.mongodb.net:27017/test?ssl=true&replicaSet=test-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
      console.log(
        `🚀 Subscriptions ready at ws://localhost:${PORT}${
          server.subscriptionsPath
        }`
      );
    });
  })
  .catch(err => {
    console.log(err);
  });
