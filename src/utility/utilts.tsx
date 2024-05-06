import {
  DeliveryDiningRounded,
  FactoryRounded,
  LocalPharmacyRounded,
  LocalShippingRounded,
  ShoppingCartCheckoutRounded,
  SvgIconComponent,
  WarehouseRounded,
} from "@mui/icons-material";

export const timelineNumber: { [key: string]: number } = {
  manufactured: 0,
  "Shipped To Distributor": 1,
  "Reached Warehouse": 2,
  "Shipped to Pharmacy(s)": 3,
  "Reached Pharmacy(s)": 4,
  "Sold To Customer(s)": 5,
};

export const timelineConfig: Array<{
  typography: string;
  icon: {
    Comp: SvgIconComponent;
    props?: {
      color?: "primary";
    };
  };
}> = [
    {
      typography: "Manufactured",
      icon: {
        Comp: FactoryRounded,
      },
    },
    {
      typography: "Shipped To Warehouse",
      icon: { Comp: LocalShippingRounded, props: { color: "primary" } },
    },
    // {
    //   typography: "Reached Warehouse",
    //   icon: { Comp: WarehouseRounded },
    // },
    {
      typography: "Shipped to Pharmacy(s)",
      icon: { Comp: DeliveryDiningRounded, props: { color: "primary" } },
    },
    // {
    //   typography: "Reached Pharmacy(s)",
    //   icon: { Comp: LocalPharmacyRounded },
    // },
    {
      typography: "Sold To Customer(s)",
      icon: { Comp: ShoppingCartCheckoutRounded },
    },
  ];

export const containerTypes: Array<string> = [
  "Aluminium",
  "Metal",
  "Glass",
  "Plastic",
];

export const units: Array<string> = ["ML", "Tablets", "Capsules"];


export const ACCESS_CONTROL_CONTRACT_ADDRESS =
  '0xe5d3c840e8da18291ba6cf95ccc8ea695ec9806b';

