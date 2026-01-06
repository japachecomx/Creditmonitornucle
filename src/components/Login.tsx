import { Button } from './ui/button';
import { Card } from './ui/card';
import sinectaLogo from '../assets/sinecta_logotipo-2-03_(9).png';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-8">
            <img src={sinectaLogo} alt="Sinecta" className="h-20 w-auto object-contain" />
          </div>
          <div>
            <h1 className="text-slate-900">Sinecta CreditMonitor</h1>
            <p className="text-slate-600 mt-2">
              Ingresa a tu cuenta para gestionar tu cartera de créditos agrícolas
            </p>
          </div>
        </div>

        <Card className="w-full max-w-md p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              Iniciar Sesión
            </Button>
          </form>
        </Card>

        <p className="text-center text-slate-500">
          Protegido por seguridad de nivel empresarial
        </p>
      </div>
    </div>
  );
}