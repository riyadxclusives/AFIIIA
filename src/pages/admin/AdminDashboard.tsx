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
  Loader2,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAdminStats, useAdminUsers } from "@/hooks/useAdminData";

const AdminDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: users, isLoading: usersLoading } = useAdminUsers();

  const recentUsers = users?.slice(0, 5) || [];

  const statsData = [
    {
      title: "Total Users",
      value: stats?.totalUsers?.toLocaleString() || "0",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Active Subscriptions",
      value: stats?.activeSubscriptions?.toLocaleString() || "0",
      change: "+8.2%",
      trend: "up",
      icon: CreditCard,
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Recent Signups",
      value: stats?.recentSignups?.toLocaleString() || "0",
      change: "Last 24h",
      trend: "up",
      icon: TrendingUp,
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      title: "Free Users",
      value: stats?.subscriptions?.free?.toLocaleString() || "0",
      change: "",
      trend: "neutral",
      icon: Activity,
      color: "bg-coral/20 text-coral",
    },
  ];

  if (statsLoading || usersLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

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
            <h1 className="text-2xl font-bold text-slate-100">Dashboard</h1>
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
          {statsData.map((stat, index) => {
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
                      {stat.change && (
                        <div className={`flex items-center gap-1 text-sm ${
                          stat.trend === "up" ? "text-green-400" : stat.trend === "down" ? "text-red-400" : "text-slate-400"
                        }`}>
                          {stat.trend === "up" && <ArrowUpRight className="w-4 h-4" />}
                          {stat.trend === "down" && <ArrowDownRight className="w-4 h-4" />}
                          {stat.change}
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-slate-100">{stat.value}</p>
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
                <CardTitle className="text-slate-100 text-lg">Recent Signups</CardTitle>
                <CardDescription className="text-slate-400">
                  New users in the last 24 hours
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentUsers.length === 0 ? (
                <p className="text-slate-400 text-center py-4">No users yet</p>
              ) : (
                recentUsers.map((user: any, index: number) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/20 text-primary text-sm">
                          {user.first_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-slate-100">
                          {user.first_name || 'Unnamed User'}
                        </p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant="secondary"
                        className={user.subscription_plan === "radiance" ? "bg-lavender/20 text-lavender" : user.subscription_plan === "bloom" ? "bg-coral/20 text-coral" : "bg-slate-600 text-slate-300"}
                      >
                        {user.subscription_plan || 'free'}
                      </Badge>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Subscription Breakdown */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-slate-100 text-lg">Subscription Breakdown</CardTitle>
                <CardDescription className="text-slate-400">
                  Users by subscription tier
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Free', count: stats?.subscriptions?.free || 0, color: 'bg-slate-500' },
                { name: 'Bloom', count: stats?.subscriptions?.bloom || 0, color: 'bg-coral' },
                { name: 'Radiance', count: stats?.subscriptions?.radiance || 0, color: 'bg-lavender' },
              ].map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${tier.color}`} />
                    <span className="text-slate-100 font-medium">{tier.name}</span>
                  </div>
                  <span className="text-slate-400">{tier.count} users</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-slate-100 text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col gap-2 bg-slate-700/30 border-slate-600 text-slate-100 hover:bg-slate-700 hover:text-slate-100"
                onClick={() => window.location.href = '/admin/users'}
              >
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Manage Users</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col gap-2 bg-slate-700/30 border-slate-600 text-slate-100 hover:bg-slate-700 hover:text-slate-100"
                onClick={() => window.location.href = '/admin/billing'}
              >
                <CreditCard className="w-5 h-5 text-green-400" />
                <span className="text-sm">View Billing</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col gap-2 bg-slate-700/30 border-slate-600 text-slate-100 hover:bg-slate-700 hover:text-slate-100"
                onClick={() => window.location.href = '/admin/notifications'}
              >
                <Activity className="w-5 h-5 text-purple-400" />
                <span className="text-sm">Send Notification</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col gap-2 bg-slate-700/30 border-slate-600 text-slate-100 hover:bg-slate-700 hover:text-slate-100"
                onClick={() => window.location.href = '/admin/analytics'}
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
