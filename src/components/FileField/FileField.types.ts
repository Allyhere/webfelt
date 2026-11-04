export type FileFieldProps = {
  /** Button text. */
  children: string;
  acceptedFileTypes?: string[];
  onSelect: (file: File) => void;
};
