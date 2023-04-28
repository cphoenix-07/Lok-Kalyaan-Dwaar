const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

// router.param('id', tourController.checkId);


//create a checkbody middleware
// check if body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack


router
  .route('/')
  .get(taskController.getAllTasks)
  .post(taskController.addtask);

router
  .route('/:id')
  .get(taskController.gettask)
  .patch(taskController.updatetask)
  .delete(taskController.deletetask);

module.exports = router;
