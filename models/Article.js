const mongoose = require('mongoose')

const Schema=mongoose.Schema

var ArticleSchema=new Schema({

    title:{
        type:String,
        unique:true
        // required:true
    },
    subnews:{
        type:String
    },
    image:{
        type:String
    },
    postUrl:{
        type:String
    },
    note:{
        type:Schema.Types.ObjectId,
        ref:"Note"
    },
    saved:{
        type:Boolean,
        default:false
    }

})

ArticleSchema.methods.articleIsSaved=()=>{
    this.saved=true
    return this.saved
}

var Article=mongoose.model('Article',ArticleSchema);

module.exports=Article