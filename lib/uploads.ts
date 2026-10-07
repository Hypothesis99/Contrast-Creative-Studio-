import "server-only";
export function imageType(buffer: Buffer) {
  if (buffer.length < 12) return "";
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff)
    return "jpg";
  if (
    buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  )
    return "png";
  if (
    buffer.subarray(0, 4).toString() === "RIFF" &&
    buffer.subarray(8, 12).toString() === "WEBP"
  )
    return "webp";
  return "";
}
export function attachmentType(buffer: Buffer) {
  if (buffer.subarray(0, 5).toString() === "%PDF-") return "pdf";
  return imageType(buffer);
}
export const mimeTypes: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  pdf: "application/pdf",
};
