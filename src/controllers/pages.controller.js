import { join, dirname } from "path";
import { fileURLToPath } from "url";

export function createPageRoute(fileName) {
  return (req, res) => {
    res.sendFile(
      join(dirname(fileURLToPath(import.meta.url)), "..", "views", fileName),
    );
  };
}
