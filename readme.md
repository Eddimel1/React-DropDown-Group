# React DropDown Group Component Library

## Please use this commands in your terminal to install this library

```
npm i react-dropdown-group
```
```
yard add react-dropdown-group
```
## Description
**React Dropdown Group is a library that allows you to build groups of dropdowns using a list pattern. Each dropdown has two types of items: unit and another dropdown. A unit item will execute the callback that you passed, while the link item will use the URL path to set the URL location. By default, it will set the generated URL from dropdown opening, but you can always set a custom URL in each item. The state item will execute your callback and pass the generated state into it. Each time you open the dropdown, a new path is generated.**

## Usage

**You can use this component like this :**

```
import { DropDownGroup } from 'react-dropdown-group'
const onMultiState = (state) => {
  console.log(state)
}
return (
  <DropDownGroup
    classNames={{
      dropDownInitialWrapper: classes.dropDownInitialWrapper,
      dropDownInitialContainer: classes.dropDownInitialContainer,
      dropDownContainer: classes.dropDownContainer,
      dropDownsWrapper: classes.dropDownsWrapper,
    }}
    onMultiStateSet={onMultiState}
    dropDowns={dropDowns}
  ></DropDownGroup>
)
```
**To correctly fill in the dropdown list use the special type which you can import :**
   
   ```
   import { DropDownT } from 'react-dropdown-group'
   ```
## Callbacks

**DropdownGroup component accepts two types of callback:**
```
onSingleStateSet = (state) => {
  console.log(state)
}

onMultiState = (state) => {
  console.log(state)
}
```
**If you want to track just a single branch in a dropdown-tree, pass the first callback. If you want to track all branches and all selected items in these branches, use the second callback. If both callbacks are omitted, link behavior will be used.**

## Customization
**You can easily customize the look of unit items, single dropdowns, and dropdown containers by passing an object like this as a prop:**

```
classNames={{
  dropDownInitialWrapper: classes.dropDownInitialWrapper,
  dropDownInitialContainer: classes.dropDownInitialContainer,
  dropDownContainer: classes.dropDownContainer,
  dropDownsWrapper: classes.dropDownsWrapper,
}}
```

**You can use your custom look as well by specifying it in the config property in the list:**

```
config: {
     expandEvent?: "click" | "hover";
    defaultLayout?: "grid" | "flex";
    expandDirection?: "right" | "left";;
    topDistance?: number;
    sideDistance?: number;
    iconDefaultStyles?: React.CSSProperties;
    defaultArrow?: boolean;
    customArrow?: JSX.Element;
    iconPosition?: "left" | "right";
    closeDropdownsOnStateSet?:boolean
    defaultItemLook?: (label: string, icon?: JSX.Element | ((styles: React.CSSProperties) => JSX.Element), arrow?: React.ReactNode) => JSX.Element;
    customLinkLook?: (label: string, icon?: JSX.Element | ((styles: React.CSSProperties) => JSX.Element)) => JSX.Element;
    customStateSetterLook?: (label: string, icon?: JSX.Element | ((styles: React.CSSProperties) => JSX.Element)) => JSX.Element;
}
```

**The config property has additional properties. You can use them to customize the position of dropdowns or expand event.**

## Dropdown Items

**In general, the Dropdown List has only two properties: config and dropDownItems. The dropDownItems property accepts a list of dropdowns. You can choose the number of branches and behavior in each branch. The structure is similar to this:**

```
dropDownItems: [
  {
    type: "dropdown",
    label: "your label",
    dropDownName: "your dropdown name",
    icon: (styles) => (
      <YourIcon style={{ ...styles }}></YourIcon>
    ),
    dropdown: [
      {
        label: "your label",
        value: "your value",
        type: "unit",
      },
      // ...
    ]
  },
  // ...
]
```

**Each dropdown is just an array of dropdowns and unit items.**