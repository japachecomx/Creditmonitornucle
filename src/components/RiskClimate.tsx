import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  MapPin,
  AlertTriangle,
  CloudRain,
  Droplets,
  Thermometer,
  Wind,
  TrendingDown,
  Filter,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface RiskClimateProps {
  onNavigate: (view: string, id?: string) => void;
}

const mockPlots = [
  {
    id: 'PLT-4521',
    location: 'Región Norte, Parcela A-12',
    cropType: 'Maíz',
    area: '45 ha',
    riskScore: 6.2,
    alerts: ['Vigilancia de Sequía'],
    creditId: 'CR-2847',
  },
  {
    id: 'PLT-4522',
    location: 'Región Norte, Parcela A-13',
    cropType: 'Maíz',
    area: '38 ha',
    riskScore: 5.8,
    alerts: [],
    creditId: 'CR-2847',
  },
  {
    id: 'PLT-4523',
    location: 'Región Norte, Parcela B-5',
    cropType: 'Trigo',
    area: '22 ha',
    riskScore: 7.4,
    alerts: ['Temperatura Alta', 'Baja Humedad del Suelo'],
    creditId: 'CR-2847',
  },
  {
    id: 'PLT-4514',
    location: 'Región Centro, Parcela C-8',
    cropType: 'Soya',
    area: '52 ha',
    riskScore: 4.2,
    alerts: [],
    creditId: 'CR-2846',
  },
  {
    id: 'PLT-4509',
    location: 'Región Sur, Parcela D-15',
    cropType: 'Arroz',
    area: '28 ha',
    riskScore: 8.1,
    alerts: ['Riesgo de Inundación', 'Lluvia Excesiva'],
    creditId: 'CR-2844',
  },
  {
    id: 'PLT-4498',
    location: 'Región Este, Parcela E-3',
    cropType: 'Trigo',
    area: '65 ha',
    riskScore: 5.5,
    alerts: ['Advertencia de Viento'],
    creditId: 'CR-2843',
  },
];

const climateEvents = [
  {
    type: 'Sequía',
    region: 'Región Norte',
    severity: 'Moderada',
    plotsAffected: 3,
    startDate: '2025-11-20',
  },
  {
    type: 'Lluvia Excesiva',
    region: 'Región Sur',
    severity: 'Alta',
    plotsAffected: 2,
    startDate: '2025-12-01',
  },
  {
    type: 'Temperatura Alta',
    region: 'Región Centro',
    severity: 'Baja',
    plotsAffected: 1,
    startDate: '2025-11-28',
  },
  {
    type: 'Vendaval',
    region: 'Región Este',
    severity: 'Moderada',
    plotsAffected: 2,
    startDate: '2025-12-03',
  },
];

