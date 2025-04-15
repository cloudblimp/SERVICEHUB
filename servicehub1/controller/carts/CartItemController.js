const cartItemModel = require('../../model/cart/Cart_Item_tbl')

const addCartItem = async (req,res) => {
    const user = new cartItemModel(req.body)
    console.log(user)

    try {
        const saveUser = await user.save()

        if(saveUser){
            res.status(201).json({
                message : 'Cart Item created successfully...',
                data : saveUser
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message : 'error to create cart item',
            error : err.message
        })
    }
}


const getAllCartItem = async (req,res) => {
    try {
        const user = await cartItemModel.find()
        if(user){
            res.status(201).json({
                message:'Cart Item get successfully',
                data:user
            })
        }
    }
    catch (err){
        res.status(500).json({
            message:err.message
        })
    }
}


module.exports = {
    addCartItem, getAllCartItem
}