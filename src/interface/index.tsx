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
