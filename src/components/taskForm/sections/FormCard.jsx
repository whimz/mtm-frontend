import classes from "./BasicDetailsSection.module.css"

function FormFieldsRenderer({ fields, scrapedForm, isSelectionMode, onFieldChange }) {
  const renderFieldInput = (field, fieldKey, currentValue) => {
    if (field.tag === "textarea") {
      return (
        <textarea
          name={`${field.tag}-input`}
          className={classes.fieldInput}
          placeholder={field.placeholder || field.description}
          required
          value={currentValue}
          onChange={(e) => onFieldChange(fieldKey, e.target.value)}
          rows={3}
        />
      )
    }

    return (
      <input
        name={`${field.type}-input`}
        type={field.type || "text"}
        className={classes.fieldInput}
        placeholder={field.placeholder || field.description}
        required
        value={currentValue}
        onChange={(e) => onFieldChange(fieldKey, e.target.value)}
      />
    )
  }

  // Selection mode: render fields from scraped form with metadata
  if (isSelectionMode && scrapedForm) {
    return (
      <div className={classes.fieldsList}>
        {scrapedForm.fields.map((field, fieldIndex) => {
          const fieldKey = Object.keys(fields).find((key) => key.startsWith(`${field.name}-`))
          const currentValue = fieldKey ? fields[fieldKey]?.value || "" : ""

          return (
            <div key={fieldIndex} className={classes.fieldCard}>
              <div className={classes.fieldHeader}>
                <div className={classes.fieldSelector}>{field.selector}</div>
                <div className={classes.fieldType}>{field.tag === "textarea" ? "textarea" : field.type}</div>
              </div>
              <div className={classes.fieldBadges}>
                {field.required && <span className={classes.badgeRequired}>Required</span>}
                {field.placeholder && (
                  <span className={classes.badgePlaceholder}>Placeholder: {field.placeholder}</span>
                )}
              </div>
              <div className={classes.fieldInputWrapper}>
                {fieldKey && renderFieldInput(field, fieldKey, currentValue)}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Stored fields mode: render fields without scraped metadata
  return (
    <div className={classes.fieldsList}>
      {Object.entries(fields).map(([fieldKey, field]) => (
        <div key={fieldKey} className={classes.fieldCard}>
          <div className={classes.fieldHeader}>
            <div className={classes.fieldSelector}>{field.selector}</div>
          </div>
          <div className={classes.fieldInputWrapper}>
            {field.fieldType === 'textarea' 
            
            ? 
            
            <textarea
              name={`${field.name}`}
              className={classes.fieldInput}
              value={field.value || ""}
              onChange={(e) => onFieldChange(fieldKey, e.target.value)}
            />
            
            :

            <input
              name={`${field.name}`}
              type={field.fieldType}
              className={classes.fieldInput}
              value={field.value || ""}
              onChange={(e) => onFieldChange(fieldKey, e.target.value)}
            />
            }
            
          </div>
        </div>
      ))}
    </div>
  )
}

export default function FormCard({
  formData,
  formIndex,
  showRadio = false,
  isSelected = false,
  onSelect = null,
  fields,
  onFieldChange,
}) {
  return (
    <div className={`${classes.formCard} ${isSelected ? classes.formCardSelected : ""}`}>
      <div className={classes.formMetadata}>
        <div className={classes.formHeader}>
          {showRadio ? (
            <label className={classes.formTitleLabel}>
              <input
                type="radio"
                name="selectedForm"
                value={formIndex}
                checked={isSelected}
                onChange={() => onSelect?.(formIndex)}
                className={classes.formRadio}
              />
              <h4 className={classes.formTitle}>Form #{formIndex + 1}</h4>
            </label>
          ) : (
            <h4 className={classes.formTitle}>Saved Form</h4>
          )}
        </div>
        <div className={classes.metadataList}>
          {formData.formIndex !== undefined && (
            <div className={classes.metadataItem}>
              <span className={classes.metadataLabel}>Index:</span>{" "}
              <span className={classes.metadataValuePrimary}>{formData.formIndex}</span>
            </div>
          )}
          {formData.formSelector && (
            <div className={classes.metadataItem}>
              <span className={classes.metadataLabel}>Selector:</span>{" "}
              <span className={classes.metadataValuePrimary}>{formData.formSelector}</span>
            </div>
          )}
          {formData.formId && (
            <div className={classes.metadataItem}>
              <span className={classes.metadataLabel}>ID:</span>{" "}
              <span className={classes.metadataValuePrimary}>{formData.formId}</span>
            </div>
          )}
          {formData.formName && (
            <div className={classes.metadataItem}>
              <span className={classes.metadataLabel}>Name:</span>{" "}
              <span className={classes.metadataValuePrimary}>{formData.formName}</span>
            </div>
          )}
          {formData.formAction && (
            <div className={classes.metadataItem}>
              <span className={classes.metadataLabel}>Action:</span>{" "}
              <span className={classes.metadataValuePrimary}>{formData.formAction}</span>
            </div>
          )}
          {formData.formMethod && (
            <div className={classes.metadataItem}>
              <span className={classes.metadataLabel}>Method:</span>{" "}
              <span className={classes.metadataValuePrimary}>{formData.formMethod}</span>
            </div>
          )}
        </div>
      </div>

      {(isSelected || !showRadio) && (
        <div className={classes.fieldsSection}>
          <h5 className={classes.fieldsTitle}>Fields ({Object.keys(fields).length})</h5>
          <FormFieldsRenderer
            fields={fields}
            scrapedForm={showRadio ? formData : null}
            isSelectionMode={showRadio}
            onFieldChange={onFieldChange}
          />
        </div>
      )}
    </div>
  )
}
