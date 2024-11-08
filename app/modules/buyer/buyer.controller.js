const catchAsync = require("../../../shared/catchAsync");
const pick = require("../../../shared/pick");
const sendResponse = require("../../../shared/sendResponse");
const { BuyerFilterAbleFileds } = require("./buyer.constants");
const BuyerService = require("./buyer.service");



const insertIntoDB = catchAsync(async (req, res) => {

  const result = await BuyerService.insertIntoDB(req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Buyer data created!!",
      data: result
  })
})


const getAllFromDB = catchAsync(async (req, res) => {

  const filters = req.query;
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BuyerService.getAllFromDB(filters, options);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic Semster data fetched!!",
      meta: result.meta,
      data: result.data
  })
})


const getDataById = catchAsync(async (req, res) => {

  const result = await BuyerService.getDataById(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Buyer data fetched!!",
      data: result
  })
})


const updateOneFromDB = catchAsync(async (req, res) => {
const {id} = req.params;
  const result = await BuyerService.updateOneFromDB(id, req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Buyer update successfully!!",
      data: result
  })
})


const deleteIdFromDB = catchAsync(async (req, res) => {

  const result = await BuyerService.deleteIdFromDB(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Buyer delete successfully!!",
      data: result
  })
})

 const BuyerController = {
  getAllFromDB,
  insertIntoDB,
  getDataById,
  updateOneFromDB,
  deleteIdFromDB
}

module.exports = BuyerController;