//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var session = require('express-session')
var passport = require("passport")
const passportLocalMongoose = require('passport-local-mongoose');
const dotenv = require('dotenv')





const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));

mongoose.connect("mongodb+srv://hkstudio922:Hkstudio%402119@cluster0.siqlmc9.mongodb.net/college?retryWrites=true&w=majority");





// ------------------MESSSAGE SEND START------------------------------

const twilio = require('twilio')
dotenv.config()

app.get("/Sos",(req,res)=>{

  res.render("SosPage.ejs")
 })


 app.post("/SosSend",(req,res)=>{

  let name = req.body.name;
  let email = req.body.email;
  let subject = req.body.subject;
  let message = req.body.message;
  let contact = req.body.contact;
  
  
  function sendSMS(name,email,subject,message){
    var Nameofperson = name;
    var emailofperson = email;
    var subjectofperson = subject;
    var messageofperson = message;
    var numberofperson = contact;
    const client = new twilio(process.env.TWILIO_SID , process.env.TWILIO_AUTH_TOKEN)

    return client.messages
    .create({body: `name: ${Nameofperson},email: ${emailofperson},contact: ${numberofperson},subject: ${subjectofperson},message: ${messageofperson}`, from:'+13613210773' , to: '+917200143891'})
    .then(message => {

        console.log(message, "message sent");

    })
    .catch(err => {
        console.log(err,"message not sent");
    
    })

}
sendSMS(name,email,subject,message)

res.redirect("/Sos");
 })





// -----------------------------MESSSAGE SEND END-------------------------------------















app.use(require('express-session')({ secret: 'thisishemanth', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());



const User_schema = new mongoose.Schema({
    num:Number,
    pass:String
})

User_schema.plugin(passportLocalMongoose)

const User = new mongoose.model("User", User_schema)




passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
  


// ROutes 

app.get("/login", (req,res)=>{
    res.render("login.ejs")
})


app.post("/login", function(req,res){

  const user = new User({
      username: req.body.username,
      password: req.body.password
  });

  req.login(user, function(err) {
      if (err) { 
        console.log(err)
       }
      else{
        passport.authenticate("local")(req, res, function(){
          res.redirect("/")
          console.log("Successfully LOged In")
        })
      }
    });
    
})






 






app.get("/register", (req,res)=>{
  res.render("register.ejs");
})



app.post("/register", function(req,res){



  User.register({username: req.body.username}, req.body.password, function(err, user){
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/");
          console.log("Successfully Registered");
        });
      }
    });


  })




// --------------------------- staff details schema -----------------------------
const listsSchema = {
  name:String,
  status:String,
  course:String,
  email:String,
  profile:String

};

// to make schema at database
// list_staff = ['ecestaff','biostaff','cscstaff','eeestaff','itstaff','mechstaff'];

const ecestaff = mongoose.model('ecestaff', listsSchema);
app.get("/ecestaff",(req,res)=>{
  ecestaff.find({})
  .then(lists => {
    res.render('staff/ecestaff', { 
      ecestaff: lists
     });
  })
  .catch(err => {
    console.error(err);

  });
  
})

const biostaff = mongoose.model('biostaff', listsSchema);
app.get("/biostaff",(req,res)=>{
  biostaff.find({})
  .then(lists => {
    res.render('staff/biostaff', { 
      biostaff: lists
     });
  })
  .catch(err => {
    console.error(err);

  });
  
})

const cscstaff = mongoose.model('cscstaff', listsSchema);
app.get("/cscstaff",(req,res)=>{
  cscstaff.find({})
  .then(lists => {
    res.render('staff/cscstaff', { 
      cscstaff: lists
     });
  })
  .catch(err => {
    console.error(err);

  });
  
})

const eeestaff = mongoose.model('eeestaff', listsSchema);
app.get("/eeestaff",(req,res)=>{
  eeestaff.find({})
  .then(lists => {
    res.render('staff/eeestaff', { 
      eeestaff: lists
     });
  })
  .catch(err => {
    console.error(err);

  });
  
})

const itstaff = mongoose.model('itstaff', listsSchema);
app.get("/itstaff",(req,res)=>{
  itstaff.find({})
  .then(lists => {
    res.render('staff/itstaff', { 
      itstaff: lists
     });
  })
  .catch(err => {
    console.error(err);

  });
  
})

