/**
 * Área dedicada: Leads do Empathy Engine (jogo)
 * Redireciona para a lista de leads com filtro leadType=EMPATHY_ENGINE.
 */
import { redirect } from 'next/navigation';

export default function LeadsGamePage() {
  redirect('/admin/leads?leadType=EMPATHY_ENGINE');
}
