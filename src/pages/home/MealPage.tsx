import { useState } from "react";
import AppLayout from "@/components/app/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  ChefHat, 
  Clock, 
  Flame, 
  ShoppingCart, 
  Droplet,
  Sun,
  Zap,
  Moon,
  Check,
  Heart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Recipe {
  id: string;
  name: string;
  description: string;
  time: string;
  calories: number;
  benefits: string[];
  ingredients: string[];
  phase: string;
  image?: string;
}

const cyclePhases = [
  { 
    id: "menstrual", 
    name: "Menstrual", 
    icon: Droplet, 
    days: "Days 1-5",
    color: "coral",
    tip: "Focus on iron-rich foods to replenish what you lose. Warm, comforting meals help with cramps."
  },
  { 
    id: "follicular", 
    name: "Follicular", 
    icon: Sun, 
    days: "Days 6-13",
    color: "teal",
    tip: "Your metabolism speeds up! Great time for lighter meals with fermented foods and fresh vegetables."
  },
  { 
    id: "ovulation", 
    name: "Ovulation", 
    icon: Zap, 
    days: "Days 14-16",
    color: "lavender",
    tip: "Energy is at its peak. Focus on lean proteins, antioxidant-rich foods, and complex carbs."
  },
  { 
    id: "luteal", 
    name: "Luteal", 
    icon: Moon, 
    days: "Days 17-28",
    color: "coral",
    tip: "Combat PMS with magnesium-rich foods, complex carbs, and foods that boost serotonin."
  },
];

const recipesByPhase: Record<string, Recipe[]> = {
  menstrual: [
    {
      id: "m1",
      name: "Iron-Boosting Spinach Bowl",
      description: "Dark leafy greens with lentils, beets, and tahini dressing",
      time: "20 min",
      calories: 380,
      benefits: ["Iron-rich", "Anti-inflammatory", "Energy boost"],
      ingredients: ["Spinach", "Lentils", "Beets", "Tahini", "Lemon"],
      phase: "menstrual"
    },
    {
      id: "m2",
      name: "Warming Ginger Salmon",
      description: "Baked salmon with ginger glaze and roasted sweet potato",
      time: "35 min",
      calories: 450,
      benefits: ["Omega-3s", "Anti-cramp", "Vitamin D"],
      ingredients: ["Salmon", "Ginger", "Sweet Potato", "Honey", "Garlic"],
      phase: "menstrual"
    },
    {
      id: "m3",
      name: "Dark Chocolate Overnight Oats",
      description: "Cacao oats with banana, almond butter, and chia seeds",
      time: "5 min prep",
      calories: 320,
      benefits: ["Magnesium", "Mood boost", "Fiber"],
      ingredients: ["Oats", "Cacao", "Banana", "Almond Butter", "Chia Seeds"],
      phase: "menstrual"
    },
  ],
  follicular: [
    {
      id: "f1",
      name: "Rainbow Buddha Bowl",
      description: "Fresh vegetables with quinoa, avocado, and citrus dressing",
      time: "15 min",
      calories: 340,
      benefits: ["Vitamin C", "Probiotics", "Light & energizing"],
      ingredients: ["Quinoa", "Avocado", "Carrots", "Cabbage", "Citrus"],
      phase: "follicular"
    },
    {
      id: "f2",
      name: "Kimchi Fried Rice",
      description: "Fermented vegetables with brown rice and soft egg",
      time: "20 min",
      calories: 390,
      benefits: ["Gut health", "Probiotics", "B vitamins"],
      ingredients: ["Brown Rice", "Kimchi", "Eggs", "Scallions", "Sesame"],
      phase: "follicular"
    },
    {
      id: "f3",
      name: "Greek Chicken Salad",
      description: "Grilled chicken with feta, olives, and fresh herbs",
      time: "25 min",
      calories: 380,
      benefits: ["Lean protein", "Fresh", "Mediterranean"],
      ingredients: ["Chicken", "Feta", "Cucumber", "Tomatoes", "Olives"],
      phase: "follicular"
    },
  ],
  ovulation: [
    {
      id: "o1",
      name: "Grilled Salmon Power Bowl",
      description: "Omega-rich salmon with quinoa and roasted vegetables",
      time: "25 min",
      calories: 420,
      benefits: ["Omega-3s", "Antioxidants", "Complex carbs"],
      ingredients: ["Salmon", "Quinoa", "Bell Peppers", "Zucchini", "Olive Oil"],
      phase: "ovulation"
    },
    {
      id: "o2",
      name: "Berry Antioxidant Smoothie",
      description: "Blueberries, acai, spinach, and protein powder",
      time: "5 min",
      calories: 280,
      benefits: ["Antioxidants", "Protein", "Brain boost"],
      ingredients: ["Blueberries", "Acai", "Spinach", "Protein Powder", "Almond Milk"],
      phase: "ovulation"
    },
    {
      id: "o3",
      name: "Mediterranean Chicken Wrap",
      description: "Lean protein with fresh vegetables and hummus",
      time: "15 min",
      calories: 380,
      benefits: ["Lean protein", "Fiber", "Energy"],
      ingredients: ["Chicken", "Hummus", "Lettuce", "Tomatoes", "Whole Wheat Wrap"],
      phase: "ovulation"
    },
  ],
  luteal: [
    {
      id: "l1",
      name: "Turkey & Sweet Potato Hash",
      description: "Serotonin-boosting meal with complex carbs",
      time: "30 min",
      calories: 410,
      benefits: ["Tryptophan", "Complex carbs", "Mood support"],
      ingredients: ["Ground Turkey", "Sweet Potato", "Kale", "Onions", "Herbs"],
      phase: "luteal"
    },
    {
      id: "l2",
      name: "Magnesium-Rich Trail Mix Bark",
      description: "Dark chocolate with pumpkin seeds, almonds, and dried fruit",
      time: "10 min",
      calories: 220,
      benefits: ["Magnesium", "Healthy fats", "Craving satisfier"],
      ingredients: ["Dark Chocolate", "Pumpkin Seeds", "Almonds", "Dried Cherries"],
      phase: "luteal"
    },
    {
      id: "l3",
      name: "Banana Cinnamon Pancakes",
      description: "Whole grain pancakes with natural sweetness",
      time: "20 min",
      calories: 350,
      benefits: ["Serotonin boost", "Complex carbs", "Comfort food"],
      ingredients: ["Whole Wheat Flour", "Banana", "Cinnamon", "Eggs", "Maple Syrup"],
      phase: "luteal"
    },
  ],
};

