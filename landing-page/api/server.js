// landing-page/api/server.js
const app = require("./send-email");
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
