const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// require("./config");
// const Product = require ('./product');
const jsonNames = require("./names.json");
const { resolve } = require('path');
const { application } = require('express');
const path = require('path');
const app = express();


mongoose.connect("mongodb://localhost:27017/UserName",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err){
        console.log("Connected to db")
    }
    else{
        console.log("Error")
    }

})


const sch={
    
    name: { type: String, required: true}
}


const name=mongoose.model("name",sch);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//search

app.use(express.json());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'audio_script.html'));
});

app.get("/search/:key",async(req,res)=> {
    try{
        let data = await name.find({

    
            "$or":[
                {name:{$regex:req.params.key}}
            ]
    })
        res.send(data)
        res.sendFile(path.join(__dirname, 'audio.html',{data:data}));
    }
    catch(error){
        // res.write('/audio_script.html',"Error")
    
    }
    
    console.log(req.params.key)
    // res.send(data);
})

app.post("/post",async(req,res)=>{
    try{
        console.log("Inside Post function")
        const data=new name({
           
            name:req.body.q
        })
        const val=await data.save();
        console.log(val)
        res.json(val)
        // res.end()
        // res.write("Hello world!")
        
    }
    catch(error){
        console.log(error.message)
    }
})


const insertMovies = async () => {
    try {
        const docs = await name.insertMany(jsonNames);   // here names is the json file data which is stored in docs variable.
        return Promise.resolve(docs);
    } catch (err) {
        return Promise.reject(err)
    }
};

// insertMovies()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err))







app.listen(5000,()=>{
    console.log("server connected at port 5000")
})