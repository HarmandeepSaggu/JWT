'use client';
import { useRouter } from 'next/navigation';

export default function EdashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('http://localhost:8000/logout', { method: 'POST', credentials: 'include' });
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Overview</h2>
              <span className="p-2 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">Today</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">1,285</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Active Now</p>
                <p className="text-2xl font-bold text-gray-800">42</p>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Recent Activity</h2>
              <span className="p-2 bg-green-100 text-green-600 rounded-full text-xs font-medium">Live</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">New user registered</span>
                <span className="ml-auto text-xs text-gray-400">2m ago</span>
              </li>
              <li className="flex items-center p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">System update completed</span>
                <span className="ml-auto text-xs text-gray-400">1h ago</span>
              </li>
            </ul>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all">
                <span className="text-sm font-medium">Add User</span>
              </button>
              <button className="flex items-center justify-center p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-all">
                <span className="text-sm font-medium">Reports</span>
              </button>
              <button className="flex items-center justify-center p-3 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-all">
                <span className="text-sm font-medium">Settings</span>
              </button>
              <button className="flex items-center justify-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all">
                <span className="text-sm font-medium">Help</span>
              </button>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Welcome to Your Admin Dashboard</h2>
          <p className="text-gray-600">
            This is your central hub for managing your application. From here, you can monitor user activity, 
            manage accounts, and access administrative tools. The quick action cards above provide easy access 
            to frequently used features.
          </p>
        </div>
      </main>
    </div>
  );
}