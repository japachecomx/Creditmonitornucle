import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Send,
  Bot,
  User,
  Sparkles,
  TrendingUp,
  Cloud,
  Leaf,
  DollarSign,
  Shield,
  X,
  Minimize2,
  Maximize2,
} from 'lucide-react';

interface DonEnriqueProps {
  onClose?: () => void;
  context?: 'credit' | 'insurance' | 'general' | 'agronomic';
  contextData?: any;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  suggestions?: string[];
}

export function DonEnrique({ 
  onClose, 
  context = 'general', 
  contextData,
  isMinimized = false,
  onToggleMinimize
}: DonEnriqueProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mensaje de bienvenida según contexto
    const welcomeMessage = getWelcomeMessage(context);
    setMessages([{
      id: '1',
      sender: 'assistant',
      text: welcomeMessage.text,
      timestamp: new Date(),
      suggestions: welcomeMessage.suggestions,
    }]);
  }, [context]);

  const getWelcomeMessage = (ctx: string) => {
    switch (ctx) {
      case 'credit':
        return {
          text: '¡Hola! Soy Don Enrique, tu asesor de financiamiento agropecuario. Estoy aquí para ayudarte a evaluar el crédito, analizar riesgos y sugerir las mejores condiciones de financiamiento. ¿En qué puedo asistirte?',
          suggestions: [
            '¿Qué monto de crédito recomiendas para maíz en 50 hectáreas?',
            'Evalúa el riesgo climático de esta región',
            '¿Cuál es la tasa de interés adecuada?',
            'Análisis de viabilidad del cultivo'
          ],
        };
      case 'insurance':
        return {
          text: '¡Hola! Soy Don Enrique, tu asesor de seguros agropecuarios. Puedo ayudarte a determinar la cobertura ideal, calcular primas, evaluar riesgos y recomendar el mejor seguro Sinecta para cada situación. ¿Qué necesitas saber?',
          suggestions: [
            '¿Qué cobertura recomiendas para cultivo de soja?',
            'Calcula la prima para 100 hectáreas',
            'Riesgos principales en esta zona',
            'Comparar opciones de pólizas'
          ],
        };
      case 'agronomic':
        return {
          text: '¡Hola! Soy Don Enrique, tu asesor agronómico. Puedo ayudarte con análisis de cultivos, evaluación de riesgos biológicos y climáticos, recomendaciones de manejo y proyecciones de rendimiento. ¿Cómo puedo ayudarte?',
          suggestions: [
            'Análisis de salud del cultivo',
            'Proyección de rendimiento',
            'Riesgos de plagas en esta época',
            'Recomendaciones de manejo'
          ],
        };
      default:
        return {
          text: '¡Hola! Soy Don Enrique, tu asesor inteligente de Sinecta. Estoy aquí para ayudarte con análisis agronómico, evaluación de riesgos, asesoría en créditos y seguros agropecuarios. ¿En qué puedo asistirte hoy?',
          suggestions: [
            'Análisis de riesgo climático',
            'Asesoría para nuevo crédito',
            'Recomendación de seguro',
            'Evaluación agronómica de parcela'
          ],
        };
    }
  };

  const generateResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    // Simulación de respuestas inteligentes basadas en el contexto
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('monto') || lowerMessage.includes('crédito')) {
      return {
        text: 'Basándome en el análisis agronómico y las condiciones del mercado, para un cultivo de maíz en 50 hectáreas recomiendo un crédito de $180,000 - $220,000. Esto cubre: semillas certificadas ($45,000), fertilizantes ($65,000), fitosanitarios ($35,000), maquinaria y mano de obra ($55,000), más un 15% de contingencia climática ($30,000). La tasa sugerida es 8.5% anual con 18 meses de plazo.',
        suggestions: [
          'Detalla los costos de insumos',
          'Evalúa riesgo de esta inversión',
          'Sugiere un plan de pagos',
        ],
      };
    }

    if (lowerMessage.includes('riesgo climático') || lowerMessage.includes('clima')) {
      return {
        text: 'El análisis climático de la región muestra: 🌡️ Temperatura óptima para el cultivo (18-26°C), ☁️ Precipitaciones moderadas (450mm proyectados), ⚠️ Riesgo MEDIO de sequía en floración (marzo-abril), 🌪️ Probabilidad baja de granizo (8%). Recomiendo seguro con cobertura específica para sequía y monitoreo constante en etapas críticas.',
        suggestions: [
          '¿Qué seguro recomiendas?',
          'Estrategias de mitigación',
          'Análisis histórico de la zona',
        ],
      };
    }

    if (lowerMessage.includes('cobertura') || lowerMessage.includes('seguro') || lowerMessage.includes('póliza')) {
      return {
        text: 'Para tu cultivo recomiendo el Seguro Agro Sinecta Multi-riesgo con: 🛡️ Cobertura contra sequía, granizo, inundación y heladas, 💰 Suma asegurada: 85% del valor de producción esperado, 📊 Prima estimada: 2.1% del valor asegurado, ✅ Incluye: asistencia agronómica y monitoreo satelital. Esta póliza ofrece la mejor relación cobertura-precio para tu perfil de riesgo.',
        suggestions: [
          'Calcula la prima exacta',
          'Detalla exclusiones',
          'Proceso de reclamo',
        ],
      };
    }

    if (lowerMessage.includes('rendimiento') || lowerMessage.includes('producción')) {
      return {
        text: 'Proyección de rendimiento para tu parcela: 🌾 Rendimiento esperado: 9,500 kg/ha (excelente), 📈 Basado en: calidad de suelo, historial de zona, índices NDVI actuales, 💧 Condiciones de humedad óptimas, 🎯 Precio estimado de venta: $235/ton. Producción total proyectada: 475 toneladas. Ingreso bruto estimado: $111,625. Margen neto: 42% ($46,882).',
        suggestions: [
          'Factores de riesgo en rendimiento',
          'Comparar con promedio regional',
          'Estrategia de comercialización',
        ],
      };
    }

    if (lowerMessage.includes('tasa') || lowerMessage.includes('interés')) {
      return {
        text: 'Análisis de tasa de interés: Para tu perfil (Score: 780, Historial: Excelente, Garantías: Sólidas) la tasa recomendada es 8.5% anual. Esto está 2.3% por debajo del promedio del mercado (10.8%). Con buen comportamiento de pago, puedes calificar para reducción a 7.8% en la renovación. Ahorro estimado vs. tasa estándar: $4,850 en 18 meses.',
        suggestions: [
          'Condiciones para mejor tasa',
          'Compara con otras instituciones',
          'Plan de amortización',
        ],
      };
    }

    // Respuesta genérica inteligente
    return {
      text: 'Entiendo tu consulta. Basándome en los datos de tu operación y las condiciones actuales del mercado agropecuario, puedo brindarte un análisis detallado. ¿Podrías especificar más sobre qué aspecto necesitas asesoría: financiamiento, cobertura de seguro, análisis agronómico o evaluación de riesgos?',
      suggestions: [
        'Análisis de financiamiento',
        'Evaluación de seguros',
        'Asesoría agronómica',
        'Gestión de riesgos',
      ],
    };
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular respuesta del asistente
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response.text,
        timestamp: new Date(),
        suggestions: response.suggestions,
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const getContextIcon = () => {
    switch (context) {
      case 'credit':
        return <DollarSign className="w-5 h-5" />;
      case 'insurance':
        return <Shield className="w-5 h-5" />;
      case 'agronomic':
        return <Leaf className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getContextColor = () => {
    switch (context) {
      case 'credit':
        return 'from-green-600 to-emerald-600';
      case 'insurance':
        return 'from-blue-600 to-indigo-600';
      case 'agronomic':
        return 'from-green-600 to-lime-600';
      default:
        return 'from-purple-600 to-blue-600';
    }
  };

  if (isMinimized) {
    return (
      <Card className="fixed bottom-6 right-6 z-50 shadow-2xl border-2 border-purple-200">
        <button
          onClick={onToggleMinimize}
          className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors"
        >
          <div className={`w-12 h-12 bg-gradient-to-br ${getContextColor()} rounded-xl flex items-center justify-center shadow-lg`}>
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div className="text-left">
            <h4 className="text-slate-900 flex items-center gap-2">
              Don Enrique
              <Sparkles className="w-4 h-4 text-purple-600" />
            </h4>
            <p className="text-slate-600 text-sm">Tu asesor inteligente</p>
          </div>
        </button>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-[600px] shadow-2xl border-2 border-purple-100">
      {/* Header */}
      <div className={`p-5 bg-gradient-to-r ${getContextColor()} text-white rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-white flex items-center gap-2">
                Don Enrique
                <Sparkles className="w-4 h-4" />
              </h3>
              <p className="text-white/90 text-sm">Asesor Inteligente de Sinecta</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 text-white border-white/30" variant="outline">
              {getContextIcon()}
              <span className="ml-1 capitalize">{context === 'general' ? 'General' : context === 'credit' ? 'Crédito' : context === 'insurance' ? 'Seguro' : 'Agronómico'}</span>
            </Badge>
            {onToggleMinimize && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleMinimize}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
            )}
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50 to-white">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-br from-slate-600 to-slate-700' 
                  : `bg-gradient-to-br ${getContextColor()}`
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="space-y-2">
                <div className={`p-4 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white'
                    : 'bg-white border-2 border-purple-100 text-slate-900'
                }`}>
                  <p className="leading-relaxed">{message.text}</p>
                </div>
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="space-y-2 pl-2">
                    <p className="text-xs text-slate-500">Sugerencias:</p>
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-slate-700 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${getContextColor()}`}>
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="p-4 rounded-2xl bg-white border-2 border-purple-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200 bg-white rounded-b-lg">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu consulta aquí..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className={`bg-gradient-to-r ${getContextColor()} hover:opacity-90`}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">
          Don Enrique utiliza IA generativa para brindarte asesoría personalizada
        </p>
      </div>
    </Card>
  );
}
