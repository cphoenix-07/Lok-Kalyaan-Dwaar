const fs=require('fs');
const FinanceReport=require('../models/financeModel');

exports.checkBody=(req, res, next)=>{
    if(!req.body.revenue || !req.body.cost){
        return res.status(400).json({
            'status':'bad request',
            'message':`The body doesn't contain either revenue or cost!`
        })
        next();
    }
}

exports.getAllTimeReport=async(req, res)=>{
    try {
        const weeklyReport = await FinanceReport.find();
    
        res.status(200).json({
          status: 'success',
          data: {
            results: weeklyReport.length,
            weeklyReport,
          }
        });
      } catch(err){
        res.status(404).json({
          status : 'Request Failed!',
          message : 'Invalid Query!'
        })
      }
}

exports.getReport=async(req, res)=>{
    try{
        const weeklyReport=await FinanceReport;
    } catch(err){
        res.status(404).json({
            status:'Invalid Request',
            message:'Could not find the data!'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
          weeklyReport,
        },
      });
}

exports.createReport = async (req, res) => {
    try {
      const weeklyReport = await FinanceReport.create(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          report: weeklyReport,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail request',
        message: 'Invalid Data Sent!'
      });
    }
  };

  exports.updateWeeklyReport = (req, res) => {
    res.status(200).json({
      data: {
        tour: '<Updated Tour Here...',
      },
    });
  };

  exports.deleteReport = (req, res) => {
    req.status(204).json({
      data: {
        status: 'success',
        data: null,
      },
    });
  };
