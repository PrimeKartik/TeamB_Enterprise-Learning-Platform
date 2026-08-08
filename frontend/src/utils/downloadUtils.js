export const downloadBlob = (
  data,
  filename
) => {
  const url =
    window.URL.createObjectURL(
      new Blob([data])
    );

  const link =
    document.createElement("a");

  link.href = url;

  link.download = filename;

  link.click();

  window.URL.revokeObjectURL(url);
};