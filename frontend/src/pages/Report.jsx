import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

const COLORS = ['#22c55e', '#3b82f6', '#f59e42', '#ef4444', '#a21caf', '#eab308', '#0ea5e9', '#f43f5e'];

const Report = () => {
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({ topic: '', difficulty: '', startDate: '', endDate: '' });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.topic) params.topic = filters.topic;
      if (filters.difficulty) params.difficulty = filters.difficulty;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      const res = await axios.get('/api/quiz-report', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params,
      });
      setStats(res.data);
    } catch (err) {
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); /* eslint-disable-next-line */ }, [JSON.stringify(filters)]);

  // Prepare chart data
  const topicData = stats
    ? Object.entries(stats.topicStats)
        .map(([k, v]) => ({
          name: k,
          quizzes: v.quizzes,
          avgScore: v.quizzes ? Number((v.totalScore / v.quizzes).toFixed(2)) : 0
        }))
    : [];
  const difficultyData = stats
    ? Object.entries(stats.difficultyStats)
        .map(([k, v]) => ({
          name: k,
          quizzes: v.quizzes,
          avgScore: v.quizzes ? Number((v.totalScore / v.quizzes).toFixed(2)) : 0
        }))
    : [];

  console.log('Average Score per Topic data:', topicData);
  console.log('Average Score per Difficulty data:', difficultyData);
  const progressData = stats ? stats.progress.map(p => ({ ...p, date: new Date(p.date).toLocaleDateString() })) : [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-6 relative text-white">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-10 text-center pt-8">My Quiz Report</h2>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <input type="date" value={filters.startDate} onChange={e => setFilters(f => ({ ...f, startDate: e.target.value }))} className="bg-gray-800 text-white rounded px-3 py-2" />
            <input type="date" value={filters.endDate} onChange={e => setFilters(f => ({ ...f, endDate: e.target.value }))} className="bg-gray-800 text-white rounded px-3 py-2" />
            <input type="text" placeholder="Topic" value={filters.topic} onChange={e => setFilters(f => ({ ...f, topic: e.target.value }))} className="bg-gray-800 text-white rounded px-3 py-2" />
            <input type="text" placeholder="Difficulty" value={filters.difficulty} onChange={e => setFilters(f => ({ ...f, difficulty: e.target.value }))} className="bg-gray-800 text-white rounded px-3 py-2" />
            <button onClick={fetchStats} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold">Apply</button>
          </div>
          {loading ? (
            <div className="text-center text-blue-200 text-lg">Loading...</div>
          ) : !stats ? (
            <div className="text-center text-red-400 text-lg">Failed to load report.</div>
          ) : (
            <>
              {/* Numerical Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-gray-800/80 rounded-2xl p-6 shadow flex flex-col items-center">
                  <div className="text-3xl font-bold text-blue-400">{stats.totalQuizzes}</div>
                  <div className="text-gray-300 mt-2">Total Quizzes</div>
                </div>
                <div className="bg-gray-800/80 rounded-2xl p-6 shadow flex flex-col items-center">
                  <div className="text-3xl font-bold text-green-400">{stats.totalQuestions}</div>
                  <div className="text-gray-300 mt-2">Total Questions</div>
                </div>
                <div className="bg-gray-800/80 rounded-2xl p-6 shadow flex flex-col items-center">
                  <div className="text-3xl font-bold text-yellow-400">{stats.averageScore}</div>
                  <div className="text-gray-300 mt-2">Average Score</div>
                </div>
                <div className="bg-gray-800/80 rounded-2xl p-6 shadow flex flex-col items-center">
                  <div className="text-3xl font-bold text-pink-400">{stats.bestScore}</div>
                  <div className="text-gray-300 mt-2">Best Score</div>
                </div>
              </div>
              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div className="bg-gray-800/80 rounded-2xl p-6 shadow">
                  <h3 className="text-lg font-bold mb-4 text-blue-200">Quizzes per Topic</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={topicData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#a5b4fc" />
                      <YAxis stroke="#a5b4fc" />
                      <Tooltip />
                      <Bar dataKey="quizzes" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-gray-800/80 rounded-2xl p-6 shadow">
                  <h3 className="text-lg font-bold mb-4 text-blue-200">Quizzes per Difficulty</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={difficultyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#a5b4fc" />
                      <YAxis stroke="#a5b4fc" />
                      <Tooltip />
                      <Bar dataKey="quizzes" fill="#f59e42" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-gray-800/80 rounded-2xl p-6 shadow">
                  <h3 className="text-lg font-bold mb-4 text-blue-200">Average Score per Topic</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={topicData} dataKey="avgScore" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {topicData.map((entry, idx) => <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-gray-800/80 rounded-2xl p-6 shadow">
                  <h3 className="text-lg font-bold mb-4 text-blue-200">Average Score per Difficulty</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={difficultyData} dataKey="avgScore" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {difficultyData.map((entry, idx) => <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {/* Progress Over Time */}
              <div className="bg-gray-800/80 rounded-2xl p-6 shadow mb-10">
                <h3 className="text-lg font-bold mb-4 text-blue-200">Progress Over Time</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={progressData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <XAxis dataKey="date" stroke="#a5b4fc" />
                    <YAxis stroke="#a5b4fc" />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Recent Attempts */}
              <div className="bg-gray-800/80 rounded-2xl p-6 shadow mb-10">
                <h3 className="text-lg font-bold mb-4 text-blue-200">Recent Attempts</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="text-blue-300">
                        <th className="py-2 px-4">Date</th>
                        <th className="py-2 px-4">Topic</th>
                        <th className="py-2 px-4">Difficulty</th>
                        <th className="py-2 px-4">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentAttempts.map((a, i) => (
                        <tr key={i} className="border-b border-gray-700">
                          <td className="py-2 px-4">{new Date(a.date).toLocaleString()}</td>
                          <td className="py-2 px-4">{a.topic}</td>
                          <td className="py-2 px-4">{a.difficulty}</td>
                          <td className="py-2 px-4">{a.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Report;