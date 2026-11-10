import { Database, Filter, ArrowUpDown } from 'lucide-react';
import AgGridLedger from '@/components/AgGridLedger';
import { useHabits } from '@/context/HabitStore';
import { money } from '@/lib/habitUtils';

export default function Ledgers() {
  const { totals, commitments } = useHabits();

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9cb0a9]">AG Grid · escrow engine</p>
          <h1 className="mt-1 font-heading text-2xl font-extrabold tracking-tight text-[#0c2a22] sm:text-[30px]">
            Escrow ledgers
          </h1>
          <p className="mt-1.5 max-w-[520px] text-[13.5px] leading-relaxed text-[#5f7770]">
            Every commitment, timestamp and payout state — sortable, filterable and reactive to live verifications.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="rounded-2xl bg-white px-4 py-2.5 ring-1 ring-[#0f3c2d]/8">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9cb0a9]">in escrow</p>
            <p className="font-heading text-lg font-extrabold text-[#0c2a22]">{money(totals.locked)}</p>
          </div>
          <div className="rounded-2xl bg-[#e8f8f1] px-4 py-2.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0a8f63]/70">rows</p>
            <p className="font-heading text-lg font-extrabold text-[#0a8f63]">{commitments.length}</p>
          </div>
        </div>
      </div>

      <div className="hs-card p-4 sm:p-5">
        <AgGridLedger />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: ArrowUpDown, title: 'Default sorting', copy: 'Click any header to sort wagers, timestamps or habits.' },
          { icon: Filter, title: 'Multi-option filters', copy: 'Text, number and date filters sit under each column.' },
          { icon: Database, title: 'Reactive rows', copy: 'Verifications flip a row from LOCKED to DISBURSED instantly.' },
        ].map(({ icon: Icon, title, copy }) => (
          <div key={title} className="hs-card-flat flex items-start gap-3 px-4 py-3.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f2f8f5] text-[#0a8f63]">
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[12.5px] font-bold text-[#0c2a22]">{title}</p>
              <p className="mt-0.5 text-[11.5px] leading-relaxed text-[#8aa39b]">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
