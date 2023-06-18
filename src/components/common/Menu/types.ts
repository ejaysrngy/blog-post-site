export interface MenuPropTypes {
  open: boolean;
  handleCloseMenu: () => void;
  anchorEl: null | HTMLElement;
  items: Array<{
    key: string;
    name: string;
    link?: string;
    isLink?: boolean;
    handeClickFn: () => void;
  }>;
}
