import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px é o breakpoint md do Tailwind
    };

    // Verifica no carregamento inicial
    checkIsMobile();

    // Adiciona listener para mudanças de tamanho da tela
    window.addEventListener('resize', checkIsMobile);

    // Limpa o listener quando o componente é desmontado
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}; 