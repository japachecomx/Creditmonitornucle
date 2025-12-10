import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  MapPin,
  Shield,
  FileText,
  User,
  CheckCircle,
  Bot,
  Sparkles,
  Leaf,
  DollarSign,
} from 'lucide-react';
import { Progress } from './ui/progress';
import { DonEnrique } from './DonEnrique';

interface AddInsuranceProps {
  onNavigate: (view: string) => void;
}

const steps = [
  { id: 1, name: 'Información del Asegurado', icon: User },
  { id: 2, name: 'Parcelas y Cultivos', icon: Leaf },
  { id: 3, name: 'Evaluación de Riesgos', icon: CheckCircle },
  { id: 4, name: 'Configurar Cobertura', icon: Shield },
  { id: 5, name: 'Cotización y Confirmación', icon: DollarSign },
];

export function AddInsurance({ onNavigate }: AddInsuranceProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showDonEnrique, setShowDonEnrique] = useState(false);
  const [donEnriqueMinimized, setDonEnriqueMinimized] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    taxId: '',
    email: '',
    phone: '',
    address: '',
    cropType: '',
    plotLocation: '',
    plotArea: '',
    coverageAmount: '',
    policyTerm: '',
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onNavigate('insurance');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onNavigate('insurance');
    }
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="max-w-5xl mx-auto space-y-8 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBack}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-slate-900">Agregar Nueva Póliza de Seguro</h1>
            <p className="text-slate-600 mt-2">Completa todos los pasos para crear un nuevo Seguro Agro Sinecta</p>
          </div>
        </div>
        <Button
          onClick={() => setShowDonEnrique(!showDonEnrique)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 gap-2"
        >
          <Bot className="w-5 h-5" />
          <span>Consultar Don Enrique</span>
          <Sparkles className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress Steps */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-gradient-to-br from-green-600 to-green-700 text-white'
                          : isCurrent
                          ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <p className={`mt-2 text-center text-sm ${isCurrent ? 'text-slate-900' : 'text-slate-600'}`}>
                      {step.name}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 rounded-full ${isCompleted ? 'bg-green-600' : 'bg-slate-200'}`}></div>
                  )}
                </div>
              );
            })}
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </Card>

      {/* Step Content */}
      <Card className="p-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-slate-900">Información del Asegurado</h2>
              <p className="text-slate-600 mt-2">Ingresa la información básica del cliente a asegurar</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientName">Razón Social / Nombre Legal</Label>
                <Input
                  id="clientName"
                  placeholder="ej., Agropecuaria del Norte SA"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">RFC</Label>
                <Input
                  id="taxId"
                  placeholder="ej., ANO850420-XY3"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contacto@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Número de Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+52 (477) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Dirección Física</Label>
                <Textarea
                  id="address"
                  placeholder="Dirección completa incluyendo ciudad y estado"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-900">
                    <strong>Información del Programa:</strong> El Seguro Agro Sinecta protege cultivos contra riesgos climáticos,
                    biológicos y de rendimiento. Don Enrique puede ayudarte a determinar la mejor cobertura para tu caso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-slate-900">Parcelas y Cultivos a Asegurar</h2>
              <p className="text-slate-600 mt-2">Agrega información de las parcelas y cultivos</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cropType">Tipo de Cultivo</Label>
                <Input
                  id="cropType"
                  placeholder="ej., Maíz, Trigo, Soya, Sorgo"
                  value={formData.cropType}
                  onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plotArea">Área Total (hectáreas)</Label>
                <Input
                  id="plotArea"
                  type="number"
                  placeholder="105"
                  value={formData.plotArea}
                  onChange={(e) => setFormData({ ...formData, plotArea: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="plotLocation">Ubicación de las Parcelas</Label>
                <Textarea
                  id="plotLocation"
                  placeholder="ej., Región Norte, Municipio de Celaya, Parcelas A-12, A-13, B-5"
                  value={formData.plotLocation}
                  onChange={(e) => setFormData({ ...formData, plotLocation: e.target.value })}
                />
              </div>
            </div>
            <div className="p-6 border border-slate-200 rounded-xl bg-slate-50">
              <h3 className="text-slate-900 mb-4">Documentación de Parcelas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Escrituras o Título de Propiedad', required: true },
                  { name: 'Mapa de Parcelas (Polígonos)', required: true },
                  { name: 'Análisis de Suelo (Opcional)', required: false },
                  { name: 'Historial de Producción', required: false },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <Upload className="w-8 h-8 text-slate-400" />
                      <p className="text-sm text-slate-900">{doc.name}</p>
                      {doc.required && <p className="text-xs text-red-600">* Requerido</p>}
                      <Button variant="outline" size="sm" className="text-xs">
                        Subir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-slate-900">Evaluación de Riesgos Automatizada</h2>
              <p className="text-slate-600 mt-2">Sistema de calificación de riesgo potenciado por IA de Sinecta</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 space-y-4 bg-gradient-to-br from-blue-50 to-white border-blue-100">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600">Riesgo Climático</p>
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-blue-600">5.5/10</h2>
                  <p className="text-slate-600 text-sm">Riesgo moderado de sequía en temporada crítica</p>
                </div>
              </Card>
              <Card className="p-6 space-y-4 bg-gradient-to-br from-green-50 to-white border-green-100">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600">Riesgo Agronómico</p>
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-green-600">4.2/10</h2>
                  <p className="text-slate-600 text-sm">Calidad de suelo buena, historial positivo</p>
                </div>
              </Card>
              <Card className="p-6 space-y-4 bg-gradient-to-br from-purple-50 to-white border-purple-100">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600">Riesgo General</p>
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-purple-600">4.8/10</h2>
                  <p className="text-slate-600 text-sm">Bajo-Moderado</p>
                </div>
              </Card>
            </div>
            <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <div className="flex items-start space-x-4">
                <Bot className="w-12 h-12 flex-shrink-0" />
                <div>
                  <h3 className="text-white mb-2">Análisis de Don Enrique</h3>
                  <p className="text-blue-100">
                    Con base en el análisis de riesgos, recomiendo una póliza con cobertura amplia contra sequía y granizo.
                    La zona presenta condiciones favorables pero con variabilidad climática en marzo-abril. Prima estimada: 2.3% del valor asegurado.
                  </p>
                </div>
              </div>
            </Card>
            <div className="space-y-4">
              <h3 className="text-slate-900">Factores de Riesgo Detectados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { factor: 'Probabilidad de Sequía', level: 'Media', color: 'text-orange-600' },
                  { factor: 'Riesgo de Granizo', level: 'Bajo', color: 'text-green-600' },
                  { factor: 'Plagas Históricas', level: 'Mínimo', color: 'text-green-600' },
                  { factor: 'Calidad del Suelo', level: 'Excelente', color: 'text-green-600' },
                  { factor: 'Rendimiento Esperado', level: 'Alto', color: 'text-green-600' },
                  { factor: 'Volatilidad Climática', level: 'Media', color: 'text-orange-600' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                    <span className="text-slate-900">{item.factor}</span>
                    <span className={item.color}>{item.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-slate-900">Configurar Cobertura de Póliza</h2>
              <p className="text-slate-600 mt-2">Personaliza los riesgos cubiertos y el nivel de protección</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-slate-900">Coberturas Principales (Incluidas)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Sequía y Déficit Hídrico', included: true },
                  { name: 'Granizo y Vendaval', included: true },
                  { name: 'Inundación y Lluvias Excesivas', included: true },
                  { name: 'Heladas y Congelación', included: true },
                  { name: 'Incendio de Cultivos', included: true },
                  { name: 'Plagas y Enfermedades Certificadas', included: true },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-slate-900">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-slate-900">Coberturas Adicionales (Opcionales)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Garantía de Rendimiento Mínimo', premium: '+0.5%' },
                  { name: 'Protección de Precio de Mercado', premium: '+0.8%' },
                  { name: 'Cobertura de Replantación', premium: '+0.3%' },
                  { name: 'Asistencia Agronómica Premium', premium: '+0.2%' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="w-5 h-5 rounded border-slate-300" />
                      <span className="text-slate-900">{item.name}</span>
                    </div>
                    <span className="text-blue-600">{item.premium}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
              <div className="space-y-2">
                <Label htmlFor="coverageAmount">Suma Asegurada (USD)</Label>
                <Input
                  id="coverageAmount"
                  type="number"
                  placeholder="450000"
                  value={formData.coverageAmount}
                  onChange={(e) => setFormData({ ...formData, coverageAmount: e.target.value })}
                />
                <p className="text-xs text-slate-500">Recomendado: 85% del valor de producción esperado</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="policyTerm">Vigencia de Póliza (meses)</Label>
                <Input
                  id="policyTerm"
                  type="number"
                  placeholder="12"
                  value={formData.policyTerm}
                  onChange={(e) => setFormData({ ...formData, policyTerm: e.target.value })}
                />
                <p className="text-xs text-slate-500">Típicamente: 12 meses (un ciclo agrícola)</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-slate-900">Cotización Final y Confirmación</h2>
              <p className="text-slate-600 mt-2">Revisa los detalles y confirma tu nueva póliza</p>
            </div>
            <Card className="p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 border-blue-200">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-slate-900 mb-4">Resumen de Póliza - Seguro Agro Sinecta</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-slate-600">Suma Asegurada</p>
                      <h3 className="text-slate-900">$450,000</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600">Prima Anual</p>
                      <h3 className="text-green-600">$10,350 (2.3%)</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600">Vigencia</p>
                      <p className="text-slate-900">12 meses</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600">Deducible</p>
                      <p className="text-slate-900">5% del reclamo</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600">Cultivo Asegurado</p>
                      <p className="text-slate-900">Maíz - 105 hectáreas</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600">Nivel de Riesgo</p>
                      <p className="text-orange-600">Bajo-Moderado (4.8/10)</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-green-50 border-green-200">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-green-900">
                    <strong>¡Promoción Especial!</strong> Contrata ahora y recibe 15% de descuento en tu primera prima + 
                    monitoreo satelital gratuito durante 6 meses. Prima con descuento: <strong>$8,798</strong>
                  </p>
                </div>
              </div>
            </Card>
            <div className="space-y-4">
              <h3 className="text-slate-900">Opciones de Pago</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border-2 border-blue-600 bg-blue-50 rounded-xl cursor-pointer">
                  <div className="flex items-center space-x-2 mb-2">
                    <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                    <h4 className="text-slate-900">Pago Anual</h4>
                  </div>
                  <p className="text-green-600">$8,798</p>
                  <p className="text-xs text-slate-600 mt-1">15% de descuento aplicado</p>
                </div>
                <div className="p-4 border-2 border-slate-200 rounded-xl hover:border-blue-400 cursor-pointer">
                  <div className="flex items-center space-x-2 mb-2">
                    <input type="radio" name="payment" className="w-4 h-4" />
                    <h4 className="text-slate-900">Semestral</h4>
                  </div>
                  <p className="text-slate-900">2 x $4,710</p>
                  <p className="text-xs text-slate-600 mt-1">10% de descuento</p>
                </div>
                <div className="p-4 border-2 border-slate-200 rounded-xl hover:border-blue-400 cursor-pointer">
                  <div className="flex items-center space-x-2 mb-2">
                    <input type="radio" name="payment" className="w-4 h-4" />
                    <h4 className="text-slate-900">Trimestral</h4>
                  </div>
                  <p className="text-slate-900">4 x $2,640</p>
                  <p className="text-xs text-slate-600 mt-1">5% de descuento</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-5 border border-slate-300 rounded-xl">
              <input type="checkbox" id="acceptTerms" className="w-5 h-5 rounded border-slate-300" />
              <label htmlFor="acceptTerms" className="text-slate-900 cursor-pointer">
                Acepto los términos y condiciones del Seguro Agro Sinecta y autorizo el cargo de la prima
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-200">
          <Button variant="outline" onClick={handleBack}>
            {currentStep === 1 ? 'Cancelar' : 'Atrás'}
          </Button>
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {currentStep === steps.length ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Confirmar y Emitir Póliza
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Don Enrique Assistant */}
      {showDonEnrique && (
        <div className="fixed bottom-6 right-6 z-50 w-[480px]">
          <DonEnrique
            context="insurance"
            contextData={formData}
            onClose={() => setShowDonEnrique(false)}
            isMinimized={donEnriqueMinimized}
            onToggleMinimize={() => setDonEnriqueMinimized(!donEnriqueMinimized)}
          />
        </div>
      )}
    </div>
  );
}
