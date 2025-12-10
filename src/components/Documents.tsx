import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Search,
  Filter,
  Upload,
  FileText,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  Folder,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface DocumentsProps {
  onNavigate: (view: string) => void;
}

const mockDocuments = [
  {
    id: 'DOC-5847',
    name: 'Contrato de Crédito - CR-2847',
    type: 'Contrato',
    client: 'Agropecuaria del Norte SA',
    uploadedBy: 'Sistema',
    uploadedAt: '2024-10-20',
    status: 'Verificado',
    size: '2.4 MB',
  },
  {
    id: 'DOC-5846',
    name: 'Registro Fiscal RFC - ANO850420',
    type: 'Documento Fiscal',
    client: 'Agropecuaria del Norte SA',
    uploadedBy: 'Juan Martínez',
    uploadedAt: '2024-10-15',
    status: 'Verificado',
    size: '1.2 MB',
  },
  {
    id: 'DOC-5845',
    name: 'Formulario de Cumplimiento KYC',
    type: 'Cumplimiento',
    client: 'Rancho San Miguel',
    uploadedBy: 'María López',
    uploadedAt: '2024-11-28',
    status: 'Pendiente de Revisión',
    size: '3.1 MB',
  },
  {
    id: 'DOC-5844',
    name: 'Título de Propiedad - Parcela A-12',
    type: 'Documento de Propiedad',
    client: 'Agropecuaria del Norte SA',
    uploadedBy: 'Juan Martínez',
    uploadedAt: '2024-10-18',
    status: 'Verificado',
    size: '4.8 MB',
  },
  {
    id: 'DOC-5843',
    name: 'Póliza de Seguro - POL-SIN-2847',
    type: 'Seguro',
    client: 'Agropecuaria del Norte SA',
    uploadedBy: 'Sistema',
    uploadedAt: '2024-10-20',
    status: 'Verificado',
    size: '1.8 MB',
  },
  {
    id: 'DOC-5842',
    name: 'Identificación Oficial - INE',
    type: 'Identidad',
    client: 'Cultivos Modernos SRL',
    uploadedBy: 'Ana Rodríguez',
    uploadedAt: '2024-11-25',
    status: 'Expirado',
    size: '0.9 MB',
  },
];

const documentCategories = [
  { name: 'Contratos', count: 342, icon: FileText, color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { name: 'Documentos Fiscales', count: 289, icon: FileText, color: 'bg-green-50 text-green-600 border-green-200' },
  { name: 'Cumplimiento', count: 156, icon: CheckCircle, color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { name: 'Docs de Propiedad', count: 234, icon: Folder, color: 'bg-orange-50 text-orange-600 border-orange-200' },
];

export function Documents({ onNavigate }: DocumentsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verificado':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Pendiente de Revisión':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Expirado':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Verificado':
        return <CheckCircle className="w-4 h-4" />;
      case 'Pendiente de Revisión':
        return <Clock className="w-4 h-4" />;
      case 'Expirado':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Gestión de Documentos</h1>
          <p className="text-slate-600 mt-2">
            Bóveda digital segura para todos los documentos de cumplimiento y legales
          </p>
        </div>
        <Button className="h-12 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30 gap-2">
          <Upload className="w-5 h-5" />
          Subir Documento
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Total Documentos</p>
          <h2 className="text-slate-900">1,847</h2>
          <p className="text-blue-600">Todas las categorías</p>
        </Card>
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Verificados</p>
          <h2 className="text-slate-900">1,652</h2>
          <p className="text-green-600">89.4% aprobados</p>
        </Card>
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Pendientes de Revisión</p>
          <h2 className="text-slate-900">42</h2>
          <p className="text-orange-600">Requiere atención</p>
        </Card>
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Almacenamiento Usado</p>
          <h2 className="text-slate-900">8.4 GB</h2>
          <p className="text-slate-600">de 50 GB</p>
        </Card>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {documentCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.name}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${category.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                  {category.count}
                </Badge>
              </div>
              <h3 className="text-slate-900">{category.name}</h3>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="search"
                placeholder="Buscar por nombre de documento, cliente..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tipo de Documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Tipos</SelectItem>
                <SelectItem value="contract">Contratos</SelectItem>
                <SelectItem value="tax">Documentos Fiscales</SelectItem>
                <SelectItem value="compliance">Cumplimiento</SelectItem>
                <SelectItem value="property">Docs de Propiedad</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Estados</SelectItem>
                <SelectItem value="verified">Verificado</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="expired">Expirado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Más Filtros
            </Button>
          </div>
        </div>
      </Card>

      {/* Documents Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left p-4 text-slate-600">ID Documento</th>
                <th className="text-left p-4 text-slate-600">Nombre Documento</th>
                <th className="text-left p-4 text-slate-600">Tipo</th>
                <th className="text-left p-4 text-slate-600">Cliente</th>
                <th className="text-left p-4 text-slate-600">Subido Por</th>
                <th className="text-left p-4 text-slate-600">Fecha de Subida</th>
                <th className="text-left p-4 text-slate-600">Estado</th>
                <th className="text-left p-4 text-slate-600">Tamaño</th>
                <th className="text-left p-4 text-slate-600"></th>
              </tr>
            </thead>
            <tbody>
              {mockDocuments.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4">
                    <span className="text-blue-600">{doc.id}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-900">{doc.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-600">{doc.type}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-900">{doc.client}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-600">{doc.uploadedBy}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-600">{doc.uploadedAt}</span>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(doc.status)} variant="outline">
                      <span className="flex items-center space-x-1">
                        {getStatusIcon(doc.status)}
                        <span>{doc.status}</span>
                      </span>
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-600">{doc.size}</span>
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
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
        <p className="text-slate-600">Mostrando 6 de 1,847 documentos</p>
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