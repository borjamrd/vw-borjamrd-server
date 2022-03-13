const getCarDataJson = require('../data.json');

async function getCarData(req, res){
    const result = getCarDataJson
    console.log(result, "test car data")
    await res.status(200).json(result);
    
}

module.exports = getCarData;
