const mongoose=require('mongoose');

const toDoListSchema = new mongoose.Schema({
    task:{
        type: String,
        required: [true, `To do list data must include a Name.`]
    },        
});

const toDoList=mongoose.model('toDoList', toDoListSchema);
module.exports=toDoList;