const MealPage = () => {
  const [activePhase, setActivePhase] = useState("ovulation");
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  
  const currentPhaseData = cyclePhases.find(p => p.id === activePhase)!;
  const recipes = recipesByPhase[activePhase];

  const toggleRecipe = (recipeId: string) => {
    setSelectedRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const colorClasses = {
    coral: {
      bg: "bg-coral-soft/30",
      border: "border-coral/20",
      text: "text-coral",
      gradient: "bg-gradient-coral"
    },
    teal: {
      bg: "bg-teal-soft/30",
      border: "border-teal/20",
      text: "text-teal",
      gradient: "bg-gradient-teal"
    },
    lavender: {
      bg: "bg-lavender-soft/30",
      border: "border-lavender/20",
      text: "text-lavender",
      gradient: "bg-gradient-lavender"
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-1">
            Cycle Nutrition
          </h1>
          <p className="text-muted-foreground">
            Recipes optimized for your cycle phase
          </p>
        </div>

        {/* Phase Selector Tabs */}
        <Tabs value={activePhase} onValueChange={setActivePhase} className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <TabsList className="grid grid-cols-4 h-auto p-1 bg-secondary/50">
            {cyclePhases.map((phase) => {
              const Icon = phase.icon;
              return (
                <TabsTrigger 
                  key={phase.id} 
                  value={phase.id}
                  className="flex flex-col gap-1 py-2 px-1 data-[state=active]:bg-background"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] sm:text-xs">{phase.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Phase Info Card */}
        <Card 
          className={`${colorClasses[currentPhaseData.color as keyof typeof colorClasses].bg} ${colorClasses[currentPhaseData.color as keyof typeof colorClasses].border} border animate-fade-in`}
          style={{ animationDelay: "0.15s" }}
        >
          <CardContent className="p-4 flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${colorClasses[currentPhaseData.color as keyof typeof colorClasses].gradient} flex items-center justify-center shrink-0`}>
              <currentPhaseData.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm">{currentPhaseData.name} Phase</h4>
                <Badge variant="outline" className="text-[10px]">{currentPhaseData.days}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentPhaseData.tip}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recipe Cards */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold">Recommended Recipes</h3>
            {selectedRecipes.length > 0 && (
              <Badge variant="secondary" className="gap-1">
                <ShoppingCart className="w-3 h-3" />
                {selectedRecipes.length} saved
              </Badge>
            )}
          </div>
          
          {recipes.map((recipe, index) => (
            <Card 
              key={recipe.id} 
              className={`glass-card overflow-hidden transition-all ${selectedRecipes.includes(recipe.id) ? 'ring-2 ring-lavender' : ''}`}
            >
              <CardContent className="p-0">
                <div className={`h-32 ${colorClasses[currentPhaseData.color as keyof typeof colorClasses].gradient} flex items-center justify-center relative`}>
                  <ChefHat className="w-12 h-12 text-primary-foreground/60" />
                  {selectedRecipes.includes(recipe.id) && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-lavender rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-lg font-semibold mb-1">
                    {recipe.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {recipe.description}
                  </p>
                  
                  {/* Benefits */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {recipe.benefits.map((benefit) => (
                      <Badge 
                        key={benefit} 
                        variant="outline" 
                        className={`text-[10px] ${colorClasses[currentPhaseData.color as keyof typeof colorClasses].text}`}
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Flame className="w-4 h-4" />
                      <span>{recipe.calories} cal</span>
                    </div>
                  </div>
                  
                  {/* Ingredients Preview */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Ingredients:</p>
                    <p className="text-sm">{recipe.ingredients.join(", ")}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant={currentPhaseData.color === "coral" ? "coral" : currentPhaseData.color === "teal" ? "teal" : "lavender"} 
                      size="sm" 
                      className="flex-1"
                    >
                      View Recipe
                    </Button>
                    <Button 
                      variant={selectedRecipes.includes(recipe.id) ? "secondary" : "glass"} 
                      size="sm"
                      onClick={() => toggleRecipe(recipe.id)}
                    >
                      {selectedRecipes.includes(recipe.id) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Heart className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Generate Button */}
        <Button variant="hero" size="lg" className="w-full animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Custom Meal Plan
        </Button>
      </div>
    </AppLayout>
  );
};

export default MealPage;
