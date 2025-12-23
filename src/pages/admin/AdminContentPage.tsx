import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Globe,
  MoreHorizontal,
  CheckCircle,
  Clock,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const legalPages = [
  { id: "terms", title: "Terms of Service", path: "/terms", lastUpdated: "Jan 10, 2024", status: "published" },
  { id: "privacy", title: "Privacy Policy", path: "/privacy", lastUpdated: "Jan 10, 2024", status: "published" },
  { id: "cookies", title: "Cookie Policy", path: "/cookies", lastUpdated: "Dec 15, 2023", status: "published" },
  { id: "refund", title: "Refund Policy", path: "/refund", lastUpdated: "Dec 10, 2023", status: "published" },
  { id: "contact", title: "Contact Us", path: "/contact", lastUpdated: "Nov 20, 2023", status: "published" },
];

const seoPages = [
  { path: "/", title: "AFIIIA – AI-Powered Women's Wellness", description: "Track your cycle, meals, workouts, and mood with AI-powered insights.", status: "optimized" },
  { path: "/home", title: "Dashboard | AFIIIA", description: "Your personalized wellness dashboard with daily insights.", status: "optimized" },
  { path: "/home/cycle", title: "Cycle Tracking | AFIIIA", description: "Track and predict your menstrual cycle with AI.", status: "needs_review" },
  { path: "/home/workout", title: "AI Workouts | AFIIIA", description: "Phase-aware workout plans tailored to your body.", status: "optimized" },
  { path: "/home/meal", title: "AI Meal Planner | AFIIIA", description: "Get personalized meal suggestions based on your ingredients.", status: "optimized" },
];

const AdminContentPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
            <h1 className="text-2xl font-bold text-white">Content Management</h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage legal pages, SEO, and static content
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="legal" className="space-y-4">
          <TabsList className="bg-slate-800/50 border border-slate-700/50">
            <TabsTrigger value="legal" className="data-[state=active]:bg-slate-700">
              Legal Pages
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-slate-700">
              SEO Settings
            </TabsTrigger>
            <TabsTrigger value="pregnancy" className="data-[state=active]:bg-slate-700">
              Pregnancy Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="legal">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Legal Pages</CardTitle>
                  <CardDescription className="text-slate-400">
                    Manage terms, privacy, and other legal content
                  </CardDescription>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Page
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-transparent">
                      <TableHead className="text-slate-400">Page</TableHead>
                      <TableHead className="text-slate-400">Path</TableHead>
                      <TableHead className="text-slate-400">Last Updated</TableHead>
                      <TableHead className="text-slate-400">Status</TableHead>
                      <TableHead className="text-slate-400 w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {legalPages.map((page) => (
                      <TableRow key={page.id} className="border-slate-700/50 hover:bg-slate-700/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-slate-400" />
                            <span className="font-medium text-white">{page.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm text-slate-400">{page.path}</TableCell>
                        <TableCell className="text-slate-400">{page.lastUpdated}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500/20 text-green-400">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Published
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-slate-400">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                              <DropdownMenuItem className="text-slate-300">
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-slate-300">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">SEO Configuration</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage meta titles, descriptions, and Open Graph tags
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-transparent">
                      <TableHead className="text-slate-400">Page</TableHead>
                      <TableHead className="text-slate-400">Title</TableHead>
                      <TableHead className="text-slate-400">Status</TableHead>
                      <TableHead className="text-slate-400 w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {seoPages.map((page) => (
                      <TableRow key={page.path} className="border-slate-700/50 hover:bg-slate-700/30">
                        <TableCell className="font-mono text-sm text-slate-400">{page.path}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-white text-sm">{page.title}</p>
                            <p className="text-xs text-slate-500 truncate max-w-[300px]">{page.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={page.status === "optimized" 
                            ? "bg-green-500/20 text-green-400" 
                            : "bg-yellow-500/20 text-yellow-400"
                          }>
                            {page.status === "optimized" ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <Clock className="w-3 h-3 mr-1" />
                            )}
                            {page.status === "optimized" ? "Optimized" : "Needs Review"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="icon" variant="ghost" className="text-slate-400">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pregnancy">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Pregnancy Week Content</CardTitle>
                <CardDescription className="text-slate-400">
                  Static content for pregnancy mode week-by-week cards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Select Week</Label>
                    <select className="w-full h-10 px-3 rounded-md bg-slate-700/50 border border-slate-600 text-white">
                      {Array.from({ length: 40 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>Week {i + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Baby Development</Label>
                  <Textarea
                    placeholder="Describe baby development for this week..."
                    className="bg-slate-700/50 border-slate-600 text-white resize-none"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Body Changes</Label>
                  <Textarea
                    placeholder="Describe body changes for this week..."
                    className="bg-slate-700/50 border-slate-600 text-white resize-none"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Lifestyle Tips</Label>
                  <Textarea
                    placeholder="Add lifestyle tips for this week..."
                    className="bg-slate-700/50 border-slate-600 text-white resize-none"
                    rows={3}
                  />
                </div>

                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => toast.success("Content saved successfully")}
                >
                  Save Content
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminContentPage;
