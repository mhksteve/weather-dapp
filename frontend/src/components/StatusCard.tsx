interface LoadingCardProps {
  kind: 'loading';
}

interface ErrorCardProps {
  kind: 'error';
  message: string;
}

type StatusCardProps = LoadingCardProps | ErrorCardProps;

/**
 * Renders a contextual status banner.
 */
export function StatusCard(props: StatusCardProps) {
  if (props.kind === 'loading') {
    return (
      <div className="status-card loading" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <div>
          <strong>Broadcasting to Algorand LocalNet…</strong>
          <p>
            Signing the transaction, submitting to the node, and waiting for
            block confirmation. This usually takes 3–6 seconds.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="status-card error" role="alert">
      <span className="status-icon" aria-hidden="true">
        ⚠
      </span>
      <div>
        <strong>Something went wrong</strong>
        <p>{props.message}</p>
      </div>
    </div>
  );
}
