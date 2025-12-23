import { useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/app/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  Droplet, 
  Heart, 
  Sparkles,
  Info
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isWithinInterval } from "date-fns";

interface CycleData {
  cycleLength: number;
  periodLength: number;
  lastPeriodStart: Date;
}

// Sample cycle data - in production, this would come from backend
const cycleData: CycleData = {
  cycleLength: 28,
  periodLength: 5,
  lastPeriodStart: new Date(2024, 11, 1), // Dec 1, 2024
};

const getPhaseForDate = (date: Date, data: CycleData) => {
  const { lastPeriodStart, cycleLength, periodLength } = data;
  
  // Calculate days since last period
  const diffTime = date.getTime() - lastPeriodStart.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const dayInCycle = ((diffDays % cycleLength) + cycleLength) % cycleLength;
  
  // Determine phase
  if (dayInCycle < periodLength) {
    return "period";
  } else if (dayInCycle >= 10 && dayInCycle <= 16) {
    return "fertile";
  } else if (dayInCycle >= 13 && dayInCycle <= 15) {
    return "ovulation";
  } else if (dayInCycle >= periodLength && dayInCycle < 10) {
    return "follicular";
  } else {
    return "luteal";
  }
};

const getPredictedPeriodDates = (currentDate: Date, data: CycleData) => {
  const { lastPeriodStart, cycleLength, periodLength } = data;
  const periods = [];
  
  // Calculate next 3 predicted periods
  let nextPeriodStart = new Date(lastPeriodStart);
  while (nextPeriodStart < addMonths(currentDate, 3)) {
    if (nextPeriodStart >= startOfMonth(currentDate)) {
      periods.push({
        start: new Date(nextPeriodStart),
        end: addDays(nextPeriodStart, periodLength - 1),
      });
    }
    nextPeriodStart = addDays(nextPeriodStart, cycleLength);
  }
  
  return periods;
};

const PeriodCalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [logDialogOpen, setLogDialogOpen] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const predictedPeriods = getPredictedPeriodDates(currentMonth, cycleData);

  const getDayInfo = (day: Date) => {
    const phase = getPhaseForDate(day, cycleData);
    const isPredicted = predictedPeriods.some(period => 
      isWithinInterval(day, { start: period.start, end: period.end })
    );
    
    // Check if it's in the fertile window (5 days before ovulation + ovulation day)
    const diffTime = day.getTime() - cycleData.lastPeriodStart.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const dayInCycle = ((diffDays % cycleData.cycleLength) + cycleData.cycleLength) % cycleData.cycleLength;
    const isFertile = dayInCycle >= 10 && dayInCycle <= 16;
    const isOvulation = dayInCycle >= 13 && dayInCycle <= 15;
    const isPeriod = dayInCycle < cycleData.periodLength;
    
    return { phase, isPredicted, isFertile, isOvulation, isPeriod };
  };

  const renderDays = () => {
    const days = [];
    let day = startDate;
    const today = new Date();

    while (day <= endDate) {
      const currentDay = day;
      const isCurrentMonth = isSameMonth(day, monthStart);
      const isToday = isSameDay(day, today);
      const { isPeriod, isFertile, isOvulation } = getDayInfo(day);
      const isSelected = selectedDate && isSameDay(day, selectedDate);

      days.push(
        <button
          key={day.toISOString()}
          onClick={() => setSelectedDate(currentDay)}
          className={`
            aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative
            transition-all duration-200 hover:scale-105
            ${!isCurrentMonth ? "text-muted-foreground/30" : ""}
            ${isToday ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}
            ${isSelected ? "bg-primary text-primary-foreground" : ""}
            ${isPeriod && !isSelected ? "bg-coral text-white" : ""}
            ${isFertile && !isPeriod && !isSelected ? "bg-lavender-soft/60" : ""}
            ${isOvulation && !isPeriod && !isSelected ? "bg-lavender text-white" : ""}
          `}
        >
          <span className={`font-medium ${isToday && !isSelected ? "text-primary" : ""}`}>
            {format(day, "d")}
          </span>
          {/* Indicators */}
          <div className="flex gap-0.5 mt-0.5">
            {isPeriod && !isSelected && (
              <Droplet className="w-2.5 h-2.5" />
            )}
            {isFertile && !isPeriod && !isSelected && (
              <Heart className="w-2.5 h-2.5 text-lavender" />
            )}
            {isOvulation && !isSelected && (
              <Sparkles className="w-2.5 h-2.5" />
            )}
          </div>
        </button>
      );
      day = addDays(day, 1);
    }

    return days;
  };

  const getSelectedDateInfo = () => {
    if (!selectedDate) return null;
    const { phase, isPeriod, isFertile, isOvulation } = getDayInfo(selectedDate);
    
    if (isPeriod) {
      return {
        title: "Period Day",
        description: "Menstrual phase - rest and nurture yourself",
        color: "coral",
        icon: Droplet,
      };
    }
    if (isOvulation) {
      return {
        title: "Ovulation Day",
        description: "Peak fertility - highest chance of conception",
        color: "lavender",
        icon: Sparkles,
      };
    }
    if (isFertile) {
      return {
        title: "Fertile Window",
        description: "High fertility - good chance of conception",
        color: "lavender",
        icon: Heart,
      };
    }
    return {
      title: phase.charAt(0).toUpperCase() + phase.slice(1) + " Phase",
      description: "Regular cycle day",
      color: "muted",
      icon: Info,
    };
  };

  const selectedInfo = getSelectedDateInfo();

  return (
    <AppLayout>
      <div className="space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <Link to="/home/cycle">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold">
              Period Calendar
            </h1>
            <p className="text-muted-foreground text-sm">
              Track and predict your cycle
            </p>
          </div>
        </div>

        {/* Month Navigation */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h3 className="font-serif text-xl font-semibold">
                {format(currentMonth, "MMMM yyyy")}
              </h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs text-muted-foreground py-2 font-medium">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {renderDays()}
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3">Legend</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-coral flex items-center justify-center">
                  <Droplet className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm">Period Days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-lavender flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm">Ovulation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-lavender-soft/60 flex items-center justify-center">
                  <Heart className="w-3 h-3 text-lavender" />
                </div>
                <span className="text-sm">Fertile Window</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg ring-2 ring-primary" />
                <span className="text-sm">Today</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Info */}
        {selectedDate && selectedInfo && (
          <Card 
            className={`animate-fade-in border-2 ${
              selectedInfo.color === "coral" ? "border-coral bg-coral-soft/20" :
              selectedInfo.color === "lavender" ? "border-lavender bg-lavender-soft/20" :
              "border-border"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedInfo.color === "coral" ? "bg-coral text-white" :
                  selectedInfo.color === "lavender" ? "bg-lavender text-white" :
                  "bg-muted"
                }`}>
                  <selectedInfo.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </p>
                  <h4 className="font-semibold">{selectedInfo.title}</h4>
                  <p className="text-sm text-muted-foreground">{selectedInfo.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Predictions */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3">Upcoming Predictions</h4>
            <div className="space-y-3">
              {predictedPeriods.slice(0, 3).map((period, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-coral-soft/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-coral flex items-center justify-center">
                      <Droplet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {format(period.start, "MMM d")} - {format(period.end, "MMM d")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {index === 0 ? "Current/Next Period" : `In ${Math.ceil((period.start.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Log Period Button */}
        <Dialog open={logDialogOpen} onOpenChange={setLogDialogOpen}>
          <DialogTrigger asChild>
            <div className="fixed bottom-24 left-0 right-0 px-4">
              <div className="container mx-auto">
                <Button variant="coral" size="lg" className="w-full">
                  <Droplet className="w-5 h-5 mr-2" />
                  Log Period Start
                </Button>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-serif">Log Period</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                When did your period start?
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" onClick={() => setLogDialogOpen(false)}>
                  Today
                </Button>
                <Button variant="outline" onClick={() => setLogDialogOpen(false)}>
                  Yesterday
                </Button>
                <Button variant="outline" onClick={() => setLogDialogOpen(false)}>
                  2 days ago
                </Button>
              </div>
              <Button variant="coral" className="w-full" onClick={() => setLogDialogOpen(false)}>
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default PeriodCalendarPage;
