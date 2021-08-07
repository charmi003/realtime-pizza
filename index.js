const express=require("express"); 

const env=require("./config/environment");
const port=env.port;
const customMiddleWares=require("./config/middlewares");

//express app 
const app=express(); 

//firing the app
let server=app.listen(port,(err)=>{ 
    if(err){ console.log(err); return; } 
    console.log(`Realtime-Pizaa is running absolutely fine on port: ${port}`);
 })


 //Event Emitter
 const Emitter=require("events");
 const eventEmitter=new Emitter();
 app.set("eventEmitter",eventEmitter); 


//web sockets
const webSockets=require("./config/web-sockets")(server,app);

//for decoding the form data
app.use(express.urlencoded());

//setting the path for static files 
app.use(express.static("public/"));

app.use("/auth",express.static("public/"));
app.use("/cart",express.static("public/"));
app.use("/orders",express.static("public/"));
app.use("/orders/track",express.static("public/"));
app.use("/payment",express.static("public/"));
app.use("/payment/page",express.static("public/"));
app.use("/payment/complete",express.static("public/"));
app.use("/admin",express.static("public/"));
app.use("/forgotPassword",express.static("public/"));
app.use("/forgotPassword/resetLink/passwordForm",express.static("public/"));
 
//setting the view engine and view path
app.set("view engine","ejs");
app.set("views","./views"); 
   
//for using layouts
const expressLayouts=require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

//connecting to the database
const db=require("./config/mongoose");

//for authentication using passport
const passport=require("passport");
const passportLocal=require("./config/passport-local-strategy");
//passport uses session-cookie and for that we need express-session
const session=require("express-session");
const MongoDbStore=require("connect-mongo");


//Middleware that takes the session cookie and encrypts it
app.use(session({
    name:"realtime-pizza",
    secret:env.sessionCookieSecret,    //secret key is used for encryption
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:24*60*60*1000
    },
    store: MongoDbStore.create({           //using mongoDbStore to store the session cookie in the DB
        mongoUrl: env.mongoDbUrl
    })

}));

//ask the app to use passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);  //Middleware to transfer the user's info to the locals for views


//flash messages  (after the session since it uses session cookie)
//flash messages are stored in the session cookie
const flash=require("connect-flash");
app.use(flash());
app.use(customMiddleWares.setFlash);

app.use(customMiddleWares.qty);

//forwarding all the requests to routes/web/index.js
app.use("/",require("./routes/web/index"));





