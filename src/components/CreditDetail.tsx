import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  ArrowLeft,
  Download,
  FileText,
  Shield,
  MapPin,
  TrendingUp,
  Calendar,
  User,
  Building,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { Progress } from './ui/progress';

interface CreditDetailProps {
  creditId: string | null;
  onNavigate: (view: string, id?: string) => void;
}

const mockDocuments = [
  { name: 'Identificación Oficial (INE/IFE)', status: 'Verificado', uploadedAt: '2025-10-15' },
  { name: 'Registro Fiscal (RFC)', status: 'Verificado', uploadedAt: '2025-10-15' },
  { name: 'Comprobante de Domicilio', status: 'Verificado', uploadedAt: '2025-10-16' },
  { name: 'Contrato de Crédito Firmado', status: 'Verificado', uploadedAt: '2025-10-18' },
  { name: 'Cumplimiento AML/KYC', status: 'Verificado', uploadedAt: '2025-10-18' },
  { name: 'Documentos de Título de Propiedad', status: 'Verificado', uploadedAt: '2025-10-20' },
];

const mockPlots = [
  { id: 'PLT-4521', location: 'Región Norte, Parcela A-12', cropType: 'Maíz', area: '45 hectáreas', riskScore: 6.2, status: 'Activo' },
  { id: 'PLT-4522', location: 'Región Norte, Parcela A-13', cropType: 'Maíz', area: '38 hectáreas', riskScore: 5.8, status: 'Activo' },
  { id: 'PLT-4523', location: 'Región Norte, Parcela B-5', cropType: 'Trigo', area: '22 hectáreas', riskScore: 7.4, status: 'Alerta' },
];

export function CreditDetail({ creditId, onNavigate }: CreditDetailProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate('credits')}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-slate-900">Credit {creditId || 'CR-2847'}</h1>
            <p className="text-slate-600 mt-2">Agropecuaria del Norte SA</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Descargar Reporte
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 gap-2">
            <FileText className="w-4 h-4" />
            Generar Contrato
          </Button>
        </div>
      </div>

      {/* Main Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credit Summary */}
        <Card className="lg:col-span-2 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900">Resumen del Crédito</h3>
            <Badge className="bg-green-50 text-green-700 border-green-200" variant="outline">
              Activo
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-slate-600">Monto del Crédito</p>
              <h2 className="text-slate-900">$450,000</h2>
            </div>
            <div className="space-y-2">
              <p className="text-slate-600">Saldo Pendiente</p>
              <h2 className="text-slate-900">$382,500</h2>
            </div>
            <div className="space-y-2">
              <p className="text-slate-600">Tasa de Interés</p>
              <p className="text-slate-900">8.5% anual</p>
            </div>
            <div className="space-y-2">
              <p className="text-slate-600">Plazo</p>
              <p className="text-slate-900">24 meses</p>
            </div>
            <div className="space-y-2">
              <p className="text-slate-600">Fecha de Desembolso</p>
              <p className="text-slate-900">2024-10-20</p>
            </div>
            <div className="space-y-2">
              <p className="text-slate-600">Fecha de Vencimiento</p>
              <p className="text-slate-900">2026-10-20</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <p className="text-slate-600">Progreso de Pagos</p>
              <p className="text-slate-900">15%</p>
            </div>
            <Progress value={15} className="h-2" />
            <p className="text-slate-500">3 de 24 pagos completados</p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
            <div className="space-y-1">
              <p className="text-slate-600">Próximo Pago</p>
              <p className="text-slate-900">$18,750</p>
              <p className="text-slate-500">Vence: 2025-12-15</p>
            </div>
            <div className="space-y-1">
              <p className="text-slate-600">Pago Mensual</p>
              <p className="text-slate-900">$18,750</p>
            </div>
            <div className="space-y-1">
              <p className="text-slate-600">Pagos Realizados</p>
              <p className="text-slate-900">$67,500</p>
            </div>
          </div>
        </Card>

        {/* Insurance Card */}
        <Card className="p-6 space-y-6 bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900">Cobertura de Seguro</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-slate-900">Póliza Agro Sinecta Activa</span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-slate-600">Número de Póliza</p>
                <p className="text-slate-900">POL-SIN-2847-2024</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-600">Monto de Cobertura</p>
                <p className="text-slate-900">$450,000</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-600">Prima</p>
                <p className="text-slate-900">$9,450 anual</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-600">Válida Hasta</p>
                <p className="text-slate-900">2026-10-20</p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => onNavigate('insurance-detail', 'POL-SIN-2847-2024')}
            >
              Ver Detalles de Póliza
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Borrower Information */}
      <Card className="p-6 space-y-6">
        <h3 className="text-slate-900">Información del Acreditado</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-slate-600">Razón Social</p>
              <p className="text-slate-900 mt-1">Agropecuaria del Norte SA de CV</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Building className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-slate-600">RFC</p>
              <p className="text-slate-900 mt-1">ANO850420-XY3</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-slate-600">Teléfono</p>
              <p className="text-slate-900 mt-1">+52 (477) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-slate-600">Correo</p>
              <p className="text-slate-900 mt-1">contacto@agronorte.mx</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Crop Plots */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-900">Parcelas de Cultivo Asociadas</h3>
          <Button variant="outline" size="sm">Ver Todas en Mapa</Button>
        </div>
        <div className="space-y-4">
          {mockPlots.map((plot) => (
            <div
              key={plot.id}
              className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
              onClick={() => onNavigate('plot-risk', plot.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-blue-600">{plot.id}</span>
                      {plot.status === 'Alerta' && (
                        <Badge className="bg-orange-50 text-orange-700 border-orange-200" variant="outline">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Alerta Climática
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-900">{plot.location}</p>
                    <div className="flex items-center space-x-4 mt-2 text-slate-600">
                      <span>Cultivo: {plot.cropType}</span>
                      <span>•</span>
                      <span>Área: {plot.area}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-600 mb-1">Puntaje de Riesgo</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-2xl ${plot.riskScore >= 7 ? 'text-red-600' : plot.riskScore >= 5 ? 'text-orange-600' : 'text-green-600'}`}>
                      {plot.riskScore}
                    </span>
                    <span className="text-slate-500">/10</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Documents */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-900">Documentos de Cumplimiento</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="w-4 h-4" />
            Subir Documento
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockDocuments.map((doc, index) => (
            <div
              key={index}
              className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900">{doc.name}</p>
                  <p className="text-slate-500 mt-1">Subido: {doc.uploadedAt}</p>
                  <Badge className="mt-2 bg-green-50 text-green-700 border-green-200" variant="outline">
                    {doc.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}