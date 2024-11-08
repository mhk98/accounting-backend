
const { where, Op } = require("sequelize");
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const Purchase = db.purchase;
const Accounting = db.accounting;
const Supplier = db.supplier;
const Product = db.product;
const Sale = db.sale;

const insertIntoDB = async (data) => {
  const {supplier_name, quantity, rate, paid_amount, remarks, supplierId, productId, created_date} = data;

  const productName = await Product.findOne({
    where:{
      Id: productId
    }
  })

  const price = parseInt(rate*quantity)
  const due_amount = parseInt(price-paid_amount)

  const purchaseData = {
    product_name:productName.name,
    supplier_name,
    transaction_date:new Date(created_date),
    quantity,
    rate,
    price,
    paid_amount,
    due_amount,
    remarks,
    supplierId,
    productId,   
  }

  console.log("purchaseData", purchaseData)
  // Insert the purchase record into the database
  const result = await Purchase.create(purchaseData);

  // Calculate the total transaction amount for accounting table
  const totalTransactionAmount = Number(result.paid_amount) + Number(result.due_amount);

  // Prepare accounting data
  const accountingData = {
    transaction_date: result.transaction_date,
    transaction_type: 'Purchase',
    transaction_amount: totalTransactionAmount,
    remarks: result.remarks,
    purchaseId: result.Id,
  };

  // Insert the accounting data
  await Accounting.create(accountingData);


    // Retrieve all purchase for the supplier to calculate total due amount
    const purchaseDueAmount = await Purchase.findAll({
      where: { supplierId: result.supplierId }
    });
  
    let totalSupplierDueAmount = 0;
    purchaseDueAmount.forEach((purchase) => {
      totalSupplierDueAmount += parseFloat(purchase.due_amount);
    });
  
    // Update the Buyer's total due amount
    await Supplier.update(
      { due_amount: totalSupplierDueAmount },  // Corrected update object
      { where: { Id: supplierId } }            // Added `where` clause to specify which buyer
    );


  const totalQuantityOfPurchase = await Purchase.findAll({
    where: { productId: productId }
  });
  
  // আগের total quantity হিসাব করা
const totalPurchaseQuantity = totalQuantityOfPurchase.reduce((total, purchase) => {
  return total + parseInt(purchase.quantity); // আগের quantity গুলো যোগ করা
}, 0);

// নতুন quantity সরাসরি যোগ না করে, শুধু totalQuantity দিয়েই কাজ করুন
const updatedPurchaseQuantity = totalPurchaseQuantity; // এখানে নতুন quantity পুনরায় যোগ করার দরকার নেই

const totalQuantityOfSale = await Sale.findAll({
  where:{
    productId:productId
  }
})


let totalSaleQuantity = 0

totalQuantityOfSale.forEach((sale)=>{
  totalSaleQuantity += sale.quantity;
})


const totalStock = parseInt (updatedPurchaseQuantity-totalSaleQuantity)

// Product এর stock আপডেট করা
const Productdata = {
  stock: totalStock
};

await Product.update(Productdata, {
  where: {
    id: result.productId, // Ensure you're using the correct identifier ('id' or 'Id' depending on your model)
  },
});

console.log(`Product stock updated to: ${updatedPurchaseQuantity}`);
    

  return result; // Return the newly created purchase
};



const getAllFromDB = async (filters, options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { startDate, endDate, supplierId } = filters;
  console.log(filters);

  const whereConditions = {};

  if (startDate && endDate) {
    whereConditions.transaction_date = {
      [Op.between]: [new Date(startDate), new Date(endDate)]
    };
  }

  if (supplierId) {
    whereConditions.supplierId = supplierId; // Use Id instead of id
  }

  

  const result = await Purchase.findAll({
    where: whereConditions,
    offset: skip,
    limit,
    order: options.sortBy && options.sortOrder
      ? [[options.sortBy, options.sortOrder]]
      : [['createdAt', 'DESC']],
  });

  const total = await Purchase.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};


const getDataById = async (id) => {
  
  const result = await Purchase.findOne({
    where:{
      Id:id
    }
  })

  return result
};


const deleteIdFromDB = async (id) => {
  // Find the purchase record to get the quantity before deletion
  const existingPurchase = await Purchase.findOne({
    where: {
      Id: id, // Ensure the column name matches the model definition
    },
  });

  if (!existingPurchase) {
    throw new Error('Purchase record not found');
  }

  const productId = existingPurchase.productId;
  const quantityToDelete = parseInt(existingPurchase.quantity);

  // Proceed to delete the related accounting record
  const accountingResult = await Accounting.destroy({
    where: {
      purchaseId: id,
    },
  });

  // Delete the purchase record
  const purchaseResult = await Purchase.destroy({
    where: {
      Id: id, // Ensure the column name matches the model definition
    },
  });

  // Update the product stock if the purchase was successfully deleted
  if (purchaseResult) {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      throw new Error('Product not found');
    }

    // Subtract the deleted quantity from the current stock
    const updatedStock = product.stock - quantityToDelete;
    await Product.update({ stock: updatedStock }, { where: { id: productId } });

    console.log(`Product stock updated to: ${updatedStock}`);
  }

  console.log('purchaseResult', purchaseResult);
  console.log('accountingResult', accountingResult);

  return { accountingResult, purchaseResult };
};




const updateOneFromDB = async (id, payload) => {
  const { supplier_name, created_date, quantity, rate, paid_amount, remarks, productId } = payload;

  // Fetch the existing purchase record to get the current quantity before updating
  const existingPurchase = await Purchase.findOne({ where: { Id: id } });
  if (!existingPurchase) {
    throw new Error('Purchase record not found');
  }

  // Calculate the change in quantity (difference)
  const quantityDifference = parseInt(quantity) - parseInt(existingPurchase.quantity);

  const price = parseInt(rate*quantity)
  const due_amount = parseInt(price-paid_amount)
  // Update the purchase record with the new data
  const purchaseData = {
    supplier_name,
    transaction_date:new Date(created_date),
    quantity,
    rate,
    price,
    paid_amount,
    due_amount,
    remarks,
    productId,
    product_name: existingPurchase.product_name // Keeping the same product name
  };

  const result = await Purchase.update(purchaseData, {
    where: { Id: id }
  });

  // Update the accounting table if needed (skipping here as logic remains the same)
  const totalTransactionAmount = Number(paid_amount) + Number(due_amount);
  const accountingData = {
    transaction_amount: totalTransactionAmount,
    remarks: remarks,
    purchaseId: id,
  };
  await Accounting.update(accountingData, {
    where: { purchaseId: id }
  });

  // Adjust the stock in the Product table
  const product = await Product.findOne({ where: { id: productId } });
  if (!product) {
    throw new Error('Product not found');
  }

  const updatedStock = product.stock + quantityDifference;
  await Product.update({ stock: updatedStock }, { where: { id: productId } });

  
  const supplierDueAmount =  await Purchase.findAll({
    where:{
      supplierId: existingPurchase.supplierId
    }
  })
  
  
  let totalSupplierDueAmount = 0
  
  supplierDueAmount.forEach(purchase => {
    totalSupplierDueAmount += purchase.due_amount
  });
  
  
  await Supplier.update({due_amount:totalSupplierDueAmount},{
    Id: existingSale.supplierId
  })

  return result;
};


 const PurchaseService = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getDataById
}

module.exports = PurchaseService;