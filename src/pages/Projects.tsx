
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Users, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const mockProjects = [
  {
    id: '1',
    title: 'Análise de Algoritmos de Machine Learning',
    description: 'Estudo comparativo de diferentes algoritmos de aprendizado de máquina aplicados à classificação de dados.',
    status: 'in_progress' as const,
    created_by: 'Prof. João Silva',
    participants: ['Ana Costa', 'Pedro Santos'],
    milestones_total: 6,
    milestones_completed: 4,
    next_milestone: '2024-06-15'
  },
  {
    id: '2',
    title: 'Desenvolvimento de Sistema Web',
    description: 'Criação de uma plataforma web para gerenciamento de projetos científicos.',
    status: 'in_progress' as const,
    created_by: 'Prof. Maria Oliveira',
    participants: ['Carlos Lima', 'Julia Ferreira'],
    milestones_total: 8,
    milestones_completed: 6,
    next_milestone: '2024-06-20'
  },
  {
    id: '3',
    title: 'Pesquisa em Inteligência Artificial',
    description: 'Investigação sobre aplicações de IA em sistemas de recomendação.',
    status: 'completed' as const,
    created_by: 'Prof. Roberto Costa',
    participants: ['Fernanda Silva'],
    milestones_total: 5,
    milestones_completed: 5,
    next_milestone: null
  }
];

const Projects = () => {
  const { profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_progress' | 'completed'>('all');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.created_by.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Projetos</h1>
            <p className="text-muted-foreground">
              Gerencie e acompanhe todos os projetos de pesquisa
            </p>
          </div>
          {profile?.role === 'professor' && (
            <Link to="/projects/new">
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                <Plus className="h-4 w-4 mr-2" />
                Novo Projeto
              </Button>
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              Todos
            </Button>
            <Button
              variant={statusFilter === 'in_progress' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('in_progress')}
            >
              Em Andamento
            </Button>
            <Button
              variant={statusFilter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('completed')}
            >
              Concluídos
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                    <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                      {project.status === 'completed' ? 'Concluído' : 'Em Andamento'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="font-medium">Orientador:</span>
                      <span className="ml-1">{project.created_by}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{project.participants.length} participante(s)</span>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{getProgressPercentage(project.milestones_completed, project.milestones_total)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-600 to-green-700 h-2 rounded-full transition-all"
                          style={{ width: `${getProgressPercentage(project.milestones_completed, project.milestones_total)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {project.milestones_completed} de {project.milestones_total} marcos concluídos
                      </div>
                    </div>

                    {project.next_milestone && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Próximo marco: {new Date(project.next_milestone).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              Nenhum projeto encontrado com os filtros aplicados.
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;
