import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import { db } from "../app/models/index.js";
import { app } from "../server.js";

let should = chai.should();
chai.use(chaiHttp);
const chaiAppServer = chai.request(app).keepOpen();

// Tokens
let ADMIN_TOKEN;
let MODERATOR_TOKEN;
let USER_TOKEN;

describe("Comment routes", () => {
  /* ---------------------------- PREPARE FOR TESTS --------------------------- */
  before(async () => {
    // Create all roles Tokens for auth
    ADMIN_TOKEN = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60, userId: 1 }, // ADMIN
      process.env.JWT_SECRET
    );
    MODERATOR_TOKEN = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60, userId: 2 }, // MODERATOR
      process.env.JWT_SECRET
    );
    USER_TOKEN = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60, userId: 3 }, // USER
      process.env.JWT_SECRET
    );
    const post = await db.Post.create({
      id: 100,
      title: "Title",
      content: "Content",
      userId: 3,
    });
  });

  after(async () => {
    await db.Post.destroy({ truncate: true });
    chaiAppServer.close();
  });

  /* ---------------------------- GET POST COMMENTS --------------------------- */
  describe("/GET post comments", () => {
    it("It should return 404 not found when post doesn't exist", (done) => {
      chaiAppServer.get("/api/posts/200/comments").end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("message");
        done();
      });
    });

    /* -------------------------------------------------------------------------- */
    it("It should return an empty list of comments", (done) => {
      chaiAppServer.get("/api/posts/100/comments").end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("postId").eql(100);
        res.body.should.have.property("comments").instanceOf(Array).lengthOf(0);
        done();
      });
    });
  });

  /* ------------------------------ POST COMMENT ------------------------------ */
  describe("/POST comment", () => {
    it("It should fail when not logged in", (done) => {
      const body = {
        content: "No comment",
      };
      chaiAppServer
        .post("/api/posts/100/comments")
        .send(body)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when post doesnt exist", (done) => {
      chaiAppServer
        .post("/api/posts/200/comments")
        .set("x-access-token", ADMIN_TOKEN)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when bad parameters", (done) => {
      const body = {
        hakunaMatata: "No comment",
      };
      chaiAppServer
        .post("/api/posts/100/comments")
        .set("x-access-token", USER_TOKEN)
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should post comment when logged in", (done) => {
      const body = {
        content: "No comment",
      };
      chaiAppServer
        .post("/api/posts/100/comments")
        .set("x-access-token", MODERATOR_TOKEN)
        .send(body)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("comment");
          res.body.comment.should.have.property("content").eql(body.content);
          res.body.comment.should.have.property("postId").eql(100);
          res.body.comment.should.have.property("userId").eql(2);
          done();
        });
    });
  });

  /* ------------------------------- GET COMMENT ------------------------------ */
  describe("/GET comment", () => {
    it("It should get comment details", (done) => {
      chaiAppServer.get("/api/posts/100/comments/1").end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("comment");
        res.body.comment.should.have.property("id").eql(1);
        res.body.comment.should.have.property("content").eql("No comment");
        res.body.comment.should.have.property("postId").eql(100);
        res.body.comment.should.have.property("userId").eql(2);
        done();
      });
    });
  });

  /* ------------------------------ PATCH COMMENT ----------------------------- */
  describe("/PATCH comment", () => {
    it("It should update comment details when post owner posts request", (done) => {
      const body = {
        content: "New comment",
      };
      chaiAppServer
        .patch("/api/posts/100/comments/1")
        .set("x-access-token", MODERATOR_TOKEN)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("comment");
          res.body.comment.should.have.property("id").eql(1);
          res.body.comment.should.have.property("content").eql("New comment");
          res.body.comment.should.have.property("postId").eql(100);
          res.body.comment.should.have.property("userId").eql(2);
          done();
        });
    });
  });

  /* ----------------------------- DELETE COMMENT ----------------------------- */
  describe("/DELETE comment", () => {
    it("It should fail to delete when random user", (done) => {
      chaiAppServer
        .delete("/api/posts/100/comments/1")
        .set("x-access-token", USER_TOKEN)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail if comment doesnt exist", (done) => {
      chaiAppServer
        .delete("/api/posts/100/comments/101")
        .set("x-access-token", USER_TOKEN)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should delete comment when ADMIN posts request", (done) => {
      chaiAppServer
        .delete("/api/posts/100/comments/1")
        .set("x-access-token", ADMIN_TOKEN)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("comment");
          done();
        });
    });
  });
});
