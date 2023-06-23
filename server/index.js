import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './db.js';
import taskModel from './taskModel.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
connectDB();
const PORT = process.env.port || 8080;


app.post('/task',(req,res) => {
  
    res.send(req.body);
    var taskDetails = new taskModel({
        todo:req.body.todo,
        complete:req.body.complete,
        imp:req.body.imp,
        date:req.body.date

    });
    taskDetails.save();
})
app.get('/tasks',(req,res) => {
    // taskModel.find()
    taskModel.aggregate([
      { $sort: {  complete: 1 ,imp:-1 } },
      { $group: { _id: null, taskModel: { $push: "$$ROOT" } } },
      { $project: { _id: 0, taskModel: 1 } },
      { $unwind: "$taskModel" },
      { $replaceRoot: { newRoot: "$taskModel" } }
    ]).then((data) => {
      res.json(data);
    
    }).catch((error) => {
      console.error(error);
    });  
})
app.delete('/remove/:id', (req, res) => {
    const { id } = req.params;
    taskModel.findByIdAndDelete(id)
      .then((response) => {
       res.redirect('/');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const updatedTask = {
      todo: req.body.todo,
      complete: req.body.complete,
      imp: req.body.imp,
      date: req.body.date
    };
  
    taskModel.findByIdAndUpdate(id, updatedTask, { new: true })
      .then((response) => {
        res.redirect('/');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  
  app.get('/',(req,res) => {
    res.send('hello');
})
app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`);
})

