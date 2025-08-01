import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Appointments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const appointments = [
    {
      id: '1',
      patient: 'Maria Silva',
      doctor: 'Dr. João Santos',
      date: '2024-01-20',
      time: '09:00',
      type: 'Consulta de rotina',
      status: 'confirmed',
      duration: 30
    },
    {
      id: '2',
      patient: 'José Oliveira',
      doctor: 'Dra. Ana Costa',
      date: '2024-01-20',
      time: '10:30',
      type: 'Retorno',
      status: 'pending',
      duration: 30
    },
    {
      id: '3',
      patient: 'Ana Rodrigues',
      doctor: 'Dr. Carlos Lima',
      date: '2024-01-20',
      time: '14:00',
      type: 'Emergência',
      status: 'urgent',
      duration: 60
    },
    {
      id: '4',
      patient: 'Paulo Mendes',
      doctor: 'Dra. Sofia Pereira',
      date: '2024-01-21',
      time: '15:30',
      type: 'Consulta especializada',
      status: 'confirmed',
      duration: 45
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: "Confirmado", className: "status-active" },
      pending: { label: "Pendente", className: "status-pending" },
      urgent: { label: "Urgente", className: "status-inactive" },
      completed: { label: "Concluído", className: "status-active" },
      cancelled: { label: "Cancelado", className: "status-inactive" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const todayAppointments = appointments.filter(apt => apt.date === '2024-01-20');
  const futureAppointments = appointments.filter(apt => apt.date > '2024-01-20');
  const completedAppointments = appointments.filter(apt => apt.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1">Agendamentos</h1>
          <p className="text-muted-foreground">
            Gerencie consultas e agendamentos
          </p>
        </div>
        <Button variant="medical">
          <Plus className="w-4 h-4 mr-2" />
          Nova Consulta
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por paciente ou médico..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="confirmed">Confirmado</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="urgent">Urgente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Appointments Tabs */}
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Hoje</TabsTrigger>
          <TabsTrigger value="future">Futuras</TabsTrigger>
          <TabsTrigger value="completed">Concluídas</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Consultas de Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{appointment.patient}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">{appointment.time}</div>
                        <div className="text-sm text-muted-foreground">{appointment.duration} min</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{appointment.type}</p>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Reagendar
                        </Button>
                        <Button variant="default" size="sm">
                          Confirmar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="future" className="space-y-4">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Próximas Consultas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {futureAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{appointment.patient}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{new Date(appointment.date).toLocaleDateString('pt-BR')} - {appointment.time}</div>
                        <div className="text-sm text-muted-foreground">{appointment.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      {getStatusBadge(appointment.status)}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Consultas Concluídas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CalendarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma consulta concluída</h3>
                <p className="text-muted-foreground">
                  As consultas concluídas aparecerão aqui
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="medical-card cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Plus className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Agendar Consulta</h3>
            <p className="text-sm text-muted-foreground">Criar novo agendamento</p>
          </CardContent>
        </Card>
        
        <Card className="medical-card cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <CalendarIcon className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Calendário</h3>
            <p className="text-sm text-muted-foreground">Visualizar agenda completa</p>
          </CardContent>
        </Card>
        
        <Card className="medical-card cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Filter className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Relatórios</h3>
            <p className="text-sm text-muted-foreground">Análise de agendamentos</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};