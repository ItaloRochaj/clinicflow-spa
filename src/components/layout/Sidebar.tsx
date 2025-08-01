import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Calendar, 
  FileText, 
  User,
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  color?: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'doctors', label: 'Médicos', icon: UserCheck },
  { id: 'patients', label: 'Pacientes', icon: Users },
  { id: 'appointments', label: 'Agendamentos', icon: Calendar },
  { id: 'documents', label: 'Documentos', icon: FileText },
  { id: 'profile', label: 'Perfil', icon: User },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  onLogout,
  collapsed = false,
  onToggleCollapse
}) => {
  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="p-4 border-b border-sidebar-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="w-full"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all duration-200",
                  collapsed ? "px-2" : "px-4",
                  isActive && "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className={cn("w-5 h-5", collapsed ? "" : "mr-3")} />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10",
              collapsed ? "px-2" : "px-4"
            )}
            onClick={onLogout}
          >
            <LogOut className={cn("w-5 h-5", collapsed ? "" : "mr-3")} />
            {!collapsed && <span className="text-sm font-medium">Sair</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};