import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Search,
  Filter,
  Download,
  Plus,
  ChevronRight,
  Shield,
  AlertCircle,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface CreditsProps {
  onNavigate: (view: string, id?: string) => void;
}

const mockCredits = [
  {
    id: 'CR-2847',
    clientName: 'Agropecuaria del Norte SA',
    amount: '$450,000',
    status: 'Activo',
    insurance: 'Sí',
    riskLevel: 'Bajo',
    nextPayment: '2025-12-15',
    cropType: 'Maíz',
  },
  {
    id: 'CR-2846',
    clientName: 'Rancho San Miguel',
    amount: '$320,000',
    status: 'Activo',
    insurance: 'Sí',
    riskLevel: 'Medio',
    nextPayment: '2025-12-20',
    cropType: 'Trigo',
  },
  {
    id: 'CR-2845',
    clientName: 'Cultivos Modernos SRL',
    amount: '$580,000',
    status: 'En Revisión',
    insurance: 'Pendiente',
    riskLevel: 'Alto',
    nextPayment: '2025-12-18',
    cropType: 'Soya',
  },
  {
    id: 'CR-2844',
    clientName: 'Granja Familiar Lopez',
    amount: '$180,000',
    status: 'Activo',
    insurance: 'Sí',
    riskLevel: 'Bajo',
    nextPayment: '2026-01-05',
    cropType: 'Arroz',
  },
  {
    id: 'CR-2843',
    clientName: 'Agro Inversiones del Sur',
    amount: '$720,000',
    status: 'Activo',
    insurance: 'Sí',
    riskLevel: 'Medio',
    nextPayment: '2025-12-22',
    cropType: 'Maíz',
  },
  {
    id: 'CR-2842',
    clientName: 'Cooperativa Agricola Central',
    amount: '$950,000',
    status: 'Atrasado',
    insurance: 'Sí',
    riskLevel: 'Alto',
    nextPayment: '2025-11-30',
    cropType: 'Trigo',
  },
  {
    id: 'CR-2841',
    clientName: 'Hacienda Santa Rosa',
    amount: '$410,000',
    status: 'Activo',
    insurance: 'Sí',
    riskLevel: 'Bajo',
    nextPayment: '2025-12-28',
    cropType: 'Soya',
  },
  {
    id: 'CR-2840',
    clientName: 'Productos del Campo SA',
    amount: '$290,000',
    status: 'Activo',
    insurance: 'No',
    riskLevel: 'Medio',
    nextPayment: '2026-01-10',
    cropType: 'Arroz',
  },
];

export function Credits({ onNavigate }: CreditsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'En Revisión':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Atrasado':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Cerrado':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Bajo':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Medio':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Alto':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Gestión de Créditos</h1>
          <p className="text-slate-600 mt-2">
            Monitorea y gestiona todas las operaciones de crédito agrícola
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Créditos Totales</p>
          <h2 className="text-slate-900">342</h2>
          <p className="text-green-600">+18 este mes</p>
        </Card>
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Valor Total</p>
          <h2 className="text-slate-900">$12.4M</h2>
          <p className="text-blue-600">Valor de cartera</p>
        </Card>
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Asegurados</p>
          <h2 className="text-slate-900">94.2%</h2>
          <p className="text-green-600">323 pólizas</p>
        </Card>
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">En Riesgo</p>
          <h2 className="text-slate-900">24</h2>
          <p className="text-orange-600">Requiere atención</p>
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
                placeholder="Buscar por ID de crédito, nombre de cliente..."
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
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Niveles de Riesgo</SelectItem>
                <SelectItem value="low">Bajo</SelectItem>
                <SelectItem value="medium">Medio</SelectItem>
                <SelectItem value="high">Alto</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Credits Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left p-4 text-slate-600">ID Crédito</th>
                <th className="text-left p-4 text-slate-600">Nombre Cliente</th>
                <th className="text-left p-4 text-slate-600">Monto</th>
                <th className="text-left p-4 text-slate-600">Estado</th>
                <th className="text-left p-4 text-slate-600">Seguro</th>
                <th className="text-left p-4 text-slate-600">Nivel Riesgo</th>
                <th className="text-left p-4 text-slate-600">Próximo Pago</th>
                <th className="text-left p-4 text-slate-600">Tipo Cultivo</th>
                <th className="text-left p-4 text-slate-600"></th>
              </tr>
            </thead>
            <tbody>
              {mockCredits.map((credit) => (
                <tr
                  key={credit.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onNavigate('credit-detail', credit.id)}
                >
                  <td className="p-4">
                    <span className="text-blue-600">{credit.id}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-900">{credit.clientName}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-900">{credit.amount}</span>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(credit.status)} variant="outline">
                      {credit.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    {credit.insurance === 'Sí' ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <Shield className="w-4 h-4" />
                        <span>Activo</span>
                      </div>
                    ) : credit.insurance === 'Pendiente' ? (
                      <div className="flex items-center space-x-2 text-orange-600">
                        <AlertCircle className="w-4 h-4" />
                        <span>Pendiente</span>
                      </div>
                    ) : (
                      <span className="text-slate-400">No asegurado</span>
                    )}
                  </td>
                  <td className="p-4">
                    <Badge className={getRiskColor(credit.riskLevel)} variant="outline">
                      {credit.riskLevel}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-600">{credit.nextPayment}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-600">{credit.cropType}</span>
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
        <p className="text-slate-600">Mostrando 8 de 342 créditos</p>
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