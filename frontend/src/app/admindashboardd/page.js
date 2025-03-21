'use client';
import { useRouter } from 'next/navigation';

export default function CEODashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('http://localhost:8000/logout', { method: 'POST', credentials: 'include' });
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
            <span className="ml-3 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">CEO View</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Welcome back, CEO</span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Executive Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Executive Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="text-sm font-medium text-green-800">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$1.2M</p>
              <p className="text-xs text-green-700">+12% from last month</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-blue-800">Customer Growth</p>
              <p className="text-2xl font-bold text-gray-900">24%</p>
              <p className="text-xs text-blue-700">+5% from last quarter</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <p className="text-sm font-medium text-purple-800">Profit Margin</p>
              <p className="text-2xl font-bold text-gray-900">32%</p>
              <p className="text-xs text-purple-700">+3% from target</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <p className="text-sm font-medium text-amber-800">Time to Market</p>
              <p className="text-2xl font-bold text-gray-900">18 days</p>
              <p className="text-xs text-amber-700">-22% from last year</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Strategic Initiatives */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Strategic Initiatives</h2>
              <span className="p-2 bg-indigo-100 text-indigo-600 rounded-full text-xs font-medium">Q1 2025</span>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">Market Expansion</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">On Track</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">65% complete - Target completion: Apr 15</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">Product Launch</h3>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">At Risk</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">35% complete - Target completion: May 1</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">Cost Optimization</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">100% complete - Finished on Feb 28</p>
              </div>
            </div>
          </div>

          {/* Key Team Metrics */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Team Performance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Engineering</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-2">92%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Sales</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-2">88%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Marketing</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-2">76%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '76%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Customer Support</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-2">94%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Finance</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-2">82%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Actions & Upcoming Decisions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Executive Actions */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Executive Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all">
                <span className="text-sm font-medium">Board Meeting</span>
              </button>
              <button className="flex items-center justify-center p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-all">
                <span className="text-sm font-medium">Quarterly Review</span>
              </button>
              <button className="flex items-center justify-center p-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-all">
                <span className="text-sm font-medium">Investor Update</span>
              </button>
              <button className="flex items-center justify-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all">
                <span className="text-sm font-medium">Strategic Planning</span>
              </button>
            </div>
          </div>

          {/* Upcoming Decisions */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Pending Decisions</h2>
            <ul className="space-y-3">
              <li className="flex items-center p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-800">Budget Approval for R&D</span>
                <span className="ml-auto text-xs font-medium text-red-700">Urgent</span>
              </li>
              <li className="flex items-center p-3 bg-amber-50 rounded-lg border border-amber-100">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-800">New Market Entry Strategy</span>
                <span className="ml-auto text-xs font-medium text-amber-700">This Week</span>
              </li>
              <li className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-800">Executive Hiring Decision</span>
                <span className="ml-auto text-xs font-medium text-blue-700">Next Week</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}