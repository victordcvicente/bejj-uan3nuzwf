import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <div className="font-heading font-black text-xl mb-2">BJJ LIFESTYLE CO.</div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Plataforma premium de produtos personalizados para as melhores equipes de Jiu-Jitsu do
            mundo.
          </p>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground font-medium">
          <a href="#" className="hover:text-foreground">
            Instagram
          </a>
          <a href="#" className="hover:text-foreground">
            WhatsApp
          </a>
          <Link to="/admin" className="hover:text-foreground">
            Admin
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t text-xs text-muted-foreground text-center flex flex-col sm:flex-row justify-between">
        <span>
          &copy; {new Date().getFullYear()} BJJ Lifestyle Co. Todos os direitos reservados.
        </span>
        <span className="mt-2 sm:mt-0">Powered by Skip</span>
      </div>
    </footer>
  )
}
