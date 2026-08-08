/**
 * useAssessmentCertificates
 *
 * Manages certificates earned by achieving a perfect score on an assessment.
 * Certificates themselves are issued and stored by the backend; this hook
 * just fetches and shapes them for the UI.
 */
import { useCallback, useState, useEffect } from 'react'
import { userApi } from '../api/userApi'

// Maps the backend CertificateDTO (courseName, certificateId, ...) to the
// shape the certificate UI components expect (courseTitle, credentialId, ...).
function mapCertificate(c) {
  return {
    id: c.id,
    courseId: c.courseId,
    credentialId: c.certificateId,
    courseTitle: c.courseName,
    issueDate: c.issueDate,
    studentName: c.studentName || 'Learner',
    grade: c.grade,
    status: c.status,
    source: 'assessment',
  }
}

export function useAssessmentCertificates() {
  const [certs, setCerts] = useState([])

  const refresh = useCallback(() => {
    return userApi.getMyCertificates()
      .then((res) => {
        setCerts(res.data.map(mapCertificate))
      })
      .catch((err) => console.error("Error fetching certificates", err))
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const earnCertificate = useCallback(() => {
    // Certificate issuance happens on the backend during completeAssessment;
    // just re-fetch so the UI reflects it right away.
    return refresh()
  }, [refresh])

  const hasCertificate = useCallback(
    (courseId) => certs.some((c) => c.courseId === courseId),
    [certs]
  )

  return { assessmentCertificates: certs, earnCertificate, hasCertificate, refresh }
}
