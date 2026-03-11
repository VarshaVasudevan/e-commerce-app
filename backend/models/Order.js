const mongoose = require('mongoose');   

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true

    },
    orderItem:[
        {
            name:{
                type:String,
                require:true

            },
            quantity:{

                type:Number,
                require:true
            },
            image:{
                typr:String,
                require:true

            },
            price:{
                    type:Number,
                    require:true
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                require:true
            },


        }
    ],
    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address',
        require:true

    },

    shippingAddressSnapshot: {
        fullName: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
        phoneNumber: String
      },
    paymentMethod:{
        type:String,
        require:true

    },
    paymentResult:{
        id:String,
        status:String,
        updated_time:String,
        email_address:String
    },
    itemPrice:{
        type:Number,
        require:true,
        default:0.0

    },
    taxPrice:{

        type:Number,
        require:true,
        default:0.0
    },
    shippingPrice:{
        type:Number,
        require:true,
        default:0.0

    },
    totalPrice:{
        type:Number,
        require:true,
        default:0.0

    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    isDelivered:{
        type:Boolean,
        default:false
    },
    deliveredAt:Date,

    orderStatus:{
        type:String,
        enum:['pending','processing','shipped','delivered','cancelled','confirmed'],
        default:'pending'

    }
},{timestamps:true});

orderSchema.pre('save', async function(next){

    if(this.isNew && this.shippingAddress){
       const Address = mongoose.model('Address');
       const address=await Address.findById(this.shippingAddress);

       if(address){
       this.shippingAddressSnapshot={
        fullName:address.fullName,
        addressLine1:address.addressLine1,
        addressLine2:address.addressLine2,
        city:address.city,
        state:address.state,
        postalCode:address.postalCode,
        country:address.country,
        phoneNumber:address.phoneNumber
       };
    }
    }
});

module.exports = mongoose.model('Order', orderSchema);