import { useStore } from '@/store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Shield } from 'lucide-react'

export function RoleSwitcher() {
  const { role, setRole } = useStore()

  return (
    <div className="fixed bottom-20 left-4 md:bottom-6 z-50 bg-background/95 backdrop-blur border p-2 rounded-lg shadow-xl flex items-center gap-2 animate-fade-in-up">
      <Shield className="w-4 h-4 text-primary ml-1" />
      <span className="text-xs font-bold text-muted-foreground">Acesso:</span>
      <Select value={role} onValueChange={setRole as any}>
        <SelectTrigger className="h-8 w-[110px] text-xs font-bold bg-background border-primary/20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="STUDENT">Aluno</SelectItem>
          <SelectItem value="ADMIN">Admin Geral</SelectItem>
          <SelectItem value="PRODUCTION">Produção</SelectItem>
          <SelectItem value="PROFESSOR">Professor</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
