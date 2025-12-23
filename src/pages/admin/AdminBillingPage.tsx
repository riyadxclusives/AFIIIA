import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  DollarSign,
  Users,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Download,
  Eye,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const mockTransactions = [
  { id: "txn_1", customer: "Sarah Johnson", plan: "Radiance", amount: 19.99, status: "completed", date: "Jan 15, 2024" },
  { id: "txn_2", customer: "Emily Chen", plan: "Bloom", amount: 9.99, status: "completed", date: "Jan 14, 2024" },
  { id: "txn_3", customer: "Maria Garcia", plan: "Radiance", amount: 19.99, status: "completed", date: "Jan 12, 2024" },
  { id: "txn_4", customer: "Anna Smith", plan: "Bloom", amount: 9.99, status: "refunded", date: "Jan 10, 2024" },
  { id: "txn_5", customer: "Lisa Brown", plan: "Radiance", amount: 19.99, status: "completed", date: "Jan 8, 2024" },
  { id: "txn_6", customer: "Jennifer Lee", plan: "Bloom", amount: 9.99, status: "failed", date: "Jan 5, 2024" },
];

const subscriptionPlans = [
  { 
    id: "bloom", 
    name: "Bloom", 
    price: 9.99, 
    interval: "monthly",
    subscribers: 4613,
    features: ["Cycle Tracking", "Mood Logging", "Basic Workouts", "Hydration Tracking"]
  },
  { 
    id: "radiance", 
    name: "Radiance", 
    price: 19.99, 
    interval: "monthly",
    subscribers: 3621,
    features: ["Everything in Bloom", "AI Meal Planner", "AI Workout Planner", "Buddy Challenges", "Priority Support"]
  },
];

const AdminBillingPage = () => {
  const [paddleVendorId, setPaddleVendorId] = useState("");
  const [paddleApiKey, setPaddleApiKey] = useState("");

  const stats = [
    { label: "Monthly Revenue", value: "$48,290", icon: DollarSign, color: "text-green-400", change: "+23.1%" },
    { label: "Active Subscriptions", value: "8,234", icon: Users, color: "text-blue-400", change: "+8.2%" },
    { label: "Avg. Revenue/User", value: "$5.87", icon: TrendingUp, color: "text-purple-400", change: "+3.4%" },
    { label: "Churn Rate", value: "4.2%", icon: RefreshCw, color: "text-coral", change: "-0.8%" },
  ];

  const handleSaveCredentials = () => {
    toast.success("Paddle credentials saved successfully");
  };

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
            <h1 className="text-2xl font-bold text-white">Billing & Payments</h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage subscriptions and Paddle integration
            </p>
          </div>
          <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Paddle Dashboard
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                      <Badge className="bg-green-500/20 text-green-400 text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList className="bg-slate-800/50 border border-slate-700/50">
            <TabsTrigger value="transactions" className="data-[state=active]:bg-slate-700">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="plans" className="data-[state=active]:bg-slate-700">
              Plans
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-slate-700">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Recent Transactions</CardTitle>
                  <CardDescription className="text-slate-400">
                    View and manage payment transactions
                  </CardDescription>
                </div>
                <Button variant="outline" className="bg-slate-700/50 border-slate-600 text-slate-300">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-transparent">
                      <TableHead className="text-slate-400">Transaction ID</TableHead>
                      <TableHead className="text-slate-400">Customer</TableHead>
                      <TableHead className="text-slate-400">Plan</TableHead>
                      <TableHead className="text-slate-400">Amount</TableHead>
                      <TableHead className="text-slate-400">Status</TableHead>
                      <TableHead className="text-slate-400">Date</TableHead>
                      <TableHead className="text-slate-400 w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((txn) => (
                      <TableRow key={txn.id} className="border-slate-700/50 hover:bg-slate-700/30">
                        <TableCell className="font-mono text-xs text-slate-500">{txn.id}</TableCell>
                        <TableCell className="text-white">{txn.customer}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={txn.plan === "Radiance" 
                              ? "border-lavender/50 text-lavender" 
                              : "border-coral/50 text-coral"
                            }
                          >
                            {txn.plan}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white font-medium">${txn.amount}</TableCell>
                        <TableCell>
                          <Badge className={
                            txn.status === "completed" ? "bg-green-500/20 text-green-400" :
                            txn.status === "refunded" ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-red-500/20 text-red-400"
                          }>
                            {txn.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {txn.status === "refunded" && <RefreshCw className="w-3 h-3 mr-1" />}
                            {txn.status === "failed" && <XCircle className="w-3 h-3 mr-1" />}
                            {txn.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-400">{txn.date}</TableCell>
                        <TableCell>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subscriptionPlans.map((plan) => (
                <Card key={plan.id} className="bg-slate-800/50 border-slate-700/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{plan.name}</CardTitle>
                      <Badge className={plan.name === "Radiance" 
                        ? "bg-lavender/20 text-lavender" 
                        : "bg-coral/20 text-coral"
                      }>
                        {plan.subscribers.toLocaleString()} subscribers
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-400">
                      ${plan.price}/{plan.interval}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 bg-slate-700/50 border-slate-600 text-slate-300"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Paddle Configuration</CardTitle>
                <CardDescription className="text-slate-400">
                  Configure your Paddle payment integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Vendor ID</Label>
                    <Input
                      value={paddleVendorId}
                      onChange={(e) => setPaddleVendorId(e.target.value)}
                      placeholder="Enter your Paddle Vendor ID"
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">API Key</Label>
                    <Input
                      type="password"
                      value={paddleApiKey}
                      onChange={(e) => setPaddleApiKey(e.target.value)}
                      placeholder="Enter your Paddle API Key"
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h4 className="text-sm font-medium text-blue-400 mb-2">Webhook URL</h4>
                  <p className="text-xs text-slate-400 mb-2">
                    Configure this URL in your Paddle dashboard to receive payment events:
                  </p>
                  <code className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">
                    https://your-app.supabase.co/functions/v1/paddle-webhook
                  </code>
                </div>

                <Button onClick={handleSaveCredentials} className="bg-primary hover:bg-primary/90">
                  Save Credentials
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminBillingPage;
