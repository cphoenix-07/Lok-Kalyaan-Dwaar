const express = require('express');
const financeController = require('../controllers/financeController');
const router = express.Router();

// router.param('id', tourController.checkId);


//create a checkbody middleware
// check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack


router
  .route('/')
  .get(financeController.getAllTimeReport)
  .post(financeController.createReport);

router
  .route('/:id')
  .get(financeController.getReport)
  .patch(financeController.updateWeeklyReport)
  .delete(financeController.deleteReport);

module.exports = router;
