const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

// router.param('id', tourController.checkId);


//create a checkbody middleware
// check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack


router
  .route('/')
  .get(employeeController.getAllEmployee)
  .post(employeeController.addEmployee);

router
  .route('/:id')
  .get(employeeController.getEmployee)
  .patch(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

module.exports = router;
