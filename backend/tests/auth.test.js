import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import { app } from "../server.js";

let should = chai.should();
chai.use(chaiHttp);

describe("Public auth routes", () => {
  /* --------------------------------- SIGNUP --------------------------------- */
  describe("/POST signup", () => {
    it("It should fail to register a new user without password field.", (done) => {
      const body = {
        username: "user",
        email: "user@gmail.com",
      };

      chai
        .request(app)
        .post("/api/auth/signup")
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("status").eql("error");
          res.body.should.have.property("message");
        });
      done();
    });

    /* -------------------------------------------------------------------------- */
    it("It should register a new user", (done) => {
      const body = {
        username: "user",
        email: "user@gmail.com",
        password: "user1234",
      };

      chai
        .request(app)
        .post("/api/auth/signup")
        .send(body)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("status").eql("success");
          res.body.should.have.property("message");
          res.body.should.have.property("data");
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

      chai
        .request(app)
        .post("/api/auth/signin")
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("status").eql("error");
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

      chai
        .request(app)
        .post("/api/auth/signin")
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("status").eql("error");
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

      chai
        .request(app)
        .post("/api/auth/signin")
        .send(body)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property("status").eql("error");
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should signin the user by username", (done) => {
      const body = {
        username: "user",
        password: "user1234",
      };

      chai
        .request(app)
        .post("/api/auth/signin")
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status").eql("success");
          res.body.should.have.property("data");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should signin the user by email", (done) => {
      const body = {
        email: "user@gmail.com",
        password: "user1234",
      };

      chai
        .request(app)
        .post("/api/auth/signin")
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status").eql("success");
          res.body.should.have.property("data");
          done();
        });
    });
  });
});

describe("Private auth routes", () => {
  /* ----------------------------- GRANT-ROLE ---------------------------- */
  describe("/POST grant-role", () => {
    it("It should fail when no token provided", (done) => {
      chai
        .request(app)
        .post("/api/auth/grant-role")
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property("status").eql("error");
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when false token provided", (done) => {
      chai
        .request(app)
        .post("/api/auth/grant-role")
        .set("x-access-token", "false token")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("status").eql("error");
          res.body.should.have.property("message").eql("jwt malformed");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when token expired", (done) => {
      const token = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) - 60, userId: 1 }, // expired ADMIN
        process.env.JWT_SECRET
      );

      chai
        .request(app)
        .post("/api/auth/grant-role")
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("status").eql("error");
          res.body.should.have.property("message").eql("jwt expired");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when user is not ADMIN", (done) => {
      const token = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 60, userId: 2 }, // MODERATOR
        process.env.JWT_SECRET
      );

      chai
        .request(app)
        .post("/api/auth/grant-role")
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property("status").eql("error");
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when no userId or roleId provided", (done) => {
      // Admin token
      const token = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 60, userId: 1 }, // ADMIN
        process.env.JWT_SECRET
      );

      const body = {
        roleId: 1,
      };

      chai
        .request(app)
        .post("/api/auth/grant-role")
        .set("x-access-token", token)
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("status").eql("error");
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when no user with userId exists", (done) => {
      // Admin token
      const token = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 60, userId: 1 }, // ADMIN
        process.env.JWT_SECRET
      );

      const body = {
        roleId: 1,
        userId: 1000,
      };

      chai
        .request(app)
        .post("/api/auth/grant-role")
        .set("x-access-token", token)
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("status").eql("error");
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should grant role", (done) => {
      // Admin token
      const token = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 60, userId: 1 }, // ADMIN
        process.env.JWT_SECRET
      );

      const body = {
        roleId: 1,
        userId: 2,
      };

      chai
        .request(app)
        .post("/api/auth/grant-role")
        .set("x-access-token", token)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status").eql("success");
          res.body.should.have
            .property("message")
            .eql("ADMIN role granted to user");
          done();
        });
    });
  });
});
