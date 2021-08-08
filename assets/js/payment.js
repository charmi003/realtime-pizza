document.getElementById('rzp-button').onclick = function(e){

    e.preventDefault();
    let orderId=$(e.target).data('order-id');

    let totalAmount=$("input[name='payment-total-amt']").val();

    axios.get(`/payment/?total=${totalAmount}&orderId=${orderId}`).then((info)=>{

        var options = {
            "key": info.data.keyId, // Enter the Key ID generated from the Dashboard
            "name": "Realtime-Pizza",
            "description": "Payment",
            "image": "https://c8.alamy.com/comp/2C5HDAY/online-shop-logo-design-vector-illustrtaion-mobile-online-shopping-logo-vector-template-2C5HDAY.jpg",
            "order_id": info.data.order.id, 
            "callback_url": `http://localhost:1000/payment/complete/?orderId=${orderId}`,
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();

     })


}






