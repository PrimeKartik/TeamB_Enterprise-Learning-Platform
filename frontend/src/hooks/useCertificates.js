import { useEffect, useState } from "react";
import { adminCertificateApi } from "../api/adminCertificateApi";

export default function useCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCertificates = async () => {
    try {
      setLoading(true);

      const res =
        await adminCertificateApi.getAllCertificates();

      setCertificates(res.data);
    } catch (err) {
      setError("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const generateCertificate = async (id) => {
    await adminCertificateApi.generateCertificate(id);
    loadCertificates();
  };

  const deleteCertificate = async (id) => {
    await adminCertificateApi.deleteCertificate(id);
    loadCertificates();
  };

  const downloadCertificate = async (id) => {
    return await adminCertificateApi.downloadCertificate(
      id
    );
  };

  return {
    certificates,
    loading,
    error,
    refresh: loadCertificates,
    generateCertificate,
    deleteCertificate,
    downloadCertificate,
  };
}