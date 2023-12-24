import path from "node:path";

export function pathUploads() {
	return path.resolve(__dirname, "..", "..", "public", "images");
}
export function holiday() {
	const fechaActual = new Date();
	const mesActual = fechaActual.getMonth() + 1;
	switch (mesActual) {
		case 1:
			return "new-year";
		case 7:
			return "independency-day";
		case 10:
			return "halloween";
		case 12:
			return "merry-christmas";
		default:
			return null;
	}
}
