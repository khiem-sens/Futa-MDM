const redis = require('redis');
const { promisifyAll } = require('bluebird');
const message = require('../../messages/message.class');

promisifyAll(redis);
const client = redis.createClient(process.env.REDIS_PORT);

client.on('connect', function () {
    console.log(message.redis_Connect_Success);
});

client.on("error", (error) => {
    console.log(message.redis_Connect_Fail);
    console.error(error);
})


const addCart = async (Hkey, field, value) => {
    let flag = false;
    await client.hsetAsync(Hkey, field, value)
        .then(() => {
            console.log(message.add_cart_Success);
            flag = true;
        }).catch((error) => {
            console.log(error);
        });
    return flag;
}

const getAllCartByHkey = async (Hkey) => {
    return await client.hgetallAsync(Hkey)
        .catch((error) => console.log(error));

}

const addQuantityOfProduct = async (Hkey, key, value) => {
    let flag = false;
    await client.hmsetAsync(Hkey, key, value)
        .then(() => {
            flag = true;
        })
        .catch((error) => console.log(error));
    return flag;
}

const removeProFromCart = async (Hkey, key)=>{
    let flag = false;
    await client.hdelAsync(Hkey, key)
        .then(() => {
            flag = true;
        })
        .catch((error) => console.log(error));
    return flag;
}

const checkExistPro = async (Hkey, key)=>{
    let flag = await client.hexistsAsync(Hkey, key)
        .catch((error) => console.log(error));
    return flag; //0 or 1
}

const deleteCart = async (Hkey)=>{
    let flag = false;
    await client.delAsync(Hkey)
        .then(() => {
            flag = true;
        })
        .catch((error) => console.log(error));
    return flag;
}




module.exports = { addCart, getAllCartByHkey, addQuantityOfProduct, 
    removeProFromCart, checkExistPro, deleteCart, client };
