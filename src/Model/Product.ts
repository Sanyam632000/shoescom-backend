const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
    brand:{
        type:String,
        require:true
    },

    name:{
        type:String,
        require:true
    },

    description:{
        type: String,
        require: true
    },

    price:{
        type: Number,
        require: true
    },

    img:{
        type: Array
    },

    gender:{
        type: String,
        enum: ['Male', 'Female'],
        require: true
    },

    availabe_size:{
        type: Array,
        require:true
    },

    availabe_color:{
        type:Array
    },

    shoes_type:{
        type: String
    },

    Ratings:{
        type: Array
    }



    
},
    {timestamps:true}
)



export default mongoose.model("Product",ProductSchema);

