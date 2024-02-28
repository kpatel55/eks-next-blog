const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const aws = require("aws-sdk");

const app = express();
app.use(express.json());
app.use(cors());

// const config = require("./config.js");
// aws.config.update(config.aws_config);
const dynamodb = new aws.DynamoDB.DocumentClient();

app.get("/profile", async (req, res) => {
  const params = {
    TableName: "Profiles",
    Key: {
      ID: "1",
    },
  };

  try {
    const { Item } = await dynamodb.get(params).promise();

    if (Item) {
      const {
        ID,
        FirstName,
        LastName,
        JobTitle,
        CompanyName,
        Image,
        ImageText,
        Description,
      } = Item;
      res.json([
        {
          ID,
          FirstName,
          LastName,
          JobTitle,
          CompanyName,
          Image,
          ImageText,
          Description,
        },
      ]);
    } else {
      res.status(404).json({ error: "Could not retrieve profile 404" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve profile 500" });
  }
});

app.get("/blog", async (req, res) => {
  const params = {
    TableName: "Blogs",
  };

  try {
    const { Items } = await dynamodb.scan(params).promise();

    if (Items) {
      res.json(Items);
    } else {
      res.status(404).json({ error: "Could not retrieve profile 404" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve profile 500" });
  }
});

app.post("/contact", async (req, res) => {
  const { firstName, lastName, companyName, email, message } = req.body;
  const id = uuid.v4();
  const timestamp = new Date().getTime();

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof companyName !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    res.status(400).json({ error: "parameters must be strings" });
  }

  const params = {
    TableName: "Contacts",
    Item: {
      ID: id,
      FirstName: firstName,
      LastName: lastName,
      CompanyName: companyName,
      Email: email,
      Message: message,
      CreatedAt: timestamp,
      UpdatedAt: timestamp,
    },
  };

  try {
    await dynamodb.put(params).promise();
    res.json({ message: `Successfully submitted contact form #${id}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create contact message" });
  }
});

app.listen(4000, () => {
  console.log("connected to port 4000");
});