const mechstaff = mongoose.model('mechstaff', listsSchema);
app.get("/mechstaff",(req,res)=>{
  mechstaff.find({})
  .then(lists => {
    res.render('staff/mechstaff', { 
      mechstaff: lists
     });
  })
  .catch(err => {
    console.error(err);

  });
  
})

//---------------------------- end staff schema -------------------------------



// -------------------cantee schema--------------------------------
const canteenSchema = {
  canteen1Name: String,
  canteen2Name: String,
  canteen3Name: String,
  des:String,
  status:String,
  pass:String,
  morning:Boolean,
  foodtitle:String,
  description:String,
  price:Number
};

// canteen_list = ['canteen1','canteen2','canteen3'];

const canteen1 = mongoose.model('canteen1', canteenSchema);
app.get("/canteen1",(req,res)=>{
  canteen1.find({})
  .then(lists => {
    res.render('canteen/canteen1', { 
      canteen1: lists
      
     });
  })
  .catch(err => {
    console.error(err);

  });
  
})

const canteen2 = mongoose.model('canteen2', canteenSchema);
app.get("/canteen2",(req,res)=>{
  canteen2.find({})
  .then(lists => {
    res.render('canteen/canteen2', { 
      canteen2: lists
      
     });
  })
  .catch(err => {
    console.error(err);

  });
  
})

const canteen3 = mongoose.model('canteen3', canteenSchema);
app.get("/canteen3",(req,res)=>{
  canteen3.find({})
  .then(lists => {
    res.render('canteen/canteen3', { 
      canteen3: lists
      
     });
  })
  .catch(err => {
    console.error(err);

  });
  
})

// -------------------------end canteen schema---------------------

// --------------------canteen status update -----------------------

app.get("/canteen1Admin",function(req,res){
  canteen1.find({})
  .then(lists => {
    res.render('canteen/canteen1Admin', { 
      canteen1: lists
      
     });
  })
  .catch(err => {
    console.error(err);

  });
});

app.post("/update",function(req,res){
  let status = req.body.textname
  canteen1.findOneAndUpdate(
    { pass: 'canteen1' },
    { status: status},
    { new: true } // To return the updated document as the result
  )
    .then(updatedUser => {
      console.log('User data updated successfully:', updatedUser);
      res.redirect('/canteen1')
    })
    .catch(err => {
      console.error('Error updating user data:', err);
    });
});

app.get("/canteen2Admin",function(req,res){
  canteen2.find({})
  .then(lists => {
    res.render('canteen/canteen2Admin', { 
      canteen2: lists
      
     });
  })
  .catch(err => {
    console.error(err);

  });
});

app.post("/update2",function(req,res){
  let status = req.body.textname
  canteen2.findOneAndUpdate(
    { pass: 'canteen2' },
    { status: status},
    { new: true } // To return the updated document as the result
  )
    .then(updatedUser => {
      console.log('User data updated successfully:', updatedUser);
      res.redirect('/canteen2')
    })
    .catch(err => {
      console.error('Error updating user data:', err);
    });
});

app.get("/canteen3Admin",function(req,res){
  canteen3.find({})
  .then(lists => {
    res.render('canteen/canteen3Admin', { 
      canteen3: lists
      
     });
  })
  .catch(err => {
    console.error(err);

  });
});

app.post("/update3",function(req,res){
  let status = req.body.textname
  canteen3.findOneAndUpdate(
    { pass: 'canteen3' },
    { status: status},
    { new: true } // To return the updated document as the result
  )
    .then(updatedUser => {
      console.log('User data updated successfully:', updatedUser);
      res.redirect('/canteen3')
    })
    .catch(err => {
      console.error('Error updating user data:', err);
    });
});

// --------------------end canteen status update -----------------------

// ----------------------event status update---------------------------
const eventSchema = {
  title: String,
  place: String,
  status: String,
  location:String,
  date:String,
  des:String,
  contactNo:String,

};

const event = mongoose.model('event', eventSchema);
app.get("/event",(req,res)=>{
  event.find({})
  .then(lists => {
    res.render('event', { 
      event: lists
     });
  })
  .catch(err => {
    console.error(err);

  });
  
})

// ----------------------end event status update---------------------------




// ---------------------- bus status update---------------------------

const busSchema = {
  driverName: String,
  title: String,
  location:String,
  contactNo:String,
  image:String

};

const bus = mongoose.model('bus', busSchema);
app.get("/busdetails",(req,res)=>{
  bus.find({})
  .then(lists => {
    res.render('busdetails', { 
      bus: lists
     });
  })
  .catch(err => {
    console.error(err);

  });
  
})

