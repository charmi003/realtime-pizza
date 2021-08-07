

/*show and hide passwords*/

$('.password-field-container').focusin(
    function(){
        $(this).css({
            'outline-width': '0',
            'box-shadow': '0 0 5px rgba(81, 203, 238, 1)',
            'border': '1px solid rgba(81, 203, 238, 1)'
        });
    }
)

$('.password-field-container').focusout(
    function(){
        $(this).addClass('border');
        $(this).css({
            'box-shadow': '0 0 0 transparent'
        });
    }
)

$(".fa-eye").click(function(event){
    $(event.target).closest(".password-field-container").children("input").attr("type","password");
    $(event.target).closest(".password-field-container").children(".fa-eye-slash").show();
    $(event.target).closest(".password-field-container").children(".fa-eye").hide();
})

$(".fa-eye-slash").click(function(event){
    $(event.target).closest(".password-field-container").children("input").attr("type","text");
    $(event.target).closest(".password-field-container").children(".fa-eye").show();
    $(event.target).closest(".password-field-container").children(".fa-eye-slash").hide();
})





//flash messages
var perfEntries = performance.getEntriesByType("navigation");
for (var i = 0; i < perfEntries.length; i++) {
    if(perfEntries[i].type === "back_forward"){ // if user has reach the page via the back button...
        //...delete the contents of the flash container
        $("#flash-success-message").attr("val","")
        $("#flash-error-message").attr("val",""); 
    }
}
let success_msg=$("#flash-success-message").attr("val");
let error_msg=$("#flash-error-message").attr("val");
let sweetAlert_msg=$("#flash-sweet-alert").attr("val");

if(success_msg)
{
    new Noty({
    text: success_msg,
    type:"success",
    theme:"relax",
    timeout:600,
    animation:{
        open:"animate__animated animate__headShake",
        close:"animate__animated animate__headShake"
    }
    }).show();
}
else if(error_msg)
{
    new Noty({
    text: error_msg,
    type:"error",
    theme:"relax",
    timeout:600,
    animation:{
        open:"animate__animated animate__headShake",
        close:"animate__animated animate__headShake"
    }

    }).show();
}

if(sweetAlert_msg)
{
    swal({
        title: "",
        text: sweetAlert_msg,
        icon: "success",
      });    
}




//AJAX req for adding item to the cart
$(".add-item-link").click(function(event){
    event.preventDefault();
    let link=$(this).attr("href");

    $.ajax({
        method:"GET",
        url:link,
        success:function(data){
            if(!data.loggedIn)
            {
                displayFlashMessage(null,"Login To Order!");
                return;
            }
            displayFlashMessage(data.message);
            let curr=$(".cart-total-qty").text();
            if(curr=='')
            curr=0;
            curr++;
            $(".cart-total-qty").text(curr);

        },
        error:function(err){
            console.log(err);
            return;
        }
    })
})





//update quantity and remove item ..cart

//increasing the qty by 1
$(".fa-plus").click(function(event){

    let id=$(this).closest("li").attr("id");
    axios.get('/cart/increase-qty',{
        params:{
            id:id
        }
    }).then((info)=>{
        // console.log(info);
        let cart=info.data.cart;
        let pizza=info.data.pizza;
        let index=info.data.index;

        $(this).closest("li").find(".item-qty").html(cart.Items[index].Quantity);
        $(this).closest("li").find(".item-price").html(`&#x20B9;${cart.Items[index].Quantity*cart.Items[index].Pizza.Price}`);
        $(".cart-total-amt").html(`&#x20B9;${cart.TotalPrice}`);
        $(".cart-total-qty").html(cart.TotalQuantity);

        let val=$(this).closest("li").find(".item-qty").text();
        if(val==2)
        {
            $(this).closest("li").find(".fa-trash-alt").parent("div").addClass("hidden");
            $(this).closest("li").find(".fa-minus").parent("div").removeClass("hidden");
        }

    })

})



