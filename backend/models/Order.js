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
    paymentMethod:{
        type:String,
        require:true

    },
    paymentResult:{
    },
    itemPrice:{

    },
    taxPrice:{

    },
    shippingPrice:{

    },
    totalPrice:{

    },
    isPaid:{
    },
    paidAt:{

    },
    isDelivered:{
    },
    deliveredAt:Date,

    orderStatus:{

    }
},{timestamps:true});

module.exports = mongoose.model('Order', orderSchema);