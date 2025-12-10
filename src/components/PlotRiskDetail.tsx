import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  ArrowLeft,
  MapPin,
  Droplets,
  Thermometer,
  Wind,
  CloudRain,
  AlertTriangle,
  TrendingUp,
  FileText,
  Calendar,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PlotRiskDetailProps {
  plotId: string | null;
  onNavigate: (view: string) => void;
}

const temperatureData = [
  { day: 'Mon', temp: 28 },
  { day: 'Tue', temp: 30 },
  { day: 'Wed', temp: 29 },
  { day: 'Thu', temp: 31 },
  { day: 'Fri', temp: 32 },
  { day: 'Sat', temp: 30 },
  { day: 'Sun', temp: 28 },
];

const rainfallData = [
  { week: 'S1', rainfall: 12 },
  { week: 'S2', rainfall: 8 },
  { week: 'S3', rainfall: 15 },
  { week: 'S4', rainfall: 5 },
];

export function PlotRiskDetail({ plotId, onNavigate }: PlotRiskDetailProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate('risk-climate')}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-slate-900">Parcela {plotId || 'PLT-4521'}</h1>
            <p className="text-slate-600 mt-2">Región Norte, Parcela A-12</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            Generar Reporte
          </Button>
        </div>
      </div>

      {/* Satellite & Map View */}
      <Card className="p-6 space-y-4">
        <h3 className="text-slate-900">Vista Satelital y Ubicación</h3>
        <div className="aspect-video bg-gradient-to-br from-green-900 via-green-700 to-green-600 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
            }}></div>
          </div>
          <div className="text-center space-y-3 z-10">
            <MapPin className="w-16 h-16 text-white mx-auto" />
            <p className="text-white">Imagen satelital de Parcela A-12</p>
            <p className="text-green-100">45 hectáreas - Cultivo de maíz</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-slate-600">Coordenadas</p>
            <p className="text-slate-900">20.5234° N, 100.8157° W</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-600">Elevación</p>
            <p className="text-slate-900">1,850 metros</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-600">Tipo de Suelo</p>
            <p className="text-slate-900">Arcillo Limoso</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-600">Última Actualización</p>
            <p className="text-slate-900">hace 2 horas</p>
          </div>
        </div>
      </Card>

      {/* Risk Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-4 bg-gradient-to-br from-orange-50 to-white border-orange-100">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900">Puntaje de Riesgo General</h3>
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <h1 className="text-orange-600">6.2</h1>
              <span className="text-slate-500">/10</span>
            </div>
            <p className="text-slate-600">Riesgo moderado - Monitoreo requerido</p>
          </div>
        </Card>

        <Card className="p-6 space-y-4 bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900">Riesgo Climático</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <CloudRain className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <h1 className="text-blue-600">5.8</h1>
              <span className="text-slate-500">/10</span>
            </div>
            <p className="text-slate-600">Preocupación moderada por precipitación</p>
          </div>
        </Card>

        <Card className="p-6 space-y-4 bg-gradient-to-br from-green-50 to-white border-green-100">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900">Puntaje Agronómico</h3>
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <h1 className="text-green-600">7.5</h1>
              <span className="text-slate-500">/10</span>
            </div>
            <p className="text-slate-600">Buena salud de suelo y cultivo</p>
          </div>
        </Card>
      </div>

      {/* Climate Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900">Condiciones Climáticas Actuales</h3>
            <Badge className="bg-orange-50 text-orange-700 border-orange-200" variant="outline">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Vigilancia de Sequía
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Thermometer className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-slate-600">Temperatura</p>
                  <p className="text-slate-900">30°C</p>
                </div>
              </div>
              <p className="text-orange-600">+3°C sobre prom.</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-slate-600">Humedad del Suelo</p>
                  <p className="text-slate-900">42%</p>
                </div>
              </div>
              <p className="text-orange-600">Debajo del óptimo</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                  <Wind className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-slate-600">Velocidad del Viento</p>
                  <p className="text-slate-900">12 km/h</p>
                </div>
              </div>
              <p className="text-green-600">Rango normal</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <CloudRain className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-slate-600">Lluvia (30d)</p>
                  <p className="text-slate-900">40mm</p>
                </div>
              </div>
              <p className="text-orange-600">-35mm bajo prom.</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <h3 className="text-slate-900">Pronóstico de Temperatura 7 Días</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ fill: '#f97316', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Rainfall & Crop Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-6">
          <h3 className="text-slate-900">Historial de Lluvia 4 Semanas</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={rainfallData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="rainfall" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-orange-900">
              <strong>Alerta:</strong> La lluvia está 35mm por debajo del promedio estacional. Considere planificar riego.
            </p>
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <h3 className="text-slate-900">Información del Cultivo</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-600">Tipo de Cultivo</span>
              <span className="text-slate-900">Maíz</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-600">Fecha de Siembra</span>
              <span className="text-slate-900">2025-05-15</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-600">Etapa de Crecimiento Actual</span>
              <Badge className="bg-green-50 text-green-700 border-green-200" variant="outline">
                Vegetativa (V8)
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-600">Cosecha Esperada</span>
              <span className="text-slate-900">2026-01-10</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-600">Rendimiento Proyectado</span>
              <span className="text-slate-900">9.2 toneladas/hectárea</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Field Notes */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-900">Notas del Técnico de Campo</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="w-4 h-4" />
            Agregar Nota
          </Button>
        </div>
        <div className="space-y-4">
          {[
            {
              date: '2025-11-28',
              technician: 'Juan Rodríguez',
              note: 'Inspección de campo completada. La salud del cultivo es buena pero muestra signos tempranos de estrés hídrico. Se recomienda monitorear de cerca la humedad del suelo.',
            },
            {
              date: '2025-11-15',
              technician: 'María González',
              note: 'Se aplicó tratamiento preventivo contra plagas. No se observó actividad significativa de plagas. Se recolectaron muestras de suelo para análisis de laboratorio.',
            },
            {
              date: '2025-11-01',
              technician: 'Juan Rodríguez',
              note: 'El desarrollo del cultivo va según lo programado. Se alcanzó la etapa de crecimiento V8. Condiciones climáticas favorables pero precipitación por debajo del promedio.',
            },
          ].map((entry, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{entry.date}</span>
                </div>
                <span className="text-blue-600">{entry.technician}</span>
              </div>
              <p className="text-slate-900">{entry.note}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}