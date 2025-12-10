import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  TrendingUp,
  Shield,
  AlertTriangle,
  CloudRain,
  Calendar,
  FileText,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
  Sparkles,
  ShoppingBag,
  Package,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';
import { DonEnrique } from './DonEnrique';
import donEnriqueLogo from '../assets/sinecta_logotipo-2-03_(11) copy.png';

interface DashboardProps {
  onNavigate: (view: string, id?: string) => void;
}

const creditVolumeData = [
  { month: 'Jan', volume: 4200 },
  { month: 'Feb', volume: 4800 },
  { month: 'Mar', volume: 5200 },
  { month: 'Apr', volume: 5800 },
  { month: 'May', volume: 6500 },
  { month: 'Jun', volume: 7200 },
];

const riskDistributionData = [
  { name: 'Riesgo Bajo', value: 45, color: '#10b981' },
  { name: 'Riesgo Medio', value: 35, color: '#f59e0b' },
  { name: 'Riesgo Alto', value: 20, color: '#ef4444' },
];

const claimsByRegionData = [
  { region: 'Norte', claims: 12 },
  { region: 'Centro', claims: 18 },
  { region: 'Sur', claims: 8 },
  { region: 'Este', claims: 15 },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const [showBot, setShowBot] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Resumen de Cartera</h1>
          <p className="text-slate-600 mt-2">
            ¡Bienvenido de nuevo! Aquí está lo que sucede con tu cartera agrícola.
          </p>
        </div>
        <Button
          onClick={() => onNavigate('add-credit')}
          className="h-12 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30"
        >
          <Plus className="w-5 h-5 mr-2" />
          Agregar Nuevo Crédito
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-slate-600">Créditos Totales</p>
              <div className="space-y-1">
                <h3 className="text-slate-900">$12.4M</h3>
                <div className="flex items-center space-x-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>12.5%</span>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-100 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-slate-600">Pólizas Activas</p>
              <div className="space-y-1">
                <h3 className="text-slate-900">287</h3>
                <div className="flex items-center space-x-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>8.2%</span>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-orange-100 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-slate-600">Parcelas de Alto Riesgo</p>
              <div className="space-y-1">
                <h3 className="text-slate-900">24</h3>
                <div className="flex items-center space-x-1 text-red-600">
                  <ArrowDownRight className="w-4 h-4" />
                  <span>3.1%</span>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-slate-600">Alertas Climáticas</p>
              <div className="space-y-1">
                <h3 className="text-slate-900">7</h3>
                <div className="flex items-center space-x-1 text-slate-600">
                  <span>Activas</span>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
              <CloudRain className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Product Sales KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white border-emerald-100 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-slate-600">Ventas de Productos Agroquímicos</p>
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-slate-900">$284,560</h3>
                <div className="flex items-center space-x-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>18.7% vs mes anterior</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('products')}
                className="mt-2"
              >
                Ver Catálogo
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-cyan-50 to-white border-cyan-100 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-slate-600">Productos Más Vendidos</p>
                <div className="w-12 h-12 bg-cyan-100 rounded-2xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-cyan-600" />
                </div>
              </div>
              <div className="space-y-3 mt-4">
                {[
                  { name: 'Glifosato 360 SL', sales: '$42,180', trend: '+24%' },
                  { name: 'Azoxistrobina 250 SC', sales: '$38,920', trend: '+18%' },
                  { name: 'NPK 18-46-0', sales: '$35,640', trend: '+15%' },
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <span className="text-cyan-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-slate-900">{product.name}</p>
                        <p className="text-slate-500">{product.sales}</p>
                      </div>
                    </div>
                    <span className="text-green-600">{product.trend}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credit Volume Over Time */}
        <Card className="lg:col-span-2 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-slate-900">Tendencia de Volumen de Créditos</h3>
              <p className="text-slate-600 mt-1">Rendimiento últimos 6 meses</p>
            </div>
            <Button variant="outline" size="sm">Ver Detalles</Button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={creditVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
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
                dataKey="volume"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: '#2563eb', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Risk Distribution */}
        <Card className="p-6 space-y-6">
          <div>
            <h3 className="text-slate-900">Distribución de Riesgo</h3>
            <p className="text-slate-600 mt-1">Por cartera de créditos</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={riskDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {riskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {riskDistributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claims by Region */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-slate-900">Reclamos por Región</h3>
              <p className="text-slate-600 mt-1">Trimestre actual</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => onNavigate('insurance')}>
              Ver Todos
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={claimsByRegionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="region" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="claims" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Activities */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-slate-900">Actividad Reciente</h3>
              <p className="text-slate-600 mt-1">Últimas actualizaciones</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { icon: Shield, text: 'Nueva póliza emitida para Crédito #CR-2847', time: 'hace 2 horas', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: AlertTriangle, text: 'Alerta de alto riesgo: Parcela #PLT-4521', time: 'hace 5 horas', color: 'text-orange-600', bg: 'bg-orange-50' },
              { icon: FileText, text: 'Documento cargado para Crédito #CR-2813', time: 'hace 1 día', color: 'text-green-600', bg: 'bg-green-50' },
              { icon: Calendar, text: 'Pago vencido: Crédito #CR-2798', time: 'hace 2 días', color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900">{item.text}</p>
                  <p className="text-slate-500 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">Créditos Asegurados</p>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-slate-900">94.2%</h2>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full" style={{ width: '94.2%' }}></div>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">Tipos de Cultivo Activos</p>
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-slate-900">12</h2>
            <p className="text-slate-500">Maíz, Trigo, Soya, Arroz y 8 más</p>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">Puntaje Prom. de Riesgo</p>
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-slate-900">6.8/10</h2>
            <p className="text-green-600">Mejoró desde 7.2 el mes pasado</p>
          </div>
        </Card>
      </div>

      {/* Don Enrique Floating Action Button - Estilo Google Gemini */}
      {!showBot && (
        <div className="fixed bottom-8 right-8 z-40">
          <div className="relative group">
            {/* Pulso animado de fondo */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 animate-pulse"></div>
            
            {/* Botón principal */}
            <button
              onClick={() => setShowBot(true)}
              className="relative w-16 h-16 bg-white rounded-full shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300 flex items-center justify-center group overflow-hidden"
            >
              {/* Logo de Don Enrique */}
              <div className="relative w-12 h-12">
                <img src={donEnriqueLogo} alt="Don Enrique" className="w-full h-full object-contain" />
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse drop-shadow-lg" />
              </div>
              
              {/* Badge de disponibilidad */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
            </button>

            {/* Tooltip expandido al hover */}
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-6 py-4 rounded-2xl shadow-2xl whitespace-nowrap backdrop-blur-sm border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center overflow-hidden p-1">
                    <img src={donEnriqueLogo} alt="Don Enrique" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold">Don Enrique</p>
                    <p className="text-sm text-white/80">Tu Asesor de IA</p>
                  </div>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-indigo-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Don Enrique Chat Interface */}
      {showBot && (
        <div className="fixed bottom-6 right-6 z-50 w-[480px]">
          <DonEnrique
            context="general"
            onClose={() => setShowBot(false)}
            isMinimized={false}
            onToggleMinimize={() => {}}
          />
        </div>
      )}
    </div>
  );
}