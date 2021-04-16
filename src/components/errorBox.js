import NotFoundRed from '../images/not found red.png'
import '../styles/errorBox.css'

function ErrorBox(props) {
    return(
        <div className={`error-box ${props.className !== undefined ? props.className : ''}`}>
            <div className='error-box-img-wrapper'>
                <img src={NotFoundRed} alt=''/>
            </div>
            <div className={`error-text ${props.theme === 'dark' ? 'error-box-dark' : 'error-box-light'}`}>
                <h3>{props.header}</h3>
                <span>{props.description}</span>
            </div>
        </div>
    )
}

export default ErrorBox