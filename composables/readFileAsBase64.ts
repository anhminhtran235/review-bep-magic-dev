// Tại sao em ko merge cái này vào với convertFileToBase64.ts luôn?
export default function readFileAsBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
