const mongoose = require('mongoose');

const proSchema = {
    id: Number,
    sku: String,
    name: String,
    url_key: String,
    url_path: String,
    type: String,
    book_cover: String,
    short_description: String,
    price: Number,
    list_price: Number,
    price_usd: Number,
    badges: [],
    discount: Number,
    discount_rate: Number,
    rating_average: Number,
    review_count: Number,
    order_count: Number,
    favourite_count: Number,
    thumbnail_url: String,
    has_ebook: Boolean,
    inventory_status: String,
    is_visible: Boolean,
    productset_group_name: String,
    is_fresh: Boolean,
    seller: String,
    is_flower: Boolean,
    is_gift_card: Boolean,
    inventory: {
        product_virtual_type: String,
        fulfillment_type: String
    },
    url_attendant_input_form: String,
    master_id: String,
    salable_type: String,
    data_version: Number,
    day_ago_created: Number,
    categories: {
        id: Number,
        name: String,
        is_leaf: Boolean
    },
    meta_title: String,
    meta_description: String,
    meta_keywords: String,
    liked: Boolean,
    rating_summary: [],
    description: String,
    return_policy: String,
    warranty_policy: String,
    brand: {
        id: Number,
        name: String,
        slug: String
    },
    seller_specifications: [{
        name: String,
        value: String,
        url: String
    }],
    current_seller: {
        id: Number,
        sku: String,
        store_id: Number,
        name: String,
        slug: String,
        link: String,
        is_best_store: Boolean,
        logo: String,
        product_id: String,
        price: Number,
        is_offline_installment_supported: String
    },
    other_sellers: [{
        id: Number,
        name: String,
        link: String,
        logo: String,
        product_id: String,
        price: Number,
        store_id: Number
    }],
    specifications: [{
        name: String,
        attributes: [{
            name: String,
            value: String
        }]
    }],
    product_links: [],
    services_and_promotions: [],
    promotions: [],
    stock_item: {
        qty: Number,
        min_sale_qty: Number,
        max_sale_qty: Number,
        preorder_date: Boolean
    },
    installment_info: String,
    video_url: String,
    youtube: String,
    is_seller_in_chat_whitelist: Boolean
}

let _productSchema = new mongoose.Schema(proSchema);


module.exports = mongoose.model('product', _productSchema);