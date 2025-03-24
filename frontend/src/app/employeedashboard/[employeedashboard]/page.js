'use client';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';

export default function EmployeeDashboard({ params }) {
  const router = useRouter();
  const resolvedParams = use(params); // Unwrapping the promise
  const [data, setData] = useState([]);
  const [todos, setTodos] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showTodos, setShowTodos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    await fetch('http://localhost:8000/logout', { method: 'POST', credentials: 'include' });
    router.push('/login');
  };

  const fetchData = async (type) => {
    setIsLoading(true);
    try {
      const verifyRes = await api.get('http://localhost:8000/verify-token');
      if (!verifyRes.data.valid) {
        router.push('/login');
        return;
      }

      if (type === "comments") {
        const postsRes = await api.get('/posts');
        setData(postsRes.data.slice(0, 5)); // Fetch only 5 comments
        setShowComments(true);
      } else if (type === "todos") {
        const todosRes = await api.get('/todos');
        setTodos(todosRes.data.slice(0, 5)); // Fetch only 5 todos
        setShowTodos(true);
      }
    } catch (err) {
      console.error(`Error fetching ${type}`, err);
    } finally {
      setIsLoading(false);
    }
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
              <span className="text-xl font-bold text-indigo-700">{resolvedParams.employeedashboard || 'Employee'}</span>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Comments Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Comments</h2>
          <button onClick={() => fetchData("comments")} className="w-full p-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all">
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>
          {showComments && (
            <ul className="space-y-2 mt-4">
              {data.map((item) => (
                <li key={item.id} className="p-2 bg-gray-50 rounded-lg text-sm text-gray-700">{item.title}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Todos Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Todos</h2>
          <button onClick={() => fetchData("todos")} className="w-full p-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all">
            {showTodos ? 'Hide Todos' : 'Show Todos'}
          </button>
          {showTodos && (
            <ul className="space-y-2 mt-4">
              {todos.map((todo) => (
                <li key={todo.id} className="p-2 bg-gray-50 rounded-lg text-sm text-gray-700">{todo.title}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
