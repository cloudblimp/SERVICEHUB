const mongoose = require('mongoose')

const SpDocumentSchema = new mongoose.Schema({
    
    Sp_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Service_Provider_Tbl'
    },
    doc_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Documents_Table'
    }
    
})

module.exports = mongoose.model('Sp_Document_Table',SpDocumentSchema)