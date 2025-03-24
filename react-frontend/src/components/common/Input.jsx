function Input({ ...props }) {
  return (
    <div style={{ position: 'relative' }}>
      <input {...props} />
    </div>
  );
}

export default Input