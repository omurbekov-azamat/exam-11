import mongoose from "mongoose";
import config from "./config";
import User from "./modules/User";
import {randomUUID} from "crypto";
import product from "./modules/Product";

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('products');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [userOne, userTwo] = await User.create({
        username: 'gfx312',
        password: '123',
        displayName: 'Вася Пупкин',
        phoneNumber: '+996123456',
        token: randomUUID(),
    }, {
        username: 'v-ray',
        password: '123',
        displayName: 'Сергей Зебров',
        phoneNumber: '+996963258',
        token: randomUUID(),
    });

    await product.create({
        user: userOne._id,
        title: 'I am selling new iphone 25',
        category: 'phones',
        description: 'Almost new',
        price: 176000,
        image: 'fixtures/iphone.jpg',
    }, {
        user: userOne._id,
        title: 'Toyota Camry 55',
        category: 'cars',
        description: 'The condition is best, you will not find better!',
        price: 1584000,
        image: 'fixtures/car.jpg',
    }, {
        user: userTwo._id,
        title: 'french bulldog',
        category: 'dogs',
        description: 'I wanna bye dog',
        price: 5000,
        image: 'fixtures/dog.jpg',
    });
    await db.close();
};

void run();