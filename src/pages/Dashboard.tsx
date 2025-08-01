import React from 'react';
import { Users, UserCheck, Calendar, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/medical/StatsCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Total de Pacientes",
      value: "250",
      description: "Pacientes cadastrados",
      icon: Users,
      trend: { value: 12, label: "vs mês anterior", isPositive: true }
    },
    {
      title: "Total de Médicos",
      value: "15",
      description: "Médicos ativos",
      icon: UserCheck,
      trend: { value: 3, label: "novos este mês", isPositive: true }
    },
    {
      title: "Consultas Hoje",
      value: "32",
      description: "Agendamentos para hoje",
      icon: Calendar,
      trend: { value: 8, label: "vs ontem", isPositive: true }
    },
    {
      title: "Taxa de Comparecimento",
      value: "87%",
      description: "Últimos 30 dias",
      icon: TrendingUp,
      trend: { value: 5, label: "vs mês anterior", isPositive: true }
    }
  ];

  const recentAppointments = [
    {
      id: 1,
      patient: "Maria Silva",
      doctor: "Dr. João Santos",
      time: "09:00",
      type: "Consulta",
      status: "confirmed"
    },
    {
      id: 2,
      patient: "José Oliveira",
      doctor: "Dra. Ana Costa",
      time: "10:30",
      type: "Retorno",
      status: "pending"
    },
    {
      id: 3,
      patient: "Ana Rodrigues",
      doctor: "Dr. Carlos Lima",
      time: "14:00",
      type: "Emergência",
      status: "urgent"
    },
    {
      id: 4,
      patient: "Paulo Mendes",
      doctor: "Dra. Sofia Pereira",
      time: "15:30",
      type: "Consulta",
      status: "confirmed"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: "Confirmado", variant: "default" as const, className: "status-active" },
      pending: { label: "Pendente", variant: "secondary" as const, className: "status-pending" },
      urgent: { label: "Urgente", variant: "destructive" as const, className: "status-inactive" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral das atividades da clínica
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            Relatórios
          </Button>
          <Button variant="medical">
            Nova Consulta
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Card */}
        <Card className="lg:col-span-2 medical-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Agendamentos da Semana</span>
              <Button variant="outline" size="sm">
                Ver todos
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-secondary/20 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Gráfico de agendamentos em desenvolvimento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Appointments */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Próximas Consultas</span>
              <Clock className="w-5 h-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm">{appointment.patient}</p>
                      <p className="text-xs text-muted-foreground">{appointment.doctor}</p>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{appointment.type}</span>
                    <span className="font-medium">{appointment.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver todos os agendamentos
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Notifications */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-warning" />
            Alertas e Notificações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-warning" />
                <div>
                  <p className="font-medium text-sm">3 consultas pendentes de confirmação</p>
                  <p className="text-xs text-muted-foreground">Aguardando confirmação dos pacientes</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Revisar
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-success" />
                <div>
                  <p className="font-medium text-sm">Taxa de comparecimento aumentou 15%</p>
                  <p className="text-xs text-muted-foreground">Comparado ao mês anterior</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Ver detalhes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};