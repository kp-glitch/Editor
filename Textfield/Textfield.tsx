Import React, {usestate } from 'react';
import './textField.css';

interface TextfieldProps {
label: string;
value: string | number;
readOnly: boolean;
onChange: (value: any) => vold;
required?: boolean;
inputProps?: React. InputHTMLAttributes<HTMLInputElement>;
}

const Textfield: React.FC<TextFieldProps> = ({ label, value, onChange, required, inputProps, readOnly }) => {
const [isFocused, setIsFocused] =useState(false);

const handleFocus = () => {
setIsFocused(true);
};

const handleBlur = () => {
     if (value === ''){
setIsFocused(false);
}
};

return (
<div className="formGroup">
<input
value={value}
readonly={readOnly}
onChange={(e) => onChange(e.target.value)}
onFocus={handleFocus}
onBLur={handleBlur}
className ={isFocused || value ! == " ? 'formField focused': 'formField'}
placeholder=""
{...inputProps}
/>


<label
className={
required
? isFocused || value !==
? 'formLabel focused'
: 'formLabelError'
:
isFocused || value !== ''
? 'formLabel focused'
:
'formLabel'
}
>
{label}
</label>
</div>
);
};

export default Textfield;







