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