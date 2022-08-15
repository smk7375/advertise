const mongoose = require('mongoose');


const db_link = 'mongodb+srv://advertisement:UMcPEwI6DxZ94IPl@cluster0.qzxoi0v.mongodb.net/?retryWrites=true&w=majority' 
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('ad database connected');
})
.catch((error)=>{
    console.log('cannot connect to database')
})

const adSchema = mongoose.Schema({
    adType:{
        type:String,
        require:true
    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:'usermodel',
        require:[true , 'ad must belong to user'],
    }
});


adSchema.pre(/^find/ , function(next){
    this.populate({
        path:"userid",
        select:"_id"
    });
    next();
});



const admodel = mongoose.model('admodel',adSchema);

module.exports=admodel;