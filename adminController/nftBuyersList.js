const NftBuyers = require("../../models/userModels/buyNftModel")

const getNftBuyersList = async (req, res) => {
try {
    const getNftBuyersList = await NftBuyers.find({});
    res.status(200).json({message:"Success",getNftBuyersList})
} catch (error) {
    res.status(404).json({message:error.message})
}    
}
module.exports={getNftBuyersList}