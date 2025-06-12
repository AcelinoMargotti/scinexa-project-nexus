import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock events data
  const events = [
    {
      id: '1',
      title: 'Reunião de Orientação',
      date: new Date(),
      type: 'meeting',
      project: 'Análise de Algoritmos'
    },
    {
      id: '2',
      title: 'Prazo: Revisão de Literatura',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      type: 'deadline',
      project: 'Machine Learning'
    },
    {
      id: '3',
      title: 'Apresentação do Projeto',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      type: 'presentation',
      project: 'Sistema Web'
    }
  ];

  const getEventsByDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'deadline':
        return 'bg-red-100 text-red-800';
      case 'presentation':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeName = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'Reunião';
      case 'deadline':
        return 'Prazo';
      case 'presentation':
        return 'Apresentação';
      default:
        return type;
    }
  };

  const selectedDateEvents = selectedDate ? getEventsByDate(selectedDate) : [];

  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Calendário</CardTitle>
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
            <CardDescription>
              Visualize seus compromissos e prazos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="w-full"
              modifiers={{
                event: events.map(event => event.date)
              }}
              modifiersStyles={{
                event: {
                  fontWeight: 'bold',
                  color: 'hsl(var(--primary))'
                }
              }}
            />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>
              Eventos para {selectedDate?.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
              })}
            </CardTitle>
            <CardDescription>
              Compromissos e prazos do dia selecionado
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.project}</p>
                    </div>
                    <Badge className={getEventTypeColor(event.type)}>
                      {getEventTypeName(event.type)}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum evento para este dia
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>
              Eventos agendados para os próximos dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors">
                  <div className={`w-2 h-2 rounded-full ${getEventTypeColor(event.type).split(' ')[0]}`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{event.project}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date.toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Legenda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">Reuniões</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">Prazos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Apresentações</span>
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
  );
};

export default DashboardCalendar;
