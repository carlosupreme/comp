import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BookOpen, Calendar, MessageSquare, Trophy, TrendingUp, Users, Clock, Sparkles, ChevronRight, Award, BarChart3, Download, AlertCircle, CheckCircle,  Shield } from 'lucide-react'

const ACTIVIDADES = [
  { id: 1, nombre: 'Ajedrez', creditos: 1, categoria: 'Cultural', horario: 'Lun-Mié 4-6 PM', inscritos: 24, cupo: 30, icon: '♟️', color: 'from-slate-500 to-slate-600' },
  { id: 2, nombre: 'Fútbol', creditos: 2, categoria: 'Deportiva', horario: 'Mar-Jue 5-7 PM', inscritos: 28, cupo: 30, icon: '⚽', color: 'from-emerald-500 to-emerald-600' },
  { id: 3, nombre: 'Basketball', creditos: 2, categoria: 'Deportiva', horario: 'Lun-Vie 6-8 PM', inscritos: 22, cupo: 25, icon: '🏀', color: 'from-orange-500 to-orange-600' },
  { id: 4, nombre: 'Banda de Guerra', creditos: 2, categoria: 'Cultural', horario: 'Lun-Vie 6-8 PM', inscritos: 18, cupo: 40, icon: '🎺', color: 'from-blue-500 to-blue-600' },
  { id: 5, nombre: 'Club de Lectura', creditos: 1, categoria: 'Académica', horario: 'Vie 3-5 PM', inscritos: 15, cupo: 20, icon: '📚', color: 'from-amber-500 to-amber-600' },
  { id: 6, nombre: 'Voleibol', creditos: 2, categoria: 'Deportiva', horario: 'Mié-Vie 5-7 PM', inscritos: 20, cupo: 24, icon: '🏐', color: 'from-cyan-500 to-cyan-600' },
  { id: 7, nombre: 'Danza Folclórica', creditos: 2, categoria: 'Cultural', horario: 'Mar-Jue 4-6 PM', inscritos: 16, cupo: 25, icon: '💃', color: 'from-pink-500 to-pink-600' },
  { id: 8, nombre: 'Programación Competitiva', creditos: 1, categoria: 'Académica', horario: 'Sáb 10-12 PM', inscritos: 12, cupo: 15, icon: '💻', color: 'from-indigo-500 to-indigo-600' },
]

// Data para admin
const ESTUDIANTES_MOCK = [
  { id: 1, nombre: 'Ana García López', control: '20240001', carrera: 'Sistemas', semestre: 5, creditos: 5, status: 'Completo' },
  { id: 2, nombre: 'Carlos Ruiz M.', control: '20240002', carrera: 'Industrial', semestre: 3, creditos: 3, status: 'En progreso' },
  { id: 3, nombre: 'María Sánchez', control: '20240003', carrera: 'Electrónica', semestre: 7, creditos: 0, status: 'Sin iniciar' },
  { id: 4, nombre: 'José Martínez', control: '20240004', carrera: 'Sistemas', semestre: 4, creditos: 5, status: 'Completo' },
  { id: 5, nombre: 'Laura Pérez', control: '20240005', carrera: 'Gestión', semestre: 2, creditos: 2, status: 'En progreso' },
]

const CARRERAS_DATA = [
  { carrera: 'Ing. Sistemas', total: 850, participando: 680, porcentaje: 80 },
  { carrera: 'Ing. Industrial', total: 620, participando: 465, porcentaje: 75 },
  { carrera: 'Ing. Electrónica', total: 480, participando: 336, porcentaje: 70 },
  { carrera: 'Ing. Gestión', total: 390, participando: 273, porcentaje: 70 },
  { carrera: 'Contador Público', total: 210, participando: 126, porcentaje: 60 },
]

