import { useState } from 'react';
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  X,
  FileText,
  CircleCheck,
  CircleX,
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
  time: string;
  applicant: string;
  risk: string;
  type: VerificationType;
  status: VerificationStatus;
}

const verificationsData: VerificationItem[] = [
  {
  id: 'REQ-091',
  time: '2 hours ago',
  applicant: 'Alice Thompson',
  risk: 'Low Risk Flag',
  type: 'RN License',
  status: 'Pending Review',
},
{
  id: 'REQ-090',
  time: '5 hours ago',
  applicant: 'Marcus Johnson',
  risk: 'Medium Risk Flag',
  type: 'Background Check',
  status: 'Action Required',
},
{
  id: 'REQ-089',
  time: '1 day ago',
  applicant: 'Elena Rodriguez',
  risk: 'Low Risk Flag',
  type: 'CNA Certification',
  status: 'Pending Review',
},
{
  id: 'REQ-088',
  time: '2 days ago',
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

  {/* Filters and search */}
  <div className="verification-toolbar">

    <div className="verification-filters">
      <button className="verification-filter active">
        All
      </button>

      <button className="verification-filter">
        Pending
      </button>

      <button className="verification-filter">
        Action Required
      </button>

      <button className="verification-filter">
        Approved
      </button>
    </div>

    <div className="verification-search">
      <input
        type="text"
        placeholder="Search ID or Name..."
      />
    </div>

  </div>

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
  <div>{row.id}</div>
  <span className="request-time">{row.time}</span>
</td>

                  <td>
                    <div className="applicant-name">
                      {row.applicant}
                    </div>

                   <div
  className={`risk-text ${
    row.risk === 'Low Risk Flag'
      ? 'risk-low'
      : 'risk-medium'
  }`}
>
  <span className="risk-dot"></span>
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

                    <div className="verification-actions">

  <button
    className="verification-action approve"
    title="Approve"
  >
    <CircleCheck size={17} />
  </button>

  <button
    className="verification-action reject"
    title="Reject"
  >
    <CircleX size={17} />
  </button>

  <button
    className="verification-action view"
    onClick={() => setSelectedDoc(row)}
    title="View document"
  >
    <Eye size={17} />
  </button>

</div>

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

  <h3>Document Viewer</h3>

  <button
    className="modal-close"
    onClick={() => setSelectedDoc(null)}
  >
    <X size={20} />
  </button>

</div>

<div className="document-details-bar">

  <div>
    <p className="document-applicant">
      {selectedDoc.applicant}
    </p>

    <p className="document-info">
      {selectedDoc.type} • {selectedDoc.id}
    </p>
  </div>

  <span
    className={`status-badge ${
      selectedDoc.status === 'Approved'
        ? 'status-active'
        : selectedDoc.status === 'Action Required'
        ? 'status-suspended'
        : 'status-pending'
    }`}
  >
    {selectedDoc.status}
  </span>

</div>



            {/* Document placeholder */}
            <div className="document-placeholder">

              <FileText size={42} />

              <p className="document-placeholder-title">
    Document Scan / Image Placeholder
  </p>

  <span className="document-placeholder-description">
    In a production environment, this would render the uploaded PDF
    or photo of the applicant's credentials.
  </span>

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