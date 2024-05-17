import { ReactNode, MouseEvent } from "react";
import { Button, ButtonProps } from "../Button";

interface IconButtonWButtonProps {
  icon: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Text that will be displayed in the tooltip when hovered or focused on the button.
   **/
  tooltip: string;
  appearance?: ButtonProps["appearance"];
  /**
   * Label for aria-label attribute.
   * This is used for accessibility purposes.
   **/
  label: string;
  testId?: string;
}

const IconButton = ({
  icon,
  onClick,
  tooltip,
  appearance = "link-with-background",
  label,
  testId,
  ...buttonProps
}: IconButtonWButtonProps & ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      iconBefore={icon}
      tooltip={tooltip}
      appearance={appearance}
      aria-label={label}
      testId={testId}
      {...buttonProps}
    />
  );
};

export { IconButton};
