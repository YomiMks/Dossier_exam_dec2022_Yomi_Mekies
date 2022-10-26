const Partners = require("../models/partnersModel");
     User = require('../models/userModel'),
         PartnersHasPermission = require('../models/partnersHasPermission'),
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
        if(req.body?.permissions?.length > 0){
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
exports.deletePartner = async (req, res) => {
    // verifier si luser exist deja
    const isExistPartner = await Partners.findOne({
        where : {
            id: req.params.id,
        }
    });
    if (!isExistPartner) return res.status(400).json({msg: 'BAD REQUEST'})
    const deleteP = await Partners.destroy({
        where:
            { id: req.params.id}
    })
    if(deleteP){
        return res.status(200).json({msg: 'OK'})
    }
    return res.status(400).json({msg: 'BAD REQUEST'})
}
exports.updatePartner = async (req, res) => {
    console.log('je rentre ----------')
    console.log('je rentre ----------', req.body)
    console.log('je rentre ----------', req.params)
    const isExistPartner = await Partners.findOne({
        where : {
            id: req.params.id,
        }
    });
    if (!isExistPartner) return res.status(400).json({msg: 'BAD REQUEST'})
    try {
        const uPartner = await Partners.update(
            req.body, { where: { id: isExistPartner.id}}
        )
        return res.status(200).json(uPartner)
    } catch (e) {
        return res.status(400).json({msg: e.message})
    }
}
exports.getPartner = async (req, res) => {
    return res.status(200).json(await Partners.findAll())
}
exports.getPartnerPermission = async (req, res) => {
    return res.status(200).json(await PartnersHasPermission.findAll())
}
