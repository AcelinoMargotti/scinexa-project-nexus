
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">SN</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
            SciNexa
          </h1>
        </div>
        
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Plataforma de Gerenciamento de Projetos Científicos
        </h2>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Conecte professores e estudantes para colaboração em projetos de iniciação científica. 
          Gerencie marcos, acompanhe progresso e mantenha-se organizado.
        </p>

        <div className="flex items-center justify-center space-x-4">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            onClick={() => navigate('/dashboard')}
          >
            Explorar Plataforma
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/auth')}
          >
            Fazer Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
