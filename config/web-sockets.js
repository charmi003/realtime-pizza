module.exports=function(server,app)
{
    const socket=require("socket.io");
    const io=socket(server);
    const eventEmitter=app.get("eventEmitter");

    io.on("connection", (socket)=>{

        socket.on("join_order_room",(data)=>{
            socket.join(`order_${data.orderId}`);
        })

        socket.on("join_room",()=>{
            socket.join('real-time');
         })
    })


    eventEmitter.on("orderStatusUpdated",(data)=>{
        io.in(`order_${data.orderId}`).emit("orderUpdated",data);
    })

    eventEmitter.on("newOrder",(data)=>{
        io.in('real-time').emit('newOrder',data);
    })


}