function App() {
  const [view, setView] = useState<'landing' | 'dashboard' | 'admin'>('landing')
  const [selectedActividades, setSelectedActividades] = useState<number[]>([])
  const [showLogin, setShowLogin] = useState(false)

  const creditosActuales = ACTIVIDADES
    .filter(a => selectedActividades.includes(a.id))
    .reduce((sum, a) => sum + a.creditos, 0)

  const handleSelectActividad = (id: number) => {
    if (selectedActividades.includes(id)) {
      setSelectedActividades(selectedActividades.filter(a => a !== id))
    } else if (creditosActuales < 5) {
      const actividad = ACTIVIDADES.find(a => a.id === id)
      if (actividad && creditosActuales + actividad.creditos <= 5) {
        setSelectedActividades([...selectedActividades, id])
      }
    }
  }

  // ADMIN DASHBOARD
  if (view === 'admin') {
    const totalInscritos = ACTIVIDADES.reduce((sum, a) => sum + a.inscritos, 0)
    const totalCupos = ACTIVIDADES.reduce((sum, a) => sum + a.cupo, 0)
    const ocupacionPromedio = (totalInscritos / totalCupos) * 100

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Admin Header */}
        <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
          <div className="max-w-[1600px] mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-gray-900">Panel Administrativo</h1>
                  <p className="text-sm text-gray-500">TECNM - Actividades Complementarias</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => setView('dashboard')}>
                  Ver como estudiante
                </Button>
                <Avatar className="w-10 h-10">
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-[1600px] mx-auto px-6 py-8">
          {/* KPIs Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardDescription>Estudiantes Activos</CardDescription>
                <CardTitle className="text-4xl font-bold">2,550</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12% vs semestre anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardDescription>Tasa de Cumplimiento</CardDescription>
                <CardTitle className="text-4xl font-bold">78%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>1,989 estudiantes completos</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardDescription>Ocupación Promedio</CardDescription>
                <CardTitle className="text-4xl font-bold">{ocupacionPromedio.toFixed(0)}%</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={ocupacionPromedio} className="h-2 mb-2" />
                <p className="text-sm text-gray-600">{totalInscritos} de {totalCupos} lugares</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardDescription>Actividades Disponibles</CardDescription>
                <CardTitle className="text-4xl font-bold">{ACTIVIDADES.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Badge variant="secondary">3 Deportivas</Badge>
                  <Badge variant="secondary">3 Culturales</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="insights" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 h-12">
              <TabsTrigger value="insights">💡 Insights</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="actividades">Actividades</TabsTrigger>
              <TabsTrigger value="estudiantes">Estudiantes</TabsTrigger>
              <TabsTrigger value="carreras">Por Carrera</TabsTrigger>
              <TabsTrigger value="reportes">Reportes</TabsTrigger>
            </TabsList>

            {/* INSIGHTS TAB - NUEVO */}
            <TabsContent value="insights" className="space-y-6">
              {/* Recomendaciones Automáticas */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader>
                  <CardTitle className="text-2xl">🎯 Recomendaciones Inteligentes</CardTitle>
                  <CardDescription>Acciones sugeridas basadas en datos actuales</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-xl border-2 border-orange-200">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">Abrir 2 grupos más de Fútbol</h4>
                          <p className="text-xs text-gray-600 mb-2">Demanda: 30/30 (100% ocupación) + lista de espera</p>
                          <Badge className="bg-orange-600">Alta prioridad</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-xl border-2 border-red-200">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">Campaña de difusión urgente</h4>
                          <p className="text-xs text-gray-600 mb-2">561 estudiantes (22%) sin créditos iniciados</p>
                          <Badge variant="destructive">Urgente</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-xl border-2 border-yellow-200">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">Optimizar horarios</h4>
                          <p className="text-xs text-gray-600 mb-2">Actividades académicas tienen baja participación</p>
                          <Badge className="bg-yellow-600">Revisar</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-xl border-2 border-green-200">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">Sistemas: caso de éxito</h4>
                          <p className="text-xs text-gray-600 mb-2">80% participación - replicar estrategia</p>
                          <Badge className="bg-green-600">Buena práctica</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Decisiones Basadas en Datos */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>📊 Decisiones que Puedes Tomar</CardTitle>
                    <CardDescription>Con base en la información actual</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">1. Asignación de Recursos</h4>
                      <p className="text-xs text-gray-600">
                        • Reasignar presupuesto a actividades con alta demanda<br />
                        • Contratar más instructores para Fútbol y Basketball<br />
                        • Reducir recursos en actividades con baja ocupación
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">2. Planificación Semestral</h4>
                      <p className="text-xs text-gray-600">
                        • Abrir +3 grupos deportivos próximo semestre<br />
                        • Evaluar cancelar actividades con menos 40% ocupación<br />
                        • Planificar horarios en base a preferencias reales
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">3. Intervención Temprana</h4>
                      <p className="text-xs text-gray-600">
                        • Enviar recordatorios a 561 estudiantes sin créditos<br />
                        • Seguimiento a estudiantes de semestres avanzados<br />
                        • Alertas automáticas antes de fechas límite
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-sm mb-1">4. Reportes Institucionales</h4>
                      <p className="text-xs text-gray-600">
                        • Evidencia para acreditaciones (78% cumplimiento)<br />
                        • Datos para SEP y TecNM nacional<br />
                        • Métricas de satisfacción estudiantil
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>🎁 Beneficios por Stakeholder</CardTitle>
                    <CardDescription>Todos ganan con la adopción</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                      <h4 className="font-semibold text-sm mb-1">👔 Administración</h4>
                      <p className="text-xs text-gray-600">
                        ✓ Ahorro de 20 horas/semana en procesos manuales<br />
                        ✓ Reportes automáticos para dirección<br />
                        ✓ Toma de decisiones basada en datos reales<br />
                        ✓ Cumplimiento normativo automatizado
                      </p>
                    </div>
                    <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                      <h4 className="font-semibold text-sm mb-1">🎓 Estudiantes</h4>
                      <p className="text-xs text-gray-600">
                        ✓ Inscripción en línea 24/7 (vs. filas presenciales)<br />
                        ✓ Transparencia total de créditos y progreso<br />
                        ✓ Notificaciones automáticas de fechas<br />
                        ✓ Chat grupal para coordinación
                      </p>
                    </div>
                    <div className="p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                      <h4 className="font-semibold text-sm mb-1">👨‍🏫 Instructores</h4>
                      <p className="text-xs text-gray-600">
                        ✓ Lista de asistencia digital<br />
                        ✓ Comunicación directa con estudiantes<br />
                        ✓ Visibilidad de inscripciones en tiempo real<br />
                        ✓ Menos carga administrativa
                      </p>
                    </div>
                    <div className="p-3 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
                      <h4 className="font-semibold text-sm mb-1">🏛️ Dirección</h4>
                      <p className="text-xs text-gray-600">
                        ✓ Dashboard ejecutivo con KPIs<br />
                        ✓ Evidencia para acreditaciones<br />
                        ✓ Métricas de satisfacción estudiantil<br />
                        ✓ ROI medible y comprobable
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ROI y Propuesta de Valor */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="text-2xl">💰 Retorno de Inversión (ROI)</CardTitle>
                  <CardDescription>Análisis de costo-beneficio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-3xl">📉</span>
                      </div>
                      <div className="text-3xl font-bold text-green-600 mb-1">60%</div>
                      <div className="text-sm font-medium mb-1">Reducción de Tiempo</div>
                      <div className="text-xs text-gray-600">
                        De 20 hrs/semana a 8 hrs/semana en gestión manual
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-3xl">📈</span>
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-1">25%</div>
                      <div className="text-sm font-medium mb-1">Aumento Participación</div>
                      <div className="text-xs text-gray-600">
                        Proyección basada en facilidad de acceso digital
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-3xl">✅</span>
                      </div>
                      <div className="text-3xl font-bold text-purple-600 mb-1">95%</div>
                      <div className="text-sm font-medium mb-1">Tasa de Cumplimiento</div>
                      <div className="text-xs text-gray-600">
                        Meta alcanzable con sistema de notificaciones
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white rounded-xl">
                    <h4 className="font-bold mb-3 text-center">Costos vs. Beneficios (Anual)</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-semibold mb-2 text-red-600">Costos Actuales (Manual)</div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Personal administrativo (20 hrs/sem)</span>
                            <span className="font-mono">$240,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Papelería y materiales</span>
                            <span className="font-mono">$30,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Errores y reprocesos</span>
                            <span className="font-mono">$50,000</span>
                          </div>
                          <div className="flex justify-between font-bold border-t pt-1">
                            <span>Total Anual</span>
                            <span className="font-mono text-red-600">$320,000</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold mb-2 text-green-600">Con Sistema Digital</div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Desarrollo inicial</span>
                            <span className="font-mono">$150,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Mantenimiento anual</span>
                            <span className="font-mono">$40,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Personal reducido (8 hrs/sem)</span>
                            <span className="font-mono">$96,000</span>
                          </div>
                          <div className="flex justify-between font-bold border-t pt-1">
                            <span>Total Primer Año</span>
                            <span className="font-mono text-green-600">$286,000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-100 rounded-lg text-center">
                      <div className="text-sm font-semibold text-green-800">
                        💵 Ahorro Primer Año: $34,000 | Años siguientes: $184,000/año
                      </div>
                      <div className="text-xs text-green-700 mt-1">
                        ROI recuperado en 5 meses
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Eliminando Fricciones */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>🚀 Plan de Implementación Sin Fricción</CardTitle>
                  <CardDescription>Transición suave garantizada</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">Fase Piloto (2 semanas)</h4>
                        <p className="text-sm text-gray-600">
                          • Probar con 1-2 actividades pequeñas<br />
                          • Capacitar a 2-3 instructores clave<br />
                          • Recopilar feedback temprano<br />
                          • <span className="font-semibold text-green-600">✓ Sin riesgo, sin compromiso</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-green-600">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">Capacitación Masiva (1 semana)</h4>
                        <p className="text-sm text-gray-600">
                          • 3 sesiones de 1 hora para instructores<br />
                          • Videos tutoriales para estudiantes<br />
                          • Soporte técnico en vivo 24/7<br />
                          • <span className="font-semibold text-green-600">✓ Nadie se queda atrás</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-purple-600">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">Lanzamiento Gradual (2 semanas)</h4>
                        <p className="text-sm text-gray-600">
                          • Semana 1: 50% actividades migradas<br />
                          • Semana 2: 100% en sistema nuevo<br />
                          • Sistema manual como respaldo<br />
                          • <span className="font-semibold text-green-600">✓ Transición controlada</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-orange-600">
                        4
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">Optimización Continua</h4>
                        <p className="text-sm text-gray-600">
                          • Actualizaciones cada 2 semanas<br />
                          • Atención a sugerencias de usuarios<br />
                          • Reportes de mejora constante<br />
                          • <span className="font-semibold text-green-600">✓ Evolución permanente</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white">
                    <h4 className="font-bold mb-2">🎯 Garantía de Éxito</h4>
                    <p className="text-sm">
                      ✓ Capacitación incluida sin costo adicional<br />
                      ✓ Soporte técnico 24/7 durante primer mes<br />
                      ✓ Migración de datos históricos gratis<br />
                      ✓ 30 días de garantía o devolvemos inversión
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* GENERAL TAB */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Distribución por categoría */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Participación por Categoría</CardTitle>
                    <CardDescription>Distribución de estudiantes inscritos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Deportivas</span>
                          <span className="text-sm text-gray-600">70 inscritos</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Culturales</span>
                          <span className="text-sm text-gray-600">58 inscritos</span>
                        </div>
                        <Progress value={58} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Académicas</span>
                          <span className="text-sm text-gray-600">27 inscritos</span>
                        </div>
                        <Progress value={27} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Alertas */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Alertas y Notificaciones</CardTitle>
                    <CardDescription>Requieren atención</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">561 estudiantes sin créditos</p>
                        <p className="text-xs text-gray-600">22% del total no ha iniciado</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">2 actividades con bajo cupo</p>
                        <p className="text-xs text-gray-600">Menos del 50% de ocupación</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Fútbol alcanzó capacidad máxima</p>
                        <p className="text-xs text-gray-600">30/30 inscritos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Actividades */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Actividades Más Populares</CardTitle>
                  <CardDescription>Top 5 por número de inscritos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ACTIVIDADES
                      .sort((a, b) => b.inscritos - a.inscritos)
                      .slice(0, 5)
                      .map((act, idx) => (
                        <div key={act.id} className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-gray-300 w-8">#{idx + 1}</div>
                          <div className={`w-12 h-12 bg-gradient-to-br ${act.color} rounded-xl flex items-center justify-center text-xl`}>
                            {act.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{act.nombre}</div>
                            <div className="text-sm text-gray-500">{act.categoria}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{act.inscritos}</div>
                            <div className="text-xs text-gray-500">de {act.cupo}</div>
                          </div>
                          <Progress value={(act.inscritos / act.cupo) * 100} className="w-24 h-2" />
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ACTIVIDADES TAB */}
            <TabsContent value="actividades">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Gestión de Actividades</CardTitle>
                      <CardDescription>Administra el catálogo completo</CardDescription>
                    </div>
                    <Button className="bg-black hover:bg-gray-800">
                      + Nueva Actividad
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Actividad</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Horario</TableHead>
                        <TableHead>Créditos</TableHead>
                        <TableHead>Inscritos</TableHead>
                        <TableHead>Ocupación</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ACTIVIDADES.map(act => {
                        const ocupacion = (act.inscritos / act.cupo) * 100
                        return (
                          <TableRow key={act.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 bg-gradient-to-br ${act.color} rounded-lg flex items-center justify-center`}>
                                  {act.icon}
                                </div>
                                <span className="font-medium">{act.nombre}</span>
                              </div>
                            </TableCell>
                            <TableCell>{act.categoria}</TableCell>
                            <TableCell>{act.horario}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{act.creditos}</Badge>
                            </TableCell>
                            <TableCell>{act.inscritos}/{act.cupo}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={ocupacion} className="w-16 h-2" />
                                <span className="text-sm">{ocupacion.toFixed(0)}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {ocupacion >= 90 ? (
                                <Badge className="bg-green-600">Lleno</Badge>
                              ) : ocupacion >= 50 ? (
                                <Badge className="bg-blue-600">Activo</Badge>
                              ) : (
                                <Badge variant="destructive">Bajo</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ESTUDIANTES TAB */}
            <TabsContent value="estudiantes">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Registro de Estudiantes</CardTitle>
                      <CardDescription>Seguimiento individual de créditos</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Buscar..." className="w-64" />
                      <Button variant="outline">Filtros</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>No. Control</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Carrera</TableHead>
                        <TableHead>Semestre</TableHead>
                        <TableHead>Créditos</TableHead>
                        <TableHead>Progreso</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ESTUDIANTES_MOCK.map(est => (
                        <TableRow key={est.id}>
                          <TableCell className="font-mono">{est.control}</TableCell>
                          <TableCell className="font-medium">{est.nombre}</TableCell>
                          <TableCell>{est.carrera}</TableCell>
                          <TableCell>{est.semestre}°</TableCell>
                          <TableCell>
                            <span className="font-bold">{est.creditos}/5</span>
                          </TableCell>
                          <TableCell>
                            <Progress value={(est.creditos / 5) * 100} className="w-24 h-2" />
                          </TableCell>
                          <TableCell>
                            {est.status === 'Completo' ? (
                              <Badge className="bg-green-600">Completo</Badge>
                            ) : est.status === 'En progreso' ? (
                              <Badge className="bg-blue-600">En progreso</Badge>
                            ) : (
                              <Badge variant="destructive">Sin iniciar</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* CARRERAS TAB */}
            <TabsContent value="carreras">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Participación por Carrera</CardTitle>
                  <CardDescription>Análisis de participación por programa educativo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {CARRERAS_DATA.map(c => (
                      <div key={c.carrera} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-lg">{c.carrera}</h3>
                            <p className="text-sm text-gray-600">
                              {c.participando} de {c.total} estudiantes participando
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold">{c.porcentaje}%</div>
                            <div className="text-sm text-gray-500">Participación</div>
                          </div>
                        </div>
                        <Progress value={c.porcentaje} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* REPORTES TAB */}
            <TabsContent value="reportes">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Generar Reportes</CardTitle>
                    <CardDescription>Exporta datos para análisis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-between bg-black hover:bg-gray-800">
                      <span>Reporte General</span>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button className="w-full justify-between bg-black hover:bg-gray-800">
                      <span>Estudiantes por Actividad</span>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button className="w-full justify-between bg-black hover:bg-gray-800">
                      <span>Cumplimiento de Créditos</span>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button className="w-full justify-between bg-black hover:bg-gray-800">
                      <span>Asistencias del Semestre</span>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button className="w-full justify-between bg-black hover:bg-gray-800">
                      <span>Reporte por Carrera</span>
                      <Download className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Métricas Clave</CardTitle>
                    <CardDescription>Resumen ejecutivo</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Tasa de Retención</div>
                      <div className="text-3xl font-bold">94%</div>
                      <div className="text-xs text-gray-500 mt-1">Estudiantes que completan actividades</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Satisfacción</div>
                      <div className="text-3xl font-bold">4.7/5</div>
                      <div className="text-xs text-gray-500 mt-1">Evaluación promedio de estudiantes</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Tiempo Promedio</div>
                      <div className="text-3xl font-bold">1.2</div>
                      <div className="text-xs text-gray-500 mt-1">Semestres para completar 5 créditos</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Nav */}
        <nav className="fixed top-0 w-full bg-black/60 backdrop-blur-xl border-b border-white/10 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg">TECNM</span>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setView('admin')} variant="ghost" className="text-gray-400">
                Admin
              </Button>
              <Button onClick={() => setShowLogin(true)} variant="outline" className="border-white/20 hover:bg-white/10">
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div className="pt-40 pb-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Sistema de Gestión Académica</span>
            </div>

            <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tight">
              Actividades<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Complementarias
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-12 max-w-2xl">
              Gestiona tus créditos complementarios de forma intuitiva.
              Elige entre más de 50 actividades deportivas, culturales y académicas.
            </p>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 font-medium"
                onClick={() => setView('dashboard')}
              >
                Comenzar ahora
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/10"
                onClick={() => setView('admin')}
              >
                Ver dashboard admin
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-gray-400">Actividades disponibles</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">2,500+</div>
              <div className="text-gray-400">Estudiantes activos</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-gray-400">Digital y automatizado</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white text-black py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-16 text-center">
              Una plataforma completa
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Control de Créditos</CardTitle>
                  <CardDescription className="text-base">
                    Monitorea tu progreso en tiempo real con visualizaciones claras
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Horario Inteligente</CardTitle>
                  <CardDescription className="text-base">
                    Organiza tu tiempo con un calendario visual personalizado
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Analytics Completo</CardTitle>
                  <CardDescription className="text-base">
                    Dashboard administrativo con métricas en tiempo real
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">
              Empieza hoy mismo
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Únete a miles de estudiantes que ya gestionan sus actividades eficientemente
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8"
              onClick={() => setView('dashboard')}
            >
              Crear cuenta gratis
            </Button>
          </div>
        </div>

        {/* Login Dialog */}
        <Dialog open={showLogin} onOpenChange={setShowLogin}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="text-2xl">Iniciar Sesión</DialogTitle>
              <DialogDescription>Ingresa tus credenciales del TECNM</DialogDescription>
            </DialogHeader>
            <div className="space-y-5 py-4">
              <div className="space-y-2">
                <Label>Número de Control</Label>
                <Input placeholder="20XX0000" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>Contraseña</Label>
                <Input type="password" placeholder="••••••••" className="h-11" />
              </div>
              <Button
                className="w-full h-11 bg-black hover:bg-gray-800"
                onClick={() => { setShowLogin(false); setView('dashboard') }}
              >
                Continuar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // STUDENT DASHBOARD (existing code...)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">TECNM Complementarias</h1>
                <p className="text-sm text-gray-500">Juan Pérez García</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right mr-4">
                <div className="text-2xl font-bold text-gray-900">{creditosActuales}/5</div>
                <div className="text-xs text-gray-500">Créditos</div>
              </div>
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Card */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">Tu Progreso</CardTitle>
                <CardDescription className="text-base">
                  {creditosActuales === 5
                    ? '¡Felicidades! Has completado todos tus créditos'
                    : `${5 - creditosActuales} crédito${5 - creditosActuales !== 1 ? 's' : ''} restante${5 - creditosActuales !== 1 ? 's' : ''}`
                  }
                </CardDescription>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={(creditosActuales / 5) * 100} className="h-3" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>0 créditos</span>
                <span className="font-semibold">{creditosActuales} / 5 créditos</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="actividades" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="actividades" className="text-base">Actividades</TabsTrigger>
            <TabsTrigger value="horario" className="text-base">Horario</TabsTrigger>
            <TabsTrigger value="chat" className="text-base">Chat</TabsTrigger>
            <TabsTrigger value="perfil" className="text-base">Perfil</TabsTrigger>
          </TabsList>

          {/* ACTIVIDADES TAB */}
          <TabsContent value="actividades" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Catálogo de Actividades</h2>
              <div className="flex gap-2">
                <Badge variant="outline">Todas</Badge>
                <Badge variant="secondary">Deportivas</Badge>
                <Badge variant="secondary">Culturales</Badge>
                <Badge variant="secondary">Académicas</Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACTIVIDADES.map(actividad => {
                const isSelected = selectedActividades.includes(actividad.id)
                const isFull = actividad.inscritos >= actividad.cupo

                return (
                  <Card key={actividad.id} className={`border-2 transition-all hover:shadow-lg ${isSelected ? 'border-blue-500 shadow-md' : 'border-transparent'}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-3">
                        <div className={`w-16 h-16 bg-gradient-to-br ${actividad.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                          {actividad.icon}
                        </div>
                        <Badge className={actividad.creditos === 2 ? 'bg-black' : 'bg-gray-600'}>
                          {actividad.creditos} {actividad.creditos === 1 ? 'Crédito' : 'Créditos'}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{actividad.nombre}</CardTitle>
                      <CardDescription className="text-sm">{actividad.categoria}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{actividad.horario}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{actividad.inscritos}/{actividad.cupo} inscritos</span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Progress value={(actividad.inscritos / actividad.cupo) * 100} className="h-1.5" />
                        <p className="text-xs text-gray-500">
                          {actividad.cupo - actividad.inscritos} lugares disponibles
                        </p>
                      </div>
                      <Button
                        className={`w-full h-11 font-semibold ${isSelected ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'}`}
                        onClick={() => handleSelectActividad(actividad.id)}
                        disabled={!isSelected && (isFull || creditosActuales + actividad.creditos > 5)}
                      >
                        {isSelected ? 'Cancelar inscripción' : isFull ? 'Cupo lleno' : 'Inscribirse'}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* HORARIO TAB */}
          <TabsContent value="horario">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Mi Horario Semanal</CardTitle>
                <CardDescription>Tus actividades organizadas por día</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-4">
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map(dia => (
                    <div key={dia} className="space-y-3">
                      <h3 className="font-bold text-center pb-3 border-b-2">{dia}</h3>
                      {ACTIVIDADES
                        .filter(a => selectedActividades.includes(a.id) && a.horario.toLowerCase().includes(dia.slice(0, 3).toLowerCase()))
                        .map(a => (
                          <div key={a.id} className={`bg-gradient-to-br ${a.color} p-3 rounded-xl text-white shadow-md`}>
                            <div className="font-semibold text-sm">{a.nombre}</div>
                            <div className="text-xs opacity-90 mt-1">{a.horario.split(' ')[1]}</div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CHAT TAB */}
          <TabsContent value="chat">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-1 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Mis Grupos</CardTitle>
                  <CardDescription>
                    {selectedActividades.length} {selectedActividades.length === 1 ? 'grupo' : 'grupos'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  {ACTIVIDADES.filter(a => selectedActividades.includes(a.id)).map(a => (
                    <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="text-2xl">{a.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{a.nombre}</div>
                        <div className="text-xs text-gray-500">{a.inscritos} miembros</div>
                      </div>
                    </div>
                  ))}
                  {selectedActividades.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-8">
                      Inscríbete a una actividad para unirte a su grupo
                    </p>
                  )}
                </CardContent>
              </Card>
              <Card className="md:col-span-2 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Chat Grupal</CardTitle>
                  <CardDescription>Selecciona un grupo para comenzar a chatear</CardDescription>
                </CardHeader>
                <CardContent className="h-96 flex flex-col items-center justify-center text-gray-400">
                  <MessageSquare className="w-16 h-16 mb-4" />
                  <p className="text-center">Próximamente disponible</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* PERFIL TAB */}
          <TabsContent value="perfil">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Mi Perfil</CardTitle>
                <CardDescription>Información de estudiante</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-gray-100">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="text-2xl">JP</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold">Juan Pérez García</h3>
                    <p className="text-gray-600 text-lg">20240001</p>
                    <Badge className="bg-black text-sm px-3 py-1">
                      Ingeniería en Sistemas Computacionales
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-base">Semestre</Label>
                    <Input value="5" disabled className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Correo Institucional</Label>
                    <Input value="juan.perez@tecnm.mx" disabled className="h-11" />
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h4 className="font-bold text-lg mb-4">Actividades Inscritas ({selectedActividades.length})</h4>
                  <div className="space-y-3">
                    {ACTIVIDADES.filter(a => selectedActividades.includes(a.id)).map(a => (
                      <div key={a.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${a.color} rounded-xl flex items-center justify-center text-xl`}>
                            {a.icon}
                          </div>
                          <div>
                            <span className="font-semibold text-lg block">{a.nombre}</span>
                            <span className="text-sm text-gray-500">{a.horario}</span>
                          </div>
                        </div>
                        <Badge className="bg-black text-base px-4 py-1.5">
                          {a.creditos} {a.creditos === 1 ? 'crédito' : 'créditos'}
                        </Badge>
                      </div>
                    ))}
                    {selectedActividades.length === 0 && (
                      <p className="text-gray-400 text-center py-8">
                        No te has inscrito a ninguna actividad aún
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
