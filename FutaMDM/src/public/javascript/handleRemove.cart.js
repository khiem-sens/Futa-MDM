function handleRemove(proID){
    $.ajax({
        type:"POST",
        url: "/cart/removePro",
        data:{
            proID: proID
        }
    }).done(()=> setTimeout(window.location.reload(),1000));
}