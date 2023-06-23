import {Schema,model} from 'mongoose';
const collection = new Schema({
 todo:{
    type: String,
    required: true
  },
  complete:{
    type:Boolean,
    required:true
  },
imp:{
    type:Boolean,
    required:true
},
date:{
    type:Date,
}
})
export default model('taskModel',collection);