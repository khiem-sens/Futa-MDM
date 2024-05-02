function handleOnload() {
    let _id = document.currentScript.getAttribute('_id');
    if (_id != '') {
        $.ajax({
            type: "POST",
            url: '/productdetail/getinfo',
            data: {
                _id: _id
            }
        }).then((res) => {
            document.getElementById("div_" + _id).innerHTML =
            `<div class="thumbnail " style="display: inline-flex;height: 4rem;">
            <div class="span1" style="margin-left: 8px;"><img src="${res.image}" alt=""></div>
            <div class="span5" >
              <p style="font-style: italic;
              font-family: cursive; text-align: left;">${res.name}</p>
              <p style="text-align: left;">Price: ${res.price}đ</p>
            </div>
          </div>`;
        })
    }

}
handleOnload()