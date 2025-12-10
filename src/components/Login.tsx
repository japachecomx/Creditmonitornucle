import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import sinectaLogo from '../assets/sinecta_logotipo-2-03_(9).png';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        console.log('Login successful:', data.session);
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión con Google');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
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

        {/* Login Card */}
        <Card className="w-full max-w-md p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@institucion.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                disabled={loading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                disabled={loading}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300" />
                <span className="text-slate-600">Recordarme</span>
              </label>
              <button type="button" className="text-blue-600 hover:text-blue-700" disabled={loading}>
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-slate-500">O continuar con</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="h-12 border-slate-300 hover:bg-slate-50"
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Conectando...' : 'Google'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onLogin}
              className="h-12 border-slate-300 hover:bg-slate-50"
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" fill="#2F2F2F" viewBox="0 0 24 24">
                <path d="M0 0v11.408h11.408V0H0zm12.594 0v11.408H24V0H12.594zM0 12.594V24h11.408V12.594H0zm12.594 0V24H24V12.594H12.594z"/>
              </svg>
              Microsoft
            </Button>
          </div>
        </Card>

        <p className="text-center text-slate-500">
          Protegido por seguridad de nivel empresarial
        </p>
      </div>
    </div>
  );
}