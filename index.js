const express = require('express');
const app = express();
const morgan = require('morgan');
const { PORT = 3000 } = process.env;
const router = require('./routes/index');

app.use(morgan('tiny'));
app.use(express.json());
app.use(router);

app.listen(PORT, (err, res) => {
  console.log(`server is running now listening on http://localhost:${PORT}`);
});
