function readFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result as string);
    });

    reader.readAsDataURL(file);
  });
}
export default readFile;
