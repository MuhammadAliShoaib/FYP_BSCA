export type User = {
  name: string;
  address: string;
  role: string;
}

export type Medicine = {
  name: string,
  symbol: string,
  formula: string,
  manufacturer: string,
}

export type Batch = {
  batchId: string,
  medicine: string,
  totalSupply: number,
  quantity: number,
  mfg: Date,
  exp: Date,
  manufacturer: string,
}

export type Dispatch = {
  batchId: string,
  distributor: {
    distributorAddress: string,
    distributedAmount: number
  }
}

// Used in Distributor Pharmacy Order Form
export type Dispatches = {
  batchId: string,
  distributor: [{
    distributorAddress: string,
    distributedAmount: number
  }]
}

export type Stock ={
  batchDetails: Batch,
  batchId: String,
    status: String,
    distributor: [
        {
            distributedAmount: Number,
            distributorAddress: String,
        },
    ],
    pharmacy: [
        {
            pharmaAddress: String,
            deliveredAmount: Number,
            medicineSold: Number,
            pharmaTransactions: [String],
        },
    ],
    transactions: [String],
}