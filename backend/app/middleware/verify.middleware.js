const verifySignUpParameters = (req, res, next) => {
  if (
    req.body.username === undefined ||
    req.body.email === undefined ||
    req.body.password === undefined
  ) {
    res
      .status(404)
      .send({ status: "error", message: "Bad request parameters" });
  } else {
    next();
  }
};

const verifySignInParameters = (req, res, next) => {
  if (
    (req.body.username === undefined && req.body.email === undefined) ||
    req.body.password === undefined
  ) {
    res
      .status(404)
      .send({ status: "error", message: "Bad request parameters" });
  } else {
    next();
  }
};

const verifyCreatePostParameters = (req, res, next) => {
  if (req.body.title === undefined || req.body.content === undefined) {
    res
      .status(404)
      .send({ status: "error", message: "Bad request parameters" });
  } else {
    next();
  }
};

const verifyCreateCommentParameters = (req, res, next) => {
  if (req.body.content === undefined) {
    res
      .status(404)
      .send({ status: "error", message: "Bad request parameters" });
  } else {
    next();
  }
};

export {
  verifySignUpParameters,
  verifySignInParameters,
  verifyCreatePostParameters,
  verifyCreateCommentParameters,
};
