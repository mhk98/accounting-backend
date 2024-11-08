
const catchAsync = require("../../../shared/catchAsync");
const pick = require("../../../shared/pick");
const sendResponse = require("../../../shared/sendResponse");
const AccountingService = require("./accounting.service");


const getAllFromDB = catchAsync(async (req, res) => {

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await AccountingService.getAllFromDB( options);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic Semster data fetched!!",
      meta: result.meta,
      data: result.data
  })
})


const getDataById = catchAsync(async (req, res) => {

  const result = await AccountingService.getDataById(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product data fetched!!",
      data: result
  })
})


const updateOneFromDB = catchAsync(async (req, res) => {
const {id} = req.params;
  const result = await AccountingService.deleteIdFromDB(id, req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product update successfully!!",
      data: result
  })
})


const deleteIdFromDB = catchAsync(async (req, res) => {

  const result = await AccountingService.deleteIdFromDB(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product delete successfully!!",
      data: result
  })
})

 const AccountingController = {
  getAllFromDB,
  getDataById,
  updateOneFromDB,
  deleteIdFromDB
}

module.exports = AccountingController;