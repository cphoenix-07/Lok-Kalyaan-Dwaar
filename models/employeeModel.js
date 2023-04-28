const mongoose=require('mongoose');

const employeeSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: [true, `Employee data must include a Name.`]
    },    
    name:{
        type: String,
        required: [true, `Employee data must include a Name.`]
    },    
    designation:{
        type: String,
        required: [true, `Employee data must include a Name.`]
    },    
    department:{
        type: String,
        required: [true, `Employee data must include a Name.`]
    },    
    experience:{
        type: Number,
        required: [true, `Employee data must include a Name.`]
    },    
    salary:{
        type: Number,
        required: [true, `Employee data must include a Salary.`]
    },    
    totalXp:{
        type: Number,
        required: [true, `Employee data must include Total Xp.`]
    },    
    totalPenalties:{
        type: Number,
        required: [true, `Employee data must include Toatl Penalties.`]
    },    
    healthInsurance:{
        type: String,
        required: [true, `Employee data must include a Health Insurance Information.`]
    },    
    email:{
        type: String,
        required: [true, `Employee data must include an Email.`]
    },    
    phone:{
        type: String,
        required: [true, `Employee data must include a Phone.`]
    },    
    address:{
        type: String,
        required: [true, `Employee data must include an Address.`]
    },    
    lastproject:{
        type: String,
        required: [true, `Employee data must include a Last Project Assigned.`]
    },    
});

const Employee=mongoose.model('Employee', employeeSchema);
module.exports=Employee;
