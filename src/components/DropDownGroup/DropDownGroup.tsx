import { useState, useRef, useEffect, useCallback, FC, memo } from "react";
import { NavLink } from "react-router-dom";
import { ArrowPositioner } from "../ArrowPositioner/ArrowPositioner";
import { DefaultArrow } from "../DefaultComponents/DefaultDropDownItem/DefaultArrow/DefaultArrow";
import { DefaultDropDownItem } from "../DefaultComponents/DefaultDropDownItem/DefaultDropDownItem/DefaultDropDownItem";
import {
  DropDownMultiState,
  DropDownSharedState,
DropDownT
} from "./types";
import classes from "./DropDownGroup.module.scss";
import React from "react";
import { DropDown } from "../DropDown/DropDown";

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
      []
    );

    const detectClickOutside = useCallback((e: any) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setSelected(undefined);
      }
    }, []);

    useEffect(() => {
      document.body.addEventListener("click", detectClickOutside);
      return () => {
        document.removeEventListener("click", detectClickOutside);
      };
    }, []);

    useEffect(() => {}, []);
    return (
      <div
        className={`${classes.dropDownWrapper} ${classNames?.dropDownInitialWrapper}`}
        ref={wrapperRef}
      >
        <div
          className={`${classes.dropDownContainer}`}
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
                  className={`${classes.dropdown} ${classNames?.dropDownInitialContainer}`}
                  key={i}
                  {...eventListeners}
                >
                  {defaultLook ? (
                    defaultLook(
                      dropdown.label,
                      renderRightIcon,
                      dropDowns.config?.defaultArrow ? (
                        <DefaultArrow
                          open={selected === i}
                          depth={1}
                        ></DefaultArrow>
                      ) : (
                        dropDowns.config?.customArrow
                      )
                    )
                  ) : (
                    <DefaultDropDownItem
                      label={dropdown.label}
                      icon={renderRightIcon}
                      arrow={
                        dropDowns.config?.customArrow ? (
                          <ArrowPositioner
                            arrow={dropDowns.config?.customArrow}
                            open={selected === i}
                            depth={1}
                            isCustom={true}
                          ></ArrowPositioner>
                        ) : (
                          <DefaultArrow
                            open={selected === i}
                            depth={1}
                          ></DefaultArrow>
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
            } else if (
              dropdown.type === "unit" &&
              !onStateSet &&
              !onMultiStateSet
            ) {
              return (
                <NavLink
                  key={i}
                  style={{ boxShadow: "0 0 5px black", padding: "0.2rem" }}
                  to={dropdown.path || `/${dropdown.value}`}
                >
                  <div style={{ marginTop: "0.1rem" }}>{dropdown.label}</div>
                </NavLink>
              );
            }
          })}
        </div>
      </div>
    );
  }
);
