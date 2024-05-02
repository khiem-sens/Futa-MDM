const User = require('../Model/Cassandra/user.cassandra');
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require("../Model/Mongodb/products.mongo");
const {getAllComment, deleteComment, lockComment} = require('../Model/Neo4j/comment.neo4j');

const moment = require('moment');

class adminCon {
    index (req, res) {
        res.render('admin/index', {
            layout: false
        })
    }

    // ---------------Manage User

    async manageUser (req, res) {
        const allUser = await User.getAllUser();
        res.render('admin/manageUser', {
            layout: false,
            allUser: allUser.rows
        })
    }

    async updateUser (req, res) {
       await User.updateUser(req.body);
        res.status(200).json({});
    }

    async deleteUser (req, res) {
        await User.deleteUser(req.params.email);
        res.status(200).json({});
    }

    // ---------------Manage Product

    async manageProduct (req, res) {
        const allProduct = await getAllProducts();
        res.render('admin/manageProduct', {
            layout: false,
            allProduct: allProduct
        })
    }

    async addProduct (req, res) {
        const dataToPost = {
            id: 937352,
            sku: String,
            name: req.body.name,
            url_key: "bo-kich-song-wifi-repeater-300mbps-totolink-ex200-hang-chinh-hang-p547...",
            url_path: "bo-kich-song-wifi-repeater-300mbps-totolink-ex200-hang-chinh-hang-p547...",
            type: "simple",
            book_cover: null,
            short_description: req.body.short_description,
            price: req.body.price,
            list_price: req.body.price,
            price_usd: req.body.price_usd,
            badges: [],
            discount: 0,
            discount_rate: 0,
            rating_average: 0,
            review_count: 0,
            order_count: 0,
            favourite_count: 0,
            thumbnail_url: "https://salt.tikicdn.com/cache/280x280/ts/product/9d/fa/1e/30d0c225257...",
            has_ebook: false,
            inventory_status: "available",
            is_visible: true,
            productset_group_name:"Laptop - Máy Vi Tính - Linh kiện/Thiết Bị Mạng/Bộ Kích Sóng Wifi",
            is_fresh: false,
            seller: null,
            is_flower: false,
            is_gift_card: false,
            inventory: {
                product_virtual_type: null,
                fulfillment_type: "tiki_delivery"
            },
            url_attendant_input_form: "",
            master_id: null,
            salable_type: "",
            data_version: 10,
            day_ago_created: 1334,
            categories: {
                id: 1846,
                name: "Laptop - Máy Vi Tính - Linh kiện",
                is_leaf: false
            },
            meta_title: req.body.name,
            meta_description: null,
            meta_keywords: null,
            liked: false,
            rating_summary: [],
            description: req.body.short_description,
            return_policy: null,
            warranty_policy: null,
            brand: {
                id: 48191,
                name: "TOTOLINK",
                slug: "totolink"
            },
            seller_specifications: [{
                name: "Tiki hoàn tiền 111% nếu phát hiện hàng giả",
                value: null,
                url: null
            }],
            current_seller: {
                id: 1,
                sku: "7506198562809",
                store_id: 40395,
                name: "Tiki Trading",
                slug: "tiki-trading",
                link: "https://tiki.vn/cua-hang/tiki-trading",
                is_best_store:false,
                logo: "https://vcdn.tikicdn.com/ts/seller/ee/fa/a0/98f3f134f85cff2c6972c31777...",
                product_id: "271577",
                price: req.body.price,
                is_offline_installment_supported: null
            },
            other_sellers: [{
                id: 2859,
                name: "Bataca",
                link: "https://tiki.vn/cua-hang/batacavn",
                logo: "https://vcdn.tikicdn.com/ts/seller/f9/63/d3/de6b57d6f8a0061b72cf6e6bbf...",
                product_id: "1928021",
                price: 229000,
                store_id: 2813
            }],
            specifications: [{
                name: "Content",
                attributes: [{
                    name: "Thương hiệu",
                    value: "TOTOLINK"
                }]
            }],
            product_links: [],
            services_and_promotions: [],
            promotions: [],
            stock_item: {
                qty: 42549,
                min_sale_qty: 1,
                max_sale_qty: 1,
                preorder_date: false
            },
            installment_info: null,
            video_url: "",
            youtube: "",
            is_seller_in_chat_whitelist: false
        }
        await addProduct(dataToPost);
    }

    async updateProduct (req, res){
        await updateProduct(req.body)
    }

    async deleteProduct (req, res) {
        await deleteProduct(req.params.id)
    }


    // ---------------Manage Comment

    async manageComment (req, res) {
        const allComment = await getAllComment();
        res.render('admin/manageComment', {
            layout: false,
            allComment
        })
    }

    async lockComment (req, res) {
        await lockComment(req.body);
    }

    async deleteComment(req, res) {
        await deleteComment(req.params.id);
    }

}

module.exports = new adminCon ();