import { motion } from "framer-motion";
import { Trophy, Flame, Medal, Crown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  streak: number;
  totalCheckIns: number;
  rank: number;
  isCurrentUser: boolean;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  challengeTitle: string;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-5 h-5 text-yellow-500" />;
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />;
    case 3:
      return <Medal className="w-5 h-5 text-amber-600" />;
    default:
      return <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-muted-foreground">{rank}</span>;
  }
};

const getRankBg = (rank: number, isCurrentUser: boolean) => {
  if (isCurrentUser) return "bg-primary/10 border-primary/30";
  switch (rank) {
    case 1:
      return "bg-yellow-500/10 border-yellow-500/30";
    case 2:
      return "bg-gray-500/10 border-gray-500/30";
    case 3:
      return "bg-amber-600/10 border-amber-600/30";
    default:
      return "bg-card/50 border-border/50";
  }
};

const Leaderboard = ({ entries, challengeTitle }: LeaderboardProps) => {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="w-5 h-5 text-coral" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${getRankBg(entry.rank, entry.isCurrentUser)}`}
          >
            <div className="w-8 flex justify-center">
              {getRankIcon(entry.rank)}
            </div>
            
            <Avatar className="w-10 h-10 border-2 border-background">
              <AvatarImage src={entry.avatar} />
              <AvatarFallback className="bg-secondary text-sm">
                {entry.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-medium truncate ${entry.isCurrentUser ? "text-primary" : "text-foreground"}`}>
                  {entry.name}
                </span>
                {entry.isCurrentUser && (
                  <span className="text-xs text-primary">(You)</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{entry.totalCheckIns} check-ins</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-coral/20 text-coral">
              <Flame className="w-4 h-4" />
              <span className="text-sm font-medium">{entry.streak}</span>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
