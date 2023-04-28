const mongoose=require('mongoose');

const projectSchema = new mongoose.Schema({
    // employeeId:{
    //     type: String,
    //     required: [true, `Task data must include a valid employee Id.`]
    // },
    projectName:{
        type: String,
        required: [true, `Task data must include a valid task.`]
    },
    projectXp:{
        type: Date,
        required: [true, `Task data must include a date of assignment.`]
    },    
    deadline:{
        type: Date,
        required: [true, `Task data must include the date of deadline.`]
    }    
});

const Project=mongoose.model('Task', projectSchema);
module.exports=Project;
