import { adminCertificateApi } from "../api/adminCertificateApi";

const certificateService = {
  getCertificates: () =>
    adminCertificateApi.getAllCertificates(),

  generateCertificate: (data) =>
    adminCertificateApi.generateCertificate(data),

  downloadCertificate: (id) =>
    adminCertificateApi.downloadCertificate(id),
};

export default certificateService;