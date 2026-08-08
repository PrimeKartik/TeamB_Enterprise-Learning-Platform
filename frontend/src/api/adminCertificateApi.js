import client from "./client";

export const adminCertificateApi = {

  getAllCertificates: () =>
    client.get("/admin/certificates"),

  getCertificate: (id) =>
    client.get(`/admin/certificates/${id}`),

  issueCertificate: (data) =>
    client.post("/admin/certificates", data),

  deleteCertificate: (id) =>
    client.delete(`/admin/certificates/${id}`),

};
