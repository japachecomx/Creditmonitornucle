import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Search,
  Filter,
  Download,
  Shield,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface InsuranceProps {
  onNavigate: (view: string, id?: string) => void;
}

const mockPolicies = [
  {
    id: 'POL-SIN-2847-2024',
    clientName: 'Agropecuaria del Norte SA',
    creditId: 'CR-2847',
    coverage: '$450,000',
    premium: '$9,450',
    status: 'Activa',
    validUntil: '2026-10-20',
    claims: 0,
  },
  {
    id: 'POL-SIN-2846-2024',
    clientName: 'Rancho San Miguel',
    creditId: 'CR-2846',
    coverage: '$320,000',
    premium: '$6,720',
    status: 'Activa',
    validUntil: '2026-09-15',
    claims: 1,
  },
  {
    id: 'POL-SIN-2845-2024',
    clientName: 'Cultivos Modernos SRL',
    creditId: 'CR-2845',
    coverage: '$580,000',
    premium: '$12,180',
    status: 'Pendiente',
    validUntil: '2026-11-05',
    claims: 0,
  },
  {
    id: 'POL-SIN-2844-2024',
    clientName: 'Granja Familiar Lopez',
    creditId: 'CR-2844',
    coverage: '$180,000',
    premium: '$3,780',
    status: 'Activa',
    validUntil: '2026-08-22',
    claims: 0,
  },
  {
    id: 'POL-SIN-2843-2024',
    clientName: 'Agro Inversiones del Sur',
    creditId: 'CR-2843',
    coverage: '$720,000',
    premium: '$15,120',
    status: 'Activa',
    validUntil: '2027-01-10',
    claims: 2,
  },
  {
    id: 'POL-SIN-2842-2024',
    clientName: 'Cooperativa Agricola Central',
    creditId: 'CR-2842',
    coverage: '$950,000',
    premium: '$19,950',
    status: 'Procesando Reclamo',
    validUntil: '2026-12-18',
    claims: 3,
  },
];

export function Insurance({ onNavigate }: InsuranceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activa':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Pendiente':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Procesando Reclamo':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Expirada':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Gestión de Seguros</h1>
          <p className="text-slate-600 mt-2">
            Monitorea todas las pólizas de Seguro Agro Sinecta y reclamos
          </p>
        </div>
        <Button
          onClick={() => onNavigate('add-insurance')}
          className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30"
        >
          <Shield className="w-5 h-5 mr-2" />
          Nueva Póliza de Seguro
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 space-y-3 bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">Pólizas Activas</p>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <h2 className="text-slate-900">287</h2>
          <p className="text-green-600">+12 este mes</p>
        </Card>
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Cobertura Total</p>
          <h2 className="text-slate-900">$11.7M</h2>
          <p className="text-blue-600">Cartera protegida</p>
        </Card>
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Reclamos Activos</p>
          <h2 className="text-slate-900">8</h2>
          <p className="text-orange-600">En proceso</p>
        </Card>
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Índice de Siniestralidad</p>
          <h2 className="text-slate-900">12.3%</h2>
          <p className="text-green-600">Debajo del prom. industria</p>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900">Próximas Renovaciones</h3>
            <Calendar className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-900">Próximos 30 días</span>
              <span className="text-blue-600">24 pólizas</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-900">Próximos 60 días</span>
              <span className="text-slate-600">47 pólizas</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-900">Próximos 90 días</span>
              <span className="text-slate-600">68 pólizas</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900">Resumen de Reclamos</h3>
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
              <span className="text-slate-900">Aprobados</span>
              <span className="text-green-600">18</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
              <span className="text-slate-900">En Revisión</span>
              <span className="text-blue-600">8</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-200">
              <span className="text-slate-900">Docs Pendientes</span>
              <span className="text-orange-600">5</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900">Cobro de Primas</h3>
            <AlertCircle className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Cobrado</span>
                <span className="text-slate-900">$2.1M</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-200">
              <span className="text-slate-900">Pendiente</span>
              <span className="text-orange-600">$380K</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="search"
                placeholder="Buscar por número de póliza, nombre de cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Estados</SelectItem>
                <SelectItem value="active">Activa</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="claim">Procesando Reclamo</SelectItem>
                <SelectItem value="expired">Expirada</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Más Filtros
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </div>
      </Card>

      {/* Policies Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left p-4 text-slate-600">Número de Póliza</th>
                <th className="text-left p-4 text-slate-600">Nombre Cliente</th>
                <th className="text-left p-4 text-slate-600">Crédito Vinculado</th>
                <th className="text-left p-4 text-slate-600">Cobertura</th>
                <th className="text-left p-4 text-slate-600">Prima</th>
                <th className="text-left p-4 text-slate-600">Estado</th>
                <th className="text-left p-4 text-slate-600">Válida Hasta</th>
                <th className="text-left p-4 text-slate-600">Reclamos</th>
                <th className="text-left p-4 text-slate-600"></th>
              </tr>
            </thead>
            <tbody>
              {mockPolicies.map((policy) => (
                <tr
                  key={policy.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onNavigate('insurance-detail', policy.id)}
                >
                  <td className="p-4">
                    <span className="text-blue-600">{policy.id}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-900">{policy.clientName}</span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('credit-detail', policy.creditId);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      {policy.creditId}
                    </button>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-900">{policy.coverage}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-900">{policy.premium}</span>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(policy.status)} variant="outline">
                      {policy.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-600">{policy.validUntil}</span>
                  </td>
                  <td className="p-4">
                    <span className={policy.claims > 0 ? 'text-orange-600' : 'text-slate-600'}>
                      {policy.claims}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-slate-600">Mostrando 6 de 287 pólizas</p>
        <div className="flex gap-2">
          <Button variant="outline">Anterior</Button>
          <Button variant="outline" className="bg-blue-600 text-white border-blue-600">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Siguiente</Button>
        </div>
      </div>
    </div>
  );
}