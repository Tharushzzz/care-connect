import { useState } from 'react';
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  X,
  FileText,
} from 'lucide-react';

type VerificationStatus =
  | 'Pending Review'
  | 'Action Required'
  | 'Approved';

type VerificationType =
  | 'RN License'
  | 'Background Check'
  | 'CNA Certification';

interface VerificationItem {
  id: string;
  applicant: string;
  risk: string;
  type: VerificationType;
  status: VerificationStatus;
}

const verificationsData: VerificationItem[] = [
  {
    id: 'REQ-091',
    applicant: 'Alice Thompson',
    risk: 'Low Risk Flag',
    type: 'RN License',
    status: 'Pending Review',
  },
  {
    id: 'REQ-090',
    applicant: 'Marcus Johnson',
    risk: 'Medium Risk Flag',
    type: 'Background Check',
    status: 'Action Required',
  },
  {
    id: 'REQ-089',
    applicant: 'Elena Rodriguez',
    risk: 'Low Risk Flag',
    type: 'CNA Certification',
    status: 'Pending Review',
  },
  {
    id: 'REQ-088',
    applicant: 'David Chen',
    risk: 'Low Risk Flag',
    type: 'Background Check',
    status: 'Approved',
  },
];

export default function Verifications() {
  const [selectedDoc, setSelectedDoc] =
    useState<VerificationItem | null>(null);

  return (
    <div className="admin-page">

      {/* Page heading */}
      <div className="admin-page-heading">
        <h2>Background Checks & Verifications</h2>
        <p>
          Review caregiver applications, credentials, and background
          screening results.
        </p>
      </div>

      {/* Summary cards */}
      <div className="verification-cards">

        <div className="verification-card">
          <div className="verification-icon pending">
            <Clock size={22} />
          </div>

          <div>
            <h3>2</h3>
            <p>Pending Reviews</p>
          </div>
        </div>

        <div className="verification-card">
          <div className="verification-icon approved">
            <CheckCircle size={22} />
          </div>

          <div>
            <h3>1</h3>
            <p>Approved Caregivers</p>
          </div>
        </div>

        <div className="verification-card">
          <div className="verification-icon flagged">
            <AlertTriangle size={22} />
          </div>

          <div>
            <h3>1</h3>
            <p>Flagged Applications</p>
          </div>
        </div>

      </div>

      {/* Verification table */}
      <div className="admin-table-card">

        <div className="table-wrapper">
          <table className="admin-table">

            <thead>
              <tr>
                <th>Request ID</th>
                <th>Applicant</th>
                <th>Verification Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {verificationsData.map((row) => (

                <tr key={row.id}>

                  <td className="request-id">
                    {row.id}
                  </td>

                  <td>
                    <div className="applicant-name">
                      {row.applicant}
                    </div>

                    <div className="risk-text">
                      {row.risk}
                    </div>
                  </td>

                  <td>
                    {row.type}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        row.status === 'Approved'
                          ? 'status-active'
                          : row.status === 'Action Required'
                          ? 'status-suspended'
                          : 'status-pending'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="verification-action">

                    <button
                      className="icon-button"
                      onClick={() => setSelectedDoc(row)}
                      title="View document"
                    >
                      <Eye size={18} />
                    </button>

                  </td>

                </tr>

              ))}
            </tbody>

          </table>
        </div>

      </div>

      {/* Document modal */}
      {selectedDoc && (

        <div className="document-modal-overlay">

          <div className="document-modal">

            <div className="document-modal-header">

              <div>
                <h3>Document Viewer</h3>

                <p className="document-applicant">
                  {selectedDoc.applicant}
                </p>

                <p className="document-info">
                  {selectedDoc.type} • {selectedDoc.id}
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedDoc(null)}
              >
                <X size={20} />
              </button>

            </div>

            {/* Document placeholder */}
            <div className="document-placeholder">

              <FileText size={42} />

              <p>Document Scan / Image Placeholder</p>

            </div>

            {/* Modal buttons */}
            <div className="document-modal-footer">

              <button
                className="secondary-button"
                onClick={() => setSelectedDoc(null)}
              >
                Close
              </button>

              <button className="reject-button">
                Reject Application
              </button>

              <button className="approve-button">
                Approve Document
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}