import { GraduationCap, FileSearch, Shield, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface WelcomeHeroProps {
  collegeName: string;
  studentName?: string;
}

const WelcomeHero = ({ collegeName, studentName }: WelcomeHeroProps) => {
  const features = [
    {
      icon: FileSearch,
      title: 'View Answer Papers',
      description: 'Access your evaluated answer sheets with detailed marks',
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Your data is protected with enterprise-grade security',
    },
    {
      icon: Clock,
      title: 'Raise Objections',
      description: 'Submit queries within the objection window period',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 opacity-30" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} 
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
            {studentName ? (
              <>Welcome, <span className="text-primary">{studentName}</span>!</>
            ) : (
              <>Welcome to <span className="text-primary">Answer Paper Portal</span></>
            )}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Access your evaluated answer papers, view detailed marks analysis, and raise objections 
            through our secure examination portal.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {collegeName}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-4 md:p-6 bg-card/60 backdrop-blur-sm border-border hover:border-primary/30 transition-all hover:shadow-lg group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;
