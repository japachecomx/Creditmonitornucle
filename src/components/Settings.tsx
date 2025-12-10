import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Lock,
  Mail,
  Smartphone,
  Users,
  Plus,
  Pencil,
  Trash2,
  X,
  UserPlus,
} from 'lucide-react';

interface SettingsProps {
  onNavigate: (view: string) => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Gestor' | 'Consultor';
  permissions: {
    otorgarCredito: boolean;
    solicitarSeguro: boolean;
    comprarInsumos: boolean;
  };
  status: 'Activo' | 'Inactivo';
  createdAt: string;
}

export function Settings({ onNavigate }: SettingsProps) {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [users, setUsers] = useState<UserData[]>([
    {
      id: 'U001',
      name: 'Ana Martínez',
      email: 'ana.martinez@institucion.com',
      role: 'Administrador',
      permissions: {
        otorgarCredito: true,
        solicitarSeguro: true,
        comprarInsumos: true,
      },
      status: 'Activo',
      createdAt: '2024-01-15',
    },
    {
      id: 'U002',
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@institucion.com',
      role: 'Gestor',
      permissions: {
        otorgarCredito: true,
        solicitarSeguro: true,
        comprarInsumos: false,
      },
      status: 'Activo',
      createdAt: '2024-03-10',
    },
    {
      id: 'U003',
      name: 'Laura Sánchez',
      email: 'laura.sanchez@institucion.com',
      role: 'Consultor',
      permissions: {
        otorgarCredito: false,
        solicitarSeguro: false,
        comprarInsumos: true,
      },
      status: 'Activo',
      createdAt: '2024-05-20',
    },
  ]);
  const [newUser, setNewUser] = useState<Partial<UserData>>({
    name: '',
    email: '',
    role: 'Gestor',
    permissions: {
      otorgarCredito: false,
      solicitarSeguro: false,
      comprarInsumos: false,
    },
    status: 'Activo',
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      const user: UserData = {
        id: `U${String(users.length + 1).padStart(3, '0')}`,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role as 'Administrador' | 'Gestor' | 'Consultor',
        permissions: newUser.permissions || {
          otorgarCredito: false,
          solicitarSeguro: false,
          comprarInsumos: false,
        },
        status: 'Activo',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUsers([...users, user]);
      setIsAddUserModalOpen(false);
      setNewUser({
        name: '',
        email: '',
        role: 'Gestor',
        permissions: {
          otorgarCredito: false,
          solicitarSeguro: false,
          comprarInsumos: false,
        },
        status: 'Activo',
      });
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Administrador':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Gestor':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Consultor':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Configuración</h1>
        <p className="text-slate-600 mt-2">
          Gestiona las preferencias de tu cuenta y configuración de la plataforma
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-slate-900">Información del Perfil</h3>
            <p className="text-slate-600">Actualiza los detalles de tu cuenta</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="institutionName">Nombre de la Institución</Label>
            <Input id="institutionName" defaultValue="Institución Financiera" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Correo Electrónico de Contacto</Label>
            <Input id="contactEmail" type="email" defaultValue="admin@institucion.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Teléfono de Contacto</Label>
            <Input id="contactPhone" type="tel" defaultValue="+52 (477) 123-4567" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Zona Horaria</Label>
            <Input id="timezone" defaultValue="America/Mexico_City" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            Guardar Cambios
          </Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-slate-900">Notificaciones</h3>
            <p className="text-slate-600">Configura tus preferencias de alertas</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Alertas climáticas para parcelas de alto riesgo', description: 'Recibe notificaciones cuando se detecten riesgos climáticos' },
            { label: 'Recordatorios de pagos de créditos', description: 'Alertas para próximas fechas de vencimiento de pagos' },
            { label: 'Renovaciones de pólizas de seguro', description: 'Notificaciones 30 días antes de la expiración de la póliza' },
            { label: 'Actualizaciones de verificación de documentos', description: 'Cambios de estado en documentos cargados' },
            { label: 'Nuevas solicitudes de crédito', description: 'Alertas cuando se envíen nuevos créditos' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
              <div>
                <p className="text-slate-900">{item.label}</p>
                <p className="text-slate-500 mt-1">{item.description}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-slate-900">Seguridad y Autenticación</h3>
            <p className="text-slate-600">Gestiona tus preferencias de seguridad</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-slate-900">Autenticación de Dos Factores</p>
                <p className="text-green-600 mt-1">Habilitada vía SMS</p>
              </div>
            </div>
            <Button variant="outline">Configurar</Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-900">Notificaciones por Correo</p>
                <p className="text-slate-600 mt-1">Alertas de seguridad y notificaciones de inicio de sesión</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-slate-900">Sesiones Activas</p>
                <p className="text-slate-600 mt-1">Gestiona sesiones activas en otros dispositivos</p>
              </div>
            </div>
            <Button variant="outline">Ver Sesiones</Button>
          </div>
          <div className="p-4 border border-slate-200 rounded-xl">
            <Button variant="outline" className="w-full">
              Cambiar Contraseña
            </Button>
          </div>
        </div>
      </Card>

      {/* Integration Settings */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-slate-900">Integraciones y API</h3>
            <p className="text-slate-600">Conecta servicios externos</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div>
              <p className="text-slate-900">Acceso API</p>
              <p className="text-slate-600 mt-1">Genera claves API para integraciones</p>
            </div>
            <Button variant="outline">Gestionar Claves</Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div>
              <p className="text-slate-900">Configuración de Webhooks</p>
              <p className="text-slate-600 mt-1">Configura webhooks para actualizaciones en tiempo real</p>
            </div>
            <Button variant="outline">Configurar</Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div>
              <p className="text-slate-900">Exportar Datos</p>
              <p className="text-slate-600 mt-1">Descarga los datos de tu cartera</p>
            </div>
            <Button variant="outline">Exportar</Button>
          </div>
        </div>
      </Card>

      {/* Billing */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-slate-900">Facturación y Suscripción</h3>
            <p className="text-slate-600">Gestiona tu plan de suscripción</p>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-slate-600">Plan Actual</p>
              <h3 className="text-slate-900 mt-1">Empresarial</h3>
            </div>
            <Button variant="outline">Actualizar</Button>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-blue-200">
            <div>
              <p className="text-slate-600">Créditos</p>
              <p className="text-slate-900 mt-1">Ilimitados</p>
            </div>
            <div>
              <p className="text-slate-600">Almacenamiento</p>
              <p className="text-slate-900 mt-1">50 GB</p>
            </div>
            <div>
              <p className="text-slate-600">Renovación</p>
              <p className="text-slate-900 mt-1">15 feb, 2026</p>
            </div>
          </div>
        </div>
      </Card>

      {/* User Management */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-slate-900">Gestión de Usuarios</h3>
            <p className="text-slate-600">Administra los usuarios de la plataforma</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-900">Agregar Usuario</p>
                <p className="text-slate-600 mt-1">Añade nuevos usuarios a la plataforma</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setIsAddUserModalOpen(true)}>
              Agregar
            </Button>
          </div>
          <div className="p-4 border border-slate-200 rounded-xl">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Nombre</th>
                  <th className="text-left">Correo Electrónico</th>
                  <th className="text-left">Rol</th>
                  <th className="text-left">Permisos</th>
                  <th className="text-left">Estado</th>
                  <th className="text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="text-slate-900">{user.name}</td>
                    <td className="text-slate-600">{user.email}</td>
                    <td className="text-slate-600">
                      <Badge
                        className={getRoleBadgeColor(user.role)}
                        variant="outline"
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="text-slate-600">
                      <div className="flex flex-col space-y-1">
                        {user.permissions.otorgarCredito && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 w-fit">
                            Otorgar Crédito
                          </Badge>
                        )}
                        {user.permissions.solicitarSeguro && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 w-fit">
                            Solicitar Seguro
                          </Badge>
                        )}
                        {user.permissions.comprarInsumos && (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 w-fit">
                            Comprar Insumos
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="text-slate-600">
                      <Badge
                        className={
                          user.status === 'Activo'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-red-100 text-red-700 border-red-200'
                        }
                        variant="outline"
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="text-slate-600">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-900">Agregar Usuario</h3>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsAddUserModalOpen(false)}
              >
                <X className="w-5 h-5 text-slate-600" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newUserName">Nombre</Label>
                <Input
                  id="newUserName"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newUserEmail">Correo Electrónico</Label>
                <Input
                  id="newUserEmail"
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newUserRole">Rol</Label>
                <select
                  id="newUserRole"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value as 'Administrador' | 'Gestor' | 'Consultor' })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Gestor">Gestor</option>
                  <option value="Consultor">Consultor</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newUserPermissions">Permisos</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={newUser.permissions?.otorgarCredito || false}
                    onCheckedChange={(checked) =>
                      setNewUser({
                        ...newUser,
                        permissions: {
                          ...newUser.permissions!,
                          otorgarCredito: checked as boolean,
                        },
                      })
                    }
                  />
                  <Label className="text-slate-600 cursor-pointer">Otorgar Crédito</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={newUser.permissions?.solicitarSeguro || false}
                    onCheckedChange={(checked) =>
                      setNewUser({
                        ...newUser,
                        permissions: {
                          ...newUser.permissions!,
                          solicitarSeguro: checked as boolean,
                        },
                      })
                    }
                  />
                  <Label className="text-slate-600 cursor-pointer">Solicitar Seguro</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={newUser.permissions?.comprarInsumos || false}
                    onCheckedChange={(checked) =>
                      setNewUser({
                        ...newUser,
                        permissions: {
                          ...newUser.permissions!,
                          comprarInsumos: checked as boolean,
                        },
                      })
                    }
                  />
                  <Label className="text-slate-600 cursor-pointer">Comprar Insumos</Label>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                onClick={handleAddUser}
              >
                Agregar Usuario
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}