import express from "express";
import supabase from "../supabaseClient.js";

const router = express.Router();

// get all help tasks
router.get("/", async(req, res) => {
    try{
        const {data, error}  = await supabase
        .from("Help")
        .select("*")
        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error("Failed to fetch helps: ", err);
        res.status(500).json({error: err.message});
    }
});

// get a specific help task
router.get("/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const {data, error}  = await supabase
        .from("Help")
        .select("*")
        .eq("help_id", id)
        .single()

        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error("Failed to fetch help task: ", err);
        res.status(500).json({error: err.message});
    }
});

// create a new help task
router.post("/", async(req,res) => {
    try{
        const {
            demander_id,
            name,
            description, 
            location, 
            auth_id
        } = req.body;

        const {data,error} = await supabase
        .from("Help")
        .insert([
            {
                demander_id,
                name,
                description, 
                location, 
                auth_id
            }
        ])
        .select()
        .single()

        if (error) throw error;
        res.json(data);

    } catch (err){
        console.error("Failed to add help task: ", err);
        res.status(500).json({error: err.message})
    }
});


// update help task
router.patch("/:id", async(req,res) => {
    try{

        const { id } = req.params;
        const {
            name,
            description, 
            location, 
        } = req.body;

        const {data,error} = await supabase
        .from("Help")
        .update(
            {
                name,
                description, 
                location, 
            }
        )
        .eq("help_id", id)
        .select()
        .single()

        if (error) throw error;
        res.json(data);

    } catch (err){
        console.error("Failed to udpate help task: ", err);
        res.status(500).json({error: err.message})
    }
});


// deletes a new help task
router.delete("/:id", async(req,res) => {
    try{
        const { id } = req.params;
        const { error } = await supabase
        .from("Help")
        .delete()
        .eq("help_id", id)

        if (error) throw error;
        res.status(200).json({message: "task deleted successfully"})

    } catch (err){
        console.error("Failed to delete help task: ", err);
        res.status(500).json({error: err.message})
    }
});


export default router;