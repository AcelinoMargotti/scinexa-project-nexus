import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  project: string;
  date: string;
  type: 'milestone' | 'deadline' | 'meeting';
  status: 'pending' | 'completed' | 'overdue';
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Implementação dos Algoritmos',
    project: 'Análise de Algoritmos de ML',
    date: '2024-06-15',
    type: 'milestone',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Testes e Validação',
    project: 'Análise de Algoritmos de ML',
    date: '2024-07-01',
    type: 'milestone',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Apresentação Final',
    project: 'Sistema Web',
    date: '2024-06-20',
    type: 'deadline',
    status: 'pending'
  },
  {
    id: '4',
    title: 'Reunião de Orientação',
    project: 'Pesquisa em IA',
    date: '2024-06-18',
    type: 'meeting',
    status: 'pending'
  }
];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return mockEvents.filter(event => event.date === dateString);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'milestone':
        return 'bg-blue-500';
      case 'deadline':
        return 'bg-red-500';
      case 'meeting':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getEventTypeName = (type: string) => {
    switch (type) {
      case 'milestone':
        return 'Marco';
      case 'deadline':
        return 'Prazo';
      case 'meeting':
        return 'Reunião';
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingEvents = mockEvents
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Calendário</h1>
          <p className="text-muted-foreground">
            Acompanhe marcos, prazos e reuniões dos seus projetos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Calendário */}
                  <div className="flex-shrink-0">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      month={currentMonth}
                      onMonthChange={setCurrentMonth}
                      className="rounded-md border"
                    />
                  </div>
                  {/* Detalhes dos eventos do dia selecionado */}
                  <div className="flex-1 min-w-[220px]">
                    <h3 className="font-semibold mb-2 text-lg">Detalhes do dia</h3>
                    {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
                      <ul className="space-y-3">
                        {getEventsForDate(selectedDate).map(event => (
                          <li key={event.id} className="p-3 border rounded-lg flex flex-col gap-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`w-2 h-2 rounded-full ${getEventTypeColor(event.type)}`}></span>
                              <span className="font-medium text-sm">{event.title}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Projeto: {event.project}</span>
                            <span className="text-xs text-muted-foreground">Tipo: {getEventTypeName(event.type)}</span>
                            <span className="text-xs text-muted-foreground">Status: {event.status === 'pending' ? 'Pendente' : event.status === 'completed' ? 'Concluído' : 'Atrasado'}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full min-h-[120px]">
                        <span className="text-sm text-muted-foreground text-center">Nenhum evento para este dia</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Events for Selected Date */}
            {selectedDate && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>
                    Eventos para {selectedDate.toLocaleDateString('pt-BR')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getEventsForDate(selectedDate).length > 0 ? (
                    <div className="space-y-3">
                      {getEventsForDate(selectedDate).map((event) => (
                        <div key={event.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`}></div>
                          <div className="flex-1">
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">{event.project}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{getEventTypeName(event.type)}</Badge>
                            <Badge className={getStatusColor(event.status)}>
                              {event.status === 'pending' ? 'Pendente' : 
                               event.status === 'completed' ? 'Concluído' : 'Atrasado'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      Nenhum evento para esta data
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors">
                      <div className={`w-2 h-2 rounded-full ${getEventTypeColor(event.type)}`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{event.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{event.project}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Legenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Marcos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Prazos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Reuniões</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card decorativo/informativo */}
            <Card>
              <CardHeader>
                <CardTitle>Dica</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use o calendário para planejar suas atividades e acompanhar prazos importantes dos seus projetos. Clique em uma data para ver os eventos do dia!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
