const {DataTypes} = require('sequelize');
const sequelize = require('./config/databaseConfig');
const UserModel = require('./models/user');

const User =UserModel(sequelize, DataTypes);

// Repository
class UserRepository{
    async save(payload){
        const user = await User.create({...payload});
        return user
    };

    async find(email){
        const user = await User.findOne({ where: { email} });
            if (user === null) {
                return user;
            } else {
                throw new Error("User already exist")
            }
    }

}

//Service
class UserService{
    constructor(UserRepository){
        this.UserRepo = UserRepository
    }
    async createUser(payload){
        //some validations can be done here
        this.UserRepo.find(payload.email)
        return this.UserRepo.save(payload)
    }
}


// Controller
class UserController{
    constructor(userService){
        this.service = userService;
    }
    
    async create (payload){
        return this.service.createUser(payload)
    }
}

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);


controller.create({
    first_name : "Olamide",
    last_name: "Johnson",
    email: "olajohn@gmail.com"
})
.then(user => console.log(user))
.catch(err => console.log(err))
