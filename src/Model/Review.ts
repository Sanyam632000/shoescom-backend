const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ReviewSchema = new mongoose.Schema({
    
    ReviewOnProductId:{
        type:String
    },

    ReviewByUserId:{
        type:String
    },

    Review:{
        type: String
    },

    ReviewTitle:{
        type:String
    }

    
},
    {timestamps:true}
)



export default mongoose.model("Revies",ReviewSchema);

