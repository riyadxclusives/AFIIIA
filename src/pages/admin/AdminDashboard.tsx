import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    title: "Active Subscriptions",
    value: "8,234",
    change: "+8.2%",
    trend: "up",
    icon: CreditCard,
    color: "bg-green-500/20 text-green-400",
  },
  {
    title: "Monthly Revenue",
    value: "$48,290",
    change: "+23.1%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "Daily Active",
    value: "3,421",
    change: "-2.4%",
    trend: "down",
    icon: Activity,
    color: "bg-coral/20 text-coral",
  },
];

const recentUsers = [
  { name: "Sarah Johnson", email: "sarah@email.com", plan: "Radiance", joined: "2 min ago" },
  { name: "Emily Chen", email: "emily@email.com", plan: "Bloom", joined: "15 min ago" },
  { name: "Maria Garcia", email: "maria@email.com", plan: "Radiance", joined: "1 hour ago" },
  { name: "Anna Smith", email: "anna@email.com", plan: "Bloom", joined: "3 hours ago" },
  { name: "Lisa Brown", email: "lisa@email.com", plan: "Radiance", joined: "5 hours ago" },
];

const recentActivity = [
  { action: "New subscription", user: "Sarah J.", type: "Radiance", time: "2 min ago" },
  { action: "Feature flag toggled", user: "Admin", type: "Buddy Challenges", time: "1 hour ago" },
  { action: "User upgraded", user: "Emily C.", type: "Bloom → Radiance", time: "2 hours ago" },
  { action: "Refund processed", user: "Jane D.", type: "$9.99", time: "4 hours ago" },
  { action: "Notification sent", user: "System", type: "Cycle reminder", time: "6 hours ago" },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">
              Welcome back! Here's what's happening with AFIIIA.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 days
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/80 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${
                        stat.trend === "up" ? "text-green-400" : "text-red-400"
                      }`}>
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {stat.change}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-sm text-slate-400 mt-1">{stat.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-white text-lg">Recent Signups</CardTitle>
                <CardDescription className="text-slate-400">
                  New users in the last 24 hours
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentUsers.map((user, index) => (
                <motion.div
                  key={user.email}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/20 text-primary text-sm">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="secondary"
                      className={user.plan === "Radiance" ? "bg-lavender/20 text-lavender" : "bg-coral/20 text-coral"}
                    >
                      {user.plan}
                    </Badge>
                    <p className="text-xs text-slate-500 mt-1">{user.joined}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
                <CardDescription className="text-slate-400">
                  Latest system events
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div>
                      <p className="text-sm font-medium text-white">{activity.action}</p>
                      <p className="text-xs text-slate-400">
                        {activity.user} · {activity.type}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col gap-2 bg-slate-700/30 border-slate-600 text-white hover:bg-slate-700 hover:text-white"
              >
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Add User</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col gap-2 bg-slate-700/30 border-slate-600 text-white hover:bg-slate-700 hover:text-white"
              >
                <CreditCard className="w-5 h-5 text-green-400" />
                <span className="text-sm">View Billing</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col gap-2 bg-slate-700/30 border-slate-600 text-white hover:bg-slate-700 hover:text-white"
              >
                <Activity className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Send Notification</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col gap-2 bg-slate-700/30 border-slate-600 text-white hover:bg-slate-700 hover:text-white"
              >
                <TrendingUp className="w-5 h-5 text-coral" />
                <span className="text-sm">View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboard;
