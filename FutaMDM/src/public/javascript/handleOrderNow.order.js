function handleOrderNow(){
    $.ajax({
        type:"POST",
        url:'/order/confirmOrder',
        data:{
            order_confirm: true
        }
    })

    
}