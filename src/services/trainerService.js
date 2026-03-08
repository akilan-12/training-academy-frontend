import axios from "axios";

export const getAllTrainers=()=>axios.get("trainers/map");

export const addTrainer=(trainer)=>axios.post("trainers",trainer);

export const updateTrainer=(id,trainer)=>axios.put(`trainers/${id}`,trainer);

export const deleteTrainer=(id)=>axios.delete(`/trainers/delete/${id}`);

