type DropDownIconPosition = "left" | "right";
type DropDownLayOutType = "grid" | "flex";
export type DropDownItemBase = {
  label: string;
  icon?: JSX.Element | ((styles: React.CSSProperties) => JSX.Element);
  iconPosition?: DropDownIconPosition;
};

export type DropDownItemVariant1 = DropDownItemBase & {
  value?: never;
  path: string;
  type: "unit";
};
export type DropDownItemVariant2 = DropDownItemBase & {
  value: string;
  path?: never;
  type: "unit";
};

//change link or state type to more generic : unit
export type DropDownItem = DropDownItemVariant1 | DropDownItemVariant2;

////----------CONFIG TYPES -----------////
export type expandEvent = "hover" | "click";
export type expandDirection = "right" | "left";
export type DropDownConfig = {
  expandEvent?: expandEvent;
  defaultLayout?: DropDownLayOutType;
  expandDirection?: expandDirection;
  topDistance?: number;
  sideDistance?: number;
  iconDefaultStyles?: React.CSSProperties;
  defaultArrow?: boolean;
  customArrow?: JSX.Element;
  iconPosition?: "left" | "right";
  closeDropdownsOnStateSet?:boolean
  defaultItemLook?: (
    label: string,
    icon?: JSX.Element | ((styles: React.CSSProperties) => JSX.Element),
    arrow?: React.ReactNode
  ) => JSX.Element;
  customLinkLook?: (
    label: string,
    icon?: JSX.Element | ((styles: React.CSSProperties) => JSX.Element)
  ) => JSX.Element;
  customStateSetterLook?: (
    label: string,
    icon?: JSX.Element | ((styles: React.CSSProperties) => JSX.Element)
  ) => JSX.Element;
};
export type DropDownT = {
  config?: DropDownConfig;
  dropDownItems: (
    | (DropDownItemBase & {
        type: "dropdown";
        dropdown: DropDownT["dropDownItems"];
        dropDownName: string;
      })
    | DropDownItem
  )[];
};

///-----------STATEDROPDOWN---------///

export type DropDownSharedState = {
  path: string;
  selected: string | undefined;
  depth: number;
};
export type DropDownMultiState = {
  dropdownName: string | null;
  selected: string | undefined;
};
export type DropDownItems = Pick<DropDownT, "config"> &
  DropDownT["dropDownItems"];
