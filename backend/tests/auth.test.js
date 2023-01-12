import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import { app } from "../server.js";

let should = chai.should();
chai.use(chaiHttp);
const chaiAppServer = chai.request(app).keepOpen();

// Tokens
let ADMIN_TOKEN;
let MODERATOR_TOKEN;
let EXPIRED_TOKEN;

describe("Public auth routes", () => {
  /* ---------------------------- PREPARE FOR TESTS --------------------------- */
  before(() => {
    ADMIN_TOKEN = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60, userId: 1 }, // ADMIN
      process.env.JWT_SECRET
    );
    MODERATOR_TOKEN = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60, userId: 2 }, // MODERATOR
      process.env.JWT_SECRET
    );
    EXPIRED_TOKEN = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) - 60, userId: 1 }, // EXPIRED ADMIN
      process.env.JWT_SECRET
    );
  });

  /* --------------------------------- SIGNUP --------------------------------- */
  describe("/POST signup", () => {
    it("It should fail to register a new user without password field.", (done) => {
      const body = {
        username: "user",
        email: "user@gmail.com",
      };

      chaiAppServer
        .post("/api/auth/signup")
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
        });
      done();
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail to register when username already in use.", (done) => {
      const body = {
        username: "user",
        email: "user1234",
        password: "user",
      };

      chaiAppServer
        .post("/api/auth/signup")
        .send(body)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property("message");
        });
      done();
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail to register when email already in use.", (done) => {
      const body = {
        username: "admin1234",
        email: "admin",
        password: "admin",
      };

      chaiAppServer
        .post("/api/auth/signup")
        .send(body)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property("message");
        });
      done();
    });

    /* -------------------------------------------------------------------------- */
    it("It should register a new user", (done) => {
      const body = {
        username: "newuser",
        email: "newuser@gmail.com",
        password: "user1234",
      };

      chaiAppServer
        .post("/api/auth/signup")
        .send(body)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("message");
          done();
        });
    });
  });

  /* ---------------------------------- SIGNIN --------------------------------- */
  describe("/POST signin", () => {
    it("It should fail to signin the user without username or email", (done) => {
      const body = {
        password: "user1234",
      };

      chaiAppServer
        .post("/api/auth/signin")
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when user does not exist", (done) => {
      const body = {
        username: "user666",
        password: "user1234",
      };

      chaiAppServer
        .post("/api/auth/signin")
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when password is incorrect", (done) => {
      const body = {
        username: "user",
        password: "wrongpassword",
      };

      chaiAppServer
        .post("/api/auth/signin")
        .send(body)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should signin the user by username", (done) => {
      const body = {
        username: "user",
        password: "user",
      };

      chaiAppServer
        .post("/api/auth/signin")
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message");
          res.body.should.have.property("user");
          res.body.user.should.have.property("id").eql(3);
          res.body.user.should.have.property("username").eql("user");
          res.body.user.should.have.property("email").eql("user");
          res.body.user.should.have.property("roles").eql(["USER"]);
          const decoded = JSON.parse(
            Buffer.from(res.body.token.split(".")[1], "base64")
          );
          decoded.should.have.property("userId").eql(3);
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should signin the user by email", (done) => {
      const body = {
        email: "user",
        password: "user",
      };

      chaiAppServer
        .post("/api/auth/signin")
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message");
          res.body.should.have.property("user");
          res.body.user.should.have.property("id").eql(3);
          res.body.user.should.have.property("username").eql("user");
          res.body.user.should.have.property("email").eql("user");
          res.body.user.should.have.property("roles").eql(["USER"]);
          const decoded = JSON.parse(
            Buffer.from(res.body.token.split(".")[1], "base64")
          );
          decoded.should.have.property("userId").eql(3);
          done();
        });
    });
  });
});

describe("Private auth routes", () => {
  /* ----------------------------- GRANT-ROLE ---------------------------- */
  describe("/POST grant-role", () => {
    it("It should fail when no token provided", (done) => {
      chaiAppServer.post("/api/auth/grant-role").end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property("message");
        done();
      });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when false token provided", (done) => {
      chaiAppServer
        .post("/api/auth/grant-role")
        .set("x-access-token", "false token")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message").eql("jwt malformed");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when token expired", (done) => {
      chaiAppServer
        .post("/api/auth/grant-role")
        .set("x-access-token", EXPIRED_TOKEN)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message").eql("jwt expired");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when user is not ADMIN", (done) => {
      chaiAppServer
        .post("/api/auth/grant-role")
        .set("x-access-token", MODERATOR_TOKEN)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when no userId or roleId provided", (done) => {
      const body = {
        roleId: 1,
      };

      chaiAppServer
        .post("/api/auth/grant-role")
        .set("x-access-token", ADMIN_TOKEN)
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when no user with userId exists", (done) => {
      const body = {
        roleId: 1,
        userId: 1000,
      };

      chaiAppServer
        .post("/api/auth/grant-role")
        .set("x-access-token", ADMIN_TOKEN)
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should grant role", (done) => {
      const body = {
        roleId: 1,
        userId: 3,
      };

      chaiAppServer
        .post("/api/auth/grant-role")
        .set("x-access-token", ADMIN_TOKEN)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("ADMIN role granted to user");
          done();
        });
    });
  });

  after(() => {
    chaiAppServer.close();
  });
});
