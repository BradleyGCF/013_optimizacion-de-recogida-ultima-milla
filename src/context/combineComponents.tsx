// biome-ignore lint/style/useImportType: <explanation>
import React, { ComponentProps, FC } from "react";

interface CombineComponentsProps {
  children?: React.ReactNode;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type ComponentType = FC<ComponentProps<any>>;

export const combineComponents = (
  ...components: ComponentType[]
): FC<CombineComponentsProps> => {
  return components.reduce(
    (AccumulatedComponents: ComponentType, CurrentComponent: ComponentType) => {
      return ({ children }: ComponentProps<ComponentType>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }: CombineComponentsProps) => <>{children}</>,
  );
};
