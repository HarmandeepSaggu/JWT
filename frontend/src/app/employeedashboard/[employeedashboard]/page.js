'use client';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


export default function EmployeeDashboard({params}) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    await fetch('http://localhost:8000/logout', { method: 'POST', credentials: 'include' });
    router.push('/login');
  };
  
  const fetchComments = async () => {
      try {
        // Verify if token is still valid before making API calls
        const verifyRes = await api.get('http://localhost:8000/verify-token');
  
        if (verifyRes.data.valid) {
          const res = await api.get('/posts');
          setData(res.data);
        } else {
          router.push('/login'); // Redirect if token is invalid
        }
      } catch (err) {
        console.error('Error fetching data', err);  
      }
    
  };
  

  const toggleComments = () => {
    // If we're about to show comments and have no data, fetch it
    if (!showComments && data.length === 0) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
           <h1 className="text-xl font-bold text-gray-800">Employee Dashboard</h1>
          <div className="flex items-center gap-4">
             <div className="bg-gray-100 px-4 py-2 rounded-lg">
               <span className="text-gray-600 mr-1">Welcome,</span>
               <span className="text-xl font-bold text-indigo-700">{params.employeedashboard}</span>
             </div>
             <button 
               onClick={handleLogout}
               className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
             >
               Sign Out
             </button>
           </div>
         </div>
       </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Task Summary Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Tasks Summary</h2>
              <span className="p-2 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">Today</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-2xl font-bold text-gray-800">5</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Upcoming</p>
                <p className="text-2xl font-bold text-gray-800">2</p>
              </div>
            </div>
            {/* Comments Button */}
            <div className="mt-4">
              <button 
                onClick={toggleComments}
                className="flex items-center justify-center w-full p-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all"
              >
                {showComments ? 'Hide Comments' : 'Show Comments'}
              </button>
            </div>
          </div>

          {/* Comments Section - Only visible when toggled */}
          {showComments && (
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Comments</h2>
              {isLoading ? (
                <div className="flex justify-center items-center h-24">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <ul className="space-y-2">
                  {data.slice(0, 5).map((item) => (
                    <li key={item.id} className="p-2 bg-gray-50 rounded-lg text-sm text-gray-700">{item.title}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Schedule Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Today's Schedule</h2>
              <span className="p-2 bg-green-100 text-green-600 rounded-full text-xs font-medium">March 19</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Team meeting</span>
                <span className="ml-auto text-xs text-gray-400">9:00 AM</span>
              </li>
              <li className="flex items-center p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Project deadline</span>
                <span className="ml-auto text-xs text-gray-400">2:00 PM</span>
              </li>
              <li className="flex items-center p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">1:1 with manager</span>
                <span className="ml-auto text-xs text-gray-400">4:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all">
                <span className="text-sm font-medium">View Tasks</span>
              </button>
              <button className="flex items-center justify-center p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-all">
                <span className="text-sm font-medium">Submit Report</span>
              </button>
              <button className="flex items-center justify-center p-3 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-all">
                <span className="text-sm font-medium">Request Time Off</span>
              </button>
              <button className="flex items-center justify-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all">
                <span className="text-sm font-medium">Contact HR</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Recent Notifications</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-gray-700">Your timesheet for last week has been approved.</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <p className="text-sm text-gray-700">Please complete your quarterly skills assessment by Friday.</p>
              <p className="text-xs text-gray-500 mt-1">Yesterday</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-gray-700">Congratulations on your 2-year anniversary with the company!</p>
              <p className="text-xs text-gray-500 mt-1">3 days ago</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
