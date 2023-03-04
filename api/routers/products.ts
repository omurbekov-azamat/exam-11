import express from "express";
import {Error} from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import Product from "../modules/Product";

const productsRouter = express.Router();

productsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    const user = (req as RequestWithUser).user;

    try {
        const product = new Product({
            user: user._id,
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            price: Number(req.body.price),
            image: req.file ? req.file.filename : null,
        });

        await product.save();
        return res.send({message: 'New product added successfully!', product});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

productsRouter.get('/', async (req, res, next) => {
    try {
        const result = await Product.find();
        return res.send(result);
    } catch (e) {
        return next(e);
    }
});

productsRouter.get('/:category', async (req, res, next) => {
    try {
        const result = await Product.find({category: req.params.category}).populate({path: 'user', select: 'displayName'});
        if (!result) {
            return res.status(404).send({error: 'Not found'});
        }

        return res.send(result);
    } catch (e) {
        return next(e);
    }
});

export default productsRouter;