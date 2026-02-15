import express from "express";
import supabase from "../supabaseClient.js";

const router = express.Router();

// get all services
router.get("/", async(req, res) => {
    try{
        const {data,error} = await supabase
        .from("Service")
        .select("*")
        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error("Failed to fetch services: ", err);
        res.status(500).json({error: "Failed to fetch services"});
    }
});




////-------------

// get a specific service task
router.get("/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const {data, error}  = await supabase
        .from("Service")
        .select("*")
        .eq("service_id", id)
        .single()

        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error("Failed to fetch service task: ", err);
        res.status(500).json({error: err.message});
    }
});

// create a new service task
router.post("/", async(req,res) => {
    try{
        const {
            supplier_id,
            name,
            description, 
            location, 
            auth_id
        } = req.body;

        const {data,error} = await supabase
        .from("Service")
        .insert([
            {
                supplier_id,
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
        console.error("Failed to add service task: ", err);
        res.status(500).json({error: err.message})
    }
});


// update service task
router.patch("/:id", async(req,res) => {
    try{

        const { id } = req.params;
        const {
            name,
            description, 
            location, 
        } = req.body;

        const {data,error} = await supabase
        .from("Service")
        .update(
            {
                name,
                description, 
                location, 
            }
        )
        .eq("service_id", id)
        .select()
        .single()

        if (error) throw error;
        res.json(data);

    } catch (err){
        console.error("Failed to udpate service task: ", err);
        res.status(500).json({error: err.message})
    }
});


// deletes a new help task
router.delete("/:id", async(req,res) => {
    try{
        const { id } = req.params;
        const { error } = await supabase
        .from("Service")
        .delete()
        .eq("service_id", id)

        if (error) throw error;
        res.status(200).json({message: "service deleted successfully"})

    } catch (err){
        console.error("Failed to delete service task: ", err);
        res.status(500).json({error: err.message})
    }
});

export default router;