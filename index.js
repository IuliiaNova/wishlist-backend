const express = require('express');


const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Servidor in running on ${process.env.PORT}`);
})