export function RiskClimate({ onNavigate }: RiskClimateProps) {
  const getRiskColor = (score: number) => {
    if (score >= 7) return 'text-red-600';
    if (score >= 5) return 'text-orange-600';
    return 'text-green-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Alta':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Moderada':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Baja':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Monitoreo de Riesgo y Clima</h1>
          <p className="text-slate-600 mt-2">
            Datos climáticos en tiempo real y evaluación de riesgo para todas las parcelas de cultivo
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 space-y-3 bg-gradient-to-br from-orange-50 to-white border-orange-100">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">Parcelas de Alto Riesgo</p>
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <h2 className="text-slate-900">24</h2>
          <p className="text-orange-600">Requieren atención inmediata</p>
        </Card>
        <Card className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">Alertas Activas</p>
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <CloudRain className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <h2 className="text-slate-900">7</h2>
          <p className="text-red-600">Eventos climáticos en curso</p>
        </Card>
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Puntaje Prom. de Riesgo</p>
          <h2 className="text-slate-900">6.1/10</h2>
          <p className="text-green-600">Mejoró desde 6.5</p>
        </Card>
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Total Parcelas Monitoreadas</p>
          <h2 className="text-slate-900">342</h2>
          <p className="text-blue-600">Rastreo en tiempo real</p>
        </Card>
      </div>

      {/* Active Climate Events */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-900">Eventos Climáticos Activos</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtrar por Región
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {climateEvents.map((event, index) => (
            <div
              key={index}
              className="p-5 border border-slate-200 rounded-xl hover:border-orange-300 hover:bg-orange-50/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                    <CloudRain className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-slate-900">{event.type}</h3>
                    <p className="text-slate-600">{event.region}</p>
                  </div>
                </div>
                <Badge className={getSeverityColor(event.severity)} variant="outline">
                  {event.severity}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-slate-600">Parcelas Afectadas</p>
                  <p className="text-slate-900">{event.plotsAffected}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-600">Fecha de Inicio</p>
                  <p className="text-slate-900">{event.startDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Portfolio Heat Map */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-900">Mapa de Calor de Riesgo de Cartera</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-slate-600">Riesgo Bajo</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-slate-600">Riesgo Medio</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-slate-600">Riesgo Alto</span>
            </div>
          </div>
        </div>
        <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full grid grid-cols-8 grid-rows-6 gap-1 p-4">
              {Array.from({ length: 48 }).map((_, i) => {
                const colors = ['bg-green-500', 'bg-green-400', 'bg-orange-400', 'bg-orange-500', 'bg-red-500'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                return (
                  <div
                    key={i}
                    className={`${randomColor} rounded opacity-60 hover:opacity-100 transition-opacity cursor-pointer`}
                  ></div>
                );
              })}
            </div>
          </div>
          <div className="text-center space-y-2 z-10">
            <MapPin className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-slate-700">Mapa de Calor de Riesgo Interactivo</p>
            <p className="text-slate-500">Haz clic en regiones para ver detalles</p>
          </div>
        </div>
      </Card>

      {/* Plot List with Risk Scores */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-900">Todas las Parcelas de Cultivo</h3>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filtrar Riesgo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Parcelas</SelectItem>
              <SelectItem value="high">Solo Alto Riesgo</SelectItem>
              <SelectItem value="medium">Riesgo Medio</SelectItem>
              <SelectItem value="low">Riesgo Bajo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4">
          {mockPlots.map((plot) => (
            <div
              key={plot.id}
              className="p-5 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
              onClick={() => onNavigate('plot-risk', plot.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plot.riskScore >= 7
                        ? 'bg-red-100'
                        : plot.riskScore >= 5
                        ? 'bg-orange-100'
                        : 'bg-green-100'
                    }`}
                  >
                    <MapPin
                      className={`w-6 h-6 ${
                        plot.riskScore >= 7
                          ? 'text-red-600'
                          : plot.riskScore >= 5
                          ? 'text-orange-600'
                          : 'text-green-600'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-blue-600">{plot.id}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('credit-detail', plot.creditId);
                        }}
                        className="text-slate-500 hover:text-blue-600"
                      >
                        {plot.creditId}
                      </button>
                      {plot.alerts.length > 0 && (
                        <div className="flex items-center space-x-2">
                          {plot.alerts.map((alert, i) => (
                            <Badge
                              key={i}
                              className="bg-orange-50 text-orange-700 border-orange-200"
                              variant="outline"
                            >
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              {alert}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-slate-900 mb-2">{plot.location}</p>
                    <div className="flex items-center space-x-4 text-slate-600">
                      <span>Cultivo: {plot.cropType}</span>
                      <span>•</span>
                      <span>Área: {plot.area}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-600 mb-1">Puntaje de Riesgo</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-3xl ${getRiskColor(plot.riskScore)}`}>{plot.riskScore}</span>
                    <span className="text-slate-500">/10</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Climate Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">Temperatura Promedio</p>
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <h2 className="text-slate-900">28.5°C</h2>
          <p className="text-orange-600">+2.3°C sobre normal</p>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">Lluvia (30d)</p>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <CloudRain className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <h2 className="text-slate-900">42mm</h2>
          <p className="text-red-600">-35mm bajo promedio</p>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">Humedad del Suelo</p>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Droplets className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <h2 className="text-slate-900">45%</h2>
          <p className="text-orange-600">Debajo del óptimo</p>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">Velocidad del Viento</p>
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
              <Wind className="w-5 h-5 text-slate-600" />
            </div>
          </div>
          <h2 className="text-slate-900">14 km/h</h2>
          <p className="text-green-600">Condiciones normales</p>
        </Card>
      </div>
    </div>
  );
}