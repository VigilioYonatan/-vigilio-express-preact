import path from "node:path";

export function pathUploads() {
    return path.resolve(__dirname, "..", "..", "public", "images");
}
