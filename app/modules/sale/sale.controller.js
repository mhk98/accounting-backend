const catchAsync = require("../../../shared/catchAsync");
const pick = require("../../../shared/pick");
const sendResponse = require("../../../shared/sendResponse");
const SaleService = require("./sale.service");
// const { SaleService } = require("./sale.service");




const insertIntoDB = catchAsync(async (req, res) => {

  const result = await SaleService.insertIntoDB(req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sale data created!!",
      data: result
  })
})


const getAllFromDB = catchAsync(async (req, res) => {

  const filters = req.query;
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await SaleService.getAllFromDB(filters, options);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sale data fetched!!",
      meta: result.meta,
      data: result.data
  })
})


const getDataById = catchAsync(async (req, res) => {

  const result = await SaleService.getDataById(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sale data fetched!!",
      data: result
  })
})


const updateOneFromDB = catchAsync(async (req, res) => {
const {id} = req.params;
  const result = await SaleService.updateOneFromDB(id, req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sale update successfully!!",
      data: result
  })
})


const deleteIdFromDB = catchAsync(async (req, res) => {

  const result = await SaleService.deleteIdFromDB(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Sale delete successfully!!",
      data: result
  })
})

 const SaleController = {
  getAllFromDB,
  insertIntoDB,
  getDataById,
  updateOneFromDB,
  deleteIdFromDB
}

module.exports = SaleController;