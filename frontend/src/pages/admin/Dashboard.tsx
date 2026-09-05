import {
  Users,
  UserCheck,
  Briefcase,
  DollarSign,
} from 'lucide-react';

export default function Dashboard() {
  const metrics = [
    {
      title: 'Total Users',
      value: '2,845',
      change: '▲ 12% this month',
      icon: Users,
    },
    {
      title: 'Active Caregivers',
      value: '482',
      change: '▲ 5% this month',
      icon: UserCheck,
    },
    {
      title: 'Jobs Today',
      value: '156',
      change: '12 currently in progress',
      icon: Briefcase,
    },
    {
      title: 'Monthly Revenue',
      value: '$42.5k',
      change: '▲ 18% this month',
      icon: DollarSign,
    },
  ];

  const applicants = [
    {
      initials: 'SJ',
      name: 'New Caregiver Applicant',
      time: 'Submitted 2 hours ago',
    },
    {
      initials: 'MR',
      name: 'New Caregiver Applicant',
      time: 'Submitted 3 hours ago',
    },
    {
      initials: 'KT',
      name: 'New Caregiver Applicant',
      time: 'Submitted 5 hours ago',
    },
  ];

  const activities = [
    {
      text: 'New Family Account created',
      meta: 'Just now • San Francisco, CA',
    },
    {
      text: 'Job BK-7829 Completed',
      meta: '15m ago • Payout processed',
    },
    {
      text: 'Caregiver Profile Updated',
      meta: '1 hour ago • David Chen',
    },
  ];

  return (
    <div className="dashboard-page">

      {/* Page heading */}
      <div className="dashboard-heading">
        <h2>Platform Overview</h2>
        <p>
          Monitor platform health, user growth, and active sessions.
        </p>
      </div>

      {/* Metric cards */}
      <div className="dashboard-metrics">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div className="metric-card" key={metric.title}>
              <div>
                <p className="metric-title">{metric.title}</p>

                <h3>{metric.value}</h3>

                <span className="metric-change">
                  {metric.change}
                </span>
              </div>

              <div className="metric-icon">
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom sections */}
      <div className="dashboard-sections">

        {/* Pending checks */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3>Pending Background Checks</h3>

            <button>View all</button>
          </div>

          <div className="applicant-list">
            {applicants.map((applicant) => (
              <div
                className="applicant-item"
                key={applicant.initials}
              >
                <div className="applicant-info">

                  <div className="applicant-avatar">
                    {applicant.initials}
                  </div>

                  <div>
                    <p>{applicant.name}</p>
                    <span>{applicant.time}</span>
                  </div>

                </div>

                <button className="review-button">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3>Recent Platform Activity</h3>
          </div>

          <div className="activity-list">
            {activities.map((activity, index) => (
              <div
                className="activity-item"
                key={index}
              >
                <div
  className={`activity-dot activity-dot-${index}`}
></div>
                <div>
                  <p>{activity.text}</p>
                  <span>{activity.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}