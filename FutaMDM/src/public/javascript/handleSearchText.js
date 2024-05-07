// function handleSearchText() {
//     let value = document.getElementById('searchInput').value;
//     console.log(value);
//     if(value != ""){
//         $.ajax({
//             type: "GET",
//             url: `/search/product/noindex/${value}`
//         }).done((result) => {
//             let text="";
//             result.result.forEach((pro)=>{
//                 text+= `<div style="height: 35px;"><a href="/productdetail/${pro.id}">${pro.name}</a></div>`
//             })                
//             document.getElementById("ul_search").innerHTML=text;
//             document.getElementById("span_result").innerHTML=result.result.length;
//         });
//     }else{
//         document.getElementById("ul_search").innerHTML='';
//         document.getElementById("span_result").innerHTML='0';
//     }
// }

// async function handleSearchText() {
//     let valueDeparture = document.getElementById('route-departure').value;
//     let valueDestination = document.getElementById('route-destination').value;
//     let oneWay = document.getElementById('options-one-way').checked;
//     let roundTrip = document.getElementById('options-two-way').checked;

//     if (oneWay) {
//         let route = `${valueDeparture}-${valueDestination}`;
//         let response = await fetch(`/search/product/noindex/${route}`);
//         let data = await response.json();
//         let encodeData = JSON.stringify(data);
        
//         console.log("Data: ");
//         console.log(data);
//         window.location.href = `/searchlisttrip/showlist/${encodeURIComponent(encodeData)}`;

//     } else if (roundTrip) {
//         let routeOutgoing = `${valueDeparture}-${valueDestination}`;
//         let routeReturn = `${valueDestination}-${valueDeparture}`;
//         let responseOutgoing = await fetch(`/search/product/noindex/${routeOutgoing}`);
//         let dataOutgoing = await responseOutgoing.json();
//         console.log(dataOutgoing);
//         let responseReturn = await fetch(`/search/product/noindex/${routeReturn}`);
//         let dataReturn = await responseReturn.json();
//         console.log(dataReturn);
//     } else {
//         console.log('No option selected');
//     }
// }

function handleSearchText() {
    let valueDeparture = document.getElementById('route-departure').value;
    let valueDestination = document.getElementById('route-destination').value;
    let route = `${valueDeparture}-${valueDestination}`;
    console.log(route);

    // set the href attribute of the anchor tag
    this.href = `/search/product/noindex/${route}`;
}

// document.addEventListener('DOMContentLoaded', function() {
//     let link = document.getElementById('searchLink');
//     if (link) {
//         link.addEventListener('click', function(e) {
//             e.preventDefault(); // prevent the default action

//             let valueDeparture = document.getElementById('route-departure').value;
//             let valueDestination = document.getElementById('route-destination').value;
//             let route = `${valueDeparture}-${valueDestination}`;

//             // set the href attribute of the anchor tag
//             this.href = `/search/product/noindex/${route}`;
//         });
//     }
// });