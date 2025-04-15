const cartModel = require('../../model/cart/Cart_tbl')

const addCart = async (req,res) => {
    const user = new cartModel(req.body)
    console.log(user)

    try {
        const saveUser = await user.save()

        if(saveUser){
            res.status(201).json({
                message : 'Cart created successfully...',
                data : saveUser
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message : 'error to create cart',
            error : err.message
        })
    }
}


const getAllCart = async (req,res) => {
    try {
        const user = await cartModel.find()
        if(user){
            res.status(201).json({
                message:'Cart get successfully',
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
    addCart, getAllCart
}