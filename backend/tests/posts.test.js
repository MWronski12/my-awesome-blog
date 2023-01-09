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

describe("Post routes", () => {
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
  });

  after(async () => {
    await db.Post.destroy({ truncate: true });
  });

  /* ------------------------------ GET ALL POSTS ----------------------------- */
  describe("/GET all posts", () => {
    it("It should get empty list of posts", (done) => {
      chaiAppServer.get("/api/posts").end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("status").eql("success");
        res.body.should.have.property("data").eql([]);
        done();
      });
    });

    it("It should fetch posts", (done) => {
      db.Post.bulkCreate(
        [
          { id: 1, content: "content1", userId: 1, title: "title1" },
          { id: 2, content: "content2", userId: 1, title: "title2" },
          { id: 3, content: "content3", userId: 1, title: "title3" },
        ],
        chaiAppServer
          .get("/api/posts")
          .send()
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("status").eql("success");
            res.body.should.have.property("data").instanceOf(Array).lengthOf(3);
            done();
          })
      );
    });
  });

  /* ------------------------------- CREATE POST ------------------------------ */
  describe("/POST create post", () => {
    it("It should create a post if ADMIN", (done) => {
      const body = {
        title: "post 1",
        content: "contents of the first post",
      };

      chaiAppServer
        .post("/api/posts")
        .set("x-access-token", ADMIN_TOKEN)
        .send(body)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("status").eql("success");
          res.body.should.have.property("data");
          res.body.data.should.have.property("userId").eql(1);
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should create a post if MODERATOR", (done) => {
      const body = {
        title: "post 2",
        content: "contents of the second post",
      };

      chaiAppServer
        .post("/api/posts")
        .set("x-access-token", MODERATOR_TOKEN)
        .send(body)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("status").eql("success");
          res.body.should.have.property("data");
          res.body.data.should.have.property("userId").eql(2);
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should not create a post if USER", (done) => {
      const body = {
        title: "post 3",
        content: "contents of the third post",
      };

      chaiAppServer
        .post("/api/posts")
        .set("x-access-token", USER_TOKEN)
        .send(body)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property("status").eql("error");
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when bad parameters", (done) => {
      const body = {
        content: "contents of the third post",
      };

      chaiAppServer
        .post("/api/posts")
        .set("x-access-token", ADMIN_TOKEN)
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("status").eql("error");
          res.body.should.have.property("message");
          done();
        });
    });
  });

  /* -------------------------------- GET POST -------------------------------- */
  describe("/GET post with comments included", () => {
    before(async () => {
      await db.Comment.bulkCreate([
        { content: "Amazing post!", postId: 1, userId: 1 },
        { content: "I wanna read more!", postId: 1, userId: 2 },
        { content: "Fascinating!", postId: 1, userId: 3 },
      ]);
    });

    /* -------------------------------------------------------------------------- */
    it("It should get post including its comments", (done) => {
      chaiAppServer.get("/api/posts/1").end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("status").eql("success");
        res.body.should.have.property("data").instanceOf(Object);
        res.body.data.should.have.property("comments").lengthOf(3);
        done();
      });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when trying to update post that doesnt exist", (done) => {
      const body = {
        title: "New title",
      };
      chaiAppServer
        .patch("/api/posts/800")
        .set("x-access-token", ADMIN_TOKEN)
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("status").eql("error");
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should fail when trying to update post that doesnt exist", (done) => {
      const body = {
        title: "New title",
      };
      chaiAppServer
        .patch("/api/posts/1")
        .set("x-access-token", ADMIN_TOKEN)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status").eql("success");
          res.body.should.have.property("data").instanceOf(Object);
          res.body.data.should.have.property("title").eql(body.title);
          done();
        });
    });
  });

  /* ------------------------------- DELETE POST ------------------------------ */
  describe("/DELETE post", () => {
    it("It should fail when post doesn't exist", (done) => {
      chaiAppServer
        .delete("/api/posts/800")
        .set("x-access-token", ADMIN_TOKEN)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("status").eql("error");
          res.body.should.have.property("message");
          done();
        });
    });

    /* -------------------------------------------------------------------------- */
    it("It should delete post with its comments", (done) => {
      chaiAppServer
        .delete("/api/posts/1")
        .set("x-access-token", ADMIN_TOKEN)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status").eql("success");
          res.body.should.have.property("data").instanceOf(Object);
          done();
        });

      after(async () => {
        const comments = await db.Comment.findAll({ where: { postId: null } });
        comments.should.be.instanceOf(Array).lengthOf(0);
      });
    });
  });
});
