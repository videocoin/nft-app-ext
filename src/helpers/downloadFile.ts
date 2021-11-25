function downloadFile(data: string, fileName: string) {
  const downloadLink = document.createElement('a');
  downloadLink.target = '_blank';
  downloadLink.rel = 'nooneper noreferrer';
  downloadLink.href = data;
  downloadLink.download = fileName;
  downloadLink.click();
}

export default downloadFile;
