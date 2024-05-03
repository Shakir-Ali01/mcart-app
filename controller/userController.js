const UserModel = require('../model/user');
const { addMonth } = require('../utilities/helper');
// const { validator } = require('../utilities/helper');
const validators = require('../utilities/validator');
// seeding initial data

const createUser = async (req, res, next) => {
	try {
        
		console.log(req.body);
	} catch (err) {
		next(err);
	}
};



module.exports = { createUser};
