import express from "express";
const router = express.Router();
import {
    getDept,
    getCityOfDept,
    getDistrictOfCity,
    getAreaOfDistrict,
    getCities,
    getDistricts,
    getAreas,
    getZones,
} from "../controllers/territoire.controller.js";
  
router.get("/departements", getDept);
router.get("/communes", getCities);
router.get("/arrondissements", getDistricts);
router.get("/quartiers", getAreas);
router.get("/zones", getZones);

router.get("/departements/:dept/communes", getCityOfDept);
router.get("/communes/:city/arrondissements", getDistrictOfCity);
router.get("/arrondissements/:district/quartiers", getAreaOfDistrict);

export default router;
