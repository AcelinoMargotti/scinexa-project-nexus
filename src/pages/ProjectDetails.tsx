
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Users, Calendar, CheckCircle, Clock } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const isProfessor = profile?.role === 'professor';

  // Mock project data
  const project = {
    id: id,
    title: 'Análise de Algoritmos de Machine Learning',
    description: 'Este projeto visa analisar e comparar diferentes algoritmos de machine learning para classificação de dados, focando em performance e precisão.',
    status: 'in_progress' as const,
    created_by: 'mock-professor-id',
    created_at: '2024-01-15',
    participants: [
      { id: '1', name: 'Prof. Dr. João Silva', role: 'main_professor', email: 'joao@university.edu' },
      { id: '2', name: 'Maria Santos', role: 'student', email: 'maria@student.edu' },
      { id: '3', name: 'Pedro Costa', role: 'student', email: 'pedro@student.edu' }
    ],
    milestones: [
      { 
        id: '1', 
        title: 'Revisão de Literatura', 
        description: 'Pesquisar e analisar papers relacionados ao tema',
        due_date: '2024-02-28',
        completed: true,
        completed_by: 'Maria Santos',
        completed_at: '2024-02-25'
      },
      { 
        id: '2', 
        title: 'Coleta de Dados', 
        description: 'Reunir datasets para treinamento dos algoritmos',
        due_date: '2024-03-31',
        completed: true,
        completed_by: 'Pedro Costa',
        completed_at: '2024-03-28'
      },
      { 
        id: '3', 
        title: 'Implementação dos Algoritmos', 
        description: 'Desenvolver e implementar os algoritmos selecionados',
        due_date: '2024-05-15',
        completed: false
      },
      { 
        id: '4', 
        title: 'Análise dos Resultados', 
        description: 'Comparar performance e criar relatório final',
        due_date: '2024-06-30',
        completed: false
      }
    ]
  };

  const completedMilestones = project.milestones.filter(m => m.completed).length;
  const totalMilestones = project.milestones.length;
  const progressPercentage = (completedMilestones / totalMilestones) * 100;

  const getStatusColor = (status: 'in_progress' | 'completed') => {
    return status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  };

  const getStatusLabel = (status: 'in_progress' | 'completed') => {
    return status === 'completed' ? 'Concluído' : 'Em Andamento';
  };

  const handleMarkAsCompleted = () => {
    // TODO: Implement mark project as completed
    console.log('Marking project as completed');
  };

  const handleToggleMilestone = (milestoneId: string) => {
    // TODO: Implement toggle milestone completion
    console.log('Toggling milestone:', milestoneId);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/projects')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className={getStatusColor(project.status)}>
                  {getStatusLabel(project.status)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Criado em {new Date(project.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>

          {isProfessor && project.status === 'in_progress' && (
            <Button onClick={handleMarkAsCompleted} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Marcar como Concluído
            </Button>
          )}
        </div>

        {/* Project Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Descrição do Projeto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Progresso</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Marcos Concluídos</span>
                    <span>{completedMilestones}/{totalMilestones}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {progressPercentage.toFixed(0)}% concluído
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Participants Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Participantes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {participant.role === 'main_professor' ? 'Professor Orientador' :
                           participant.role === 'secondary_professor' ? 'Professor Colaborador' :
                           'Estudante'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Marcos do Projeto</span>
            </CardTitle>
            <CardDescription>
              Acompanhe o progresso através dos marcos definidos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.milestones.map((milestone, index) => (
                <div key={milestone.id}>
                  <div className="flex items-start space-x-4 p-4 rounded-lg border">
                    <div className="flex-shrink-0 mt-1">
                      {milestone.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {milestone.title}
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          {new Date(milestone.due_date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {milestone.description}
                      </p>
                      {milestone.completed && milestone.completed_by && (
                        <p className="text-xs text-green-600 mt-2">
                          Concluído por {milestone.completed_by} em {new Date(milestone.completed_at!).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                      {!milestone.completed && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2"
                          onClick={() => handleToggleMilestone(milestone.id)}
                        >
                          Marcar como Concluído
                        </Button>
                      )}
                    </div>
                  </div>
                  {index < project.milestones.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProjectDetails;
