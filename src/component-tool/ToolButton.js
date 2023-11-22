export default function ToolButton({tool, onSelect = f => f, children}) {
    return <button onClick={e => onSelect(tool)}>{children}</button>
}