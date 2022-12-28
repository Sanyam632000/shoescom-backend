import mongoose from 'mongoose';
import Product from './Product';



const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:5,
        max:50
    },

    email:{
        type:String,
        require:true,
        unique:true,
        min:8,
    },

    password:{
        type:String,
        require:true,
        min:6,
    },

    /*Cart:[{
        id:String,
        quantity:Number
    }]*/

    Cart:[{
        id:String,
        name:String,
        brand:String,
        img:String,
        price:Number,
        size:String,
        color:String,
        quantity:Number
    }]

    /*Cart:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Product'
    }]*/
    
},
    {timestamps:true}
)



export default mongoose.model("User",UserSchema);

