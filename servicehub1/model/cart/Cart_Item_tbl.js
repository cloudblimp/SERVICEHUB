const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({

    
    cart_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Cart_Table'
    },
	service_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Service_Table'
    },
	quantity : {
        type :  Number,
		maxlength : 1,
        required : true
    },
	amount : {
        type : Number,
		maxlength : 5,
		required : true

    }
    
})

module.exports = mongoose.model('Cart_Item_Table',cartItemSchema)