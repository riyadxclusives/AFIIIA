import { useState } from "react";
import { motion } from "framer-motion";
import {
  Database,
  Table as TableIcon,
  Search,
  Download,
  RefreshCw,
  ChevronRight,
  Eye,
  Trash2,
  Plus,
  FileJson,
  Shield,
  Columns,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockTables = [
  { name: "profiles", rows: 12847, size: "2.4 MB", hasRls: true },
  { name: "cycle_logs", rows: 145234, size: "8.2 MB", hasRls: true },
  { name: "mood_logs", rows: 234567, size: "12.1 MB", hasRls: true },
  { name: "workouts", rows: 89234, size: "5.6 MB", hasRls: true },
  { name: "meals", rows: 167890, size: "9.3 MB", hasRls: true },
  { name: "hydration_logs", rows: 456789, size: "18.4 MB", hasRls: true },
  { name: "challenges", rows: 3456, size: "0.8 MB", hasRls: true },
  { name: "challenge_checkins", rows: 23456, size: "1.2 MB", hasRls: true },
  { name: "subscriptions", rows: 8234, size: "1.1 MB", hasRls: true },
  { name: "user_badges", rows: 45678, size: "2.3 MB", hasRls: true },
  { name: "ai_logs", rows: 567890, size: "45.2 MB", hasRls: false },
  { name: "system_logs", rows: 1234567, size: "89.1 MB", hasRls: false },
];

const mockTableData = [
  { id: "uuid-1", name: "Sarah Johnson", email: "sarah@email.com", created_at: "2024-01-15 10:23:45" },
  { id: "uuid-2", name: "Emily Chen", email: "emily@email.com", created_at: "2024-01-14 15:45:12" },
  { id: "uuid-3", name: "Maria Garcia", email: "maria@email.com", created_at: "2024-01-12 09:12:33" },
  { id: "uuid-4", name: "Anna Smith", email: "anna@email.com", created_at: "2024-01-10 14:56:21" },
  { id: "uuid-5", name: "Lisa Brown", email: "lisa@email.com", created_at: "2024-01-08 11:34:56" },
];

const AdminDatabasePage = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>("profiles");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTables = mockTables.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSize = mockTables.reduce((acc, t) => {
    const size = parseFloat(t.size);
    return acc + size;
  }, 0);

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
            <h1 className="text-2xl font-bold text-white">Database Explorer</h1>
            <p className="text-slate-400 text-sm mt-1">
              Browse and manage database tables
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-300">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TableIcon className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{mockTables.length}</p>
                  <p className="text-xs text-slate-400">Tables</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{totalSize.toFixed(1)} MB</p>
                  <p className="text-xs text-slate-400">Total Size</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Columns className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">2.9M</p>
                  <p className="text-xs text-slate-400">Total Rows</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-coral" />
                <div>
                  <p className="text-2xl font-bold text-white">{mockTables.filter(t => t.hasRls).length}</p>
                  <p className="text-xs text-slate-400">RLS Enabled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table List */}
          <Card className="lg:col-span-1 bg-slate-800/50 border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base">Tables</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  placeholder="Search tables..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-slate-700/50 border-slate-600 text-white text-sm"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="space-y-1 p-2">
                  {filteredTables.map((table) => (
                    <button
                      key={table.name}
                      onClick={() => setSelectedTable(table.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${
                        selectedTable === table.name
                          ? "bg-primary/20 text-primary"
                          : "text-slate-300 hover:bg-slate-700/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <TableIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{table.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {table.hasRls && (
                          <Shield className="w-3 h-3 text-green-400" />
                        )}
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Table Data */}
          <Card className="lg:col-span-3 bg-slate-800/50 border-slate-700/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <TableIcon className="w-5 h-5" />
                  {selectedTable || "Select a table"}
                </CardTitle>
                {selectedTable && (
                  <CardDescription className="text-slate-400">
                    {mockTables.find(t => t.name === selectedTable)?.rows.toLocaleString()} rows · 
                    {mockTables.find(t => t.name === selectedTable)?.size}
                  </CardDescription>
                )}
              </div>
              {selectedTable && (
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="bg-slate-700/50 border-slate-600 text-slate-300">
                    <FileJson className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Insert Row
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {selectedTable ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700 hover:bg-transparent">
                        <TableHead className="text-slate-400">id</TableHead>
                        <TableHead className="text-slate-400">name</TableHead>
                        <TableHead className="text-slate-400">email</TableHead>
                        <TableHead className="text-slate-400">created_at</TableHead>
                        <TableHead className="text-slate-400 w-20">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTableData.map((row) => (
                        <TableRow key={row.id} className="border-slate-700/50 hover:bg-slate-700/30">
                          <TableCell className="font-mono text-xs text-slate-500">{row.id}</TableCell>
                          <TableCell className="text-white">{row.name}</TableCell>
                          <TableCell className="text-slate-400">{row.email}</TableCell>
                          <TableCell className="text-slate-400 text-sm">{row.created_at}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  Select a table to view its data
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDatabasePage;
