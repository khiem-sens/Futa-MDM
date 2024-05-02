function handleOrderAgain(orderID){
    $.ajax({
        type:"POST",
        url:"/order/orderagain" ,
        data:{
            orderID: orderID
        }
    }).done(()=>setTimeout(window.location.reload(),1000));
}