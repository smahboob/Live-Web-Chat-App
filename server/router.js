//import statements
const express = require('express');
const router = express.Router();

//router endpoint where requests are made
router.get('/', (req, res) => {
    res.send('Server is running')
  })

//export the module to be used in index.js
module.exports = router;
