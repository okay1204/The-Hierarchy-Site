import '../styles/adbox.css'

function AdBox({children, pos}) {

    return (
        <div className={`ad-box ${pos === 'left' ? 'ad-box-left' : 'ad-box-right'}`}>
            {children}
        </div>
    )
}

export default AdBox;