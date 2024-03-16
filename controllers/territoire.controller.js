import asyncHandler from "express-async-handler";
import { bdd } from '../constants/bdd.js'
import { removeSpecialChars } from '../utils/tools.js'


function findCity(lib_com) {
    for (let i = 0; i < bdd.length; i++) {
        const departement = bdd[i];
        for (let j = 0; j < departement.communes.length; j++) {
            const commune = departement.communes[j];
            if (commune.lib_com === formatName(lib_com)) {
                return {
                    departement: departement.lib_dep,
                    commune: commune
                };
            }
        }
    }
    return null;
}

function findDistrict(lib_arrond) {
    for (let i = 0; i < bdd.length; i++) {
        const departement = bdd[i];
        for (let j = 0; j < departement.communes.length; j++) {
            const commune = departement.communes[j];
            for (let k = 0; k < commune.arrondissements.length; k++) {
                const arrond = commune.arrondissements[k];
                if (arrond.lib_arrond === formatName(lib_arrond)) {
                    return {
                        departement: departement.lib_dep,
                        commune: commune.lib_com,
                        arrondissement: arrond
                    };
                }
            }
        }
    }
    return null;
}

function formatName(name) {
    return removeSpecialChars(name).trim().toUpperCase();
}

// function sort

const getDept = asyncHandler(async (req, res) => {
    let departements = bdd.map((dept) => dept.lib_dep)
    res.status(200).json(departements)
});

const getCityOfDept = asyncHandler(async (req, res) => {
    if(!req.params.dept) {
        res.status(404)
        throw new Error("Vous n'avez pas fourni de département !")
    }
    let dept = bdd.filter(dept => dept.lib_dep == formatName(req.params.dept))
 
    if(dept.length != 1) {
        res.status(404)
        throw new Error(`Le département "${req.params.dept}" n'a pas été trouvé.`);
    }

    res.status(200).json(dept[0])
});

const getDistrictOfCity = asyncHandler(async (req, res) => {
    if (!req.params.city) {
        res.status(404);
        throw new Error("Vous n'avez pas fourni la ville !");
    }

    const lib_com = req.params.city;
    const commune = findCity(lib_com);

    if (commune) {
        res.status(200).json(commune);
    } else {
        res.status(404);
        throw new Error(`La commune "${lib_com}" n'a pas été trouvée.`);
    }
});

const getAreaOfDistrict = asyncHandler(async (req, res) => {
    if (!req.params.district) {
        res.status(404);
        throw new Error("Vous n'avez pas fourni l'arrondissement !");
    }

    const lib_arrond = req.params.district;
    const arrond = findDistrict(lib_arrond);

    if (arrond) {
        res.status(200).json(arrond);
    } else {
        res.status(404);
        throw new Error(`L'arrondissement "${lib_arrond}" n'a pas été trouvé.`);
    }

});

const getCities = asyncHandler(async (req, res) => {
    let citiesGroup = bdd.map(dept => dept.communes.map(com => com.lib_com))
    let villes = [];

    citiesGroup.forEach(cities => {
        cities.forEach(city => {
            villes.push(city);
        });
    });

    res.status(200).json(villes.sort());
});

const getDistricts = asyncHandler(async (req, res) => {
    let depts = bdd.map(dept => dept.communes.map(com => com.arrondissements.map(arrond => arrond.lib_arrond)))
    let arronds = [];

    depts.forEach(dept => {
        dept.forEach(cities => {
            cities.forEach(city => {
                arronds.push(city);
            });
        });
    });
    
    res.status(200).json(arronds.sort());
});

const getAreas = asyncHandler(async (req, res) => {
    let depts = bdd.map(dept => dept.communes.map(com => com.arrondissements.map(arrond => arrond.quartiers.map(quartier => quartier.lib_quart))))
    let arronds = [];

    depts.forEach(dept => {
        dept.forEach(cities => {
            cities.forEach(city => {
                city.forEach(arrond => {
                    arronds.push(arrond);
                });
            });
        });
    });
    
    res.status(200).json(arronds.sort());
});

const getZones = asyncHandler(async (req, res) => {
});


export  {
    getDept,
    getCityOfDept,
    getDistrictOfCity,
    getAreaOfDistrict,
    getCities,
    getDistricts,
    getAreas,
    getZones,
}