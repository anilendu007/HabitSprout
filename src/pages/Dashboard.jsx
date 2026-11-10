import { Flame, Lock, Trophy, Users } from 'lucide-react';
import { useHabits } from '@/context/HabitStore';
import DashboardHero from '@/components/DashboardHero';
import StatCards from '@/components/StatCards';
import PayPalCheckout from '@/components/PayPalCheckout';
import VerificationChamber from '@/components/VerificationChamber';
import RecentLedger from '@/components/RecentLedger';
import { money } from '@/lib/habitUtils';

export default function Dashboard() {
  const { streak, totals, commitments } = useHabits();

  const verifiedCount = commitments.filter((c) => c.status === 'DISBURSED').length;

  return (
    <div className="space-y-5 sm:space-y-6">
      <DashHeader />
      <DashboardHero streak={streak} locked={totals.locked} recovered={totals.disbursed} />

      <StatCards
        items={[
          {
            label: 'Active streak',
            value: `${streak} days`,
            hint: 'Consecutive verified days',
            icon: Flame,
            tone: 'sun',
            badge: 'live',
          },
          {
            label: 'Locked in escrow',
            value: money(totals.locked),
            hint: `${commitments.filter((c) => c.status === 'LOCKED').length} commitments awaiting proof`,
            icon: Lock,
            tone: 'orange',
          },
          {
            label: 'Won back',
            value: money(totals.disbursed),
            hint: `${verifiedCount} verified payouts`,
            icon: Trophy,
            tone: 'mint',
          },
          {
            label: 'Pooled for others',
            value: money(totals.pooled),
            hint: 'Redistributed to streak keepers',
            icon: Users,
            tone: 'sky',
          },
        ]}
      />

      <div className="grid gap-5 sm:gap-6 xl:grid-cols-[1.05fr_1fr]">
        <PayPalCheckout />
        <VerificationChamber />
      </div>

      <RecentLedger />
    </div>
  );
}

function DashHeader() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9cb0a9]">{today}</p>
        <h2 className="mt-1 font-heading text-2xl font-extrabold tracking-tight text-[#0c2a22] sm:text-[26px]">
          Live dashboard
        </h2>
      </div>
      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[11.5px] font-semibold text-[#3d564e] ring-1 ring-[#0f3c2d]/8">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
        </span>
        Sprout agent online
      </span>
    </div>
  );
}
