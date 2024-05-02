const {client} = require('./cart.redis');

const cachingUser = async (user, email) => {
    if (!user.rows[0].phone) {
        user.rows[0].phone = "0";
    };
    if (!user.rows[0].address) {
        user.rows[0].address = "null";
    }
    await client.hsetAsync("USER:"+email,"EMAIL",  user.rows[0].email);
    await client.hsetAsync("USER:"+email,"NAME",  user.rows[0].name);
    await client.hsetAsync("USER:"+email,"PASSWORD",  user.rows[0].password);
    await client.hsetAsync("USER:"+email,"PHONE",  user.rows[0].phone);
    await client.hsetAsync("USER:"+email,"ADDRESS",  user.rows[0].address);
    await client.hsetAsync("USER:"+email,"ROLE",  user.rows[0].role);
    await client.hsetAsync("USER:"+email,"STATUS",  user.rows[0].status);
    await client.hsetAsync("USER:"+email,"CREATEDAT",  user.rows[0].createdat);
    await client.expireAsync("USER:"+email,100);
}

const userExistInRedis = async (email) => {
   return await client.hexistsAsync('USER:'+ email, 'EMAIL');
}

const getUserInRedisCache = async (email) => {
    return await client.hgetallAsync("USER:"+email)
    .catch((error) => console.log(error));
}

const getAttributeOfUser = async (Hkey, field) => {
    return await client.hgetAsync(Hkey, field)
    .catch((error) => console.log(error));
}


module.exports = {cachingUser,userExistInRedis, getUserInRedisCache, getAttributeOfUser};