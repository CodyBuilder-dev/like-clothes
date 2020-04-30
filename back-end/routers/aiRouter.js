import express from "express"
import {
    select_data_minor,
    select_data_idpath,
    select_minor_from_mm,
    select_minor_id,
    select_minor_from_id,
    select_mmm_from_id,
    select_set_item} from "../sql"

const aiRouter = express.Router();


aiRouter.get("/select_data_minor" , (req, res)=> {
    select_data_minor()
    .then((result)=>{
        res.send(result)
    })
});

aiRouter.get("/select_data_idpath" , (req, res)=> {
    select_data_idpath()
    .then((result)=>{
        res.send(result)
    })
});

aiRouter.get("/select_minor_from_mm" , (req, res)=> {
    const major = req.query.major;
    const middle = req.query.middle;
    // const {major, middle} = req.query;
    // console.log("A", major, middle)
    select_minor_from_mm(major, middle)
    .then((result)=>{
        res.send(result)
    })
});

aiRouter.get("/select_minor_id" , (req, res)=> {
    select_minor_id()
    .then((result)=>{
        res.send(result)
    })
});

aiRouter.get("/select_minor_from_id" , (req, res)=> {
    const {id} = req.query;
    select_minor_from_id(id)
    .then((result)=>{
        res.send(result)
    })
});

aiRouter.get("/select_mmm_from_id" , (req, res)=> {
    const {id} = req.query;
    select_mmm_from_id(id)
    .then((result)=>{
        res.send(result)
    })
});

aiRouter.get("/select_set_item" , (req, res)=> {
    const {major, minor} = req.query;
    select_set_item(major, minor)
    .then((result)=>{
        res.send(result)
    })
});


export default aiRouter;