import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import { app } from "../server.js";

let should = chai.should();
chai.use(chaiHttp);
const chaiAppServer = chai.request(app).keepOpen();

// Token
const USER_TOKEN = jwt.sign(
  { exp: Math.floor(Date.now() / 1000) + 60, userId: 3 }, // USER
  process.env.JWT_SECRET
);

describe("User routes", () => {
  /* ---------------------------- GET USER DETAILS ---------------------------- */
  describe("/GET user details", () => {
    it("It should fail when not Admin, Moderator nor Owner", (done) => {
      chaiAppServer
        .get("/api/users/2")
        .set("x-access-token", USER_TOKEN)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property("status").eql("error");
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should get user details", (done) => {
      chaiAppServer
        .get("/api/users/3")
        .set("x-access-token", USER_TOKEN)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status").eql("success");
          res.body.should.have.property("data");
          res.body.data.should.have.property("username").eql("user");
          done();
        });
    });
  });
});
