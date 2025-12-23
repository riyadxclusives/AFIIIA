import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trophy, Target, Sparkles, Users } from "lucide-react";
import AppLayout from "@/components/app/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChallengeCard, { Challenge } from "@/components/challenges/ChallengeCard";
import CreateChallengeDialog from "@/components/challenges/CreateChallengeDialog";
import AchievementBadge from "@/components/challenges/AchievementBadge";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Mock data
const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Hydration Heroes",
    type: "hydration",
    duration: 7,
    daysCompleted: 3,
    participants: [
      { id: "1", name: "You", checkedInToday: false, streak: 3 },
      { id: "2", name: "Sarah", avatar: "", checkedInToday: true, streak: 5 },
      { id: "3", name: "Emma", avatar: "", checkedInToday: true, streak: 4 },
    ],
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-01-08",
    myStreak: 3,
    checkedInToday: false,
  },
  {
    id: "2",
    title: "Morning Workout Club",
    type: "workout",
    duration: 14,
    daysCompleted: 8,
    participants: [
      { id: "1", name: "You", checkedInToday: true, streak: 6 },
      { id: "2", name: "Maya", avatar: "", checkedInToday: true, streak: 8 },
    ],
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    myStreak: 6,
    checkedInToday: true,
  },
];

const upcomingChallenges: Challenge[] = [
  {
    id: "3",
    title: "30 Day Mood Journaling",
    type: "mood",
    duration: 30,
    daysCompleted: 0,
    participants: [
      { id: "2", name: "Lisa", avatar: "", checkedInToday: false, streak: 0 },
      { id: "3", name: "Anna", avatar: "", checkedInToday: false, streak: 0 },
    ],
    status: "upcoming",
    startDate: "2024-01-15",
    endDate: "2024-02-14",
    myStreak: 0,
    checkedInToday: false,
  },
];

const mockAchievements = [
  { icon: "🔥", title: "First Flame", description: "Complete 7-day streak", unlocked: true, unlockedAt: "Jan 5" },
  { icon: "💪", title: "Workout Warrior", description: "Finish 5 workout challenges", unlocked: false },
  { icon: "💧", title: "Hydration Hero", description: "30-day hydration streak", unlocked: true, unlockedAt: "Dec 20" },
  { icon: "🏆", title: "Challenge Champion", description: "Win 3 challenges", unlocked: false },
  { icon: "👯", title: "Social Butterfly", description: "Complete 10 buddy challenges", unlocked: false },
  { icon: "⭐", title: "Perfect Week", description: "7 days, all activities", unlocked: true, unlockedAt: "Jan 2" },
];

const BuddyChallengesPage = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleCheckIn = (challengeId: string) => {
    toast.success("Checked in! 🎉 Keep up the great work!");
  };

  const handleViewDetails = (challengeId: string) => {
    navigate(`/home/challenges/${challengeId}`);
  };

  const handleJoinChallenge = (challengeId: string) => {
    toast.success("Joined the challenge! Get ready to start!");
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-gradient">
              Buddy Challenges
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Stay motivated together with friends
            </p>
          </div>
          <Button 
            onClick={() => setCreateDialogOpen(true)}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Challenge
          </Button>
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-coral/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-coral" />
            </div>
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">Challenges</p>
          </div>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-lavender/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-lavender" />
            </div>
            <p className="text-2xl font-bold text-foreground">8</p>
            <p className="text-xs text-muted-foreground">Victories</p>
          </div>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-teal-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">5</p>
            <p className="text-xs text-muted-foreground">Buddies</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
            <TabsTrigger value="active" className="data-[state=active]:bg-background">
              Active
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-background">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-background">
              Badges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-4 space-y-4">
            {mockChallenges.length > 0 ? (
              mockChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onCheckIn={() => handleCheckIn(challenge.id)}
                  onViewDetails={() => handleViewDetails(challenge.id)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-2">No Active Challenges</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start a challenge with your buddies!
                </p>
                <Button 
                  onClick={() => setCreateDialogOpen(true)}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Create Challenge
                </Button>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="mt-4 space-y-4">
            {upcomingChallenges.length > 0 ? (
              upcomingChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onJoin={() => handleJoinChallenge(challenge.id)}
                  onViewDetails={() => handleViewDetails(challenge.id)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                  <Target className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-foreground mb-2">No Upcoming Challenges</h3>
                <p className="text-sm text-muted-foreground">
                  Check back soon or create your own!
                </p>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="achievements" className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mockAchievements.map((achievement, index) => (
                <AchievementBadge
                  key={index}
                  icon={achievement.icon}
                  title={achievement.title}
                  description={achievement.description}
                  unlocked={achievement.unlocked}
                  unlockedAt={achievement.unlockedAt}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      <CreateChallengeDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateChallenge={(data) => {
          toast.success(`"${data.title}" created!`);
        }}
      />
    </AppLayout>
  );
};

export default BuddyChallengesPage;
