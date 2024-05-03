const UserModel = require('../model/user');
const { addMonth } = require('../utilities/helper');

// seeding initial data

const createData = async (req, res, next) => {
	try {
		let delUser = await UserModel.deleteMany();
		if (delUser.deletedCount > 0) {
			console.log('Deleted all users');
		}
		let newUsers = await UserModel.create([
			{
				_id: '2',
				username: 'yushi',
				emailId: 'yushi@test.com',
				mobileNo: 1234567891,
				role: 'Admin',
				password: '123',
				createdAt: new Date(),
			},
		]);
		console.log('users added');
		res.json({
			users: newUsers
		});
	} catch (err) {
		next(err);
	}
};

const getData = async (req, res, next) => {
	try {
		// let users = await UserModel.find({}).populate("propertiesOwned");
		let users = await UserModel.find({});
		// let properties = await PropModel.find({}).populate("owner");
		res.status(200).json({
			users: users
		});
	} catch (err) {
		next(err);
	}
};

module.exports = { createData, getData };
