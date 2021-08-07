/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./assets/js/track.js ***!
  \****************************/
var currOrderStatus = $("#track input[name='curr-order-status']").val();
var orderTime = $("#track input[name='curr-order-time']").val();
updateStatus(currOrderStatus, orderTime);

function updateStatus(currOrderStatus, time) {
  var st = ["placed", "confirmed", "prepared", "out-for-delivery", "delivered"];
  var idx = st.indexOf(currOrderStatus);
  idx *= 2;
  var allLi = $("#track li"); //reset all li

  for (var i = 0; i < allLi.length; i++) {
    var currLi = allLi.eq(i);
    currLi.css({
      color: 'black'
    });
    currLi.find("i").css({
      color: 'black'
    });
    currLi.find("span.circle").css({
      background: 'black'
    });
    currLi.find('span.time').text("");
  } //apply gray styles to the li with status before this


  for (var _i = 0; _i < idx; _i++) {
    var _currLi = allLi.eq(_i);

    if (_i % 2 == 0) {
      _currLi.css({
        color: 'gray'
      });

      _currLi.find("i").css({
        color: 'gray'
      });

      _currLi.find("span.circle").css({
        background: 'gray'
      });
    }
  } //li with the curr status


  var orangeLi = allLi.eq(idx);
  orangeLi.css({
    color: '#FE5F1E'
  });
  orangeLi.find("i").css({
    color: '#FE5F1E'
  });
  orangeLi.find("span.circle").css({
    background: '#FE5F1E'
  });
  orangeLi.find('span.time').text("Updated At ".concat(time));
} //for realtime status update


var socket = io('http://localhost:1000', {
  transports: ['websocket', 'polling', 'flashsocket']
});
var orderId = $("#track span.order-id").text();
socket.on("connect", function () {
  socket.emit("join_order_room", {
    orderId: orderId
  });
  socket.on('orderUpdated', function (data) {
    updateStatus(data.newStatus, data.time);
  });
});
/******/ })()
;