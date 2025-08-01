import React from 'react';
import { ArrowRight, CheckCircle, Users, Calendar, FileText, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LandingProps {
  onNavigateToLogin: () => void;
  onNavigateToRegister: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigateToLogin, onNavigateToRegister }) => {
  const features = [
    {
      icon: Users,
      title: 'Gestão de Pacientes',
      description: 'Cadastre e gerencie informações completas dos pacientes com segurança e praticidade.'
    },
    {
      icon: Calendar,
      title: 'Agendamentos Inteligentes',
      description: 'Sistema avançado de agendamentos com notificações automáticas e controle de horários.'
    },
    {
      icon: FileText,
      title: 'Documentos Médicos',
      description: 'Gere receitas, atestados e relatórios de forma rápida e profissional.'
    },
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Dados protegidos com criptografia avançada e conformidade com a LGPD.'
    }
  ];

  const benefits = [
    'Interface moderna e intuitiva',
    'Acesso multiplataforma (web, tablet, mobile)',
    'Relatórios detalhados e análises',
    'Integração com laboratórios',
    'Suporte técnico especializado',
    'Backup automático na nuvem'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground text-lg font-bold">+</span>
            </div>
            <span className="text-xl font-semibold">Clinic Center</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              Sobre
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </a>
            <Button variant="outline" onClick={onNavigateToLogin}>
              Entrar
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            Revolucione a Gestão da Sua Clínica
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Sistema completo para gestão de clínicas médicas. Simplifique agendamentos, 
            organize prontuários e melhore o atendimento aos seus pacientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl" 
              variant="medical" 
              onClick={onNavigateToRegister}
              className="text-lg px-8"
            >
              Começar Gratuitamente
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="xl" 
              variant="outline" 
              onClick={onNavigateToLogin}
              className="text-lg px-8"
            >
              Fazer Login
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Avaliação gratuita de 14 dias • Não é necessário cartão de crédito
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Recursos Poderosos</h2>
          <p className="text-xl text-muted-foreground">
            Tudo que você precisa para uma gestão médica eficiente
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="medical-card text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-secondary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Por que escolher o Clinic Center?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Desenvolvido especialmente para clínicas médicas brasileiras, 
                nosso sistema oferece todas as ferramentas necessárias para 
                modernizar sua prática médica.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Comece Hoje Mesmo</h3>
                <p className="text-muted-foreground mb-6">
                  Junte-se a centenas de clínicas que já confiam no Clinic Center
                </p>
                <Button 
                  size="lg" 
                  variant="medical" 
                  onClick={onNavigateToRegister}
                  className="w-full"
                >
                  Criar Conta Gratuita
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Sem compromisso • Cancele quando quiser
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Transformar Sua Clínica?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Milhares de profissionais já confiam no Clinic Center. 
            Seja o próximo a revolucionar seu atendimento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl" 
              variant="medical" 
              onClick={onNavigateToRegister}
            >
              Começar Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="xl" 
              variant="outline" 
              onClick={onNavigateToLogin}
            >
              Já tenho conta
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                  <span className="text-primary text-lg font-bold">+</span>
                </div>
                <span className="text-xl font-semibold">Clinic Center</span>
              </div>
              <p className="text-primary-foreground/80">
                Revolucionando a gestão médica no Brasil
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Recursos</li>
                <li>Preços</li>
                <li>Integrações</li>
                <li>API</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Central de Ajuda</li>
                <li>Documentação</li>
                <li>Treinamentos</li>
                <li>Contato</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Sobre nós</li>
                <li>Blog</li>
                <li>Carreiras</li>
                <li>Privacidade</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 Clinic Center. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};