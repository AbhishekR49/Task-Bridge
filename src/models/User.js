const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true,
        minlength:2,
        maxlength:70
    },
    email:{
        type: String,
        required: true,
        trim:true,
        lowercase:true
    },
    password:{
        type: String,
        required: true ,
        select:false
    },
    role:{
        type: String,
        enum: ['applicant', 'poster'],
        default: 'applicant',
        required:true
    }   
},{
    timestamps: true
});

userSchema.index({email:1}, {unique:true});

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10); 
})

const User = mongoose.model('User', userSchema);

module.exports = User;