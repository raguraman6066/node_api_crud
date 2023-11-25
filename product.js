const mongoose=require('mongoose')

let dataSchema= mongoose.Schema({
    'pname':{require:true,type:String},
    'pprice':{require:true,type:String},
    'pdesc':{require:true,type:String},
});
let dataModel=mongoose.model('node_js',dataSchema);
module.exports=dataModel