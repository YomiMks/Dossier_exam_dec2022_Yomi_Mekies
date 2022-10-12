const Partners = require("../models/partnersModel");
const User = require('../models/userModel'),
    partnersHasPermission = require('../models/partnersHasPermission'),
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
        let newPartnersHasPermission;
        const newPartner = await Partners.create({
            city: req.body.city,
            enabled: true,
            name: req.body.name,
            userId: req.body.userId,
        })
        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        const newUser = await User.create({
            email: req.body.email,
            password: hash,
            role: 'PARTNERS',
            partnersId: newPartner.id
        })
        if(req.body?.permissions.length > 0){
            for ( const res of req.body.permissions){
                newPartnersHasPermission = await partnersHasPermission.create({
                    'fk_partner_id' : newPartner.id,
                    'fk_permission_id': res
                })
            }
        }
        return res.status(200).json({msg: 'OK', newUser, newPartner, newPartnersHasPermission })
    }catch (e){
        return res.status(400).json({msg: 'ERROR', message: e.message})
    }
}



exports.getPartner = async (req, res) => {
    return res.status(200).json(await Partners.findAll())
}
