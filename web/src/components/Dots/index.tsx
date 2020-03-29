import * as React from "react";
import { useClickAway } from "react-use";
import { ListActions } from "react-use/lib/useList";
import { DotsIcon, DotMenu, DotsContainer, DotMenuItem, Icon } from "./styles";

interface Option {
  icon_url: string;
  label: string;
  action?: (currentRow: any, currentIndex: number) => void;
}

interface Props {
  row: {
    index: number;
    original: any;
  };
  methods: ListActions<any>;
  options?: Option[];
}

const Dots: React.FC<Props> = ({ row, methods, options }) => {
  const { set: setData } = methods;
  const currentIndex = row.index;
  const currentRow = row.original;
  const ref = React.useRef<HTMLDivElement>(null);
  // const clearMenus = () => {
  //   methods.set((rows: any) =>
  //     rows.map((e: any) => ({ ...e, isMenuOpen: false }))
  //   );
  // };
  useClickAway(ref, () => {
    setData((data: any) =>
      data.map((e: any, index: number) => {
        if (index === currentIndex) {
          return { ...e, isMenuOpen: false };
        }
        return e;
      })
    );
  });
  const toggleMenu = () => {
    if (currentRow.isMenuOpen) {
      setData((data: any) =>
        data.map((e: any, index: number) => {
          if (index === currentIndex) {
            return { ...e, isMenuOpen: false };
          }
          return e;
        })
      );
    } else {
      setData((data: any) =>
        data.map((e: any, index: number) => {
          if (index === currentIndex) {
            return { ...e, isMenuOpen: true };
          }
          return e;
        })
      );
      // setData(data => data.map((row, index)=>index===currentIndex?({...row, isMenuOpen: true}: e)));
    }
  };

  return (
    <DotsContainer
      onClick={toggleMenu}
      active={currentRow.isMenuOpen}
      ref={ref}
    >
      <DotsIcon />
      {currentRow.isMenuOpen && (
        <DotMenu>
          {options &&
            options.map((option, index) => (
              <DotMenuItem
                key={index}
                onClick={() => {
                  if (option.action) {
                    option.action(currentRow, currentIndex);
                  }
                }}
              >
                <Icon src={option.icon_url} />
                {option.label}
              </DotMenuItem>
            ))}
        </DotMenu>
      )}
    </DotsContainer>
  );
};

export default Dots;
