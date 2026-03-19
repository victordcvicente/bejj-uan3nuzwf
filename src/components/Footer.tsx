import { Link } from 'react-router-dom'
import logoUrl from '../assets/image-6d323.png'

export function Footer() {
  return (
    <footer className="w-full bg-background border-t py-12 md:py-16 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1 flex flex-col items-start space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoUrl} alt="BEJJ Logo" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plataforma de gestão de catálogos e pedidos para equipes de Jiu-Jitsu.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Alunos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/catalog" className="hover:text-primary transition-colors">
                  Encontrar Equipe
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="hover:text-primary transition-colors">
                  Rastrear Pedido
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Institucional
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Seja Parceiro
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Política de Trocas
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BEJJ Portal. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-muted-foreground opacity-50">
              Desenvolvido para amantes da Arte Suave
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
