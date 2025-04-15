const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    
    sp_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'SP_Table'    
    },
	mini_cat_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Mini_Cat_Table'
    },
	price : {
        type : Number,
        required : true,
		min : 0,
        max : 99999.99
    },
	admin_commission : {
        type : Number,
        required : true,
		maxlength : 3
    },
	sp_earning : {
        type : Number,
        required : true,
        min : 0,
        max : 99999.99
    },
	service_time : {
        type : String,
		required : true,
		maxlength : 6
    },
	yoe : {
        type : Number,
		maxlength : 2
    },
	created_at : {
        type : String,
        default : Date.now(),
        required : true
    },
	updated_at : {
        type : String,
        default : Date.now(),
    }
})

module.exports = mongoose.model('Service_Table',serviceSchema)