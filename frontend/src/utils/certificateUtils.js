export const issuedCertificates = (
  certificates
) =>
  certificates.filter(
    (c) => c.status === "Issued"
  );

export const pendingCertificates = (
  certificates
) =>
  certificates.filter(
    (c) => c.status === "Pending"
  );