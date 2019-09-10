const { createServer } = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { subscribe, execute } = require("graphql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlExpress({
    schema
  })
);
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
  })
);

const ws = createServer(app);
mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@test-shard-00-00-gocty.mongodb.net:27017,test-shard-00-01-gocty.mongodb.net:27017,test-shard-00-02-gocty.mongodb.net:27017/test?ssl=true&replicaSet=test-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    ws.listen(4000, () => {
      console.log("listen in port 4000");
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema
        },
        {
          server: ws,
          path: "/subscriptions"
        }
      );
    });
  })
  .catch(err => {
    console.log(err);
  });
