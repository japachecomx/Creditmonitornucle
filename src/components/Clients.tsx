import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Filter, Download, User, Building, Mail, Phone, ChevronRight } from 'lucide-react';

interface ClientsProps {
  onNavigate: (view: string) => void;
}

const mockClients = [
  {
    id: 'CLI-2847',
    name: 'Agropecuaria del Norte SA',
    taxId: 'ANO850420-XY3',
    email: 'contacto@agronorte.mx',
    phone: '+52 (477) 123-4567',
    activeCredits: 3,
    totalExposure: '$1.2M',
    status: 'Activo',
  },
  {
    id: 'CLI-2846',
    name: 'Rancho San Miguel',
    taxId: 'RSM920315-AB8',
    email: 'info@ranchosanmiguel.mx',
    phone: '+52 (461) 234-5678',
    activeCredits: 2,
    totalExposure: '$780K',
    status: 'Activo',
  },
  {
    id: 'CLI-2845',
    name: 'Cultivos Modernos SRL',
    taxId: 'CMO881205-CD4',
    email: 'admin@cultivosmodernos.mx',
    phone: '+52 (442) 345-6789',
    activeCredits: 4,
    totalExposure: '$2.1M',
    status: 'Activo',
  },
  {
    id: 'CLI-2844',
    name: 'Granja Familiar Lopez',
    taxId: 'GFL750610-EF9',
    email: 'lopez@granjafamiliar.mx',
    phone: '+52 (415) 456-7890',
    activeCredits: 1,
    totalExposure: '$320K',
    status: 'Activo',
  },
  {
    id: 'CLI-2843',
    name: 'Agro Inversiones del Sur',
    taxId: 'AIS940828-GH2',
    email: 'contacto@agroinversiones.mx',
    phone: '+52 (951) 567-8901',
    activeCredits: 5,
    totalExposure: '$3.5M',
    status: 'Activo',
  },
];

export function Clients({ onNavigate }: ClientsProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Gestión de Clientes</h1>
          <p className="text-slate-600 mt-2">
            Ver y gestionar toda la información de acreditados
          </p>
        </div>
        <Button className="h-12 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30">
          Agregar Nuevo Cliente
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Total Clientes</p>
          <h2 className="text-slate-900">248</h2>
          <p className="text-green-600">+15 este mes</p>
        </Card>
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Acreditados Activos</p>
          <h2 className="text-slate-900">189</h2>
          <p className="text-blue-600">76% del total</p>
        </Card>
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">Exposición Total</p>
          <h2 className="text-slate-900">$12.4M</h2>
          <p className="text-slate-600">Entre todos los clientes</p>
        </Card>
        <Card className="p-6 space-y-3">
          <p className="text-slate-600">KYC Pendiente</p>
          <h2 className="text-slate-900">8</h2>
          <p className="text-orange-600">Requiere revisión</p>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="search"
                placeholder="Buscar por nombre de cliente, RFC..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtrar
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </div>
      </Card>

      {/* Clients List */}
      <div className="space-y-4">
        {mockClients.map((client) => (
          <Card key={client.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Building className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-slate-900">{client.name}</h3>
                    <Badge className="bg-green-50 text-green-700 border-green-200" variant="outline">
                      {client.status}
                    </Badge>
                  </div>
                  <p className="text-blue-600 mb-3">{client.id}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Building className="w-4 h-4" />
                      <span>{client.taxId}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Mail className="w-4 h-4" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Phone className="w-4 h-4" />
                      <span>{client.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-slate-600 mb-1">Créditos Activos</p>
                  <p className="text-slate-900 text-2xl">{client.activeCredits}</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-600 mb-1">Exposición Total</p>
                  <p className="text-slate-900 text-2xl">{client.totalExposure}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-slate-600">Mostrando 5 de 248 clientes</p>
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