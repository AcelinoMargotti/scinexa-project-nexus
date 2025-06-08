
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Users, Calendar, CheckCircle, Circle, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const mockProject = {
  id: '1',
  title: 'Análise de Algoritmos de Machine Learning',
  description: 'Estudo comparativo de diferentes algoritmos de aprendizado de máquina aplicados à classificação de dados. Este projeto visa investigar a eficácia de diversos métodos de ML em diferentes tipos de datasets.',
  status: 'in_progress' as const,
  created_by: {
    id: 'prof1',
    name: 'Prof. João Silva',
    role: 'main_professor'
  },
  participants: [
    { id: 'student1', name: 'Ana Costa', role: 'student' },
    { id: 'student2', name: 'Pedro Santos', role: 'student' },
    { id: 'prof2', name: 'Prof. Maria Oliveira', role: 'secondary_professor' }
  ],
  milestones: [
    {
      id: '1',
      title: 'Revisão de Literatura',
      description: 'Levantamento bibliográfico sobre algoritmos de ML',
      due_date: '2024-05-15',
      completed: true,
      completed_by: 'Ana Costa',
      completed_at: '2024-05-10'
    },
    {
      id: '2',
      title: 'Coleta de Dados',
      description: 'Preparação e coleta dos datasets para análise',
      due_date: '2024-06-01',
      completed: true,
      completed_by: 'Pedro Santos',
      completed_at: '2024-05-28'
    },
    {
      id: '3',
      title: 'Implementação dos Algoritmos',
      description: 'Codificação dos algoritmos de ML selecionados',
      due_date: '2024-06-15',
      completed: false,
      completed_by: null,
      completed_at: null
    },
    {
      id: '4',
      title: 'Testes e Validação',
      description: 'Execução dos testes e validação dos resultados',
      due_date: '2024-07-01',
      completed: false,
      completed_by: null,
      completed_at: null
    }
  ],
  created_at: '2024-03-01',
  updated_at: '2024-05-28'
};

const ProjectDetails = () => {
  const { id } = useParams();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const isProfessor = profile?.role === 'professor';
  const completedMilestones = mockProject.milestones.filter(m => m.completed).length;
  const totalMilestones = mockProject.milestones.length;
  const progressPercentage = Math.round((completedMilestones / totalMilestones) * 100);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const toggleMilestone = (milestoneId: string) => {
    // Aqui implementaríamos a lógica para marcar/desmarcar marcos
    console.log('Toggle milestone:', milestoneId);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link to="/projects">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{mockProject.title}</h1>
            <p className="text-muted-foreground mb-4">{mockProject.description}</p>
            <div className="flex items-center space-x-4">
              <Badge variant={mockProject.status === 'completed' ? 'default' : 'secondary'}>
                {mockProject.status === 'completed' ? 'Concluído' : 'Em Andamento'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Criado em {new Date(mockProject.created_at).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
          {isProfessor && (
            <Button variant="outline">
              Editar Projeto
            </Button>
          )}
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Progresso do Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Marcos Concluídos</span>
                  <span>{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-600 to-green-700 h-3 rounded-full transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {completedMilestones} de {totalMilestones} marcos concluídos
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="milestones">Marcos</TabsTrigger>
            <TabsTrigger value="participants">Participantes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Participantes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(mockProject.created_by.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{mockProject.created_by.name}</p>
                        <p className="text-sm text-muted-foreground">Orientador Principal</p>
                      </div>
                    </div>
                    {mockProject.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {participant.role === 'student' ? 'Estudante' : 'Professor Colaborador'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Próximos Marcos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockProject.milestones
                      .filter(m => !m.completed)
                      .slice(0, 3)
                      .map((milestone) => (
                        <div key={milestone.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{milestone.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Vence em {new Date(milestone.due_date).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Marcos do Projeto</h3>
              {isProfessor && (
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Marco
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {mockProject.milestones.map((milestone) => (
                <Card key={milestone.id} className={milestone.completed ? 'bg-green-50' : ''}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <button
                        onClick={() => toggleMilestone(milestone.id)}
                        className="mt-1"
                      >
                        {milestone.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                      <div className="flex-1">
                        <h4 className={`font-medium ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {milestone.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {milestone.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <span>Prazo: {new Date(milestone.due_date).toLocaleDateString('pt-BR')}</span>
                          {milestone.completed && milestone.completed_by && (
                            <span>Concluído por: {milestone.completed_by}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="participants" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Participantes do Projeto</h3>
              {isProfessor && (
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Participante
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Orientador Principal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getInitials(mockProject.created_by.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{mockProject.created_by.name}</p>
                      <p className="text-sm text-muted-foreground">Professor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {mockProject.participants.map((participant) => (
                <Card key={participant.id}>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {participant.role === 'student' ? 'Estudante' : 'Professor Colaborador'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {participant.role === 'student' ? 'Estudante' : 'Professor'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProjectDetails;
