const mongoose=require('mongoose');

const taskSchema = new mongoose.Schema({
    // employeeId:{
    //     type: String,
    //     required: [true, `Task data must include a valid employee Id.`]
    // },
    task:{
        type: String,
        required: [true, `Task data must include a valid task.`]
    },
    dateAssigned:{
        type: Date,
        required: [true, `Task data must include a date of assignment.`]
    },    
    deadline:{
        type: Date,
        required: [true, `Task data must include the date of deadline.`]
    }    
});

const Task=mongoose.model('Task', taskSchema);
module.exports=Task;
