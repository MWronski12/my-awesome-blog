import axios from "axios";

async function x() {
  await axios.get("https://google.com");
//   throw new Error("chuj");
}

console.log(
  x()
    .then((data) => {
      console.log("data:", data);
    })
    .catch((error) => console.log("error:", error.message))
);
