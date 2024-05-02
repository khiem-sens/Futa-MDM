function handleMinus(proID){
    let value =document.getElementById(proID).value;
    if(value > 1){
        $.ajax({
            type:"POST",
            url: "/cart/addQuantity",
            data:{
                proID: proID,
                value: +value-1
            }
        }).done(()=>{
            document.getElementById(proID).value= +value-1;
        });
    }else {
        document.getElementById(proID).value= 1;
    }
    setTimeout(()=>window.location.reload(),1300);
}