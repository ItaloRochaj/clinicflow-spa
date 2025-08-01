import React from 'react';
import { Bell, X, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Notification {
  id: string;
  type: 'appointment' | 'cancellation' | 'new-patient' | 'reminder';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export const NotificationPanel: React.FC = () => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'reminder',
      title: 'Appointment with Dr. Emily Carter',
      description: 'Appointment Reminder',
      time: '10 min ago',
      read: false
    },
    {
      id: '2',
      type: 'cancellation',
      title: 'Appointment with Dr. David Lee cancelled',
      description: 'Cancellation',
      time: '2 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Appointment with Dr. Sarah Jones',
      description: 'Appointment Reminder',
      time: '1 day ago',
      read: true
    },
    {
      id: '4',
      type: 'new-patient',
      title: 'New patient, Michael Chen, has scheduled an appointment',
      description: 'New Patient',
      time: '2 days ago',
      read: false
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Appointment with Dr. Robert Williams',
      description: 'Appointment Reminder',
      time: '3 days ago',
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    const iconClass = "w-10 h-10 rounded-lg flex items-center justify-center text-white";
    switch (type) {
      case 'reminder':
        return <div className={`${iconClass} bg-blue-500`}>📅</div>;
      case 'cancellation':
        return <div className={`${iconClass} bg-red-500`}>❌</div>;
      case 'new-patient':
        return <div className={`${iconClass} bg-green-500`}>👤</div>;
      default:
        return <div className={`${iconClass} bg-gray-500`}>📢</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="heading-1">Notifications</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={`${notification.read ? 'opacity-60' : ''} medical-card hover:shadow-md transition-shadow`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <Badge variant="secondary" className="ml-2">New</Badge>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};