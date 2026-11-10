import { useState } from 'react';
import { Boxes, Braces, GitBranch, Rocket, Terminal } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

const SNIPPETS = {
  'Node.js': `import { HabitSproutClient } from 'habitsprout-sdk';

// APIMatic generates this typed client from the HabitSprout OpenAPI 3.1 spec
const client = new HabitSproutClient({
  bearerAuth: process.env.HABITSPROUT_API_KEY,
  environment: 'sandbox',
});

// 1 ─ Fetch escrow state
const escrows = await client.escrows.listEscrows({
  status: 'LOCKED',
  limit: 25,
});

for (const row of escrows.data) {
  console.log(row.habitName, row.wagerAmount, row.lockedAt, row.status);
}

// 2 ─ Trigger a payout once Sprout AI clears the proof
const payout = await client.escrows.triggerPayout('esc_8fJ2k1', {
  proofUrl: 'https://cdn.platform.dev/proofs/today.jpg',
  agent: 'sprout-vision-1',
});

console.log(payout.status);      // "DISBURSED"
console.log(payout.paypalRefundId); // "1JU08902781691411"`,
  Python: `import os
from habitsprout_sdk import HabitSproutClient
from habitsprout_sdk.models import EscrowStatus

client = HabitSproutClient(bearer_auth=os.environ["HABITSPROUT_API_KEY"])

# 1 ─ Fetch escrow state
escrows = client.escrows.list_escrows(status=EscrowStatus.LOCKED, limit=25)
for row in escrows.data:
    print(row.habit_name, row.wager_amount, row.locked_at, row.status)

# 2 ─ Trigger a payout after agentic verification
payout = client.escrows.trigger_payout(
    escrow_id="esc_8fJ2k1",
    proof_url="https://cdn.platform.dev/proofs/today.jpg",
    agent="sprout-vision-1",
)
print(payout.status)  # DISBURSED`,
  cURL: `# Escrow state, straight from the generated endpoint
curl --request GET \\
  --url 'https://api.habitsprout.dev/v1/escrows?status=LOCKED&limit=25' \\
  --header 'Authorization: Bearer $HABITSPROUT_API_KEY' \\
  --header 'X-HabitSprout-Sandbox: true'

# Trigger the payout (PayPal refund) after Sprout AI verification
curl --request POST \\
  --url 'https://api.habitsprout.dev/v1/escrows/esc_8fJ2k1/payout' \\
  --header 'Authorization: Bearer $HABITSPROUT_API_KEY' \\
  --header 'Content-Type: application/json' \\
  --data '{"proofUrl":"https://cdn.platform.dev/proofs/today.jpg","agent":"sprout-vision-1"}'`,
};

const RESPONSE = `{
  "data": [
    {
      "id": "esc_8fJ2k1",
      "habitName": "Organic chemistry flashcards",
      "wagerAmount": 10,
      "currency": "USD",
      "lockedAt": "2026-11-09T06:12:00Z",
      "status": "LOCKED",
      "pool": "focus-pool",
      "paypalOrderId": "5O190127TN364715T"
    }
  ],
  "meta": { "page": 1, "limit": 25, "total": 1 }
}`;

const ENDPOINTS = [
  { method: 'GET', path: '/v1/escrows', copy: 'List escrow ledgers by status, pool or date window.' },
  { method: 'GET', path: '/v1/escrows/{escrow_id}', copy: 'Single commitment with PayPal order provenance.' },
  { method: 'POST', path: '/v1/escrows/{escrow_id}/verify', copy: 'Send proof, run the Sprout agent, flip the state.' },
  { method: 'POST', path: '/v1/escrows/{escrow_id}/payout', copy: 'Trigger the PayPal refund or pool payout for a verified wager.' },
  { method: 'GET', path: '/v1/pools', copy: 'Global reward pool balances and distribution history.' },
  { method: 'POST', path: '/v1/commitments', copy: 'Lock a new wager through PayPal Smart Buttons.' },
];

