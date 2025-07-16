import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { storageUtils, dateUtils, DailyEntry } from '@/utils/storage';
import { Calendar, Cigarette, Zap, Save } from 'lucide-react';
import pandaSuccess from '@/assets/panda-success.png';
import pandaLove from '@/assets/panda-love.png';

const DailyTracker = () => {
  const [cigarettes, setCigarettes] = useState('');
  const [vapes, setVapes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todaysEntry, setTodaysEntry] = useState<DailyEntry | null>(null);

  const today = new Date();
  const todayString = dateUtils.formatDate(today);

  useEffect(() => {
    const entry = storageUtils.getEntryByDate(todayString);
    if (entry) {
      setTodaysEntry(entry);
      setCigarettes(entry.cigarettes.toString());
      setVapes(entry.vapes.toString());
    }
  }, [todayString]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const cigaretteCount = parseInt(cigarettes) || 0;
    const vapeCount = parseInt(vapes) || 0;

    const entry: DailyEntry = {
      date: todayString,
      cigarettes: cigaretteCount,
      vapes: vapeCount,
      timestamp: Date.now()
    };

    try {
      storageUtils.saveEntry(entry);
      setTodaysEntry(entry);
      
      // Show motivational message
      const total = cigaretteCount + vapeCount;
      let message = '';
      let pandaMessage = '';
      
      if (total === 0) {
        message = 'Amazing! You had a smoke-free day! 🎉';
        pandaMessage = 'You\'re incredible! Keep it up! 🐼❤️';
      } else if (total <= 3) {
        message = 'Great job keeping it low today! 🌟';
        pandaMessage = 'You\'re doing so well! I\'m proud of you! 🐼💚';
      } else if (total <= 7) {
        message = 'Every tracked day is progress! 📈';
        pandaMessage = 'You\'re on the right track! Keep going! 🐼🌱';
      } else {
        message = 'Thank you for being honest. Tomorrow is a new day! 🌅';
        pandaMessage = 'I believe in you! We can do this together! 🐼💪';
      }
      
      toast({
        title: message,
        description: pandaMessage,
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: 'Error saving entry',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPandaImage = () => {
    if (!todaysEntry) return pandaSuccess;
    const total = todaysEntry.cigarettes + todaysEntry.vapes;
    return total <= 3 ? pandaSuccess : pandaLove;
  };

  const getMotivationalMessage = () => {
    if (!todaysEntry) return "Let's track your progress for today! 🌟";
    const total = todaysEntry.cigarettes + todaysEntry.vapes;
    
    if (total === 0) return "You had a smoke-free day! You're amazing! 🎉";
    if (total <= 3) return "Great job keeping it low today! 🌟";
    if (total <= 7) return "Every tracked day is progress! 📈";
    return "Thank you for being honest. Tomorrow is a new day! 🌅";
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <img 
            src={getPandaImage()} 
            alt="Motivational Panda" 
            className="mx-auto w-32 h-32 object-contain animate-bounce-gentle mb-4"
          />
          <h1 className="text-4xl font-bold text-foreground mb-2">Daily Tracker</h1>
          <p className="text-lg text-muted-foreground">{getMotivationalMessage()}</p>
        </div>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              {dateUtils.formatDisplayDate(today)}
            </CardTitle>
            <CardDescription>
              Track your cigarette and vape usage for today. Being honest with yourself is the first step to change.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cigarettes" className="flex items-center gap-2">
                    <Cigarette className="w-4 h-4 text-destructive" />
                    Cigarettes smoked today
                  </Label>
                  <Input
                    id="cigarettes"
                    type="number"
                    min="0"
                    value={cigarettes}
                    onChange={(e) => setCigarettes(e.target.value)}
                    placeholder="Enter number of cigarettes"
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vapes" className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-panda-warning" />
                    Vape sessions today (optional)
                  </Label>
                  <Input
                    id="vapes"
                    type="number"
                    min="0"
                    value={vapes}
                    onChange={(e) => setVapes(e.target.value)}
                    placeholder="Enter number of vape sessions"
                    className="text-lg"
                  />
                </div>
              </div>

              <div className="text-center">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Entry'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {todaysEntry && (
          <Card className="mt-8 bg-gradient-success border-border">
            <CardHeader>
              <CardTitle className="text-panda-success">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div className="bg-card/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-destructive">{todaysEntry.cigarettes}</div>
                  <div className="text-sm text-muted-foreground">Cigarettes</div>
                </div>
                <div className="bg-card/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-panda-warning">{todaysEntry.vapes}</div>
                  <div className="text-sm text-muted-foreground">Vape Sessions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DailyTracker;