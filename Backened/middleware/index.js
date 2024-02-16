const jwt = require("jsonwebtoken");
const secret = "SECRET";

const authenticateJwt = (req, res, next) => {
  const head = req.headers.authorization;
  if (head) {
    const token = head.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.status(404).send("Something went wrong");
  }
};

module.exports = {
  authenticateJwt,
  secret,
};
