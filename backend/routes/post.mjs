import express from "express"; 
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb"; 
import checkauth from "../check-auth.mjs";


const router = express.Router(); 

//get all records
router.get("/", async(req, res) => {
    let collection = await db.collection("posts"); 
    let results = await collection.find({}).toArray(); 
    console.log('get post request')
    res.send(results).status(200); 
}); 
//create a new record
router.post("/upload", checkauth, async(req, res) => {
    let newDocument = {
        user: req.body.user,
        content: req.body.content,
        image: req.body.image
    };
    let collection = await db.collection("posts");
    let result = await collection.insertOne(newDocument); 
    res.send(result).status(204); 
}); 


//update a record by id
router.patch("/:id", checkauth, async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
        $set: { 
            name: req.body.name,
            comment: req.body.comment
        }
    }; 

    let collection = await db.collection("posts"); 
    let result = await collection.updateOne(query, updates); 

    res.send(result).status(200); 
}); 

//get a single record by id 
router.get("/:id", async (req, res) => {
    let collection = await db.collection("posts"); 
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query); 

if (!result) res.send("Not found").status(404); 
else res.send(result).status(200); 
}); 

//delete a record 
router.delete("/:id",  async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }; 

    const collection = db.collection("posts"); 
    let result = await collection.deleteOne(query); 

    res.send(result).status(200); 
}); 

export default router;