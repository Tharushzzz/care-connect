import { useState } from 'react';
import {
  Cog,
  CreditCard,
  ShieldCheck,
  WalletCards,
  Bell,
} from 'lucide-react';

export default function Settings() {
  const [autoPayouts, setAutoPayouts] = useState(true);

  const tabs = [
  {
    name: 'General Information',
    icon: Cog,
  },
  {
    name: 'Fees & Payouts',
    icon: CreditCard,
  },
  {
    name: 'Security & Verifications',
    icon: ShieldCheck,
  },
  {
    name: 'Payment Gateways',
    icon: WalletCards,
  },
  {
    name: 'System Notifications',
    icon: Bell,
  },
];
  return (
    <div className="admin-page settings-page">

      {/* Page heading */}
      <div className="admin-page-heading">
        <h2>Platform Settings</h2>
        <p>
          Configure global application behavior and integrations.
        </p>
      </div>

      <div className="settings-layout">

        {/* Settings navigation */}
        <div className="settings-tabs">

          {tabs.map((tab, index) => {
  const Icon = tab.icon;

  return (
    <button
      key={tab.name}
      className={`settings-tab ${
        index === 0 ? 'active' : ''
      }`}
    >
      <Icon size={18} />
      <span>{tab.name}</span>
    </button>
  );
})}

        </div>

        {/* Settings content */}
        <div className="settings-content">

          {/* General Information */}
          <section className="settings-section">

            <h3>General Information</h3>

            <p className="settings-description">
              Update platform name, support email, and operational region.
            </p>

            <div className="settings-form">

              <div className="form-field full-width">
                <label>Platform Name</label>

                <input
                  type="text"
                  defaultValue="CareConnect Platform"
                />
              </div>

              <div className="form-field">
                <label>Support Contact Email</label>

                <input
                  type="email"
                  defaultValue="support@careconnect.example.com"
                />
              </div>

              <div className="form-field">
                <label>Support Phone</label>

                <input
                  type="text"
                  defaultValue="+1 (800) 555-0199"
                />
              </div>

            </div>

          </section>

          {/* Fees */}
          <section className="settings-section">

            <h3>Fees & Commission Setup</h3>

            <p className="settings-description">
              Configure global transaction fees applied to families
              and caregivers.
            </p>

            <div className="settings-form">

             <div className="form-field">
  <label>Caregiver Platform Fee (%)</label>

  <div className="input-with-suffix">
    <input
      type="number"
      defaultValue="10"
    />
    <span>%</span>
  </div>
   <p className="fee-description">
    Deducted from caregiver's hourly rate.
  </p>
</div>

              <div className="form-field">
  <label>Family Service Fee (%)</label>

  <div className="input-with-suffix">
    <input
      type="number"
      defaultValue="5"
    />
    <span>%</span>
  </div>
  <p className="fee-description">
    Added to family's total invoice.
  </p>
</div>
            </div>

          </section>

          {/* Automatic payouts */}
          <section className="payout-section">

            <div>
              <h3>Automatic Payouts</h3>

              <p>
                Process caregiver payouts automatically every Friday.
              </p>
            </div>

            <button
              className={`toggle-switch ${
                autoPayouts ? 'on' : ''
              }`}
              onClick={() => setAutoPayouts(!autoPayouts)}
              aria-label="Toggle automatic payouts"
            >
              <span />
            </button>

          </section>

          {/* Buttons */}
          <div className="settings-actions">

            <button className="discard-button">
              Discard Changes
            </button>

            <button className="save-button">
              Save Configuration
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}