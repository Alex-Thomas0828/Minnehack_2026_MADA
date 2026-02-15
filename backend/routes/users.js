import express from "express";
import supabase from "../supabaseClient.js";

const router = express.Router();

// get all users
router.get("/", async(req, res) => {
    try{
        const { data, error } = await supabase
        .from("Users")
        .select("*")
        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error("Error fetching users: ", err);
        res.status(500).json({error: "Failed to fetch users"});
    }
});

export default router;