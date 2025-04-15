const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    
    service_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Service_Table'
    },
    user_id	: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User_Table'
    },
    rating : {
        type : Number,
        maxlength : 1,
        required : true,
        
    },
    comment : {
       type : String,
      maxlength : 255
    }
})

module.exports = mongoose.model('Feedback_Table',feedbackSchema)