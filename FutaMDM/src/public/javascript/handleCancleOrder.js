function handleCancleOrder(ID){
    $.ajax({
        type:"POST",
        url:"/order/cancleorder",
        data:{
            ID: ID
        }
    }).done(()=>setTimeout(window.location.reload(),1000));
}
   