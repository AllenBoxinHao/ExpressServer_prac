const express = require("express");
const cors = require("./middleware/cors");
const router = require("./routes");

const app = express();

app.use(express.json());
app.use(cors);

app.use(router);

const port = 3000;

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
