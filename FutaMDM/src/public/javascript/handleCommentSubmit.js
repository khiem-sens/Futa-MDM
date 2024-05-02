function handleCommentSubmit(proid){
    let rating = document.getElementById('ip_rating').value;
    let title = document.getElementById('ip_title').value;
    let content = document.getElementById('ip_content').value;
    
    $.ajax({
        type:"POST",
        url:"/productdetail/setcomment" ,
        data:{
            proid: proid,
            rating:rating,
            title: title,
            content:content
        }
    }).done(()=> setTimeout(window.location.reload(),3000));
   
}