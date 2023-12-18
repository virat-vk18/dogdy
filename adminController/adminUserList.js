const StoreAddress = require("../../models/userModels/storeAddrress");

const userList = async (req, res) => {
    try {
        const getUser = await StoreAddress.find({})
        res.status(200).json({message:"Success",getUser})
    } catch (err) {
        res.status(404).json({message:err.message})
    }
}

module.exports={userList}