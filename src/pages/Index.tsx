
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Calendar, Search, Bell, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Controle de Acesso por Papel",
      description: "Dashboards separados para professores e estudantes com permissões personalizadas"
    },
    {
      icon: BookOpen,
      title: "Gerenciamento de Projetos",
      description: "Crie, gerencie e acompanhe projetos de iniciação científica com facilidade"
    },
    {
      icon: Calendar,
      title: "Acompanhamento de Cronograma",
      description: "Monitore marcos e prazos com visualizações de calendário integradas"
    },
    {
      icon: Search,
      title: "Filtragem Inteligente",
      description: "Encontre projetos rapidamente com opções avançadas de busca e filtro"
    },
    {
      icon: Bell,
      title: "Notificações em Tempo Real",
      description: "Mantenha-se atualizado com alertas instantâneos sobre mudanças e atualizações"
    },
    {
      icon: BarChart3,
      title: "Análise de Progresso",
      description: "Acompanhamento visual do progresso com gráficos e métricas de conclusão"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SN</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              SciNexa
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Sobre
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Contato
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <Link to="/auth">Entrar</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
              <Link to="/auth">Começar</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-green-600 to-foreground bg-clip-text text-transparent">
            Pesquisa Científica
            <br />
            <span className="text-green-600">Simplificada</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            SciNexa conecta professores e estudantes em uma plataforma integrada para gerenciar projetos de iniciação científica. 
            Acompanhe o progresso, colabore efetivamente e alcance a excelência em pesquisa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg px-8">
              <Link to="/auth">Iniciar Sua Jornada de Pesquisa</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-green-600 text-green-600 hover:bg-green-50">
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tudo o Que Você Precisa para Gerenciar Pesquisas
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recursos poderosos projetados especificamente para colaboração em pesquisa acadêmica
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Role-Based Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Construído para Professores e Estudantes
            </h2>
            <p className="text-xl text-muted-foreground">
              Experiências personalizadas para diferentes papéis na pesquisa científica
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Para Professores</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Criar e gerenciar múltiplos projetos de pesquisa
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Adicionar estudantes e professores secundários
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Acompanhar progresso e marcos dos estudantes
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Gerenciar status de conclusão dos projetos
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-4">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Para Estudantes</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Visualizar e atualizar marcos do projeto
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Acompanhar progresso da pesquisa visualmente
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Colaborar efetivamente com professores
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Receber notificações sobre atualizações
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Transformar Seu Processo de Pesquisa?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se aos professores e estudantes que já estão usando o SciNexa para otimizar seus projetos de pesquisa científica.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg px-8">
            <Link to="/auth">Comece Hoje</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-green-600 to-green-700 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">SN</span>
              </div>
              <span className="text-lg font-bold text-green-600">SciNexa</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 SciNexa. Potencializando a colaboração em pesquisa científica.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
