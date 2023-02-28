# React DropDown Group Component Library

## Please use this commands in your terminal to install this library

```
npm i react-dropdown-group
```
```
yard add react-dropdown-group
```
## Description
**React-Dropdown-Group is a one component library , which implements list pattern to build group of dropdowns.Each dropdown has two types of items : unit and another dropdown.Unit item will execute callback that you passed.The link item will use url path to set url location.Be default it will set generated url from dropdown opening, but you can always set a custom url in each item.The state item will execute your callback and pass the generated state into it.Each time you open the dropdown new path is generated.**

**Dropdown Group component accepts two types of callback :**
`onSingleStateSet = (state) => {
    console.log(state)
  }
  onMultiState = (state) => {
    console.log(state)}`
    **If you want to track just a single branch in a dropdown-tree pass first callback.If you want to track all branches and all selected items in these branches use second callback.If both callbacks are omitted link behavior will be used**
    **You can easily customize look of unit items , single dropdowns and dropdown containers by passing object like this as prop :**
    ``` classNames={{
        dropDownInitialWrapper: classes.dropDownInitialWrapper,
        dropDownInitialContainer: classes.dropDownInitialContainer,
        dropDownContainer: classes.dropDownContainer,
        dropDownsWrapper: classes.dropDownsWrapper,
      }}```
**You can use your custom look as well by specifying it in the config property in the list**
```
config:{
     customLinkLook(label, icon) {},
     customStateSetterLook(label, icon) {},
     defaultItemLook(label, icon, arrow) {},
     iconDefaultStyles: {},
     customArrow: <CustomArrow style={styles} />
}
```
**Config property has additional properties.You can use them to customize position of dropdowns or expand event**
```
    expandEvent: "hover",
    topDistance: 0,
    sideDistance: 0,
```
**In general Dropdown List has only 2 properties `config and dropDownItems`.DropItems property accepts list of dropdowns.You can chose branches count and behavior in each branch.Structure is similar to this :**
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
        } ..........
```
**On each level of depth you can have as many dropdowns or unit items as you want.To have nested dropdowns just specify dropdown property in each dropdown**
**Pseudo code looks like this :**
`dropdown : [{unit , dropdown , dropdown:[{dropdown},{unit}]
]`
**Each dropdown is just an array of dropdowns and unit items**

**You can use this component like this :**
```
import {DropDownGroup} from 'react-dropdown-group'
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

**To correctly fill in the dropdown list use special type which you can import**
```
import {DropDownT} from 'react-dropdown-group'
```
# GOOD LUCK! :)