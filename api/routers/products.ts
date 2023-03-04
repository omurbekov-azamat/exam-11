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
        if (req.query.category_name) {

            const categoryName = req.query.category_name as string;
            const result = await Product.find({category: categoryName});
            return res.send(result);

        } else if (req.query.item_id) {

            const item_id = req.query.item_id as string;
            const result = await Product.findById(item_id).populate({path: 'user', select: ['username', 'displayName', 'phoneNumber']});

            if (!result) {
                return res.status(404).send({error: 'Not found'});
            }

            return res.send(result);

        }

        const result = await Product.find();
        return res.send(result);
    } catch (e) {
        return next(e);
    }
});

productsRouter.delete('/:id' , async (req, res, next) => {
    try {
        const result = await Product.deleteOne({_id: req.params.id});

        if (!result) {
            return res.status(404).send({error: 'Not found'});
        }

        return  res.send(result);
    } catch (e) {
        return next(e);
    }
});

export default productsRouter;