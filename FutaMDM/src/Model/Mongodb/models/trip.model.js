const mongoose = require('mongoose');

const tripSchema = {
    id: Number,
    name: String,
    status: String,
    short_description: String,
    typeCar: String,
    distance: Number,
    timeDeparture: String,
    timeArrival: String,
    time: String,
    price: Number,
    list_price: Number,
    price_usd: Number,
    discount_rate: Number,
    rating_average: Number,
    review_count: Number,
    book_count: Number,
    favorite_count: Number,
    thumbnail: String,
    ticket_availability: String,
    is_visible: Boolean,
    area_group_name: String,
    rating_summary: Array,
    description: String,
    specifications: [{
        name: String,
        attributes: [{
            name: String,
            value: String
        }]
    }]
}

let _tripSchema = new mongoose.Schema(tripSchema);
module.exports = mongoose.model('product', _tripSchema);