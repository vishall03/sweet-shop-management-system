// ✅ LOAD ENV FIRST
require("dotenv").config();

const app = require("./src/app");
const syncDB = require("./src/models");

const PORT = process.env.PORT || 5000;

// ✅ Connect DB before server starts
syncDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
