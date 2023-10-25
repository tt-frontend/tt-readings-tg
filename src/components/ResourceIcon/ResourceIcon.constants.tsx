import { EResourceType } from "@/api/types";
import { ColdWaterSupplyIcon } from "../icons/ColdWaterSupplyIcon";
import { HotWaterSupplyIcon } from "../icons/HotWaterSupplyIcon";
import { HeatIcon } from "../icons/HeatIcon";
import { ElectricityIcon } from "../icons/ElectricityIcon";

export const ResourceIconsLookup = {
  [EResourceType.ColdWaterSupply]: <ColdWaterSupplyIcon />,
  [EResourceType.HotWaterSupply]: <HotWaterSupplyIcon />,
  [EResourceType.Electricity]: <ElectricityIcon />,
  [EResourceType.Heat]: <HeatIcon />,
};

export const ResourceColorLookup = {
  [EResourceType.ColdWaterSupply]: "#79AFFF",
  [EResourceType.HotWaterSupply]: "#FF8C68",
  [EResourceType.Electricity]: "#E2B104",
  [EResourceType.Heat]: "#A269E9",
};

export const ResourceNamesLookup = {
  [EResourceType.ColdWaterSupply]: "Холодная вода",
  [EResourceType.HotWaterSupply]: "Горячая вода",
  [EResourceType.Electricity]: "Электричество",
  [EResourceType.Heat]: "Отопление",
};

export const ResourceSummaryUnits: { [key in EResourceType]: string } = {
  [EResourceType.ColdWaterSupply]: "м³",
  [EResourceType.HotWaterSupply]: "м³",
  [EResourceType.Electricity]: "кВт/ч",
  [EResourceType.Heat]: "Гкал",
};
