interface ProofCardProps {
  txId: string;
  explorerUrl: string;
}

/**
 * Renders the blockchain receipt section.
 */
export function ProofCard({ txId, explorerUrl }: ProofCardProps) {
  return (
    <section className="card proof-card">
      <p className="card-eyebrow proof-eyebrow">⬡ Blockchain Proof</p>
      <h2 className="proof-heading">On-chain receipt</h2>

      <p className="proof-label">Algorand Transaction ID</p>
      <code className="txid" title={txId}>
        {txId}
      </code>

      <a
        href={explorerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="explorer-link"
      >
        Inspect on Lora Explorer
        <span className="link-arrow" aria-hidden="true"> →</span>
      </a>

      <div className="proof-detail">
        <DetailRow label="Network"  value="Algorand LocalNet"   />
        <DetailRow label="Encoding" value="MessagePack (msgpack)" />
        <DetailRow label="TX field" value="note (binary)"       />
      </div>

      <p className="proof-note">
        The weather reading is encoded as MessagePack bytes and stored in
        this transaction&apos;s <code>note</code> field. It is permanently
        immutable — no one can alter it after confirmation.
      </p>
    </section>
  );
}

// ── Internal helper ───────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}
