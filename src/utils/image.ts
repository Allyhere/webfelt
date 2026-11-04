import { NOT_IMAGE } from "../render/imageFile/imageFile.constants.ts";

export function imageFailure(error: unknown, emptyTypeMessage: string): string {
  if (error instanceof Error && error.message === NOT_IMAGE) return emptyTypeMessage;
  return "That image could not be read.";
}

export function pastedImage(files: FileList): File | null {
  for (const file of files) {
    if (file.type.startsWith("image/") || file.type === "") return file;
  }
  return null;
}