const METHOD_TONE = {
  GET: 'bg-[#e8f8f1] text-[#0a8f63]',
  POST: 'bg-[#fff3e2] text-[#b96518]',
};

export default function ApiPortal() {
  const [tab, setTab] = useState('Node.js');

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9cb0a9]">
            APIMatic · generated SDK portal
          </p>
          <h1 className="mt-1 font-heading text-2xl font-extrabold tracking-tight text-[#0c2a22] sm:text-[30px]">
            Build on HabitSprout
          </h1>
          <p className="mt-1.5 max-w-[560px] text-[13.5px] leading-relaxed text-[#5f7770]">
            One OpenAPI 3.1 spec in, typed SDKs out. Any developer platform can read escrow state and trigger
            agentic verification without writing a single HTTP client.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#0c2a22] px-4 py-2.5 text-[11.5px] font-bold text-white">
          <Rocket className="h-3.5 w-3.5 text-[#FACC15]" /> v1.4.0 · sandbox live
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: Braces, label: 'OpenAPI 3.1', value: 'generated spec', tone: 'text-[#0a8f63] bg-[#e8f8f1]' },
          { icon: Boxes, label: 'SDKs', value: 'TS · Python · PHP', tone: 'text-[#b96518] bg-[#fff3e2]' },
          { icon: GitBranch, label: 'Portal', value: 'auto-synced on push', tone: 'text-[#1d6fb8] bg-[#e6f2fe]' },
        ].map(({ icon: Icon, label, value, tone }) => (
          <div key={label} className="hs-card flex items-center gap-3 px-4 py-4">
            <span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}>
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#9cb0a9]">{label}</p>
              <p className="text-[13px] font-bold text-[#0c2a22]">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="hs-card p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[#0a8f63]" />
              <h2 className="font-heading text-[17px] font-extrabold text-[#0c2a22]">Generated SDK usage</h2>
            </div>
            <div className="flex rounded-full bg-[#f2f8f5] p-1">
              {Object.keys(SNIPPETS).map((key) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`rounded-full px-3 py-1.5 text-[11.5px] font-bold transition ${
                    tab === key ? 'bg-white text-[#0c2a22] shadow-sm' : 'text-[#5f7770] hover:text-[#0c2a22]'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
          <div key={tab} className="hs-rise mt-4">
            <CodeBlock
              code={SNIPPETS[tab]}
              language={tab}
              label={`habitsprout.${tab.toLowerCase().replace('.', '-')}`}
            />
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#9cb0a9]">
              200 · escrow ledger response
            </p>
            <CodeBlock code={RESPONSE} language="json" label="response.json" />
          </div>
        </section>

        <section className="space-y-3">
          <div className="hs-card p-4 sm:p-5">
            <h2 className="font-heading text-[17px] font-extrabold text-[#0c2a22]">Auto-generated endpoints</h2>
            <p className="mt-0.5 text-[12px] text-[#8aa39b]">Published from the APIMatic portal, cached at the edge.</p>
            <ul className="mt-4 space-y-2">
              {ENDPOINTS.map((endpoint) => (
                <li key={endpoint.path} className="rounded-2xl bg-[#FBF7EC]/60 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[9.5px] font-extrabold tracking-wide ${
                        METHOD_TONE[endpoint.method]
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="truncate text-[11.5px] font-semibold text-[#22392f]">{endpoint.path}</code>
                  </div>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-[#8aa39b]">{endpoint.copy}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="hs-card bg-gradient-to-br from-[#0c2a22] to-[#10453a] p-4 text-white sm:p-5">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#9df3ce]">webhook feed</p>
            <p className="mt-2 text-[13px] leading-relaxed text-white/70">
              Subscribe to <code className="rounded bg-white/10 px-1.5 py-0.5 text-[11.5px]">escrow.disbursed</code>{' '}
              and your product can react the moment Sprout AI clears a proof.
            </p>
            <div className="mt-3 rounded-xl bg-white/8 px-3 py-2 text-[11.5px] text-[#cfeee1] ring-1 ring-white/10">
              POST → https://your-app.dev/hooks/habitsprout
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
