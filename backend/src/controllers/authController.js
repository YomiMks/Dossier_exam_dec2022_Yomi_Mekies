const User = require('../models/userModel'),
    bcrypt = require('bcrypt'),
    saltRounds = 10;

exports.login = async (req, res) => {
    const findUser = await User.findOne({
        where: {
            email: req.body.email,
        }
    })
    if (findUser && findUser.dataValues.id){
         bcrypt.compare(req.body.password, findUser.password, function(err, result) {
            if (result){
                return res.status(200).json({user: findUser});
            }else {
                return res.status(400).json({user: 'BAD REQUEST'});
            }
        });
    }else {
        return res.status(400).json({user: 'User not found'});
    }
}
