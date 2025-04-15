const mongoose = require('mongoose')

const yoeSchema = new mongoose.Schema({
    sp_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'SP_Table',
    
    },
    year_of_exp : {
        type : Number,
        maxlength : 2,
        require : true
    },
    start_date : {
        type : String,
        default : Date.now(),
    },
    end_date : {
        type : String,
        default : Date.now(),
    },
    description : {
        type : String,
        maxlength : 255,
        required : true
    }
    
})

module.exports = mongoose.model('Year_Of_Exp_Table',yoeSchema)