export type User = {
  name: string;
  address: string;
  role: string;
};

export type Medicine = {
  name: string;
  dosage: number;
  activeIngredient: string;
  completeName: string;
  manufacturer: string;
};

export type Batch = {
  batchId: string;
  medicine: string;
  containerType: string;
  unit: string;
  packSize: number;
  cartonSize: number;
  totalSupply: number;
  quantity: number;
  mfg: Date;
  exp: Date;
  manufacturer: string;
};

export type Product = {
  name: string;
  dosage: number;
  activeIngredient: string;
  completeName: string;
  manufacturer: string;
  medicineBatches: Batch[];
};

export type Dispatch = {
  batchId: string;
  courier: string;
  distributor: {
    status: string;
    distributorName: string;
    distributorAddress: string;
    distributorSupply: number;
  };
};

export type Distributor = {
  status: string;
  distributorName: string;
  distributorAddress: string;
  distributorSupply: number;
  distributedAmount: number;
  distroTransactions: [string];
};
// Used in Distributor Pharmacy Order Form
export type Dispatches = {
  batchId: string;
  courier: string[];
  distributor: Distributor[];
  pharmacy?: [
    {
      pharmaName: string;
      pharmaAddress: string;
      deliveredAmount: number;
      medicineSold: number;
      pharmaTransactions: [string];
    }
  ];
  transactions?: string[];
  batch: Batch;
};

export type Stock = {
  batchDetails: Batch;
  batchId: string;
  status: string;
  distributor: [
    {
      distributedAmount: number;
      distributorAddress: string;
    }
  ];
  pharmacy: [
    {
      pharmaAddress: string;
      deliveredAmount: number;
      medicineSold: number;
      pharmaTransactions: [string];
    }
  ];
  transactions: [string];
};

export type DispatchDetails = {
  batchId: string;
  courier: string;
  distributor: {
    status: string;
    distributorName: string;
    distributorAddress: string;
    distributorSupply: number;
  };
  pharmaAddress: string;
  quantity: number;
};
