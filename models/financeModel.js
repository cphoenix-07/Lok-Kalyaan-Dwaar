const mongoose=require('mongoose');

const weeklyReportSchema = new mongoose.Schema({
    revenue:{
        type: Number,
        required: [true, `Finance data must include this week's revenue`]
    },
    cost:{
        type: Number,
        required: [true, `Finance data must include this week's revenue`]
    },
    week:{
        type: Number,
        required: [true, `Finance data must include this week's date`]
    }    
});

const FinanceReport=mongoose.model('FinanceReport', weeklyReportSchema);
module.exports=FinanceReport;
