import ActionButton from "./ActionButton";

export default function ActionList({ actions, onExecuteAction, disabled }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white mb-3">What do you do?</h3>
      
      {actions.map(action => (
        <ActionButton
          key={action.id}
          action={action}
          onExecute={onExecuteAction}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
