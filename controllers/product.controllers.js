
const {getProductServices, createPorductService, updateProductService} = require('../services/product.services')

// get route 
exports.getProduct = async (req, res, next)=>{
    try {

        /*****Get all products***/

        // const products = await Product
        // .where("name").equals(/\M/)
        // .where("quantity").gt(100).lt(400)
        // .limit(2).sort({quantity: -1})

        // *****Get a product find by id ***//

        const products = await getProductServices();

        res.status(200).json({
            status: "Success",
            data: products
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail', 
            message: "Can't get any data",
            error: error.message
        })
    }
}


// Post route
exports.createProduct = async (req, res, next) => {
    try {
        const product = await createPorductService(req.body);
        // const product = new Product(req.body);
        // if(product.quantity === 0){
        //     product.status = "out-of-stock"
        // }

        product.logger();

        // const result = await product.save()

        res.status(200).json({
            status: "Success",
            message: "Data inserted successfully",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Data is not inserted",
            error: error.message
        })
    };

};


exports.updateProduct = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await updateProductService(id, req.body)

        res.status(200).json({
            status: "success",
            message: "Product updated successfully"
        })

    }catch(error) {
        res.status(400).json({
            status: "fail",
            message: "Could't update a product",
            error: error.message
        })
    }
}