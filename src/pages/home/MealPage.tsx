import AppLayout from "@/components/app/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, ChefHat, Clock, Flame, ShoppingCart, Plus, Search } from "lucide-react";

const quickIngredients = ["Chicken", "Rice", "Eggs", "Spinach", "Salmon", "Avocado"];

const MealPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-1">
            AI Meal Planner
          </h1>
          <p className="text-muted-foreground">
            Personalized nutrition for your cycle
          </p>
        </div>

        {/* Search / Ingredient Input */}
        <Card className="glass-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-5">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="What ingredients do you have?"
                className="pl-12 h-12 bg-background/50"
              />
            </div>
            
            {/* Quick ingredient chips */}
            <div className="flex flex-wrap gap-2">
              {quickIngredients.map((ingredient) => (
                <button
                  key={ingredient}
                  className="px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 rounded-full transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  {ingredient}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <Button variant="hero" size="lg" className="w-full animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Recipes
        </Button>

        {/* Phase-aware tip */}
        <Card 
          className="bg-lavender-soft/30 border-lavender/20 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <CardContent className="p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-lavender-soft/50 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-lavender" />
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">Ovulation Phase Tip</h4>
              <p className="text-sm text-muted-foreground">
                Focus on lean proteins and complex carbs to fuel your peak energy. 
                Great time for salads with grilled proteins!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sample Recipe Cards */}
        <div className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <h3 className="font-serif text-lg font-semibold mb-4">Suggested Recipes</h3>
          <div className="space-y-4">
            {/* Recipe 1 */}
            <Card className="glass-card overflow-hidden">
              <CardContent className="p-0">
                <div className="h-40 bg-gradient-teal flex items-center justify-center">
                  <ChefHat className="w-16 h-16 text-primary-foreground/60" />
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-lg font-semibold mb-2">
                    Grilled Salmon Bowl
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Omega-rich salmon with quinoa and roasted vegetables
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>25 min</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Flame className="w-4 h-4" />
                      <span>420 cal</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="teal" size="sm" className="flex-1">
                      View Recipe
                    </Button>
                    <Button variant="glass" size="sm">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recipe 2 */}
            <Card className="glass-card overflow-hidden">
              <CardContent className="p-0">
                <div className="h-40 bg-gradient-coral flex items-center justify-center">
                  <ChefHat className="w-16 h-16 text-primary-foreground/60" />
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-lg font-semibold mb-2">
                    Mediterranean Chicken Wrap
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Lean protein with fresh vegetables and hummus
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>15 min</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Flame className="w-4 h-4" />
                      <span>380 cal</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="coral" size="sm" className="flex-1">
                      View Recipe
                    </Button>
                    <Button variant="glass" size="sm">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MealPage;
