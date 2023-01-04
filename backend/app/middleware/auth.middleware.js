

const verifySignUpParameters = (req, res, next) => {
  if (
    req.body.username === null ||
    req.body.email === null ||
    req.body.password === null
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
    (req.body.username === null && req.body.email === null) ||
    req.body.password === null
  ) {
    res
      .status(404)
      .send({ status: "error", message: "Bad request parameters" });
  } else {
    next();
  }
};

export { verifySignUpParameters, verifySignInParameters };
