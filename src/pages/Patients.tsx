import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export const Patients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const patients = [
    {
      id: '1',
      name: 'Sophia Clark',
      cpf: '123.456.789-00',
      phone: '(11) 99765-4321',
      email: 'sophia@email.com',
      age: 28,
      status: 'active',
      lastVisit: '2024-01-15',
      avatar: ''
    },
    {
      id: '2',
      name: 'Liam Carter',
      cpf: '987.654.321-00',
      phone: '(11) 91234-5678',
      email: 'liam@email.com',
      age: 35,
      status: 'active',
      lastVisit: '2024-01-10',
      avatar: ''
    },
    {
      id: '3',
      name: 'Olivia Bennett',
      cpf: '456.789.123-00',
      phone: '(11) 95678-1234',
      email: 'olivia@email.com',
      age: 42,
      status: 'inactive',
      lastVisit: '2023-12-20',
      avatar: ''
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf.includes(searchTerm) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="status-active">Ativo</Badge>
    ) : (
      <Badge className="status-inactive">Inativo</Badge>
    );
  };

  const calculateBMI = (weight: number, height: number) => {
    const bmi = weight / (height * height);
    return {
      value: bmi.toFixed(1),
      classification: getBMIClassification(bmi),
      color: getBMIColor(bmi)
    };
  };

  const getBMIClassification = (bmi: number) => {
    if (bmi < 18.5) return 'Abaixo do peso';
    if (bmi < 25) return 'Peso normal';
    if (bmi < 30) return 'Sobrepeso';
    return 'Obesidade';
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5 || bmi >= 30) return 'text-destructive';
    if (bmi < 25) return 'text-success';
    return 'text-warning';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1">Pacientes</h1>
          <p className="text-muted-foreground">
            Gerencie os pacientes da clínica
          </p>
        </div>
        <Button variant="medical">
          <Plus className="w-4 h-4 mr-2" />
          Cadastrar Paciente
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por nome ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={viewMode === 'table' ? 'default' : 'outline'}
            onClick={() => setViewMode('table')}
            size="sm"
          >
            Tabela
          </Button>
          <Button 
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            onClick={() => setViewMode('cards')}
            size="sm"
          >
            Cards
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <p className="text-sm text-muted-foreground">
        {filteredPatients.length} paciente{filteredPatients.length !== 1 ? 's' : ''} encontrado{filteredPatients.length !== 1 ? 's' : ''}
      </p>

      {/* Patients Table View */}
      {viewMode === 'table' && (
        <Card className="medical-card">
          <CardHeader>
            <CardTitle>Lista de Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Idade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Última Consulta</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={patient.avatar} />
                          <AvatarFallback>
                            {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-sm text-muted-foreground">{patient.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{patient.cpf}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.age} anos</TableCell>
                    <TableCell>{getStatusBadge(patient.status)}</TableCell>
                    <TableCell>{new Date(patient.lastVisit).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Patients Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="medical-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={patient.avatar} />
                      <AvatarFallback>
                        {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">{patient.age} anos</p>
                    </div>
                  </div>
                  {getStatusBadge(patient.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm">
                    <span className="font-medium">CPF:</span> {patient.cpf}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Telefone:</span> {patient.phone}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Email:</span> {patient.email}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Última consulta:</span> {new Date(patient.lastVisit).toLocaleDateString('pt-BR')}
                  </div>
                </div>

                {/* BMI Calculator Section */}
                <div className="border-t pt-3 mt-3">
                  <div className="text-sm font-medium mb-2">Calculadora de IMC</div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <Input placeholder="Peso (kg)" size={8} />
                    <Input placeholder="Altura (m)" size={8} />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Calcular IMC
                  </Button>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button variant="default" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Nenhum paciente encontrado</h3>
          <p className="text-muted-foreground mb-6">
            Tente ajustar a busca ou cadastre um novo paciente.
          </p>
          <Button variant="medical">
            <Plus className="w-4 h-4 mr-2" />
            Cadastrar Paciente
          </Button>
        </div>
      )}
    </div>
  );
};