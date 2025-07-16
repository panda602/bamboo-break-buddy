import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { storageUtils, dateUtils } from '@/utils/storage';
import { Calendar, TrendingDown, Award, Target } from 'lucide-react';
import pandaSuccess from '@/assets/panda-success.png';

const WeeklyOverview = () => {
  const weeklyData = useMemo(() => {
    const entries = storageUtils.getLast7Days();
    return entries.map(entry => ({
      date: entry.date,
      day: dateUtils.getDayName(new Date(entry.date)),
      cigarettes: entry.cigarettes,
      vapes: entry.vapes,
      total: entry.cigarettes + entry.vapes,
      isToday: dateUtils.isToday(entry.date)
    }));
  }, []);

  const stats = useMemo(() => {
    const totalCigarettes = weeklyData.reduce((sum, day) => sum + day.cigarettes, 0);
    const totalVapes = weeklyData.reduce((sum, day) => sum + day.vapes, 0);
    const totalItems = totalCigarettes + totalVapes;
    const daysWithData = weeklyData.filter(day => day.total > 0).length;
    const bestDay = weeklyData.reduce((best, day) => 
      day.total < best.total ? day : best
    );
    const worstDay = weeklyData.reduce((worst, day) => 
      day.total > worst.total ? day : worst
    );

    return {
      totalCigarettes,
      totalVapes,
      totalItems,
      daysWithData,
      bestDay,
      worstDay,
      averagePerDay: daysWithData > 0 ? (totalItems / 7).toFixed(1) : '0'
    };
  }, [weeklyData]);

  const getBarColor = (value: number, index: number) => {
    if (value === 0) return 'hsl(var(--panda-success))';
    if (value <= 3) return 'hsl(var(--primary))';
    if (value <= 7) return 'hsl(var(--panda-warning))';
    return 'hsl(var(--destructive))';
  };

  const getMotivationalMessage = () => {
    if (stats.totalItems === 0) {
      return "Incredible! You've had a smoke-free week! 🎉";
    }
    if (stats.totalItems <= 10) {
      return "You're doing amazing! Keep up the great work! 🌟";
    }
    if (stats.totalItems <= 25) {
      return "Great progress! You're on the right track! 📈";
    }
    return "Every day tracked is progress. You're building healthy habits! 💪";
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-destructive">Cigarettes: {data.cigarettes}</p>
          <p className="text-panda-warning">Vapes: {data.vapes}</p>
          <p className="text-foreground font-medium">Total: {data.total}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <img 
            src={pandaSuccess} 
            alt="Success Panda" 
            className="mx-auto w-32 h-32 object-contain animate-bounce-gentle mb-4"
          />
          <h1 className="text-4xl font-bold text-foreground mb-2">Weekly Overview</h1>
          <p className="text-lg text-muted-foreground">{getMotivationalMessage()}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Weekly Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalItems}</div>
              <p className="text-sm text-muted-foreground">items this week</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-panda-success" />
                Daily Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.averagePerDay}</div>
              <p className="text-sm text-muted-foreground">per day</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="w-4 h-4 text-panda-success" />
                Best Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-panda-success">{stats.bestDay.total}</div>
              <p className="text-sm text-muted-foreground">{stats.bestDay.day}</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Active Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.daysWithData}</div>
              <p className="text-sm text-muted-foreground">out of 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-6 h-6 text-primary" />
              Daily Usage This Week
            </CardTitle>
            <CardDescription>
              Track your progress over the last 7 days. Lower is better!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                    {weeklyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.total, index)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Breakdown */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Weekly Breakdown</CardTitle>
            <CardDescription>
              Detailed view of your daily usage patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={day.date} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-medium text-foreground">
                      {day.day}
                    </div>
                    {day.isToday && (
                      <Badge variant="secondary" className="bg-primary/20 text-primary">
                        Today
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      {day.cigarettes} cigarettes, {day.vapes} vapes
                    </div>
                    <div className="text-lg font-bold text-foreground min-w-[3rem] text-right">
                      {day.total}
                    </div>
                    {day.total === stats.bestDay.total && day.total >= 0 && (
                      <Award className="w-5 h-5 text-panda-success" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeeklyOverview;