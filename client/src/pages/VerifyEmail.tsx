import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Loader2, CheckCircle, XCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Token de verificação não encontrado.");
      return;
    }

    fetch(`/api/auth/verify-email?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.message);
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Erro ao verificar email. Tente novamente.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200">
        <div className="text-center">
          {status === "loading" && (
            <>
              <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-gray-400" />
              <h1 className="text-2xl font-light tracking-wide mb-2">Verificando...</h1>
              <p className="text-gray-500">Aguarde enquanto verificamos seu email.</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h1 className="text-2xl font-light tracking-wide mb-2">Email Verificado!</h1>
              <p className="text-gray-500 mb-6">{message}</p>
              <Link href="/login">
                <Button 
                  className="w-full bg-black text-white hover:bg-gray-800"
                  data-testid="button-go-to-login"
                >
                  Fazer Login
                </Button>
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <h1 className="text-2xl font-light tracking-wide mb-2">Erro na Verificação</h1>
              <p className="text-gray-500 mb-6">{message}</p>
              <div className="space-y-3">
                <Link href="/login">
                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-800"
                    data-testid="button-go-to-login"
                  >
                    Fazer Login
                  </Button>
                </Link>
                <Link href="/">
                  <Button 
                    variant="outline"
                    className="w-full"
                    data-testid="button-go-home"
                  >
                    Voltar para Home
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
