
import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const NotificationSystem = () => {
  const [notifications] = useState([
    {
      id: '1',
      title: 'Marco Concluído',
      message: 'Maria Santos concluiu o marco "Revisão de Literatura" no projeto Análise de Algoritmos',
      read: false,
      created_at: new Date().toISOString(),
      type: 'milestone_update'
    },
    {
      id: '2', 
      title: 'Novo Participante',
      message: 'Pedro Costa foi adicionado ao projeto Machine Learning',
      read: false,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      type: 'project_update'
    },
    {
      id: '3',
      title: 'Prazo Próximo',
      message: 'O marco "Implementação" vence em 3 dias',
      read: true,
      created_at: new Date(Date.now() - 172800000).toISOString(),
      type: 'milestone_update'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const isMobile = useIsMobile();

  const NotificationContent = () => (
    <div className="w-full max-w-sm">
      <div className="p-4">
        <h3 className="font-semibold text-base mb-4">Notificações</h3>
        {notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhuma notificação
          </p>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border text-sm transition-colors ${
                  notification.read 
                    ? 'bg-muted/50 text-muted-foreground' 
                    : 'bg-background border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between space-x-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium leading-none mb-1">
                      {notification.title}
                    </p>
                    <p className="text-xs leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(notification.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-600">
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Notificações</DrawerTitle>
            <DrawerDescription>
              Suas últimas atualizações de projetos
            </DrawerDescription>
          </DrawerHeader>
          <NotificationContent />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-600">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <DropdownMenuItem disabled>
            Nenhuma notificação
          </DropdownMenuItem>
        ) : (
          <div className="space-y-1 max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex-col items-start p-3 space-y-1 ${
                  notification.read ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-sm">{notification.title}</span>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(notification.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationSystem;
