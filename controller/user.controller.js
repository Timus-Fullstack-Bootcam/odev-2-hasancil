const { userService } = require("../services");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "..", "user.json");

exports.getUsers = (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(400).send(err);
    }

    const parsedData = JSON.parse(data);
    res.status(200).send(parsedData.userDatabase.users);
  });
};

exports.getUser = (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error occured while reading file:", err);
      return;
    }

    const parsedData = JSON.parse(data);
    const reqId = req.params.id;

    console.log(parsedData.userDatabase.users);
    const result = parsedData.userDatabase.users.find(
      (obj) => obj.id === reqId
    );

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("no data found.");
    }
  });
};

exports.addUser = (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(400).send(err);
    }

    const parsedData = JSON.parse(data);
    if (
      typeof req.body.name === "string" &&
      typeof req.body.age === "number" &&
      typeof req.body.stillEmloyee === "boolean"
    ) {
      if (userService.isEmailValid(req.body.email)) {
        const dataThatWillBeWrittenToFile = {
          id: userService.generateUniqueId(),
          name: req.body.name,
          age: req.body.age,
          email: req.body.email,
          stillEmloyee: req.body.stillEmloyee,
        };

        parsedData.userDatabase.users.push(dataThatWillBeWrittenToFile);
        const updatedJsonData = JSON.stringify(parsedData, null, 2);
        fs.writeFile(filePath, updatedJsonData, "utf8", (err) => {
          if (err) {
            res.status(400).send(err);
          }
          res.status(200).send(dataThatWillBeWrittenToFile);
        });
      } else {
        res.status(400).send("invalid email format");
      }
    } else {
      res.status(401).send("invalid format");
    }
  });
};

exports.deleteUser = (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    const parsedData = JSON.parse(data);
    const deleteIndex = req.params.id;
    const index = parsedData.userDatabase.users.findIndex(
      (user) => user.id == deleteIndex
    );
    const deletedObject = parsedData.userDatabase.users.splice(index, 1);
    const updatedJsonData = JSON.stringify(parsedData, null, 2);
    fs.writeFile(filePath, updatedJsonData, "utf8", (err) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(deletedObject);
    });
  });
};

exports.updateUser = (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(400).send(err);
    }
    const parsedData = JSON.parse(data);
    const updateIndex = req.params.id;
    const index = parsedData.userDatabase.users.findIndex(
      (user) => user.id == updateIndex
    );
    if (
      typeof req.body.name === "string" &&
      typeof req.body.age === "number" &&
      typeof req.body.stillEmloyee === "boolean"
    ) {
      if (userService.isEmailValid(req.body.email)) {
        const dataThatWillBeWrittenToFile = {
          name: req.body.name,
          age: req.body.age,
          email: req.body.email,
          stillEmloyee: req.body.stillEmloyee,
        };

        parsedData.userDatabase.users[index] = dataThatWillBeWrittenToFile;
        const updatedJsonData = JSON.stringify(parsedData, null, 2);
        fs.writeFile(filePath, updatedJsonData, "utf8", (err) => {
          if (err) {
            res.status(400).send(err);
          }
          res.status(200).send(dataThatWillBeWrittenToFile);
        });
      } else {
        res.status(400).send("invalid email format");
      }
    }
  });
};

exports.readToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token.length > 11) {
    console.log("Authenticated. Token is: ", token);
    next();
  } else {
    return res.status(401).send("Unathorized User!!!");
  }
};
