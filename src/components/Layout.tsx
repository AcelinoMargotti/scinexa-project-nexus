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
import Logo from '@/components/Logo';
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { profile, user, signOut } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();

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
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <Sidebar>
              <SidebarHeader className="border-b bg-background/80">
                <div className="p-4">
                  <Logo size="md" linkTo="/dashboard" />
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
          </motion.div>
        </AnimatePresence>

        <SidebarInset>
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50"
          >
            <div className="flex h-16 items-center px-4 md:px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div className="md:hidden">
                  <Logo size="sm" linkTo="/dashboard" />
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
          </motion.header>

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="flex-1 p-4 md:p-6 overflow-auto"
          >
            {children}
          </motion.main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
