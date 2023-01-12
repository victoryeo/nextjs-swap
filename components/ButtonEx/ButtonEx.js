import { Button } from "react";

export const ButtonEx = ({ id, title, onClick, disabled }) => {
  return (
    <div>
      <Button id={id} onClick={onClick} disabled={disabled}>{title}</Button>
    </div>
  );
}