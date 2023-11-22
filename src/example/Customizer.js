
export default function Customizer({index = 0, setNowIndex = f => f}) {
    return <div style={{marginBottom : "5px"}}>
        <label>x 크기 : </label><input type="number" />
    </div>
}