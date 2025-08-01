import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DoctorCard } from '@/components/medical/DoctorCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const Doctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');

  const doctors = [
    {
      id: '1',
      name: 'Dr. Ricardo Almeida',
      specialty: 'Cardiologia',
      crm: '123456',
      phone: '(11) 99999-9999',
      email: 'ricardo@clinica.com',
      location: 'Clínica Central',
      status: 'active' as const,
      avatar: ''
    },
    {
      id: '2',
      name: 'Dra. Sofia Pereira',
      specialty: 'Ortopedia',
      crm: '654321',
      phone: '(11) 88888-8888',
      email: 'sofia@clinica.com',
      location: 'Hospital São Lucas',
      status: 'active' as const,
      avatar: ''
    },
    {
      id: '3',
      name: 'Dr. Carlos Mendes',
      specialty: 'Ortopedia',
      crm: '789012',
      phone: '(11) 77777-7777',
      email: 'carlos@clinica.com',
      location: 'Centro Médico ABC',
      status: 'active' as const,
      avatar: ''
    },
    {
      id: '4',
      name: 'Dra. Ana Costa',
      specialty: 'Pediatria',
      crm: '210987',
      phone: '(11) 66666-6666',
      email: 'ana@clinica.com',
      location: 'Clínica Infantil Reis',
      status: 'inactive' as const,
      avatar: ''
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.crm.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || doctor.status === statusFilter;
    const matchesSpecialty = specialtyFilter === 'all' || doctor.specialty === specialtyFilter;
    
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const specialties = Array.from(new Set(doctors.map(d => d.specialty)));

  const handleEdit = (doctor: any) => {
    console.log('Edit doctor:', doctor);
  };

  const handleDeactivate = (doctorId: string) => {
    console.log('Deactivate doctor:', doctorId);
  };

  const handleView = (doctor: any) => {
    console.log('View doctor:', doctor);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1">Médicos</h1>
          <p className="text-muted-foreground">
            Gerencie os médicos da clínica
          </p>
        </div>
        <Button variant="medical" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Cadastrar Novo Médico</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Pesquisar por nome, especialidade ou CRM..."
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
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="inactive">Inativos</SelectItem>
          </SelectContent>
        </Select>
        <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Especialidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas especialidades</SelectItem>
            {specialties.map(specialty => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredDoctors.length} médico{filteredDoctors.length !== 1 ? 's' : ''} encontrado{filteredDoctors.length !== 1 ? 's' : ''}
        </p>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filtros avançados
        </Button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onEdit={handleEdit}
            onDeactivate={handleDeactivate}
            onView={handleView}
          />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Nenhum médico encontrado</h3>
          <p className="text-muted-foreground mb-6">
            Tente ajustar os filtros ou cadastre um novo médico.
          </p>
          <Button variant="medical">
            <Plus className="w-4 h-4 mr-2" />
            Cadastrar Médico
          </Button>
        </div>
      )}
    </div>
  );
};