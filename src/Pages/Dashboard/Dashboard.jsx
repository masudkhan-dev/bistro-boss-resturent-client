import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  LayoutDashboard, 
  TrendingUp, 
  CheckCircle, 
  Inbox, 
  Box, 
  Users, 
  MessageCircle, 
  BarChart2, 
  Activity 
} from 'lucide-react';
import { motion } from 'framer-motion';

// Dashboard Card Component
const DashboardCard = ({ 
  title, 
  icon, 
  children, 
  className = '',
  contentClassName = '' 
}) => {
  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
          {icon}
          {title}
        </h3>
      </div>
      <div className={`p-5 ${contentClassName}`}>
        {children}
      </div>
    </motion.div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [inboxData, setInboxData] = useState([]);

  useEffect(() => {
    // Simulated data fetching
    setSalesData([
      { month: 'Jan', revenue: 15340 },
      { month: 'Feb', revenue: 17850 },
      { month: 'Mar', revenue: 19760 },
      { month: 'Apr', revenue: 21300 },
      { month: 'May', revenue: 18920 },
      { month: 'Jun', revenue: 20450 }
    ]);

    setTaskData([
      { task: 'Completed', count: 24, color: 'text-green-600' },
      { task: 'Pending', count: 6, color: 'text-yellow-600' }
    ]);

    setInboxData([
      { type: 'Unread', count: 45, color: 'text-blue-600' },
      { type: 'Read', count: 42, color: 'text-gray-600' }
    ]);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto">
        <motion.h1 
          className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LayoutDashboard size={36} />
          Dashboard
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <DashboardCard 
            title="Sales Overview" 
            icon={<TrendingUp className="text-blue-500" />}
          >
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #ddd', 
                    borderRadius: '8px' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#3B82F6', stroke: 'white', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </DashboardCard>

          {/* Tasks */}
          <DashboardCard 
            title="Task Management" 
            icon={<CheckCircle className="text-green-500" />}
          >
            <div className="grid grid-cols-2 gap-4">
              {taskData.map((item) => (
                <div 
                  key={item.task} 
                  className="text-center bg-gray-100 p-4 rounded-lg"
                >
                  <span className={`text-4xl font-bold block ${item.color}`}>
                    {item.count}
                  </span>
                  <p className="text-sm text-gray-600 mt-2">{item.task} Tasks</p>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* Inbox */}
          <DashboardCard 
            title="Inbox Status" 
            icon={<Inbox className="text-yellow-500" />}
          >
            <div className="grid grid-cols-2 gap-4">
              {inboxData.map((item) => (
                <div 
                  key={item.type} 
                  className="text-center bg-gray-100 p-4 rounded-lg"
                >
                  <span className={`text-4xl font-bold block ${item.color}`}>
                    {item.count}
                  </span>
                  <p className="text-sm text-gray-600 mt-2">{item.type} Messages</p>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* Inventory */}
          <DashboardCard 
            title="Inventory" 
            icon={<Box className="text-purple-500" />}
          >
            <div className="text-center text-gray-500">
              <p>Inventory management dashboard coming soon...</p>
            </div>
          </DashboardCard>

          {/* User Management */}
          <DashboardCard 
            title="User Management" 
            icon={<Users className="text-pink-500" />}
          >
            <div className="text-center text-gray-500">
              <p>User insights and management dashboard coming soon...</p>
            </div>
          </DashboardCard>

          {/* Messaging */}
          <DashboardCard 
            title="Messaging" 
            icon={<MessageCircle className="text-indigo-500" />}
          >
            <div className="text-center text-gray-500">
              <p>Comprehensive messaging dashboard coming soon...</p>
            </div>
          </DashboardCard>

          {/* New Analytics Card */}
          <DashboardCard 
            title="Analytics" 
            icon={<BarChart2 className="text-red-500" />}
          >
            <div className="text-center text-gray-500">
              <p>Deep dive into analytics coming soon...</p>
            </div>
          </DashboardCard>

          {/* Recent Activities Card */}
          <DashboardCard 
            title="Recent Activities" 
            icon={<Activity className="text-green-500" />}
          >
            <div className="text-center text-gray-500">
              <p>Track recent activities and logs...</p>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;