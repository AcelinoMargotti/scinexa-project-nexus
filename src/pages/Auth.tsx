import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import PageTransition from '@/components/PageTransition';

const Auth = () => {
  const { user, signUp, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    const role = formData.get('role') as 'professor' | 'student';

    const { error } = await signUp(email, password, fullName, role);

    if (error) {
      toast({
        title: 'Erro no cadastro',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Cadastro realizado!',
        description: 'Verifique seu email para confirmar sua conta.'
      });
    }

    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: 'Erro no login',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Login realizado!',
        description: 'Bem-vindo de volta!'
      });
      navigate('/dashboard');
    }

    setLoading(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Logo size="md" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                SciNexa
              </span>
            </div>
            <CardTitle>Bem-vindo ao SciNexa</CardTitle>
            <CardDescription>
              Plataforma de gerenciamento de projetos de iniciação científica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Cadastrar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Senha</Label>
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    disabled={loading}
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nome completo</Label>
                    <Input
                      id="signup-name"
                      name="fullName"
                      type="text"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Tipo de usuário</Label>
                    <Select name="role" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professor">Professor/Orientador</SelectItem>
                        <SelectItem value="student">Estudante/Orientando</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    disabled={loading}
                  >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default Auth;
