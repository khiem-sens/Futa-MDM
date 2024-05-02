function handlePlus(proID){
    let value =document.getElementById(proID).value;
    $.ajax({
        type:"POST",
        url: "/cart/addQuantity",
        data:{
            proID: proID,
            value: +value+1
        }
    }).done(()=>{
        document.getElementById(proID).value= +value+1;
    });
    setTimeout(()=>window.location.reload(),1300);

}