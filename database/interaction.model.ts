import {Schema,models,model,Document} from 'mongoose'

export interface IInteraction extends Document {
  user:Schema.Types.ObjectId;// refrence to user
  action:string;
  question:Schema.Types.ObjectId;// refrence to question
  answer:Schema.Types.ObjectId; // refrence to answer
  tags:Schema.Types.ObjectId[];// refrence to tag
  createdAt:Date;
}
const InteractionSchema =new Schema<IInteraction> ({
user:{type:Schema.Types.ObjectId,ref:'User',required:true},
action:{type:String,required:true},
question:{type:Schema.Types.ObjectId,ref:'Question'},
answer:{type:Schema.Types.ObjectId,ref:'Answer'},
tags:[

{type:Schema.Types.ObjectId,ref:'Tag',required:true},

],
createdAt:{type:Date,default:Date.now}


})

const Interaction =models.Interaction || model('Interaction',InteractionSchema)

export default Interaction;