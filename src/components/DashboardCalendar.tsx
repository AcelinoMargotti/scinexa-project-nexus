
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DashboardCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock events data
  const events = [
    {
      id: '1',
      title: 'Reunião de Orientação',
      date: new Date(),
      type: 'meeting'
    },
    {
      id: '2',
      title: 'Prazo: Revisão de Literatura',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      type: 'deadline'
    },
    {
      id: '3',
      title: 'Apresentação do Projeto',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      type: 'presentation'
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

  const selectedDateEvents = selectedDate ? getEventsByDate(selectedDate) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Calendário</CardTitle>
          <CardDescription>
            Visualize seus compromissos e prazos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
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
                  <span className="text-sm font-medium">{event.title}</span>
                  <Badge className={getEventTypeColor(event.type)}>
                    {event.type === 'meeting' && 'Reunião'}
                    {event.type === 'deadline' && 'Prazo'}
                    {event.type === 'presentation' && 'Apresentação'}
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
    </div>
  );
};

export default DashboardCalendar;
