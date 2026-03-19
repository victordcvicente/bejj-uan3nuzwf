import { Link } from 'react-router-dom'
import logoUrl from '@/assets/image-6d323.png'

export function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4 px-8 md:px-0">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoUrl}
              alt="BEJJ Logo"
              className="h-6 w-auto rounded-sm object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
            />
            <span className="font-semibold text-sm text-muted-foreground">PORTAL BEJJ</span>
          </Link>
          <span className="hidden md:inline-block text-muted-foreground/30">|</span>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>
        <div className="flex gap-6 px-8 md:px-0">
          <Link
            to="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Termos de Uso
          </Link>
          <Link
            to="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacidade
          </Link>
        </div>
      </div>
    </footer>
  )
}
