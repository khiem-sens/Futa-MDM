function handleSearchText() {
    let value = document.getElementById('searchInput').value;
    console.log(value);
    if(value != ""){
        $.ajax({
            type: "GET",
            url: `/search/product/noindex/${value}`
        }).done((result) => {
            let text="";
            result.result.forEach((pro)=>{
                text+= `<div style="height: 35px;"><a href="/productdetail/${pro.id}">${pro.name}</a></div>`
            })                
            document.getElementById("ul_search").innerHTML=text;
            document.getElementById("span_result").innerHTML=result.result.length;
        });
    }else{
        document.getElementById("ul_search").innerHTML='';
        document.getElementById("span_result").innerHTML='0';
    }
}