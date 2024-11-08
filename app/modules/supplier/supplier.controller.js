const catchAsync = require("../../../shared/catchAsync");
const pick = require("../../../shared/pick");
const sendResponse = require("../../../shared/sendResponse");
const SupplierService = require("./supplier.service");




const insertIntoDB = catchAsync(async (req, res) => {

  const result = await SupplierService.insertIntoDB(req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Supplier data created!!",
      data: result
  })
})


const getAllFromDB = catchAsync(async (req, res) => {

  const filters = req.query;
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await SupplierService.getAllFromDB(filters, options);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Supplier data fetched!!",
      meta: result.meta,
      data: result.data
  })
})


const getDataById = catchAsync(async (req, res) => {

  const result = await SupplierService.getDataById(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Supplier data fetched!!",
      data: result
  })
})


const updateOneFromDB = catchAsync(async (req, res) => {
const {id} = req.params;

console.log(id);
  const result = await SupplierService.updateOneFromDB(id, req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Supplier update successfully!!",
      data: result
  })
})


const deleteIdFromDB = catchAsync(async (req, res) => {

  const result = await SupplierService.deleteIdFromDB(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Supplier delete successfully!!",
      data: result
  })
})

 const SupplierController = {
  getAllFromDB,
  insertIntoDB,
  getDataById,
  updateOneFromDB,
  deleteIdFromDB
}

module.exports = SupplierController;