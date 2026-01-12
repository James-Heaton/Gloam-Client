import ActionButton from "./ActionButton";

export default function ActionList({ actions, onExecuteAction, disabled }) {
  return (
    <div className="space-y-4">
      <h3 className="font-washington text-3xl font-bold text-stone-300 mb-6 text-center">
        What do you do?
      </h3>
      
      <div className="space-y-3">
        {actions.map(action => (
          <ActionButton
            key={action.id}
            action={action}
            onExecute={onExecuteAction}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}