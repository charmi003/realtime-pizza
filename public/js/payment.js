/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./assets/js/payment.js ***!
  \******************************/
document.getElementById('rzp-button').onclick = function (e) {
  e.preventDefault();
  var orderId = $(e.target).data('order-id');
  var totalAmount = $("input[name='payment-total-amt']").val();
  axios.get("/payment/?total=".concat(totalAmount, "&orderId=").concat(orderId)).then(function (info) {
    var options = {
      "key": 'rzp_test_JByp9lBtJuA4NJ',
      // Enter the Key ID generated from the Dashboard
      "name": "Realtime-Pizza",
      "description": "Payment",
      "image": "https://c8.alamy.com/comp/2C5HDAY/online-shop-logo-design-vector-illustrtaion-mobile-online-shopping-logo-vector-template-2C5HDAY.jpg",
      "order_id": info.data.order.id,
      "callback_url": "http://localhost:1000/payment/complete/?orderId=".concat(orderId),
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  });
};
/******/ })()
;