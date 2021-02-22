import '../styles/explainbox.css'

function ExplainBox({children, reverse=false}) {

    return (
        <div className={`explain-box ${reverse ? 'reverse' : ''}`}>
            {children}
        </div>
    )
}

export default ExplainBox;