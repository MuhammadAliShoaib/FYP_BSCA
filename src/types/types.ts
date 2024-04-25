export type User = {
  name: string;
  address: string;
  role: string;
}

export type Medicine = {
  name: string,
  dosage: number,
  activeIngredient: string,
  completeName: string,
  manufacturer: string,
}

export type Batch = {
  batchId: string,
  medicine: string,
  containerType: string,
  unit: string,
  packSize: number,
  cartonSize: number
  totalSupply: number,
  quantity: number,
  mfg: Date,
  exp: Date,
  manufacturer: string,
}

export type Product = {
  name: string,
  dosage: number,
  activeIngredient: string,
  completeName: string,
  manufacturer: string,
  medicineBatches: Batch[];
}

export type Dispatch = {
  batchId: string,
  distributor: {
    distributorAddress: string,
    distributorSupply: number
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
  batchId: string,
    status: string,
    distributor: [
        {
            distributedAmount: number,
            distributorAddress: string,
        },
    ],
    pharmacy: [
        {
            pharmaAddress: string,
            deliveredAmount: number,
            medicineSold: number,
            pharmaTransactions: [string],
        },
    ],
    transactions: [string],
}