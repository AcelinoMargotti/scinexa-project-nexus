
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import DashboardCalendar from '@/components/DashboardCalendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { profile } = useAuth();
  const isProfessor = profile?.role === 'professor';

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Dashboard {isProfessor ? 'do Professor' : 'do Estudante'}
          </h1>
          <p className="text-muted-foreground">
            {isProfessor 
              ? 'Gerencie seus projetos de pesquisa e orientandos'
              : 'Acompanhe seus projetos de iniciação científica'
            }
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isProfessor ? 'Projetos Criados' : 'Projetos Participando'}
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                {isProfessor ? 'projetos sob sua orientação' : 'projetos em andamento'}
              </p>
            </CardContent>
          </Card>

          {isProfessor && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orientandos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  estudantes orientados
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Marcos Pendentes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                próximos do vencimento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                marcos concluídos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Section */}
        <DashboardCalendar />

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Últimas atualizações em seus projetos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Marco "Revisão de Literatura" concluído</p>
                  <p className="text-xs text-muted-foreground">Projeto: Análise de Algoritmos - há 2 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Novo participante adicionado</p>
                  <p className="text-xs text-muted-foreground">Projeto: Machine Learning - há 1 dia</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Prazo se aproximando</p>
                  <p className="text-xs text-muted-foreground">Marco: Implementação - vence em 3 dias</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
