import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputField, TextAreaField, FormGroup } from "../../../ui/inputs";
import FormCard from './FormCard';
import { API_ENDPOINTS } from '../../../config/api';
import Button from '../../../ui/buttons/Button';
import classes from './BasicDetailsSection.module.css';


export default function BasicDetailsSection() {
  const { register, getValues, setValue, watch } = useFormContext();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scrapedForms, setScrapedForms] = useState(null);
  const [selectedFormIndex, setSelectedFormIndex] = useState(null);
  const [showOverwriteWarning, setShowOverwriteWarning] = useState(false);

  const taskInputs = watch("taskInputs") || {}
  const currentFields = taskInputs.fields || {}
  const hasExistingFields = currentFields && Object.keys(currentFields).length > 0

  const handleFetchForm = async () => { 
    if (hasExistingFields && !showOverwriteWarning) {
      setShowOverwriteWarning(true)
      return
    }

    const url = getValues("url");

    if (!url) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setError(null);
    setScrapedForms(null);
    setShowOverwriteWarning(false);

    try {
      const response = await fetch(API_ENDPOINTS.SCRAPE_FORMS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch form data");
      }

      console.log(data);

      setScrapedForms(data);

      if (data.forms && data.forms.length > 0) {
        setSelectedFormIndex(0)
        transformAndStoreForm(data.forms[0], 0)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const transformAndStoreForm = (form, formIndex) => {
    const transformedFields = {}

    form.fields.forEach((field, fieldIndex) => {
      // Generate unique key for each field
      const fieldKey = `${field.name}-${Date.now()}-${fieldIndex}`

      transformedFields[fieldKey] = {
        fieldType: field.type,
        value: "", // User will fill this
        selector: field.selector || "", // Store CSS selector
      }
    })

    // Store in new nested structure
    setValue("taskInputs", {
      formIndex: formIndex,
      formSelector: form.formSelector,
      fields: transformedFields,
    })
  }

  const handleFormSelect = (formIndex) => {
    setSelectedFormIndex(formIndex)
    const selectedForm = scrapedForms.forms[formIndex]
    transformAndStoreForm(selectedForm, formIndex)
  }

  const handleFieldChange = (fieldKey, value) => {
    setValue(`taskInputs.fields.${fieldKey}.value`, value)
  }

  const isSelectionMode = scrapedForms && scrapedForms.forms && scrapedForms.forms.length > 0
  const shouldShowFields = selectedFormIndex !== null || hasExistingFields

  return (
    <FormGroup>
      <fieldset>
        <legend>Basic task info</legend>
        <InputField
          id="title"
          label="Title"
          {...register('title', { required: true })}
        />

        <TextAreaField
          id="description"
          label="Description"
          {...register('description', { required: true })}
        />

        <InputField
          type="url"
          id="url"
          label="URL"
          {...register('url', { required: true })}
        />

        
        <div className={classes.scrapeNav}>
          <Button variant="edit" onClick={handleFetchForm} disabled={loading || showOverwriteWarning}>
            {loading ? <>Fetching...</> : "Fetch Form"}
          </Button>

          {error && <span>{error}</span>}
        </div>

        {showOverwriteWarning && (
          <div className={classes.warningBox}>
            <p className={classes.warningText}>This will replace your existing form fields. Are you sure?</p>
            <div className={classes.warningActions}>
              <Button variant="delete" onClick={handleFetchForm}>
                Yes, Replace
              </Button>
              <Button variant="cancel" onClick={() => setShowOverwriteWarning(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {isSelectionMode && (
          <div className={classes.formsContainer}>
            <h3 className={classes.formsHeader}>
              Found {scrapedForms.forms.length} Form{scrapedForms.forms.length !== 1 ? "s" : ""}
            </h3>
            <div className={classes.formsWrapper}>
              {scrapedForms.forms.map((form, formIndex) => (
                <FormCard
                  key={formIndex}
                  formData={{
                    formId: form.formId,
                    formName: form.formName,
                    formSelector: form.formSelector,
                    formAction: form.formAction,
                    formMethod: form.formMethod,
                    formIndex: formIndex,
                    fields: form.fields, // Pass the fields array from scraped form
                  }}
                  formIndex={formIndex}
                  showRadio={true}
                  isSelected={selectedFormIndex === formIndex}
                  onSelect={handleFormSelect}
                  fields={currentFields}
                  onFieldChange={handleFieldChange}
                />
              ))}
            </div>
          </div>
        )}

        {!isSelectionMode && shouldShowFields && (
          <div className={classes.formsContainer}>
            <h3 className={classes.formsHeader}>Task Form Fields</h3>
            <FormCard
              formData={taskInputs}
              formIndex={taskInputs.formIndex}
              showRadio={false}
              isSelected={false}
              fields={currentFields}
              onFieldChange={handleFieldChange}
            />
          </div>
        )}

        {scrapedForms && scrapedForms.forms && scrapedForms.forms.length === 0 && (
          <p>
            No fillable forms found on this page
          </p>
        )}
        
      </fieldset>
    </FormGroup>
  );
}
