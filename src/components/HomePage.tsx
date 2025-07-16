import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, BarChart3, BookOpen, Heart, Cigarette } from 'lucide-react';
import pandaHero from '@/assets/panda-hero.png';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <img 
              src={pandaHero} 
              alt="Friendly Panda" 
              className="mx-auto w-64 h-48 object-contain animate-float"
            />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Welcome to Panda Quit! 🐼
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your gentle companion on the journey to reduce smoking and vaping. 
            Track your progress, stay motivated, and celebrate every small victory with our supportive panda friend.
          </p>
          <Link to="/tracker">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
              Start Daily Tracker
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow bg-card border-border">
            <CardHeader className="text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-lg">Daily Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Log your daily cigarette and vape usage with easy-to-use tracking tools.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-card border-border">
            <CardHeader className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-lg">Weekly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visualize your progress with beautiful charts and celebrate your best days.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-card border-border">
            <CardHeader className="text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-lg">Educational Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Learn about the health benefits of quitting, especially for fertility and wellness.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-card border-border">
            <CardHeader className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-lg">Daily Motivation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get inspired with motivational quotes and set personal goals for your journey.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-success rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Journey? 🌟
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Every small step counts. Our panda friend is here to support you every day 
            as you work towards a healthier, smoke-free life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tracker">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Calendar className="w-5 h-5 mr-2" />
                Start Daily Tracker
              </Button>
            </Link>
            <Link to="/overview">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <BarChart3 className="w-5 h-5 mr-2" />
                View My Progress
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;