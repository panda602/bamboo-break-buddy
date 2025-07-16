import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { storageUtils, UserGoal } from '@/utils/storage';
import { Heart, Target, Sparkles, Save, Quote } from 'lucide-react';
import pandaSuccess from '@/assets/panda-success.png';
import pandaLove from '@/assets/panda-love.png';

const Motivation = () => {
  const [currentQuote, setCurrentQuote] = useState('');
  const [currentPanda, setCurrentPanda] = useState(pandaSuccess);
  const [userGoal, setUserGoal] = useState<UserGoal | null>(null);
  const [goalForm, setGoalForm] = useState({
    type: 'both' as 'cigarettes' | 'vapes' | 'both',
    targetPerDay: '',
    description: ''
  });

  const motivationalQuotes = [
    "Every cigarette you don't smoke is a victory! 🎉",
    "Your body is already thanking you for this choice! 💚",
    "One day at a time, one breath at a time. You've got this! 🌱",
    "The best time to quit was yesterday. The second best time is now! ⏰",
    "You're not just quitting smoking, you're choosing life! 🌟",
    "Every craving you overcome makes you stronger! 💪",
    "Your future self will thank you for this decision! 🙏",
    "Progress, not perfection. You're doing amazing! 📈",
    "Think of all the money you're saving for better things! 💰",
    "Your lungs are healing with every smoke-free hour! 🫁",
    "You're breaking free from addiction - that's heroic! 🦸‍♂️",
    "Clean air tastes better than any cigarette! 🌬️",
    "Your family believes in you, and so do I! 👨‍👩‍👧‍👦",
    "Each day smoke-free is a gift to your future! 🎁",
    "You're proving to yourself that you can do anything! ✨"
  ];

  const pandaImages = [pandaSuccess, pandaLove];

  useEffect(() => {
    // Load user goal
    const goal = storageUtils.getGoal();
    if (goal) {
      setUserGoal(goal);
      setGoalForm({
        type: goal.type,
        targetPerDay: goal.targetPerDay.toString(),
        description: goal.description
      });
    }

    // Set initial quote and panda
    rotateMotivation();
  }, []);

  const rotateMotivation = () => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    const randomPanda = pandaImages[Math.floor(Math.random() * pandaImages.length)];
    setCurrentQuote(randomQuote);
    setCurrentPanda(randomPanda);
  };

  const handleSaveGoal = () => {
    if (!goalForm.targetPerDay || !goalForm.description) {
      toast({
        title: 'Please fill in all fields',
        description: 'Both target and description are required.',
        variant: 'destructive'
      });
      return;
    }

    const goal: UserGoal = {
      type: goalForm.type,
      targetPerDay: parseInt(goalForm.targetPerDay),
      startDate: new Date().toISOString().split('T')[0],
      description: goalForm.description
    };

    storageUtils.saveGoal(goal);
    setUserGoal(goal);

    toast({
      title: 'Goal saved successfully! 🎯',
      description: 'Your panda friend is cheering for you!',
      duration: 5000
    });
  };

  const getDailyMotivation = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    return motivationalQuotes[dayOfYear % motivationalQuotes.length];
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Daily Motivation</h1>
          <p className="text-lg text-muted-foreground">
            Let our panda friend inspire you on your journey to better health! 🐼✨
          </p>
        </div>

        {/* Daily Motivation Card */}
        <Card className="bg-gradient-success border-border mb-8">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <img 
                src={currentPanda} 
                alt="Motivational Panda" 
                className="w-24 h-24 object-contain animate-bounce-gentle"
              />
            </div>
            <CardTitle className="text-center text-2xl text-foreground">
              Today's Motivation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <Quote className="w-8 h-8 mx-auto mb-4 text-primary" />
              <p className="text-xl text-foreground font-medium mb-4">
                {currentQuote}
              </p>
              <Button 
                onClick={rotateMotivation}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Get New Motivation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Daily Quote */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Quote className="w-6 h-6 text-primary" />
              Daily Inspiration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-primary/10 rounded-lg p-4 border-l-4 border-l-primary">
              <p className="text-lg text-foreground italic">
                "{getDailyMotivation()}"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Personal Goal Setting */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Personal Goal
            </CardTitle>
            <CardDescription>
              Set a personal goal to help guide your journey. Your panda friend will help you stay accountable!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="goal-type">Goal Type</Label>
                <Select value={goalForm.type} onValueChange={(value: 'cigarettes' | 'vapes' | 'both') => setGoalForm({...goalForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select what you want to track" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cigarettes">Cigarettes only</SelectItem>
                    <SelectItem value="vapes">Vapes only</SelectItem>
                    <SelectItem value="both">Both cigarettes and vapes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="target">Target per day</Label>
                <Input
                  id="target"
                  type="number"
                  min="0"
                  value={goalForm.targetPerDay}
                  onChange={(e) => setGoalForm({...goalForm, targetPerDay: e.target.value})}
                  placeholder="e.g., 5, 3, 0"
                />
              </div>

              <div>
                <Label htmlFor="description">Why is this important to you?</Label>
                <Textarea
                  id="description"
                  value={goalForm.description}
                  onChange={(e) => setGoalForm({...goalForm, description: e.target.value})}
                  placeholder="e.g., I want to improve my health for my family, save money, feel better..."
                  className="resize-none"
                />
              </div>

              <Button 
                onClick={handleSaveGoal}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Save className="w-4 h-4 mr-2" />
                Save My Goal
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Goal Display */}
        {userGoal && (
          <Card className="bg-gradient-success border-border mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-panda-success">
                <Heart className="w-6 h-6" />
                Your Current Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Target:</span>
                  <span className="text-2xl font-bold text-primary">
                    {userGoal.targetPerDay} {userGoal.type} per day
                  </span>
                </div>
                <div>
                  <span className="font-medium">Your why:</span>
                  <p className="text-muted-foreground italic mt-1">
                    "{userGoal.description}"
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Goal set on: {new Date(userGoal.startDate).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Motivation;