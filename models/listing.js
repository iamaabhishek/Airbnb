const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    image: {
        filename: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },

    price: {
        type: String
    },

    location: {
        type: String
    },

    country: {
        type: String
    }
});


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
