import { useEffect, useRef, useState } from "react";
import { generatePassword, evaluatePasswordStrength } from "./password-funcions";

function App() {
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrenth] = useState('');

  const [formData, setFormData] = useState({
    minLength: '',
    maxLength: '',
    numbers: false,
    special: false
  })

  function updateForm(e) {
    const {name, type, value, checked} = e.target;
    setFormData(prevData => {
      return {
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }
    })
  }

  function submitForm(e) {
    e.preventDefault();

    setPassword(generatePassword((formData.minLength), formData.maxLength, formData.numbers, formData.special));
  }

  useEffect(() => {
    setPasswordStrenth(evaluatePasswordStrength(password));
  }, [password]);
  
  const passwordRef = useRef(null);

  const [copiedAlert, setCopiedAlert] = useState(false);

  function copyPassword() {
      const password = passwordRef.current.value;
      navigator.clipboard.writeText(password);
      setCopiedAlert(true);

      setTimeout(() => setCopiedAlert(false), 1000);
      
  }

  return (
    <>
    <main>
      <h1>Password generator</h1>

      <form onSubmit={submitForm} className="container">
        <label htmlFor="password" aria-label="output will show here">
          <input ref={passwordRef} type="text" placeholder="generate to see password" name="password" id="password" readOnly value={password} />
          <div className="copy">
            <button onClick={copyPassword} title="copy" type="button" aria-label="copy password to clipboard"></button>
            <div className={copiedAlert ? 'alert show' : 'alert'}>copied</div>
          </div>
        </label>
        
       

        <div className="settings">
          <h2>personalize your password</h2>
          <div className="checkboxes">
          <label htmlFor="include-numbers">
            <input type="checkbox" name="numbers" id="include-numbers" checked={formData.numbers} onChange={updateForm}/>
            include numbers
          </label>

          <label htmlFor="include-special">
            <input type="checkbox" name="special" id="include-special" checked={formData.special} onChange={updateForm}/>
            include special characters
          </label>
          
          </div>
          
          <label className="length" htmlFor="min-length">
            minimum length: 
            <input type="number" min={1} placeholder="12" name="minLength" id="min-length" value={formData.minLength} onChange={updateForm}/>
          </label>

          <label  className="length" htmlFor="max-length">
            maximum length: 
            <input type="number" min={1} placeholder="16" name="maxLength" id="max-length" value={formData.maxLength} onChange={updateForm} />
          </label>
        </div>

        <button type="submit">generate</button>

        {password !== '' && (
        <div className="strength">
          <p>password strength: {passwordStrength}</p>
          <div className={`${passwordStrength} strength-visualizer`}>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>
        
      )}
      </form>

      
    </main>
    </>
  )
}

export default App
