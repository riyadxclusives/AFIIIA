import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MoreHorizontal,
  Mail,
  Ban,
  Trash2,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  UserX,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: string;
  mode: string;
  joined: string;
  lastActive: string;
}

// Mock data
const initialUsers: User[] = [
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
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  
  // Dialog states
  const [suspendDialog, setSuspendDialog] = useState<{ open: boolean; user: User | null }>({ open: false, user: null });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; user: User | null }>({ open: false, user: null });

  const filteredUsers = users.filter(user => {
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

  const handleViewDetails = (user: User) => {
    toast.info(`Viewing details for ${user.name}`, {
      description: `Email: ${user.email} | Plan: ${user.plan}`,
    });
  };

  const handleSendEmail = (user: User) => {
    toast.success(`Email draft opened for ${user.name}`, {
      description: `Composing email to ${user.email}`,
    });
  };

  const handleSuspendUser = (user: User) => {
    setSuspendDialog({ open: true, user });
  };

  const confirmSuspendUser = () => {
    if (suspendDialog.user) {
      const isSuspended = suspendDialog.user.status === "suspended";
      setUsers(prev => prev.map(u => 
        u.id === suspendDialog.user!.id 
          ? { ...u, status: isSuspended ? "active" : "suspended" }
          : u
      ));
      toast.success(
        isSuspended ? `${suspendDialog.user.name} has been reactivated` : `${suspendDialog.user.name} has been suspended`,
        { description: isSuspended ? "User can now access their account" : "User will no longer be able to access their account" }
      );
    }
    setSuspendDialog({ open: false, user: null });
  };

  const handleDeleteUser = (user: User) => {
    setDeleteDialog({ open: true, user });
  };

  const confirmDeleteUser = () => {
    if (deleteDialog.user) {
      setUsers(prev => prev.filter(u => u.id !== deleteDialog.user!.id));
      setSelectedUsers(prev => prev.filter(id => id !== deleteDialog.user!.id));
      toast.success(`${deleteDialog.user.name} has been deleted`, {
        description: "User data has been permanently removed",
      });
    }
    setDeleteDialog({ open: false, user: null });
  };

  const handleExport = () => {
    toast.success("Export started", {
      description: `Exporting ${filteredUsers.length} users to CSV`,
    });
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
              Manage {users.length.toLocaleString()} registered users
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
              onClick={handleExport}
            >
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
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <UserX className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">No users found</h3>
                      <p className="text-slate-400">Try adjusting your search or filters</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user, index) => (
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
                            <DropdownMenuItem 
                              className="text-slate-300 focus:text-white focus:bg-slate-700"
                              onClick={() => handleViewDetails(user)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-slate-300 focus:text-white focus:bg-slate-700"
                              onClick={() => handleSendEmail(user)}
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-700" />
                            <DropdownMenuItem 
                              className="text-yellow-400 focus:text-yellow-400 focus:bg-slate-700"
                              onClick={() => handleSuspendUser(user)}
                            >
                              <Ban className="w-4 h-4 mr-2" />
                              {user.status === "suspended" ? "Reactivate User" : "Suspend User"}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-400 focus:text-red-400 focus:bg-slate-700"
                              onClick={() => handleDeleteUser(user)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-slate-700/50">
            <p className="text-sm text-slate-400">
              Showing {filteredUsers.length} of {users.length} users
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

      {/* Suspend User Dialog */}
      <AlertDialog open={suspendDialog.open} onOpenChange={(open) => setSuspendDialog({ open, user: suspendDialog.user })}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              {suspendDialog.user?.status === "suspended" ? "Reactivate User" : "Suspend User"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              {suspendDialog.user?.status === "suspended" 
                ? `Are you sure you want to reactivate ${suspendDialog.user?.name}? They will regain access to their account.`
                : `Are you sure you want to suspend ${suspendDialog.user?.name}? They will no longer be able to access their account.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmSuspendUser}
              className={suspendDialog.user?.status === "suspended" ? "bg-green-600 hover:bg-green-700" : "bg-yellow-600 hover:bg-yellow-700"}
            >
              {suspendDialog.user?.status === "suspended" ? "Reactivate" : "Suspend"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete User Dialog */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, user: deleteDialog.user })}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete User</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete {deleteDialog.user?.name}? This action cannot be undone and will permanently remove all their data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteUser}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminUsersPage;
