const catchAsync = require("../../../shared/catchAsync");
const pick = require("../../../shared/pick");
const sendResponse = require("../../../shared/sendResponse");
const PurchaseService = require("./purchase.service");




const insertIntoDB = catchAsync(async (req, res) => {

  const result = await PurchaseService.insertIntoDB(req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Purchase data created!!",
      data: result
  })
})


const getAllFromDB = catchAsync(async (req, res) => {

  const filters = req.query;
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await PurchaseService.getAllFromDB(filters, options);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Purchase Semster data fetched!!",
      meta: result.meta,
      data: result.data
  })
})


const getDataById = catchAsync(async (req, res) => {

  const result = await PurchaseService.getDataById(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Purchase data fetched!!",
      data: result
  })
})


const updateOneFromDB = catchAsync(async (req, res) => {
const {id} = req.params;
  const result = await PurchaseService.updateOneFromDB(id, req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Purchase update successfully!!",
      data: result
  })
})


const deleteIdFromDB = catchAsync(async (req, res) => {

  const result = await PurchaseService.deleteIdFromDB(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Purchase delete successfully!!",
      data: result
  })
})

 const PurchaseController = {
  getAllFromDB,
  insertIntoDB,
  getDataById,
  updateOneFromDB,
  deleteIdFromDB
}

module.exports = PurchaseController;