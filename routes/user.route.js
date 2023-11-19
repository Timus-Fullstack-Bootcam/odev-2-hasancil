const express = require("express");
const controller = require("../controller");
const router = express.Router({ mergeParams: true });

router
  .route("/getUser")
  .get(controller.userController.readToken, controller.userController.getUsers);
router
  .route("/getUser/:id")
  .get(controller.userController.readToken, controller.userController.getUser);
router
  .route("/addUser")
  .post(controller.userController.readToken, controller.userController.addUser);
router
  .route("/deleteUser/:id")
  .delete(
    controller.userController.readToken,
    controller.userController.deleteUser
  );
router
  .route("/updateUser/:id")
  .post(
    controller.userController.readToken,
    controller.userController.updateUser
  );

module.exports = router;
