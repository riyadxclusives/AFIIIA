import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Ban,
  Trash2,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  UserPlus,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const mockUsers = [
  { id: "1", name: "Sarah Johnson", email: "sarah@email.com", plan: "Radiance", status: "active", mode: "cycle", joined: "Jan 15, 2024", lastActive: "2 min ago" },
  { id: "2", name: "Emily Chen", email: "emily@email.com", plan: "Bloom", status: "active", mode: "fertility", joined: "Jan 14, 2024", lastActive: "1 hour ago" },
  { id: "3", name: "Maria Garcia", email: "maria@email.com", plan: "Radiance", status: "active", mode: "pregnant", joined: "Jan 12, 2024", lastActive: "3 hours ago" },
  { id: "4", name: "Anna Smith", email: "anna@email.com", plan: "Bloom", status: "trial", mode: "cycle", joined: "Jan 10, 2024", lastActive: "1 day ago" },
  { id: "5", name: "Lisa Brown", email: "lisa@email.com", plan: "Radiance", status: "active", mode: "cycle", joined: "Jan 8, 2024", lastActive: "2 days ago" },
  { id: "6", name: "Jennifer Lee", email: "jennifer@email.com", plan: "Bloom", status: "churned", mode: "fertility", joined: "Dec 20, 2023", lastActive: "2 weeks ago" },
  { id: "7", name: "Amanda White", email: "amanda@email.com", plan: "Radiance", status: "active", mode: "pregnant", joined: "Dec 15, 2023", lastActive: "5 min ago" },
  { id: "8", name: "Rachel Green", email: "rachel@email.com", plan: "Bloom", status: "suspended", mode: "cycle", joined: "Dec 10, 2023", lastActive: "1 month ago" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>;
    case "trial":
      return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Trial</Badge>;
    case "churned":
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Churned</Badge>;
    case "suspended":
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Suspended</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getModeBadge = (mode: string) => {
  switch (mode) {
    case "cycle":
      return <Badge variant="outline" className="border-coral/50 text-coral">Cycle</Badge>;
    case "fertility":
      return <Badge variant="outline" className="border-lavender/50 text-lavender">Fertility</Badge>;
    case "pregnant":
      return <Badge variant="outline" className="border-teal-500/50 text-teal-400">Pregnant</Badge>;
    default:
      return <Badge variant="outline">{mode}</Badge>;
  }
};

const AdminUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesPlan = planFilter === "all" || user.plan.toLowerCase() === planFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const toggleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
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
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage {mockUsers.length.toLocaleString()} registered users
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px] bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="churned">Churned</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger className="w-full sm:w-[150px] bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="bloom">Bloom</SelectItem>
                  <SelectItem value="radiance">Radiance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-transparent">
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={toggleSelectAll}
                      className="border-slate-600"
                    />
                  </TableHead>
                  <TableHead className="text-slate-400">User</TableHead>
                  <TableHead className="text-slate-400">Plan</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-slate-400">Mode</TableHead>
                  <TableHead className="text-slate-400">Joined</TableHead>
                  <TableHead className="text-slate-400">Last Active</TableHead>
                  <TableHead className="text-slate-400 w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-slate-700/50 hover:bg-slate-700/30"
                  >
                    <TableCell>
                      <Checkbox 
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => toggleSelectUser(user.id)}
                        className="border-slate-600"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary/20 text-primary text-sm">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={user.plan === "Radiance" ? "bg-lavender/20 text-lavender" : "bg-coral/20 text-coral"}
                      >
                        {user.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{getModeBadge(user.mode)}</TableCell>
                    <TableCell className="text-slate-400 text-sm">{user.joined}</TableCell>
                    <TableCell className="text-slate-400 text-sm">{user.lastActive}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                          <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-slate-700">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-300 focus:text-white focus:bg-slate-700">
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-700" />
                          <DropdownMenuItem className="text-yellow-400 focus:text-yellow-400 focus:bg-slate-700">
                            <Ban className="w-4 h-4 mr-2" />
                            Suspend User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400 focus:text-red-400 focus:bg-slate-700">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-slate-700/50">
            <p className="text-sm text-slate-400">
              Showing {filteredUsers.length} of {mockUsers.length} users
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 text-slate-300">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground border-primary">
                1
              </Button>
              <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 text-slate-300">
                2
              </Button>
              <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 text-slate-300">
                3
              </Button>
              <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 text-slate-300">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
