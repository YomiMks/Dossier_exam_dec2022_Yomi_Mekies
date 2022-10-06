const Structures = require("../models/structuresModel");
const User = require('../models/userModel'),
    bcrypt = require('bcrypt'),
    saltRounds = 10;

exports.newStructure = async (req, res) => {
    // verifier si luser exist deja
    const isExistStructure = await Structures.findOne({
        where : {
            address: req.body.address,
        }
    });
    if(isExistStructure) return res.status(400).json({msg: 'STRUCTURE DEJA EXISTANTe'})
    try {
        const newStructure = await Structures.create({
            address: req.body.address,
            description: req.body.description,
            name: req.body.name,
            enabled: true,
            partnersId: req.body.partnersId,
        })
        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        const newUSer = await User.create({
            email: req.body.email,
            password: hash,
            role: 'STRUCTURE',
            structureId: newStructure.id
        })
        return res.status(200).json({msg: 'OK', newUSer, newStructure })
    }catch (e){
        return res.status(400).json({msg: 'ERROR', message: e.message})
    }
}

exports.getStructure = async (req, res) => {
    return res.status(200).json(await Structures.findAll())
}
