import "reflect-metadata"
import { createConnection } from "typeorm"
import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { Routes } from "./routes"
import * as multer from "multer"
import * as path from "path"

const storage = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, "./uploads/")
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now()
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    )
  }
})
const upload = multer({
  dest: "uploads/",
  storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname)
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"))
    }
    callback(null, true)
  }
})

const handleRequest = (
  route: any,
  req: Request,
  res: Response,
  next: Function
) => {
  const result = new (route.controller as any)()[route.action](req, res, next)
  if (result instanceof Promise) {
    result.then((result) => {
      if (result === null || result === undefined) return undefined
      const status: any = result.status === true ? "200" : "422"
      return res.status(status).json(result)
    })
  } else if (result !== null && result !== undefined) {
    const status: any = result.status === true ? "200" : "422"
    return res.status(status).json(result)
  }
}
createConnection()
  .then(async (connection) => {
    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach((route) => {
      ;["save", "update"].includes(route.action)
        ? (app as any)[route.method](
            route.route,
            upload.single("image"),
            (req: Request, res: Response, next: Function) =>
              handleRequest(route, req, res, next)
          )
        : (app as any)[route.method](
            route.route,
            (req: Request, res: Response, next: Function) =>
              handleRequest(route, req, res, next)
          )
    })

    // start express server
    app.listen(3000)

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    )
  })
  .catch((error) => console.log(error))
