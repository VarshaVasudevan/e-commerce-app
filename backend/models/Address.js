const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true

    },
    addressLine1:{
        type:String,
        required:true

    },
    addressLine2:{

        type:String,
       
    },
    city:{
        type:String,
        required:true

    },
    state:{
        type:String,
        required:true

    },
    postalCode:{

        type:String,
        required:true
    },
    country:{
        type:String,
        required:true,
        default:'India'

    },
    phoneNumber:{
        type:String,
        required:true

    },
    addressType:{
        type:String,
        enum:['Home','Work','Other'],
        default:'Home'

    },
    isDefault:{
        type:Boolean,
        default:false

    },
    latitude:{

        type:Number,
    },
    longitude:{
        type:Number,

    },
},{timestamps:true});

addressSchema.pre('save', async function(next) {
    if (this.isDefault) {
      await this.constructor.updateMany(
        { user: this.user, _id: { $ne: this._id } },
        { $set: { isDefault: false } }
      );
    }
    next();
  });
  
  module.exports = mongoose.model('Address', addressSchema);