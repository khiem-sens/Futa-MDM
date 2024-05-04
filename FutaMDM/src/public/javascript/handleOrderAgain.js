function handleOrderAgain(ID){
    $.ajax({
        type:"POST",
        url:"/order/orderagain" ,
        data:{
            ID: ID
        }
    }).done(()=>setTimeout(window.location.reload(),1000));
}