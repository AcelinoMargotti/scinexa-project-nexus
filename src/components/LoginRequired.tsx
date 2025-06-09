
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, LogIn, UserPlus } from 'lucide-react';

interface LoginRequiredProps {
  message?: string;
  action?: string;
}

const LoginRequired = ({ 
  message = "Para acessar esta funcionalidade, você precisa estar logado.",
  action = "essa funcionalidade"
}: LoginRequiredProps) => {
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
        </div>
        <CardTitle>Login Necessário</CardTitle>
        <CardDescription>
          {message}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground text-center">
          Para usar {action}, faça login ou crie uma conta.
        </p>
        <div className="flex flex-col space-y-2">
          <Link to="/auth" className="w-full">
            <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
              <LogIn className="h-4 w-4 mr-2" />
              Fazer Login
            </Button>
          </Link>
          <Link to="/auth" className="w-full">
            <Button variant="outline" className="w-full">
              <UserPlus className="h-4 w-4 mr-2" />
              Criar Conta
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginRequired;
