const nodemailer=require("../config/nodemailer");


module.exports.orderPlaced=async function(order)
{
    let htmlString=nodemailer.renderTemplate({order:order},'/order-placed.ejs');
    try
    {
        let info=await nodemailer.transporter.sendMail({
            from:'RealTimePizzaa@gmail.com',
            to:order.User.Email,
            Subject:"Order Placed",
            html:htmlString
        })
        // console.log(info);
    }catch(err)
    {
        console.log(err);
        return;
    }
    
}