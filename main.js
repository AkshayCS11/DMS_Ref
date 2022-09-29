const express =require("express");
const app=express()
const mongoose=require("mongoose");
const { stringify } = require("querystring");
app.use(express.json());
//db connection
mongoose.connect("mongodb://localhost:27017/mynewdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err){
        console.log("connected to db")
    }
    else{
        console.log("error")
    }
})
//schema
const sch={
    id:Number,
    name:String,
    email:String,
    mobile:Number
}

const monmodel=mongoose.model("NEWCOL",sch);

//post

app.post("/post",async(req,res)=>{
    // console.log("inside post function");
    const data=new monmodel({
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile
    });
    const val =await data.save();
    res.send("data added successfully ");
})
//PUT

app.put("/update/:_id",async(req,res)=>{
    let upid=req.params._id;
    let upnid=req.body.id;
    let upname=req.body.name;
    let upemail=req.body.email;
    let upmobile=req.body.mobile;

    monmodel.findOneAndUpdate({_id:upid},{$set:{id:upnid,name:upname,email:upemail,mobile:upmobile}},{new:true},(err,data)=>{
        if(err){
            res.send("ERROR")
        }else{
        if(data==null){
            res.send("nothing found")
        }else{
            res.send(data)
        }}
    })
})


app.listen(3000,()=>{
    console.log("on port 3000")
})