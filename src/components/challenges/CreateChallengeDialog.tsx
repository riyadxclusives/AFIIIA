import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Users, Sparkles, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface CreateChallengeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateChallenge?: (challenge: ChallengeFormData) => void;
}

export interface ChallengeFormData {
  title: string;
  type: "hydration" | "workout" | "mood" | "walking" | "custom";
  duration: 5 | 7 | 14 | 30;
  description: string;
}

const challengeTypes = [
  { id: "hydration", icon: "💧", label: "Hydration", description: "Drink 8 glasses daily" },
  { id: "workout", icon: "💪", label: "Workout", description: "Exercise every day" },
  { id: "mood", icon: "🌸", label: "Mood Journal", description: "Log your mood daily" },
  { id: "walking", icon: "🚶‍♀️", label: "Walking", description: "10k steps challenge" },
  { id: "custom", icon: "✨", label: "Custom", description: "Create your own" },
] as const;

const durationOptions = [
  { days: 5, label: "5 Days", description: "Quick sprint" },
  { days: 7, label: "1 Week", description: "Most popular" },
  { days: 14, label: "2 Weeks", description: "Build habits" },
  { days: 30, label: "30 Days", description: "Transform" },
] as const;

const CreateChallengeDialog = ({ open, onOpenChange, onCreateChallenge }: CreateChallengeDialogProps) => {
  const [step, setStep] = useState<"type" | "details" | "invite">("type");
  const [formData, setFormData] = useState<ChallengeFormData>({
    title: "",
    type: "hydration",
    duration: 7,
    description: "",
  });
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleTypeSelect = (type: ChallengeFormData["type"]) => {
    const typeInfo = challengeTypes.find(t => t.id === type);
    setFormData(prev => ({
      ...prev,
      type,
      title: typeInfo?.label ? `${typeInfo.label} Challenge` : prev.title,
    }));
    setStep("details");
  };

  const handleCreate = () => {
    if (!formData.title) {
      toast.error("Please enter a challenge title");
      return;
    }
    
    // Generate invite link
    const challengeId = Math.random().toString(36).substring(7);
    setInviteLink(`${window.location.origin}/home/challenges/join/${challengeId}`);
    setStep("invite");
    onCreateChallenge?.(formData);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success("Invite link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStep("type");
    setFormData({
      title: "",
      type: "hydration",
      duration: 7,
      description: "",
    });
    setInviteLink("");
    setCopied(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-2xl">
            {step === "type" && "Start a Buddy Challenge"}
            {step === "details" && "Challenge Details"}
            {step === "invite" && "Invite Your Buddies"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "type" && (
            <motion.div
              key="type"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <p className="text-center text-muted-foreground text-sm mb-4">
                Choose a challenge type to motivate each other
              </p>
              <div className="grid gap-3">
                {challengeTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTypeSelect(type.id as ChallengeFormData["type"])}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-secondary/50 hover:border-primary/50 transition-all text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{type.label}</h4>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="title">Challenge Name</Label>
                <Input
                  id="title"
                  placeholder="e.g., Summer Hydration Challenge"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-secondary/50"
                />
              </div>

              <div className="space-y-2">
                <Label>Duration</Label>
                <div className="grid grid-cols-2 gap-2">
                  {durationOptions.map((option) => (
                    <button
                      key={option.days}
                      onClick={() => setFormData(prev => ({ ...prev, duration: option.days as ChallengeFormData["duration"] }))}
                      className={`p-3 rounded-xl border transition-all text-left ${
                        formData.duration === option.days
                          ? "border-primary bg-primary/10"
                          : "border-border/50 bg-card/50 hover:border-primary/50"
                      }`}
                    >
                      <div className="font-medium text-foreground">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add any rules or motivational notes..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-secondary/50 resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep("type")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleCreate}
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Challenge
                </Button>
              </div>
            </motion.div>
          )}

          {step === "invite" && (
            <motion.div
              key="invite"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center"
                >
                  <Users className="w-10 h-10 text-primary-foreground" />
                </motion.div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  Challenge Created! 🎉
                </h3>
                <p className="text-sm text-muted-foreground">
                  Share this link with your buddies to invite them
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={inviteLink}
                    readOnly
                    className="bg-secondary/50 text-sm"
                  />
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <Button
                  onClick={handleCopyLink}
                  className="w-full bg-gradient-primary hover:opacity-90"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Invite Link
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleClose}
                  className="w-full text-muted-foreground"
                >
                  Done
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChallengeDialog;
