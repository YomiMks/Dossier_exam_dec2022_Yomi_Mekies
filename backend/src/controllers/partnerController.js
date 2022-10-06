const Partners = require("../models/partnersModel");
const User = require('../models/userModel'),
    bcrypt = require('bcrypt'),
    saltRounds = 10;
exports.newPartner = async (req, res) => {
    // verifier si luser exist deja
    const isExistPartner = await Partners.findOne({
        where : {
            city: req.body.city,
        }
    });
    if(isExistPartner) return res.status(400).json({msg: 'PARTENAIRE DEJA EXISTANT'})
    try {
        const newPartner = await Partners.create({
            city: req.body.city,
            enabled: true,
            name: req.body.name,
        })
        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        const newUSer = await User.create({
            email: req.body.email,
            password: hash,
            role: 'PARTNERS',
            partnersId: newPartner.id
        })
        return res.status(200).json({msg: 'OK', newUSer, newPartner })
    }catch (e){
        return res.status(400).json({msg: 'ERROR', message: e.message})
    }
}



exports.getPartner = async (req, res) => {
    return res.status(200).json(Partners.findAll())
}
