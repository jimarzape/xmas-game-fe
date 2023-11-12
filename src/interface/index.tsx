export interface LoginInt {
  isOpen: boolean;
  onClose: () => void;
}

export interface ModalInt {
  isOpen: boolean;
  onClose: () => void;
}

export interface CatDataInt {
  name: string;
  id: number;
}

export interface CatEditInt {
  isOpen: boolean;
  onClose: () => void;
  data: CatDataInt;
}

export interface FamDataInt {
  name: string;
  id: number;
}
export interface FamEditInt {
  isOpen: boolean;
  onClose: () => void;
  data: CatDataInt;
}

export type Order = "asc" | "desc";

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: any, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export interface familyDataInt {
  id: number;
  name: string;
}

export interface categoryDataInt {
  id: number;
  name: string;
}

export interface peopleDataInt {
  id: number;
  first_name: string;
  last_name: string;
  family: familyDataInt | null;
  category: categoryDataInt | null;
  gender: string;
  age: number;
  avatar: string;
  isHbd?: boolean;
  isWon?: boolean;
}

export interface PeopleEditInt {
  isOpen: boolean;
  onClose: () => void;
  data: peopleDataInt;
}

export interface NamePIkcerParam {
  names: string[];
}

export interface namePickData {
  name: string;
}

export interface NamePIckSelected {
  selectedName: string | null;
  pickedNames: peopleDataInt | null;
  hasWinner: boolean;
}
