const mongoose = require('mongoose');


const db_link = 'mongodb+srv://advertisement:UMcPEwI6DxZ94IPl@cluster0.qzxoi0v.mongodb.net/?retryWrites=true&w=majority' 
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('user database connected');
})
.catch((error)=>{
    console.log('cannot connect to database')
})

//UMcPEwI6DxZ94IPl

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:Number,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minLength:8
    },
    confirmpassword:{
        type:String,
        require:true,
        validate:function(){
            return this.confirmpassword==this.password;
        }
    },
    favourite:[{
        type:String
    }]
});

userSchema.pre('save',function(){
    // confirmpassword field is not visible after using the below command
    this.confirmpassword=undefined;
});



const usermodel = mongoose.model('usermodel',userSchema);

module.exports=usermodel;