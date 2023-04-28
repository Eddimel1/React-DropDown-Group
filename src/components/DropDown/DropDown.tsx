import { FC, memo, useState, useRef } from "react";
import { ArrowPositioner } from "../ArrowPositioner/ArrowPositioner";
import { DefaultArrow } from "../DefaultComponents/DefaultDropDownItem/DefaultArrow/DefaultArrow";
import { DefaultDropDownItem } from "../DefaultComponents/DefaultDropDownItem/DefaultDropDownItem/DefaultDropDownItem";
import { DefaultLink } from "../DefaultComponents/DefaultLink/DefaultLink";
import {
  DropDownItems,
  DropDownSharedState,
  DropDownMultiState,
  DropDownConfig,
} from "../DropDownGroup/types";
import { DefaultStateSetter } from "../StateSetter/StateSetter";
import classes from "./DropDown.module.scss";
type _props = {
  dropDownItems: DropDownItems;
  open: boolean;
  state: DropDownSharedState | DropDownMultiState[];
  sharedConfig: DropDownConfig | undefined;
  parentCoordinates: DOMRect;
  isFirstDropDown?: boolean;
  index: number;
  onStateSet?: (state: DropDownSharedState) => void;
  onMultiStateSet?: (
    index: number,
    selected: string | undefined,
    state: DropDownMultiState[]
  ) => void;
  classNames?: {
    dropDownContainer?: string | undefined;
    dropDownsWrapper?: string | undefined;
  };
};

export const DropDown: FC<_props> = memo(
  ({
    open,
    dropDownItems,
    state,
    sharedConfig,
    parentCoordinates,
    onStateSet,
    isFirstDropDown,
    onMultiStateSet,
    classNames,
    index,
  }) => {
    const [selected, _setSelected] = useState<{
      index: number;
      name: string;
    }>();
    const [_state, setState] = useState<DropDownSharedState>({
      path: "",
      selected: undefined,
      depth: 0,
    });
    const multiState = useRef<DropDownMultiState[]>(
      state as DropDownMultiState[]
    );
    const isMultiStateSetting = onMultiStateSet ? true : false;
    const coordinatesRef = useRef<DOMRect>();

    const position = {
      [sharedConfig?.expandDirection || "left"]: `${
        isFirstDropDown
          ? 0
          : parentCoordinates?.width + (sharedConfig?.sideDistance || 10)
      }px`,
      top: `${isFirstDropDown ? "" : sharedConfig?.topDistance || 0}px`,
    };
    const linkClickHandler = (path: string) => {
      window.location.assign(path);
    };

    const dropDownClickHandler = (i: number, name: string) => {
      if (!isMultiStateSetting) {
        const _s = state as DropDownSharedState;
        setState({
          path: `${_s.path}/${name}`,
          depth: (_s.depth || 0) + 1,
          selected: undefined,
        });
      }

      _setSelected({ index: i, name });
    };

    if (!open) return null;
    return (
      <div data-react-dropdown-group='react-dropdown-group'
        ref={(ref) => {
          if (ref) {
            const coordinates = ref.getBoundingClientRect();
            coordinatesRef.current = coordinates;
          }
        }}
        style={{ ...position }}
        className={`${classes.dropDownContainer} ${classNames?.dropDownsWrapper}`}
      >
        {dropDownItems.map((dropDownItem, i) => {
          if (dropDownItem.type === "dropdown") {
            
            const icon = dropDownItem.icon;
            const eventListeners =
              sharedConfig?.expandEvent === "hover"
                ? {
                    onMouseOver: () => {
                      dropDownClickHandler(i, dropDownItem.dropDownName);
                    },
                  }
                : sharedConfig?.expandEvent === "click"
                ? {
                    onClick: () => {
                      dropDownClickHandler(i, dropDownItem.dropDownName);
                    },
                  }
                : null;
            const renderRightIcon =
              typeof icon === "function" &&
              dropDownItems.config?.iconDefaultStyles
                ? icon(dropDownItems.config?.iconDefaultStyles)
                : icon;
            const defaultLook = sharedConfig?.defaultItemLook;

            return (
              <div
              data-react-dropdown-group='react-dropdown-group'
                className={`${classes.dropdown} ${classNames?.dropDownContainer}`}
                key={i}
                {...eventListeners}
              >
                {defaultLook ? (
                  defaultLook(
                    dropDownItem.label,
                    renderRightIcon,
                    dropDownItems.config?.defaultArrow ? (
                      <DefaultArrow open={selected?.index === i}></DefaultArrow>
                    ) : (
                      dropDownItems.config?.customArrow
                    )
                  )
                ) : (
                  <DefaultDropDownItem
                    label={dropDownItem.label}
                    icon={renderRightIcon}
                    iconPosition={sharedConfig?.iconPosition}
                    arrow={
                        <ArrowPositioner
                          arrow={sharedConfig?.customArrow || <DefaultArrow
                            open={selected?.index === i}
                          ></DefaultArrow>}
                          open={selected?.index === i}
                        ></ArrowPositioner>
                     
                    }
                  ></DefaultDropDownItem>
                )}
                <DropDown
                  open={selected?.index === i}
                  dropDownItems={dropDownItem.dropdown}
                  state={onMultiStateSet ? multiState.current : _state}
                  sharedConfig={sharedConfig}
                  parentCoordinates={coordinatesRef.current!}
                  onMultiStateSet={onMultiStateSet}
                  classNames={classNames}
                  onStateSet={onStateSet}
                  index={index}
                ></DropDown>
              </div>
            );
          } else if (
            dropDownItem.type === "unit" &&
            !onStateSet &&
            !onMultiStateSet
          ) {
            const icon = dropDownItem.icon;
            return (
              <div
                className={classes.dropDownItemContainer}
                key={i}
                onClick={() => {
                  const s = state;
                  if ("selected" in s) {
                    linkClickHandler(
                      dropDownItem.path || `${s.path}/${dropDownItem.value}`
                    );
                  }
                }}
              >
                {sharedConfig?.customLinkLook ? (
                  sharedConfig.customLinkLook(dropDownItem.label, icon)
                ) : (
                  <DefaultLink
                    path={_state.path}
                    label={dropDownItem.label}
                  ></DefaultLink>
                )}
              </div>
            );
          } else if (dropDownItem.type === "unit" && onStateSet) {
            return (
              <div
                className={classes.dropDownItemContainer}
                key={i}
                onClick={() => {
                  if ("selected" in state) {
                    state.selected = dropDownItem.value;
                    onStateSet(state);
                  }
                }}
              >
                {sharedConfig?.customStateSetterLook ? (
                  sharedConfig.customStateSetterLook(
                    dropDownItem.label,
                    dropDownItem.icon
                  )
                ) : (
                  <DefaultStateSetter
                    label={dropDownItem.label}
                  ></DefaultStateSetter>
                )}
              </div>
            );
          } else if (dropDownItem.type === "unit" && onMultiStateSet) {
            return (
              <div
                className={classes.dropDownItemContainer}
                key={i}
                onClick={() => {
                  onMultiStateSet(
                    index,
                    dropDownItem.value,
                    multiState.current
                  );
                }}
              >
                {sharedConfig?.customStateSetterLook ? (
                  sharedConfig.customStateSetterLook(
                    dropDownItem.label,
                    dropDownItem.icon
                  )
                ) : (
                  <DefaultStateSetter
                    label={dropDownItem.label}
                  ></DefaultStateSetter>
                )}
              </div>
            );
          }
        })}
      </div>
    );
  }
);
