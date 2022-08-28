import express = require("express");
const multer = require("multer");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const taskController = require("../Controllers/TaskController");

const DIR = "./public/uploads/tasks";

const storage = multer.diskStorage({
  destination: (
    req: express.Request,
    file: any,
    cb: any
  ) => {
    cb(null, DIR);
  },
  filename: (
    req: express.Request,
    file: any,
    cb: any
  ) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "___" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req: express.Request, file: any, cb: any) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/create", upload.array("files", 6), taskController.create);

router.get("/list/:_id", taskController.list);

router.get("/all", taskController.all);

router.put("/update", upload.array("files", 6), taskController.update);

router.post("/search", taskController.search);

router.delete("/delete/:_id", taskController.delete);

router.get("/detail/:_id", taskController.detail);

module.exports = router;
