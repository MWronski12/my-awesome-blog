import jwt from "jsonwebtoken";

const secret = "key";
const data = {
  username: "user",
};

// create
jwt.sign({ data }, secret, { expiresIn: "24h" });

const logResult = () => {
  console.log(result);
};

// // verify
// try {
//   var decoded = jwt.verify(token, "wrong-secret");
// } catch (err) {
//   console.log(err);
// }
// console.log(decoded);
