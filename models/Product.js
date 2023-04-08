const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name for this product"],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 character"],
        maxLength: [100, "Name is too large"]
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: [0, "price can't be negative"]
    },

    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pes"],
            message: "unit value can't be {VALUE} must be kg/litre/pes"
        }
    },

    quantity: {
        type: Number,
        required: true,
        min: [0, "quantity can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        message: "Quantity must be an integer"
    },

    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "statuse can't be {VALUE}"
        }
    },

    // createdAt:{
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt:{
    //     type: Date,
    //     default: Date.now
    // },


    // supplier:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },
    // categories:[{
    //     name:{
    //         type: String,
    //         required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]

},
    {
        timestamps: true,
    });

//  Mongoose middle wares for saving data pre/post  

productSchema.pre('save', function (next) {
    console.log('before saving data');
    if (this.quantity === 0) {
        this.status = "out-of-stock"
    }

    next();
});

// productSchema.post('save', function (doc, next) {
//    console.log("After saving data")
//     next();
// });

productSchema.methods.logger = function () {
    console.log(`data save for ${this.name}`)
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;