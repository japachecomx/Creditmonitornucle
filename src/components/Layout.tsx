import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  LayoutDashboard,
  FileText,
  Shield,
  Users,
  CloudRain,
  Settings,
  HelpCircle,
  Bell,
  ChevronDown,
  LogOut,
  Search,
  ShoppingBag,
  UserCog,
} from 'lucide-react';
import sinectaLogo from '../assets/sinecta_logotipo-2-03_(11) copy.png';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout?: () => void;
}

const navigation = [
  { id: 'dashboard', label: 'Panel', icon: LayoutDashboard },
  { id: 'credits', label: 'Créditos', icon: FileText },
  { id: 'insurance', label: 'Seguros', icon: Shield },
  { id: 'products', label: 'Insumos', icon: ShoppingBag },
  { id: 'risk-climate', label: 'Riesgo y Clima', icon: CloudRain },
  { id: 'clients', label: 'Clientes', icon: Users },
  { id: 'documents', label: 'Documentos', icon: FileText },
  { id: 'settings', label: 'Configuración', icon: Settings },
];

export function Layout({ children, currentView, onNavigate, onLogout }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <img src={sinectaLogo} alt="Sinecta" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <div className="text-slate-900">Sinecta</div>
              <div className="text-slate-500">CreditMonitor</div>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="search"
                placeholder="Buscar créditos, clientes, pólizas..."
                className="pl-10 bg-slate-50 border-slate-200"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="pl-4 border-l border-slate-200">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                        FI
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                      <div className="text-slate-900">Institución Financiera</div>
                      <div className="text-slate-500">Usuario Admin</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate('settings')} className="cursor-pointer">
                    <UserCog className="w-4 h-4 mr-2" />
                    Configuración de Usuario
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onLogout?.()} className="cursor-pointer text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Side Navigation */}
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-slate-200">
            <img src={sinectaLogo} alt="Sinecta" className="h-8" />
          </div>
          <nav className="space-y-2 p-4 flex-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}