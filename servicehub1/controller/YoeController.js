const yoeModel = require('../model/Yoe_tbl')

const addYoe = async (req,res) => {
    const user = new yoeModel(req.body)
    console.log(user)

    try {
        const saveUser = await user.save()

        if(saveUser){
            res.status(201).json({
                message : 'Year_of_exp created successfully...',
                data : saveUser
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message : 'error to create year_of_exp',
            error : err.message
        })
    }
}


const getAllYoe = async (req,res) => {
    try {
        const user = await yoeModel.find()
        if(user){
            res.status(201).json({
                message:'Year_of_exp get successfully',
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
    addYoe, getAllYoe
}