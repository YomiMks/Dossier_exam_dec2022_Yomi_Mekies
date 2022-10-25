const User = require('../models/userModel'),
    Partners = require('../models/partnersModel'),
    bcrypt = require('bcrypt'),
    saltRounds = 10;

exports.newUser = async (req, res) => {
    // verifier si luser exist deja
    const user = await User.findOne({
        where : {
            email: req.body.email,
        }
    });
    if(user) return res.status(400).json({msg: 'USER DEJA EXISTANT'})
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    try {
        const user = await User.create({
            email: req.body.email,
            password: hash,
            role: req.body.role,
            brand: req.body.brand,
            structureId: req.body.structureId ??= null,
            partnersId: req.body.partnersId ??= null
        })
        return res.status(200).json({msg: 'OK', user: user})
    }catch (e){
        return res.status(400).json({msg: 'ERROR', message: e.message})
    }
}


/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getUsers = async (req, res) => {
    return res.status(200).json(await User.findAll(
        {
            include: [
                {model: Partners, as: 'user_partners'}
            ]
        }
    ))
}
