import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Shield, TrendingUp, CloudRain, FileCheck } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    icon: TrendingUp,
    title: 'Monitoreo de Cartera de Créditos',
    description: 'Rastrea y gestiona todas tus operaciones de crédito agrícola en una plataforma unificada. Monitorea el rendimiento de préstamos, calendarios de pagos y la salud de la cartera en tiempo real.',
  },
  {
    icon: Shield,
    title: 'Seguro Agro Sinecta',
    description: 'Vincula fácilmente pólizas de seguro a créditos. Compra cobertura con un clic, rastrea reclamos y asegura que tu cartera esté protegida contra riesgos agrícolas.',
  },
  {
    icon: CloudRain,
    title: 'Calificación de Riesgo Climático y Agronómico',
    description: 'Aprovecha datos climáticos avanzados e inteligencia agronómica para evaluar niveles de riesgo en cada parcela cultivada asegurada. Obtén alertas en tiempo real sobre eventos climáticos y salud de cultivos.',
  },
  {
    icon: FileCheck,
    title: 'Cumplimiento y Documentación',
    description: 'Gestiona todos los documentos requeridos incluyendo identificaciones, registros fiscales, cumplimiento AML/KYC y contratos firmados en una bóveda digital segura y organizada.',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="w-full max-w-2xl">
        <Card className="p-12 space-y-8 bg-white/80 backdrop-blur-sm shadow-xl border-slate-200">
          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-8 bg-blue-600'
                    : index < currentStep
                    ? 'w-2 bg-blue-400'
                    : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center shadow-lg">
              <Icon className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <h2 className="text-slate-900">{currentStepData.title}</h2>
            <p className="text-slate-600 max-w-lg mx-auto">
              {currentStepData.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-slate-600"
            >
              Saltar Tutorial
            </Button>
            <Button
              onClick={handleNext}
              className="px-8 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              {currentStep < steps.length - 1 ? 'Siguiente' : 'Comenzar'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}