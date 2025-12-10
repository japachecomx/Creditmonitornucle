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
} from 'lucide-react';
import { Progress } from './ui/progress';
import { DonEnrique } from './DonEnrique';

interface AddCreditProps {
  onNavigate: (view: string) => void;
}

const steps = [
  { id: 1, name: 'Información del Cliente', icon: User },
  { id: 2, name: 'Subir Documentos', icon: FileText },
  { id: 3, name: 'Cultivo y Ubicación', icon: MapPin },
  { id: 4, name: 'Evaluación de Riesgo', icon: CheckCircle },
  { id: 5, name: 'Compra de Seguro', icon: Shield },
];

export function AddCredit({ onNavigate }: AddCreditProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showDonEnrique, setShowDonEnrique] = useState(false);
  const [donEnriqueMinimized, setDonEnriqueMinimized] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    taxId: '',
    email: '',
    phone: '',
    address: '',
    creditAmount: '',
    term: '',
    interestRate: '',
    cropType: '',
    plotLocation: '',
    plotArea: '',
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the process
      onNavigate('credits');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onNavigate('credits');
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
            <h1 className="text-slate-900">Agregar Nuevo Crédito</h1>
            <p className="text-slate-600 mt-2">Completa todos los pasos para crear un nuevo crédito agrícola</p>
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
                    <p className={`mt-2 text-center ${isCurrent ? 'text-slate-900' : 'text-slate-600'}`}>
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
              <h2 className="text-slate-900">Información del Cliente</h2>
              <p className="text-slate-600 mt-2">Ingresa la información básica del acreditado</p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
              <div className="space-y-2">
                <Label htmlFor="creditAmount">Monto del Crédito (USD)</Label>
                <Input
                  id="creditAmount"
                  type="number"
                  placeholder="450000"
                  value={formData.creditAmount}
                  onChange={(e) => setFormData({ ...formData, creditAmount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Plazo (meses)</Label>
                <Input
                  id="term"
                  type="number"
                  placeholder="24"
                  value={formData.term}
                  onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interestRate">Tasa de Interés (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  placeholder="8.5"
                  value={formData.interestRate}
                  onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-slate-900">Documentos de Cumplimiento</h2>
              <p className="text-slate-600 mt-2">Sube los documentos legales y de cumplimiento requeridos</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Identificación Oficial (INE/IFE)', required: true },
                { name: 'Registro Fiscal (Constancia Fiscal)', required: true },
                { name: 'Comprobante de Domicilio', required: true },
                { name: 'Documentos de Título de Propiedad', required: true },
                { name: 'Solicitud de Crédito Firmada', required: true },
                { name: 'Formulario de Cumplimiento AML/KYC', required: true },
              ].map((doc, index) => (
                <div
                  key={index}
                  className="p-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Upload className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-slate-900">{doc.name}</p>
                      {doc.required && (
                        <p className="text-red-600 mt-1">* Requerido</p>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      Subir Archivo
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-900">
                <strong>Nota:</strong> Todos los documentos deben ser copias claras y legibles. Formatos aceptados: PDF, JPG, PNG (máx. 10MB por archivo)
              </p>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-slate-900">Información de Cultivo y Ubicación</h2>
              <p className="text-slate-600 mt-2">Agrega detalles sobre las parcelas agrícolas</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cropType">Tipo de Cultivo</Label>
                <Input
                  id="cropType"
                  placeholder="ej., Maíz, Trigo, Soya"
                  value={formData.cropType}
                  onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plotArea">Área Total de Parcela (hectáreas)</Label>
                <Input
                  id="plotArea"
                  type="number"
                  placeholder="105"
                  value={formData.plotArea}
                  onChange={(e) => setFormData({ ...formData, plotArea: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="plotLocation">Descripción de Ubicación de Parcela</Label>
                <Textarea
                  id="plotLocation"
                  placeholder="ej., Región Norte, Municipio de Celaya, Parcelas A-12, A-13, B-5"
                  value={formData.plotLocation}
                  onChange={(e) => setFormData({ ...formData, plotLocation: e.target.value })}
                />
              </div>
            </div>
            <div className="p-6 border border-slate-200 rounded-xl bg-slate-50">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-slate-900 mb-2">Coordenadas de Parcela</h3>
                  <p className="text-slate-600 mb-4">
                    Haz clic en el mapa para marcar los límites de la parcela o ingresa coordenadas GPS manualmente
                  </p>
                  <div className="aspect-video bg-slate-200 rounded-xl flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <MapPin className="w-12 h-12 text-slate-400 mx-auto" />
                      <p className="text-slate-600">Mapa Interactivo</p>
                      <p className="text-slate-500">Haz clic para agregar marcadores de parcela</p>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">
                    Agregar Coordenadas GPS Manualmente
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-slate-900">Evaluación Automática de Riesgo</h2>
              <p className="text-slate-600 mt-2">Sistema de calificación de riesgo potenciado por IA de Sinecta</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 space-y-4 bg-gradient-to-br from-green-50 to-white border-green-100">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600">Riesgo Agronómico</p>
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-green-600">6.2/10</h2>
                  <p className="text-slate-600">Riesgo moderado basado en calidad del suelo e historial de cultivos</p>
                </div>
              </Card>
              <Card className="p-6 space-y-4 bg-gradient-to-br from-blue-50 to-white border-blue-100">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600">Riesgo Climático</p>
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-blue-600">5.8/10</h2>
                  <p className="text-slate-600">Bajo riesgo de precipitación para la región y temporada</p>
                </div>
              </Card>
              <Card className="p-6 space-y-4 bg-gradient-to-br from-purple-50 to-white border-purple-100">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600">Puntaje de Riesgo General</p>
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-purple-600">6.0/10</h2>
                  <p className="text-slate-600">Moderado - Seguro recomendado</p>
                </div>
              </Card>
            </div>
            <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white mb-2">Evaluación de Riesgo Completa</h3>
                  <p className="text-blue-100">
                    Basado en los datos ingresados y los algoritmos propietarios de Sinecta, este crédito tiene un perfil de riesgo moderado.
                    Recomendamos encarecidamente la compra de cobertura de seguro para proteger contra riesgos climáticos y agronómicos.
                  </p>
                </div>
              </div>
            </Card>
            <div className="space-y-4">
              <h3 className="text-slate-900">Factores de Riesgo Identificados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { factor: 'Calidad del Suelo', score: 'Buena', color: 'text-green-600' },
                  { factor: 'Rendimiento Histórico', score: 'Sobre el Promedio', color: 'text-green-600' },
                  { factor: 'Pronóstico de Precipitación', score: 'Preocupación Moderada', color: 'text-orange-600' },
                  { factor: 'Anomalías de Temperatura', score: 'Riesgo Bajo', color: 'text-green-600' },
                  { factor: 'Historial de Plagas/Enfermedades', score: 'Mínimo', color: 'text-green-600' },
                  { factor: 'Volatilidad de Precios de Mercado', score: 'Moderado', color: 'text-orange-600' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                    <span className="text-slate-900">{item.factor}</span>
                    <span className={item.color}>{item.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-slate-900">Seguro Agro Sinecta</h2>
              <p className="text-slate-600 mt-2">Protege este crédito con seguro agrícola integral</p>
            </div>
            <Card className="p-8 bg-gradient-to-br from-blue-50 via-white to-blue-50 border-blue-200">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-slate-900 mb-4">Plan de Cobertura Recomendado</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-slate-600">Monto de Cobertura</p>
                      <p className="text-slate-900">$450,000</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600">Prima Anual</p>
                      <p className="text-slate-900">$9,450 (2.1% de cobertura)</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600">Plazo de Póliza</p>
                      <p className="text-slate-900">24 meses (coincide con plazo del crédito)</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600">Deducible</p>
                      <p className="text-slate-900">5% del monto del reclamo</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <div className="space-y-4">
              <h3 className="text-slate-900">La Cobertura Incluye</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Sequía y escasez de agua',
                  'Lluvia excesiva e inundaciones',
                  'Daños por granizo y vendaval',
                  'Eventos de heladas y congelación',
                  'Brotes de plagas y enfermedades',
                  'Daños por incendio a cultivos',
                  'Pérdida de rendimiento por debajo del nivel garantizado',
                  'Protección de precio de mercado (complemento opcional)',
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border border-slate-200 rounded-xl">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-slate-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-green-900">
                    <strong>Oferta Especial:</strong> Compra el seguro ahora y recibe un 10% de descuento en la prima del primer año.
                    Este crédito califica para suscripción acelerada - la póliza puede emitirse de inmediato.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 pt-6 border-t border-slate-200">
              <input type="checkbox" id="acceptInsurance" className="w-5 h-5 rounded border-slate-300" />
              <label htmlFor="acceptInsurance" className="text-slate-900 cursor-pointer">
                Quiero comprar Seguro Agro Sinecta para este crédito
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
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            {currentStep === steps.length ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Completar y Crear Crédito
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
            context="credit"
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