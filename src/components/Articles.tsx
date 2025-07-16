import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Heart, Baby, Zap, Shield, Brain, Cigarette } from 'lucide-react';
import pandaEducation from '@/assets/panda-education.png';

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: "How Smoking Affects Male Fertility and Sperm Quality",
      description: "Learn about the significant impact of smoking on male fertility, sperm count, and reproductive health. Discover how quitting can improve your chances of conception.",
      category: "Fertility",
      icon: Baby,
      color: "text-panda-love",
      bgColor: "bg-panda-love/10",
      url: "https://www.healthline.com/health/smoking/effects-on-body",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "The Benefits of Quitting Smoking for Your Heart",
      description: "Understand how smoking damages your cardiovascular system and the amazing recovery that happens when you quit. Your heart starts healing within hours.",
      category: "Heart Health",
      icon: Heart,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      url: "https://www.cdc.gov/tobacco/quit_smoking/how_to_quit/benefits/index.htm",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Vaping vs Smoking: Understanding the Risks",
      description: "Compare the health risks of vaping versus traditional cigarettes. Learn why reducing or eliminating both is important for your health.",
      category: "General Health",
      icon: Zap,
      color: "text-panda-warning",
      bgColor: "bg-panda-warning/10",
      url: "https://www.lung.org/quit-smoking/e-cigarettes-vaping/what-do-we-know",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Protecting Your Lungs: The Road to Recovery",
      description: "Discover how your lungs heal after quitting smoking and what you can do to speed up the recovery process. Hope and healing are possible.",
      category: "Lung Health",
      icon: Shield,
      color: "text-primary",
      bgColor: "bg-primary/10",
      url: "https://www.lung.org/quit-smoking/smoking-facts/health-effects/smoking",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Mental Health and Smoking: Breaking the Cycle",
      description: "Explore the connection between smoking and mental health, and learn healthy coping strategies for stress and anxiety without cigarettes.",
      category: "Mental Health",
      icon: Brain,
      color: "text-accent-foreground",
      bgColor: "bg-accent/20",
      url: "https://www.nami.org/About-Mental-Illness/Common-with-Mental-Illness/Tobacco-Use-and-Mental-Health",
      readTime: "5 min read"
    },
    {
      id: 6,
      title: "Timeline of Health Benefits After Quitting",
      description: "See the incredible timeline of health improvements that happen when you quit smoking, from 20 minutes to 20 years after your last cigarette.",
      category: "Recovery",
      icon: Cigarette,
      color: "text-panda-success",
      bgColor: "bg-panda-success/10",
      url: "https://www.healthline.com/health/what-happens-when-you-quit-smoking",
      readTime: "4 min read"
    }
  ];

  const handleReadMore = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <img 
            src={pandaEducation} 
            alt="Educational Panda" 
            className="mx-auto w-32 h-32 object-contain animate-bounce-gentle mb-6"
          />
          <h1 className="text-4xl font-bold text-foreground mb-4">Educational Articles</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Learn about the health benefits of quitting smoking and vaping. Knowledge is power on your journey to better health! 📚✨
          </p>
        </div>

        {/* Featured Article */}
        <Card className="bg-gradient-success border-border mb-8">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="bg-panda-love/20 p-3 rounded-lg">
                <Baby className="w-8 h-8 text-panda-love" />
              </div>
              <div className="flex-1">
                <Badge className="bg-panda-love/20 text-panda-love mb-2">Featured</Badge>
                <CardTitle className="text-2xl text-foreground mb-2">
                  Smoking, Fertility, and Your Future Family
                </CardTitle>
                <CardDescription className="text-base">
                  Did you know that smoking can reduce sperm count by up to 23% and affect sperm mobility? 
                  Learn how quitting smoking can dramatically improve your fertility and give you the best 
                  chance of starting a healthy family.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => handleReadMore("https://www.healthline.com/health/smoking/effects-on-body")}
              className="bg-panda-love hover:bg-panda-love/90 text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Read Full Article
            </Button>
          </CardContent>
        </Card>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => {
            const Icon = article.icon;
            return (
              <Card key={article.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${article.bgColor}`}>
                      <Icon className={`w-6 h-6 ${article.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {article.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-lg text-foreground mb-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription>
                        {article.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    onClick={() => handleReadMore(article.url)}
                    className="w-full border-border hover:bg-accent"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-success rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Take Action? 🌟
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Knowledge is the first step, but action creates change. Use what you've learned 
            to fuel your motivation and track your progress with our daily tracker.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/tracker'}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Start Tracking Today
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/motivation'}
              className="border-primary text-primary hover:bg-primary/10"
            >
              Get Motivated
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;