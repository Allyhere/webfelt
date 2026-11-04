import { FileTrigger } from "react-aria-components";
import { Button } from "../Button/Button.tsx";
import type { FileFieldProps } from "./FileField.types.ts";

export function FileField({ children, acceptedFileTypes, onSelect }: FileFieldProps) {
  return (
    <FileTrigger
      acceptedFileTypes={acceptedFileTypes}
      onSelect={(files) => {
        const file = files?.[0];
        if (file) onSelect(file);
      }}
    >
      <Button>{children}</Button>
    </FileTrigger>
  );
}
