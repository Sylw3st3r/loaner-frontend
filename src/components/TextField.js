import React from 'react';
import { ErrorMessage, useField } from 'formik';
import classes from "./TextField.module.css"

export default function TextField({ label, ...props }){
  const [field, meta] = useField(props);

  const classesNames = `${classes.textField} ${meta.touched && meta.error && classes.isInvalid}`;

  return (
    <div className={classes.container}>
      <label className={classes.label} htmlFor={field.name}>{label}</label>
      <input
        className={classesNames}
        placeholder={label}
        {...field} {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className={classes.error} />
    </div>
  )
}