// ---------------------- end bus status update---------------------------

const docsSchema = {
  title: String,
  des: String,
  link: String,
  pass_sem: String

};

const cscdocs = mongoose.model('cscdocs', docsSchema);
app.get("/cscdocs",(req,res)=>{
  if(req.isAuthenticated()){
  const docsName = "CSC Docs";
  cscdocs.find({})
  .then(lists => {

    res.render('deptdocs/cscdocs', { 
      docs: lists,
      docsName:docsName
      
     });
  })
  .catch(err => {
    console.error(err);

  });
}
else{
  console.log("not logged in redirecting ")
  res.redirect("/login")
}
  
  
})

const biodocs = mongoose.model('biodocs', docsSchema);
app.get("/biotechdocs",(req,res)=>{
  if(req.isAuthenticated()){
  const docsName = "BIO TECH Docs";
  biodocs.find({})
  .then(lists => {

    res.render('deptdocs/biotechdocs', { 
      docs: lists,
      docsName:docsName
      
     });
  })
  .catch(err => {
    console.error(err);

  });
}
else{
  console.log("not logged in redirecting ")
  res.redirect("/login")
}
  
  
})

const ecedocs = mongoose.model('ecedocs', docsSchema);
app.get("/ecedocs",(req,res)=>{
  

  if(req.isAuthenticated()){
  const docsName = "ECE Docs";
  ecedocs.find({})
  .then(lists => {

    res.render('deptdocs/ecedocs', { 
      docs: lists,
      docsName:docsName
      
     });
  })
  .catch(err => {
    console.error(err);

  });
}
else{
  console.log("not logged in redirecting ")
  res.redirect("/login")
}
  
  
})

const eeedocs = mongoose.model('eeedocs', docsSchema);
app.get("/eeedocs",(req,res)=>{
  if(req.isAuthenticated()){
  const docsName = "EEE Docs";
  eeedocs.find({})
  .then(lists => {

    res.render('deptdocs/eeedocs', { 
      docs: lists,
      docsName:docsName
      
     });
  })
  .catch(err => {
    console.error(err);

  });
}
else{
  console.log("not logged in redirecting ")
  res.redirect("/login")
}
  
  
})

const itdocs = mongoose.model('itdocs', docsSchema);
app.get("/itdocs",(req,res)=>{
  if(req.isAuthenticated()){
  const docsName = "IT Docs";
  itdocs.find({})
  .then(lists => {

    res.render('deptdocs/itdocs', { 
      docs: lists,
      docsName:docsName
      
     });
  })
  .catch(err => {
    console.error(err);

  });
}
else{
  console.log("not logged in redirecting ")
  res.redirect("/login")
}
  
  
})

const mechdocs = mongoose.model('mechdocs', docsSchema);
app.get("/mechdocs",(req,res)=>{
  if(req.isAuthenticated()){
  const docsName = "MECH Docs";
  mechdocs.find({})
  .then(lists => {

    res.render('deptdocs/mechdocs', { 
      docs: lists,
      docsName:docsName
      
     });
  })
  .catch(err => {
    console.error(err);

  });
}
else{
  console.log("not logged in redirecting ")
  res.redirect("/login")
}
  
  
})












const locpicturesSchema = {
  title:String,
  description:String,
  link:String,
  pass:String

};

const locpicture = mongoose.model('locpicture', locpicturesSchema);

//---------------- home route ---------------
app.get("/",(req,res)=>{
  locpicture.find({})
  .then(lists => {
    res.render('home', { 
      locpicture: lists
     });
  })
  .catch(err => {
    console.error(err);

  });
  
})





app.get("/index",function(req,res){
  res.redirect("/")
});


// app.get("/staff/index",function(req,res){
//   res.redirect("/")
// });

//---------------- end home route -----------------




// department images list
app.get("/departement",function(req,res){
  res.render("departement");
});

app.get("/eceimages",function(req,res){
  res.render("deptimg/eceimages");
});
app.get("/cscimages",function(req,res){
  res.render("deptimg/cscimages");
});
app.get("/itimages",function(req,res){
  res.render("deptimg/itimages");
});
app.get("/mechimages",function(req,res){
  res.render("deptimg/mechimages");
});
app.get("/eeeimages",function(req,res){
  res.render("deptimg/eeeimages");
});
app.get("/biomedimages",function(req,res){
  res.render("deptimg/biomedimages");
});

// end department images list



app.get("/map",function(req,res){
  res.render("map");
});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
