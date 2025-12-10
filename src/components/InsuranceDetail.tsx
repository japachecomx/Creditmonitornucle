import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  ArrowLeft,
  Download,
  Shield,
  Calendar,
  AlertCircle,
  CheckCircle,
  FileText,
  ExternalLink,
} from 'lucide-react';

interface InsuranceDetailProps {
  insuranceId: string | null;
  onNavigate: (view: string, id?: string) => void;
}

const mockClaims = [
  { id: 'CLM-2024-0847', date: '2025-10-15', type: 'Daño por sequía', status: 'Aprobado', amount: '$45,000' },
  { id: 'CLM-2024-0523', date: '2025-06-20', type: 'Daño por granizo', status: 'Pagado', amount: '$28,500' },
];

export function InsuranceDetail({ insuranceId, onNavigate }: InsuranceDetailProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate('insurance')}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-slate-900">Póliza {insuranceId || 'POL-SIN-2847-2024'}</h1>
            <p className="text-slate-600 mt-2">Seguro Agro Sinecta</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Descargar Póliza
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 gap-2">
            <FileText className="w-4 h-4" />
            Presentar Reclamo
          </Button>
        </div>
      </div>

      {/* Policy Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900">Detalles de la Póliza</h3>
            <Badge className="bg-green-50 text-green-700 border-green-200" variant="outline">
              Activa
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-slate-600">Titular de la Póliza</p>
              <p className="text-slate-900">Agropecuaria del Norte SA</p>
            </div>
            <div className="space-y-2">
              <p className="text-slate-600">Crédito Vinculado</p>
              <button
                onClick={() => onNavigate('credit-detail', 'CR-2847')}
                className="text-blue-600 hover:underline"
              >
                CR-2847
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-slate-600">Monto de Cobertura</p>
              <h3 className="text-slate-900">$450,000</h3>
            </div>
            <div className="space-y-2">
              <p className="text-slate-600">Prima Anual</p>
              <p className="text-slate-900">$9,450</p>
            </div>
            <div className="space-y-2">
              <p className="text-slate-600">Fecha de Emisión</p>
              <p className="text-slate-900">2024-10-20</p>
            </div>
            <div className="space-y-2">
              <p className="text-slate-600">Fecha de Expiración</p>
              <p className="text-slate-900">2026-10-20</p>
            </div>
            <div className="space-y-2">
              <p className="text-slate-600">Deducible</p>
              <p className="text-slate-900">5% del reclamo</p>
            </div>
            <div className="space-y-2">
              <p className="text-slate-600">Tipo de Póliza</p>
              <p className="text-slate-900">Seguro de Cultivos Multi-riesgo</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-slate-900 mb-4">Desglose de Cobertura</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Protección contra Sequía', covered: true },
                { name: 'Protección contra Inundación', covered: true },
                { name: 'Daño por Granizo', covered: true },
                { name: 'Vendaval', covered: true },
                { name: 'Heladas/Congelación', covered: true },
                { name: 'Daño por Incendio', covered: true },
                { name: 'Plagas/Enfermedades', covered: true },
                { name: 'Garantía de Rendimiento', covered: true },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-slate-900">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 space-y-4 bg-gradient-to-br from-blue-50 to-white border-blue-100">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900">Estado de Prima</h3>
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Pagado a la Fecha</span>
                <span className="text-green-600">$9,450</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Pendiente</span>
                <span className="text-slate-900">$0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Próximo Pago</span>
                <span className="text-slate-900">2026-10-20</span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span>Prima Totalmente Pagada</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-slate-900">Información de Renovación</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Días para Renovación</span>
                <span className="text-slate-900">319 días</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Auto-renovar</span>
                <span className="text-green-600">Habilitado</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Configurar Ajustes de Renovación
            </Button>
          </Card>
        </div>
      </div>

      {/* Claims History */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-900">Historial de Reclamos</h3>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            Presentar Nuevo Reclamo
          </Button>
        </div>
        {mockClaims.length > 0 ? (
          <div className="space-y-4">
            {mockClaims.map((claim) => (
              <div
                key={claim.id}
                className="p-5 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-blue-600">{claim.id}</span>
                        <Badge
                          className={
                            claim.status === 'Pagado'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : claim.status === 'Aprobado'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-orange-50 text-orange-700 border-orange-200'
                          }
                          variant="outline"
                        >
                          {claim.status}
                        </Badge>
                      </div>
                      <p className="text-slate-900">{claim.type}</p>
                      <p className="text-slate-600 mt-1">Presentado: {claim.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-600 mb-1">Monto del Reclamo</p>
                    <p className="text-slate-900 text-xl">{claim.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600">No se han presentado reclamos aún</p>
          </div>
        )}
      </Card>

      {/* Insured Plots */}
      <Card className="p-6 space-y-6">
        <h3 className="text-slate-900">Parcelas de Cultivo Aseguradas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'PLT-4521', location: 'Región Norte, Parcela A-12', crop: 'Maíz', area: '45 ha' },
            { id: 'PLT-4522', location: 'Región Norte, Parcela A-13', crop: 'Maíz', area: '38 ha' },
            { id: 'PLT-4523', location: 'Región Norte, Parcela B-5', crop: 'Trigo', area: '22 ha' },
          ].map((plot) => (
            <div
              key={plot.id}
              className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
              onClick={() => onNavigate('plot-risk', plot.id)}
            >
              <span className="text-blue-600">{plot.id}</span>
              <p className="text-slate-900 mt-2">{plot.location}</p>
              <div className="flex items-center justify-between mt-3 text-slate-600">
                <span>{plot.crop}</span>
                <span>{plot.area}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}