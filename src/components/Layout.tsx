
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Home, Calendar, BookOpen, Plus } from 'lucide-react';
import NotificationSystem from './NotificationSystem';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { profile } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Projetos', href: '/projects', icon: BookOpen },
    { name: 'Calendário', href: '/calendar', icon: Calendar },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted w-full">
        <Sidebar>
          <SidebarHeader className="border-b bg-background/80">
            <div className="flex items-center space-x-2 p-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SN</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                SciNexa
              </span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild isActive={isActive(item.href)}>
                          <Link to={item.href}>
                            <Icon className="h-5 w-5" />
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {profile?.role === 'professor' && (
            <SidebarFooter className="border-t p-4">
              <Link to="/projects/new">
                <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Projeto
                </Button>
              </Link>
            </SidebarFooter>
          )}
        </Sidebar>

        <SidebarInset>
          {/* Header */}
          <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div className="md:hidden flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-600 to-green-700 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">SN</span>
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                    SciNexa
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <NotificationSystem />
                <span className="text-sm text-muted-foreground hidden sm:block">
                  Olá, {profile?.full_name}
                </span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
