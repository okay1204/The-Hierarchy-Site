import '../styles/adbox.css'

function AdBox({children, pos}) {

    return (
        <div className={`persuasive-box ${pos === 'left' ? 'persuasive-box-left' : 'persuasive-box-right'}`}>
            {children}
        </div>
    )
}

export default AdBox;