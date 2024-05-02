function handleAddToCart(proID){
    let value = document.getElementById('input_countPro').value;
    $.ajax({
        type:"POST",
        url: "/cart/addToCart",
        data:{
            proID: proID,
            value: value
        }
    });
    setTimeout(()=>window.location.reload(),10);
}