//decreasing the quantity by 1
$(".fa-minus").click(function(event){

    let id=$(this).closest("li").attr("id");
    axios.get('/cart/decrease-qty',{
        params:{
            id:id
        }
    }).then((info)=>{
        // console.log(info);
        let cart=info.data.cart;
        let pizza=info.data.pizza;
        let index=info.data.index;

        $(this).closest("li").find(".item-qty").html(cart.Items[index].Quantity);
        $(this).closest("li").find(".item-price").html(`&#x20B9;${cart.Items[index].Quantity*cart.Items[index].Pizza.Price}`);
        $(".cart-total-amt").html(`&#x20B9;${cart.TotalPrice}`);
        $(".cart-total-qty").html(cart.TotalQuantity);

        let val=$(this).closest("li").find(".item-qty").text();
        
        if(val==1)
        {
            $(this).closest("li").find(".fa-minus").parent("div").addClass("hidden");
            $(this).closest("li").find(".fa-trash-alt").parent("div").removeClass("hidden");
        }

    })

})



//removing the item
$(".fa-trash-alt").click(function(event){

    let id=$(this).closest("li").attr("id");
    axios.get("/cart/remove",{
        params:{
            id:id
        }
    }).then((info)=>{

        let cart=info.data.cart;
        $(this).closest("li").remove();
        $(".cart-total-amt").html(`&#x20B9;${cart.TotalPrice}`);
        $(".cart-total-qty").html(cart.TotalQuantity);

        if(cart.TotalPrice==0)
        {
            location.reload();
        }

    })

})





let displayFlashMessage=function(success_msg,error_msg)
{  
   if(success_msg)
   {
       new Noty({
       text: success_msg,
       type:"success",
       theme:"relax",
       timeout:400,
       animation:{
           open:"animate__animated animate__headShake",
           close:"animate__animated animate__headShake"
       }
       }).show();
   }
   else if(error_msg)
   {
        new Noty({
        text: error_msg,
        type:"error",
        theme:"relax",
        timeout:400,
        animation:{
            open:"animate__animated animate__headShake",
            close:"animate__animated animate__headShake"
        }
        }).show();

   }

}



//order-status form

//adding the selected attribute to the option as per the curr order status
let statusForms=$('.order-status-form');
for(let form of statusForms.toArray())
{
    let initialStatus=$(form).find('select').data('initial-status');
    $(form).find(`option[value=${initialStatus}]`).attr('selected',true);
}


//changing the order-status on change
function orderStatusFormEvent()
{
    $(".order-status-form select").on("change",function(event){
    
        // $('#order-status-form').submit();
        let newStatus=$(this).val();
        let orderId=$(this).attr("id");
    
        axios.post(`/admin/update-order-status/?orderId=${orderId}&newStatus=${newStatus}`).then((info)=>{
            
        })
    
        if(newStatus=='delivered')
        {
            $(this).closest('tr').remove();
        }
    }) 
    
}


orderStatusFormEvent();



//if the user is logged in, join the room real-time
let loggedIn=$("input[name='login-status']").val();
if(loggedIn)
{
    const socket=io('http://localhost:1000', { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.on("connect",function(){

        socket.emit("join_room");    
    })

    socket.on('newOrder',(data)=>{
        let newOrder=newOrderMarkup(data.newOrder,data.time);
        // console.log("new order revd");
        $('#admin-orders table tr:first').after(newOrder);
        orderStatusFormEvent();
        
    })

}




function newOrderMarkup(order,time)
{

    let returnString=(`<tr>
    <td class="border-2 px-4 py-2.5">
        <p class="mb-2">${order._id}</p>
        <ul>`)

     for(item of order.Items){

        returnString+=(`<li>
            <span>${item.Pizza.Name}</span>
            <span>- ${item.Quantity} </span>
        </li>
        `)
    
     }
                
        returnString+=(`</ul>

        </td>

        <td class="border-2 text-center py-2.5">${order.User.Name}</td>
        <td class="border-2 text-center py-2.5">${order.Phone}</td>
        <td class="border-2 text-center py-2.5">${order.Address}</td>

        <td class="border-2 text-center py-2.5">

            <form action="/admin/order-status" method="post" class="order-status-form">
                <select name="Status" id=${order._id} data-initial-status=${order.Status} class="form-select">
                    <option value="placed">Placed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="prepared">Prepared</option>
                    <option value="out-for-delivery">Out For Delivery</option>
                    <option value="delivered">Delivered</option>
                </select>
            </form>

        </td>

        <td class="border-2 text-center py-2.5"> &#8377;${order.TotalPrice} <span class="uppercase ml-3">${order.PaymentType}</span></td>
        <td class="border-2 text-center py-2.5"> &nbsp; ${time} </td>
    </tr>

    `)

    return returnString;
}
