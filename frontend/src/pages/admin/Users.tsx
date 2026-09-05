import { Search, Plus, MoreVertical } from 'lucide-react';
import type { UserItem } from '../../types/admin';

const usersData: UserItem[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Family',
    status: 'Active',
    joinedDate: 'Oct 12, 2026',
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    email: 'sarah@example.com',
    role: 'Caregiver',
    status: 'Active',
    joinedDate: 'Sep 05, 2026',
  },
  {
    id: '3',
    name: 'Michael Smith',
    email: 'mike@example.com',
    role: 'Family',
    status: 'Suspended',
    joinedDate: 'Aug 22, 2026',
  },
  {
    id: '4',
    name: 'Alice Thompson',
    email: 'alice@example.com',
    role: 'Caregiver',
    status: 'Pending',
    joinedDate: 'Oct 23, 2026',
  },
  {
    id: '5',
    name: 'David Chen',
    email: 'david@example.com',
    role: 'Caregiver',
    status: 'Active',
    joinedDate: 'Jul 18, 2026',
  },
];

export default function Users() {
  return (
    <div className="admin-page">
      {/* Heading */}
      <div className="page-heading-row">
        <div>
          <h2>User Management</h2>
          <p>View and manage all platform accounts.</p>
        </div>

        <button className="primary-button">
          <Plus size={16} />
          Add User Manually
        </button>
      </div>

      {/* Users table */}
      <div className="admin-table-card">

        {/* Search and filters */}
        <div className="table-toolbar">

          <div className="search-box">
            <Search size={17} />

            <input
              type="text"
              placeholder="Search users by name or email..."
            />
          </div>

          <div className="filter-group">
            <select>
              <option>All Roles</option>
              <option>Family</option>
              <option>Caregiver</option>
            </select>

            <select>
              <option>All Status</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Pending</option>
            </select>
          </div>

        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="admin-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {usersData.map((user) => {

                const initials = user.name
                  .split(' ')
                  .map((name) => name[0])
                  .join('');

                return (
                  <tr key={user.id}>

                    <td>
                      <div className="user-cell">

                        <div className="user-avatar">
                          {initials}
                        </div>

                        <div>
                          <div className="user-name">
                            {user.name}
                          </div>

                          <div className="user-email">
                            {user.email}
                          </div>
                        </div>

                      </div>
                    </td>

                    <td>{user.role}</td>

                    <td>
                      <span
                        className={`status-badge status-${user.status.toLowerCase()}`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>{user.joinedDate}</td>

                    <td className="actions-cell">
                      <button className="icon-button">
                        <MoreVertical size={18} />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
               </div>

        {/* Pagination */}
        <div className="users-pagination">
          <span>Showing 1 to 5 of 2,845 entries</span>

          <div className="pagination-buttons">
            <button>Prev</button>
            <button>Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}