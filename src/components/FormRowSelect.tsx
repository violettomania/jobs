interface FormRowSelectProps {
  labelText: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  list: string[];
  disabled?: boolean;
}

const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  disabled,
}: FormRowSelectProps) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className='form-select'
        disabled={disabled}
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
