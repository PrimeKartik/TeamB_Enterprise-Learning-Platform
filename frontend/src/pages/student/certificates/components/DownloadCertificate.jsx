import { Download } from "lucide-react";

export default function DownloadCertificate({
  onDownload,
}) {

  return (

    <button
      onClick={onDownload}
      className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
    >

      <Download />

      Download PDF

    </button>

  );

}