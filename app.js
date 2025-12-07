const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')



const app = express();


//middleware
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));



const MONGO_URL = 'mongodb://127.0.0.1:27017/WonderLust'

main().then(() =>{
    console.log("connect to DB");
}).catch(err =>{
    console.log(err);
})


async function main() {
    await mongoose.connect(MONGO_URL);   
}



app.get("/",(req,res) =>{
    res.send("HII I AM ROOT")
})

//Index Route
app.get("/listings", async (req,res) =>{
    const allListings =  await Listing.find({})
    res.render("listings/index.ejs",{allListings})
})


//New Route
app.get("/listings/new",(req,res) =>{
    res.render("listings/new.ejs")
})


//Show Route
app.get("/listings/:id",async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    console.log(listing)
    res.render("listings/show.ejs",{listing});
})

app.post("/listings",async (req,res) =>{
    // let {Title,Desription,image,price,location,country} = req.body;
    const newlisting = new Listing( req.body.listings);
    await newlisting.save()
    res.redirect('/listings');
    // console.log(listing);
})


//Edit Route
app.get("/listings/:id/edit",async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
})

//Update Route
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listings, { new: true });
    res.redirect(`/listings/${id}`);
});


app.delete("/listings/:id",async (req,res) =>{
    let {id} = req.params;
    let deletedListing =  await Listing.findByIdAndDelete(id)
    console.log(deletedListing);
    res.redirect('/listings');
})



// app.get("/testListing",async (req,res) => {
//     let sampleListing = new Listing({
//         title : "My Home ",
//         desdescription : " Near Beach",
//         image : "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         price : "25000",
//         location : "Goa",
//         country : "India"

//     })

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successfull testing");
// })


const PORT = 3000;

app.listen(PORT,(req,res) =>{
    console.log(`http://localhost:${PORT}`);
});














