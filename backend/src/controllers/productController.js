const { Product } = require("../models/products");


module.exports = {
    // list all product
    async listAllProductsAsync(req, res) {
        const pageSize = 8;
        const page = Number(req.query.pageNumber) || 1;

        console.log(req.query);

        const keyword = req.query.keyword
        ? {
            //   "productName.en": {
            //       $regex: req.query.keyword,
            //       $options: "i",
            //   },

            //   "style.en": { $regex: req.query.keyword, $options: "i" },
            //   "category.en": { $regex: req.query.keyword, $options: "i" },
            //   gender: { $regex: req.query.keyword, $options: "i" },
            "productName.en": new RegExp(req.query.keyword, 'i'),
            "style.en" : new RegExp(req.query.keyword, 'i'),
            "category.en":  new RegExp(req.query.keyword, 'i'),
            "gender":  new RegExp(req.query.keyword, 'i'),
            // "gender":  new RegExp(req.query.keyword, 'i')
          }
        : {};

        const searchArray = [{ ...keyword }];

        try {
            const count = await Product.countDocuments({ $or: searchArray });
            const products = await Product.find({ $or: searchArray })
                .limit(pageSize)
                .skip(pageSize * (page - 1))
                .sort({
                    createdAt: -1,
                })
                .select("-size -description -feature");

            res.status(200).send({
                products,
                page,
                pages: Math.ceil(count / pageSize),
            });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },
    // get product by Id
    async getProductAsync(req, res) {
        const productId = req.params.id;

        try {
            const foundProduct = await Product.findById(productId);

            res.status(200).send(foundProduct);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },
    // create a new product
    async createProductAsync(req, res) {
        const productObject = req.body;

        try {
            await Product.create(productObject);
            res.status(201).send("Successfully created a new product");
        } catch (error) {
            console.log(error.message);
            res.status(400).send({ message: error.message });
        }
    },
    // update product
    async updateProductAsync(req, res, next) {
        const productId = req.params.id;
        const propsToUpdate = Object.keys(req.body);

        try {
            const product = await Product.findById(productId);
            propsToUpdate.forEach((prop) => {
                product[prop] = req.body[prop];
            });
            await product.save();

            res.status(200).send("successfully updated product");
        } catch (error) {
            res.send({
                message: error.message,
            });
        }
    },
    async deleteProductAsync(req, res) {
        const productId = req.params.id;
        try {
            const product = await Product.findById(productId);
            await product.remove();

            res.status(200).send({ message: "Product removed" });
        } catch (err) {
            res.send({ message: err.message });
        }
    },

    async getMenProduct(req, res) {
        const searchArr = req.query.searchArr;
        const sortArr = req.query.sortArr;
        const pageSize = 4;
        const page = Number(req.query.pageNumber) || 1;

        try {
            const count = await Product.countDocuments({ $and: searchArr });
            const menProduct = await Product.find({
                $and: searchArr,
            })
                .sort(sortArr)
                .limit(pageSize)
                .skip(pageSize * (page - 1));

            res.status(200).send({
                menProduct,
                page,
                pages: Math.ceil(count / pageSize),
            });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },
    async getWomenProduct(req, res) {
        const searchArr = req.query.searchArr;
        const sortArr = req.query.sortArr;
        const pageSize = 4;
        const page = Number(req.query.pageNumber) || 1;

        try {
            const count = await Product.countDocuments({ $and: searchArr });

            const womenProducts = await Product.find({
                $and: searchArr,
            })
                .sort(sortArr)
                .limit(pageSize)
                .skip(pageSize * (page - 1));

            res.status(200).send({
                womenProducts,
                page,
                pages: Math.ceil(count / pageSize),
            });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },

    async getKidsProduct(req, res) {
        const searchArr = req.query.searchArr;
        const sortArr = req.query.sortArr;
        const pageSize = 4;
        const page = Number(req.query.pageNumber) || 1;
        try {
            const count = await Product.countDocuments({ $and: searchArr });
            const kidsProducts = await Product.find({
                $and: searchArr,
            })
                .sort(sortArr)
                .limit(pageSize)
                .skip(pageSize * (page - 1));

            res.status(200).send({
                kidsProducts,
                page,
                pages: Math.ceil(count / pageSize),
            });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },
    async getNewArrivalsProduct(req, res) {
        try {
            const newArrivals = await Product.find({})
                .sort({ createdAt: -1 })
                .limit(3);
            res.status(200).send(newArrivals);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },

    async getDiscountedProduct(req, res) {
        const searchArr = req.query.searchArr;
        const sortArr = req.query.sortArr;
        const pageSize = 4;
        const page = Number(req.query.pageNumber) || 1;
        try {
            const count = await Product.countDocuments({ $and: searchArr });
            const discountedProduct = await Product.find({ $and: searchArr })
                .sort(sortArr)
                .limit(pageSize)
                .skip(pageSize * (page - 1));
            res.status(200).send({
                discountedProduct,
                page,
                pages: Math.ceil(count / pageSize),
            });
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },
    async getProductsYouMayLike(req, res) {
        const searchArr = req.query.searchArr;
        try {
            const products = await Product.find({ $and: searchArr })
                .sort({ createdAt: -1 })
                .limit(8);

            res.status(200).send(products);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },
    async createProductReview(req, res) {
        const { rating, review } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            // If the user has already reviewed this product, throw an error
            const reviewedAlready = product.reviews.find(
                (rev) => rev.user.toString() === req.user._id.toString()
            );
            if (reviewedAlready) {
                res.status(400);
                throw new Error('Product Already Reviewed');
            }
    
            const newReview = {
                name: req.user.name,
                user: req.user._id,
                avatar: req.user.avatar,
                rating: Number(rating),
                review,
            };
    
            // store the new review and update the rating of this product
            product.reviews.push(newReview);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, ele) => acc + ele.rating, 0) /
                product.numReviews;
            const updatedProduct = await product.save();
            if (updatedProduct) res.status(201).json({ message: 'Review Added' });
        } else {
            res.status(404);
            throw new Error('Product not available');
        }
    },
        // @desc fetch top rated products
        // @route GET /api/products/top
        // @access PUBLIC
     async getTopProducts(req, res) {
	// get top 4 rated products
	const topProducts = await Product.find({}).sort({ rating: -1 }).limit(4);
	res.json(topProducts);
}

    
};

