interface FormRowProps {
  type: string;
  name: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelText?: string;
  disabled: boolean | undefined;
}

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  disabled: loading,
}: FormRowProps) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={loading}
        className='form-input'
      />
    </div>
  );
};

export default FormRow;
