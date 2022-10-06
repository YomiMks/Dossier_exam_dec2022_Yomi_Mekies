const Permissions = require("../models/permissionsModel");

exports.newPermission = async (req, res) => {
    // verifier si luser exist deja
    const isExistPermission = await Permissions.findOne({
        where : {
            Permission: req.body.permission,
        }
    });
    if(isExistPermission) return res.status(400).json({msg: 'PERMISSION DEJA EXISTANTE'})
    try {
        const newPermission = await Permissions.create({
            Permission: req.body.permission,
        })
        return res.status(200).json({msg: 'OK', newPermission: newPermission})
    }catch (e){
        return res.status(400).json({msg: 'ERROR', message: e.message})
    }
}


exports.getPermission = async (req, res) => {
    return res.status(200).json(await Permissions.findAll())
}
