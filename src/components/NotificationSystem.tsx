
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Bell, CheckCircle, Calendar, BookOpen } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'project_update' | 'milestone_update' | 'project_completion';
  project_id: string;
  project_name: string;
  read: boolean;
  created_at: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Marco concluído',
    message: 'O marco "Revisão de Literatura" foi marcado como concluído por Ana Costa',
    type: 'milestone_update',
    project_id: '1',
    project_name: 'Análise de Algoritmos de ML',
    read: false,
    created_at: '2024-06-08T10:30:00Z'
  },
  {
    id: '2',
    title: 'Novo participante',
    message: 'Pedro Santos foi adicionado ao projeto',
    type: 'project_update',
    project_id: '2',
    project_name: 'Sistema Web',
    read: false,
    created_at: '2024-06-08T09:15:00Z'
  },
  {
    id: '3',
    title: 'Projeto concluído',
    message: 'O projeto "Pesquisa em IA" foi marcado como concluído',
    type: 'project_completion',
    project_id: '3',
    project_name: 'Pesquisa em IA',
    read: true,
    created_at: '2024-06-07T16:45:00Z'
  }
];

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'milestone_update':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'project_completion':
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      default:
        return <Calendar className="h-4 w-4 text-orange-600" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora há pouco';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d atrás`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Notificações</SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma notificação</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`cursor-pointer transition-all ${
                  !notification.read ? 'border-green-200 bg-green-50' : 'hover:bg-muted'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{notification.project_name}</span>
                        <span>{formatTime(notification.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSystem;
