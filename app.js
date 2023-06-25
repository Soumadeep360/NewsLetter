const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const https=require("https");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname,
                }
            }
        ]
    };
    const url='https://us21.api.mailchimp.com/3.0/lists/18e811f1c9';
    const options={
        method:"POST",
        auth:"soumadeep:1d066d252c5ce63b716ea397a8928eb6-us21"
    }
    const jsonData=JSON.stringify(data);
    const request = https.request(url,options,function(response){
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
        res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data)); 
        })
    })
    request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
})

// api key:
// 1d066d252c5ce63b716ea397a8928eb6-us21

//audience key:
//18e811f1c9