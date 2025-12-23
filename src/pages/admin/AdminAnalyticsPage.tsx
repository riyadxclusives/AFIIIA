import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const userGrowthData = [
  { month: "Jul", users: 4200, active: 2800 },
  { month: "Aug", users: 5400, active: 3600 },
  { month: "Sep", users: 6800, active: 4500 },
  { month: "Oct", users: 8200, active: 5800 },
  { month: "Nov", users: 10500, active: 7200 },
  { month: "Dec", users: 12847, active: 8900 },
];

const revenueData = [
  { month: "Jul", revenue: 28400 },
  { month: "Aug", revenue: 32100 },
  { month: "Sep", revenue: 36800 },
  { month: "Oct", revenue: 41200 },
  { month: "Nov", revenue: 45600 },
  { month: "Dec", revenue: 48290 },
];

const engagementData = [
  { day: "Mon", workouts: 3200, meals: 4100, mood: 5200 },
  { day: "Tue", workouts: 3400, meals: 4300, mood: 5100 },
  { day: "Wed", workouts: 3100, meals: 4000, mood: 4900 },
  { day: "Thu", workouts: 3500, meals: 4200, mood: 5300 },
  { day: "Fri", workouts: 2900, meals: 3800, mood: 4800 },
  { day: "Sat", workouts: 4200, meals: 4500, mood: 5500 },
  { day: "Sun", workouts: 4500, meals: 4800, mood: 5800 },
];

const planDistribution = [
  { name: "Bloom", value: 4613, color: "#F97316" },
  { name: "Radiance", value: 3621, color: "#A855F7" },
  { name: "Trial", value: 2145, color: "#3B82F6" },
  { name: "Churned", value: 2468, color: "#6B7280" },
];

const modeDistribution = [
  { name: "Cycle", value: 6823, color: "#F97316" },
  { name: "Fertility", value: 3412, color: "#A855F7" },
  { name: "Pregnant", value: 2612, color: "#14B8A6" },
];

const AdminAnalyticsPage = () => {
  const kpis = [
    { label: "Total Users", value: "12,847", change: "+12.5%", trend: "up" },
    { label: "Monthly Revenue", value: "$48,290", change: "+23.1%", trend: "up" },
    { label: "Daily Active Users", value: "3,421", change: "-2.4%", trend: "down" },
    { label: "Avg. Session Duration", value: "8m 32s", change: "+5.2%", trend: "up" },
  ];

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
            <h1 className="text-2xl font-bold text-white">Analytics</h1>
            <p className="text-slate-400 text-sm mt-1">
              Track user engagement and business metrics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="30d">
              <SelectTrigger className="w-[150px] bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-slate-400">{kpi.label}</p>
                    <Badge className={kpi.trend === "up" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-red-500/20 text-red-400"
                    }>
                      {kpi.trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 mr-1" />
                      )}
                      {kpi.change}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-white">{kpi.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">User Growth</CardTitle>
              <CardDescription className="text-slate-400">
                Total vs active users over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#A855F7"
                      fill="#A855F7"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="active"
                      stroke="#14B8A6"
                      fill="#14B8A6"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Monthly Revenue</CardTitle>
              <CardDescription className="text-slate-400">
                Revenue trend over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => [`$${value}`, "Revenue"]}
                    />
                    <Bar dataKey="revenue" fill="#F97316" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Engagement by Feature */}
          <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Weekly Engagement</CardTitle>
              <CardDescription className="text-slate-400">
                Feature usage by day of week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="workouts" stroke="#F97316" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="meals" stroke="#A855F7" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="mood" stroke="#14B8A6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-coral" />
                  <span className="text-sm text-slate-400">Workouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-lavender" />
                  <span className="text-sm text-slate-400">Meals</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-teal-500" />
                  <span className="text-sm text-slate-400">Mood</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Distribution Charts */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base">Plan Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[100px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={planDistribution}
                        innerRadius={30}
                        outerRadius={45}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {planDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {planDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-slate-400">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base">Health Modes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[100px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={modeDistribution}
                        innerRadius={30}
                        outerRadius={45}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {modeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-1 mt-2">
                  {modeDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-slate-400">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;
