const ProductsModel = require('../models/ProductsModel');

//Product List
exports.ProductList = async (req, res) => {
   try {
    const pageNo = Number(req.params.pageNo);
    const perPage = Number(req.params.perPage);
    const searchValue = req.params.searchKeyword;
    const skipRow = (pageNo - 1) * perPage;

    let data ;
    if(searchValue !== "0"){
        let SearchRgx = {"$regex": searchValue, "$options": "i"}
        let SearchQuery = {$or: [{title: SearchRgx}]}

        data = await ProductsModel.aggregate([{
            $facet:{
                Total:[{$match: SearchQuery},{$count: "count"}],
                Rows:[
                        {$match: SearchQuery},
                        {$skip: skipRow}, 
                        {$limit: perPage}
                    ]
            }
        }])
    }
    
    else{
        data = await ProductsModel.aggregate([{
            $facet:{
                Total:[{$count: "count"}],
                Rows:[
                        {$skip: skipRow}, 
                        {$limit: perPage}
                    ]
            }
        }]) 
    }
    res.status(200).json({status: "success",data})

   } catch (error) {
        res.status(200).json({status: "fail",error:error})
   }
}

//Delete Product
exports.deleteProduct = (req, res) => {
    let id = req.params.id;
    let Query = {_id:id};

    ProductsModel.remove(Query, (error, data) => {
        if(error){
            res.status(400).json( {status: 'Delete failed', data: error } )
        }
        else{
            res.status(200).json( {status: 'Delete Success', data: data } )
        }
    })
}