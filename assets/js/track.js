let currOrderStatus=$("#track input[name='curr-order-status']").val();
let orderTime=$("#track input[name='curr-order-time']").val();


updateStatus(currOrderStatus,orderTime);


function updateStatus(currOrderStatus,time)
{
    let st=["placed","confirmed","prepared","out-for-delivery","delivered"];

    let idx=st.indexOf(currOrderStatus);
    idx*=2;

    let allLi=$("#track li");
    
    //reset all li
    for(let i=0;i<allLi.length;i++)
    {
        let currLi=allLi.eq(i);
        currLi.css({
            color:'black'
        })
        currLi.find("i").css({
            color:'black'
        })
        currLi.find("span.circle").css({
            background:'black'
        })
        currLi.find('span.time').text("");
    }

    //apply gray styles to the li with status before this
    for(let i=0;i<idx;i++)
    {
        let currLi=allLi.eq(i);
        if(i%2==0)
        {
            currLi.css({
                color:'gray'
            })
            currLi.find("i").css({
                color:'gray'
            })
            currLi.find("span.circle").css({
                background:'gray'
            })
        }
    }

    //li with the curr status
    let orangeLi=allLi.eq(idx);
    orangeLi.css({
        color:'#FE5F1E'
    })
    orangeLi.find("i").css({
        color:'#FE5F1E'
    });
    orangeLi.find("span.circle").css({
        background:'#FE5F1E'
    })
    orangeLi.find('span.time').text(`Updated At ${time}`);


}



//for realtime status update
const socket=io('http://localhost:1000', { transports: ['websocket', 'polling', 'flashsocket'] });

let orderId=$("#track span.order-id").text();
socket.on("connect",function(){

    socket.emit("join_order_room",{
        orderId:orderId
    })

    socket.on('orderUpdated',(data)=>{
        updateStatus(data.newStatus,data.time);
    })
    
})

