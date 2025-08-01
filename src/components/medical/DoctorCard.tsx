import React from 'react';
import { MoreHorizontal, Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  crm: string;
  phone: string;
  email: string;
  location: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

interface DoctorCardProps {
  doctor: Doctor;
  onEdit: (doctor: Doctor) => void;
  onDeactivate: (doctorId: string) => void;
  onView: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onEdit,
  onDeactivate,
  onView
}) => {
  return (
    <Card className="medical-card hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={doctor.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{doctor.name}</h3>
              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge 
              variant={doctor.status === 'active' ? 'default' : 'secondary'}
              className={doctor.status === 'active' ? 'status-active' : 'status-inactive'}
            >
              {doctor.status === 'active' ? 'Ativo' : 'Inativo'}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(doctor)}>
                  Visualizar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(doctor)}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDeactivate(doctor.id)}
                  className="text-destructive"
                >
                  Desativar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="font-medium mr-2">CRM:</span>
            <span>{doctor.crm}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Phone className="w-4 h-4 mr-2" />
            <span>{doctor.phone}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Mail className="w-4 h-4 mr-2" />
            <span>{doctor.email}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{doctor.location}</span>
          </div>
        </div>
        <div className="flex space-x-2 mt-4">
          <Button variant="default" size="sm" onClick={() => onEdit(doctor)} className="flex-1">
            Editar
          </Button>
          <Button variant="outline" size="sm" onClick={() => onView(doctor)} className="flex-1">
            Visualizar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};