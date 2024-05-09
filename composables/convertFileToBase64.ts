export default async function convertFileToBase64(file: any) {
  try {
    const base64String = await readFileAsBase64(file);
    return base64String;
  } catch (error) {
    console.error("Error converting file to base64:", error);
    return null;
  }
}
