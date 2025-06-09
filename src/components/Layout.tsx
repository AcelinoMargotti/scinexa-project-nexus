import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Home, BookOpen, Calendar, Plus } from 'lucide-react';
import NotificationSystem from './NotificationSystem';
import { ThemeToggle } from './ThemeToggle';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarTrigger,
  SidebarProvider,
} from '@/components/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { profile, user, signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Projetos', href: '/projects', icon: BookOpen },
    { name: 'Calendário', href: '/calendar', icon: Calendar },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted">
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
          <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="flex h-16 items-center px-4 md:px-6">
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
              <div className="flex-1" />
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <NotificationSystem />
                {user ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground hidden sm:block">
                      Olá, {profile?.full_name}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSignOut}
                      className="flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="hidden sm:block">Sair</span>
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    >
                      <LogIn className="h-4 w-4" />
                      <span className="hidden sm:block">Entrar</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
