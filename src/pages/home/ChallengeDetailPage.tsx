import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Share2, 
  Calendar, 
  Users, 
  Flame, 
  Check, 
  Trophy,
  MessageCircle,
  Clock
} from "lucide-react";
import AppLayout from "@/components/app/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Leaderboard from "@/components/challenges/Leaderboard";
import { toast } from "sonner";

// Mock data for a specific challenge
const mockChallengeDetail = {
  id: "1",
  title: "Hydration Heroes",
  type: "hydration" as const,
  description: "Drink at least 8 glasses of water every day for a week. Stay hydrated and feel amazing!",
  duration: 7,
  daysCompleted: 3,
  startDate: "Jan 1, 2024",
  endDate: "Jan 8, 2024",
  myStreak: 3,
  checkedInToday: false,
  createdBy: "Sarah",
  checkInHistory: [
    { day: 1, checkedIn: true, date: "Jan 1" },
    { day: 2, checkedIn: true, date: "Jan 2" },
    { day: 3, checkedIn: true, date: "Jan 3" },
    { day: 4, checkedIn: false, date: "Jan 4" },
    { day: 5, checkedIn: false, date: "Jan 5" },
    { day: 6, checkedIn: false, date: "Jan 6" },
    { day: 7, checkedIn: false, date: "Jan 7" },
  ],
};

const mockLeaderboard = [
  { id: "2", name: "Sarah", avatar: "", streak: 5, totalCheckIns: 5, rank: 1, isCurrentUser: false },
  { id: "3", name: "Emma", avatar: "", streak: 4, totalCheckIns: 4, rank: 2, isCurrentUser: false },
  { id: "1", name: "You", avatar: "", streak: 3, totalCheckIns: 3, rank: 3, isCurrentUser: true },
];

const typeConfig = {
  hydration: { icon: "💧", color: "bg-teal-500/20 text-teal-600", label: "Hydration" },
  workout: { icon: "💪", color: "bg-coral/20 text-coral", label: "Workout" },
  mood: { icon: "🌸", color: "bg-lavender/20 text-lavender", label: "Mood Journal" },
  walking: { icon: "🚶‍♀️", color: "bg-accent/20 text-accent-foreground", label: "Walking" },
  custom: { icon: "✨", color: "bg-primary/20 text-primary", label: "Custom" },
};

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkedInToday, setCheckedInToday] = useState(mockChallengeDetail.checkedInToday);

  const config = typeConfig[mockChallengeDetail.type];
  const progress = (mockChallengeDetail.daysCompleted / mockChallengeDetail.duration) * 100;

  const handleCheckIn = () => {
    setCheckedInToday(true);
    toast.success("Checked in! 🎉 Day " + (mockChallengeDetail.daysCompleted + 1) + " complete!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/home/challenges/join/${id}`);
    toast.success("Invite link copied!");
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/home/challenges")}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-serif font-bold text-foreground">
              {mockChallengeDetail.title}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className={`text-xs ${config.color}`}>
                {config.icon} {config.label}
              </Badge>
              <span className="text-sm text-muted-foreground">
                by {mockChallengeDetail.createdBy}
              </span>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress Card */}
        <Card className="bg-gradient-to-br from-coral/10 to-lavender/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${config.color}`}>
                  {config.icon}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Streak</p>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-coral" />
                    <span className="text-2xl font-bold text-foreground">
                      {mockChallengeDetail.myStreak} days
                    </span>
                  </div>
                </div>
              </div>
              
              {!checkedInToday ? (
                <Button 
                  onClick={handleCheckIn}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Check In
                </Button>
              ) : (
                <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                  <Check className="w-4 h-4 mr-1" />
                  Done Today
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Challenge Progress</span>
                <span className="font-medium text-foreground">
                  Day {mockChallengeDetail.daysCompleted}/{mockChallengeDetail.duration}
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Check-in Calendar */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-lavender" />
              Check-in History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {mockChallengeDetail.checkInHistory.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex-shrink-0 w-14 h-16 rounded-xl flex flex-col items-center justify-center border ${
                    day.checkedIn 
                      ? "bg-gradient-primary text-primary-foreground border-transparent" 
                      : index === mockChallengeDetail.daysCompleted && !checkedInToday
                        ? "bg-secondary/50 border-primary border-dashed"
                        : "bg-muted/30 border-border/50"
                  }`}
                >
                  <span className="text-xs opacity-80">{day.date}</span>
                  <span className="font-medium">
                    {day.checkedIn ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      `D${day.day}`
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Leaderboard 
          entries={mockLeaderboard}
          challengeTitle={mockChallengeDetail.title}
        />

        {/* Challenge Info */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">About This Challenge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              {mockChallengeDetail.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {mockChallengeDetail.startDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">End Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {mockChallengeDetail.endDate}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participants */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-teal-600" />
              Participants ({mockLeaderboard.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {mockLeaderboard.map((participant) => (
                <div 
                  key={participant.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/50"
                >
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback className="text-xs bg-primary/20">
                      {participant.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">
                    {participant.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AppLayout>
  );
};

export default ChallengeDetailPage;
