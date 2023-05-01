import { FC, memo, useRef, useCallback, useEffect, useState } from "react";
import { ArrowPositioner } from "../ArrowPositioner/ArrowPositioner";
import { DefaultArrow } from "../DefaultComponents/DefaultDropDownItem/DefaultArrow/DefaultArrow";
import { DefaultDropDownItem } from "../DefaultComponents/DefaultDropDownItem/DefaultDropDownItem/DefaultDropDownItem";
import { DropDown } from "../DropDown/DropDown";
import { DropDownT, DropDownSharedState, DropDownMultiState } from "./types";
import classes from "./DropDownGroup.module.scss";

export type DropDownGroupProps = {
  classNames?: {
    dropDownInitialWrapper?: string;
    dropDownInitialContainer?: string;
    dropDownsWrapper?: string;
    dropDownContainer?: string;
  };
  dropDowns: DropDownT;
  onStateSet?: (state: DropDownSharedState) => void;
  onMultiStateSet?: (state: DropDownMultiState[]) => void;
};


export const DropDownGroup: FC<DropDownGroupProps> = memo(
  ({ dropDowns, onStateSet, classNames, onMultiStateSet }) => {
    const [selected, setSelected] = useState<number>();
    const [state, setState] = useState<DropDownSharedState>({
      path: "",
      selected: undefined,
      depth: 0,
    });
    const coordinatesRef = useRef<DOMRect>({} as DOMRect);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isMultiStateSetting = onMultiStateSet ? true : false;
    const stylesToPassDown = Object.assign(
      {},
      {
        dropDownContainer: classNames?.dropDownContainer,
        dropDownsWrapper: classNames?.dropDownsWrapper,
      }
    );
    const dropDownClickHandler = (i: number, name: string) => {
      if (!isMultiStateSetting) {
        setState({ path: `/${name}`, depth: 0, selected: undefined });
      }

      setSelected(i);
    };
    const _onStateSet = useCallback(onStateSet!, []);
    const multiState = [] as DropDownMultiState[];

    const multiStateHandler = useCallback(
      (
        index: number,
        selected: string | undefined,
        state: DropDownMultiState[]
      ) => {
        state[index]["selected"] = selected;
        const newState = [...state];
        onMultiStateSet && onMultiStateSet(newState);
      },
      [onMultiStateSet]
    );

    const detectClickOutside = useCallback((e: MouseEvent) => {
    const element = document.elementFromPoint(e.x,e.y)
    if(!element?.closest('[data-react-dropdown-group]') || ((element?.hasAttribute('data-react-dropdown-unit')) && dropDowns.config?.closeDropdownsOnStateSet)) setSelected(undefined)
    }, []);
    useEffect(() => {
      document.body.addEventListener("click", detectClickOutside);
      return () => {
        document.removeEventListener("click", detectClickOutside);
      };
    }, []);
    return (
      <div
      data-react-dropdown-group='react-dropdown-group'
        className={`${classes.dropDownTreeSWrapper} ${classNames?.dropDownInitialWrapper ? classNames?.dropDownInitialWrapper : ''}`}
        ref={wrapperRef}
      >
        <div
          className={`${classes.dropDownTreeSContainer}`}
          ref={(ref) => {
            if (ref) {
              const coordinates = ref.getBoundingClientRect();
              coordinatesRef.current = coordinates;
            }
          }}
        >
          {dropDowns.dropDownItems.map((dropdown, i) => {
            const icon = dropdown.icon;

            const renderRightIcon =
              typeof icon === "function" && dropDowns.config?.iconDefaultStyles
                ? icon(dropDowns.config?.iconDefaultStyles)
                : icon;
            if (dropdown.type === "dropdown") {
              const defaultLook = dropDowns.config?.defaultItemLook;

              multiState.push({
                dropdownName: dropdown.dropDownName,
                selected: undefined,
              });

              const eventListeners =
                dropDowns?.config?.expandEvent === "hover"
                  ? {
                      onMouseOver: () => {
                        dropDownClickHandler(i, dropdown.dropDownName);
                      },
                    }
                  : {
                      onClick: () => {
                        dropDownClickHandler(i, dropdown.dropDownName);
                      },
                    };
              return (
                <div
                aria-haspopup
                aria-expanded={i === selected}
                tabIndex={i}
                  className={`${classes.dropdownTree} ${classNames?.dropDownInitialContainer ? classNames?.dropDownInitialContainer : ''}`}
                  key={i}
                  {...eventListeners}
                >
                  {defaultLook ? (
                    defaultLook(
                      dropdown.label,
                      renderRightIcon,
                      dropDowns.config?.defaultArrow ? (
                        <DefaultArrow open={selected === i}></DefaultArrow>
                      ) : (
                        dropDowns.config?.customArrow
                      )
                    )
                  ) : (
                    <DefaultDropDownItem
                      label={dropdown.label}
                      icon={renderRightIcon}
                      iconPosition={dropDowns.config?.iconPosition}
                      arrow={
                        dropDowns.config?.customArrow ? (
                          <ArrowPositioner
                            arrow={dropDowns.config?.customArrow}
                            open={selected === i}
                          ></ArrowPositioner>
                        ) : (
                          <DefaultArrow open={selected === i}></DefaultArrow>
                        )
                      }
                    ></DefaultDropDownItem>
                  )}
                  <DropDown
                    open={selected === i}
                    dropDownItems={dropdown.dropdown}
                    sharedConfig={dropDowns.config}
                    state={isMultiStateSetting ? multiState : state}
                    parentCoordinates={coordinatesRef.current}
                    onStateSet={onStateSet && _onStateSet}
                    isFirstDropDown
                    classNames={stylesToPassDown}
                    index={i}
                    onMultiStateSet={onMultiStateSet && multiStateHandler}
                  ></DropDown>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
);
