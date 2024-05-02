function handleCancleOrder(orderID){
    $.ajax({
        type:"POST",
        url:"/order/cancleorder",
        data:{
            orderID: orderID
        }
    }).done(()=>setTimeout(window.location.reload(),1000));
}
   