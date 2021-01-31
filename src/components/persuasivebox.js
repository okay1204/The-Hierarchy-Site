import '../styles/persuasivebox.css'

function PersuasiveBox({children, pos}) {

    return (
        <div className={`persuasive-box ${pos === 'left' ? 'persuasive-box-left' : 'persuasive-box-right'}`}>
            {children}
        </div>
    )
}

export default PersuasiveBox;