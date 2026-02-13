import { useFormContext } from 'react-hook-form';
import { FormGroup } from "../../../ui/inputs";
import classes from './EmailMonitoringSection.module.css';

export default function EmailMonitoringSection({ emailAccounts = [] }) {
  const { register } = useFormContext();
  

  return (
    <FormGroup>
      
      <fieldset>
        <legend>Email Monitoring (Optional)</legend>
      <p className={classes.sectionDescription}>
        Monitor an email inbox for confirmation after form submission.
      </p>

      <div className={classes.fieldGroup}>
        <label htmlFor="emailAccountId" className={classes.label}>
          Email Account
        </label>
        <select
          id="emailAccountId"
          className={classes.select}
          {...register('emailAccountId')}
        >
          <option value="">-- No email monitoring --</option>
          {emailAccounts.map((account) => (
            <option key={account.id} value={String(account.id)}>
              {account.email_address}
            </option>
          ))}
        </select>
        {emailAccounts.length === 0 && (
          <p className={classes.hint}>
            No email accounts connected. Go to Settings to connect a Gmail account.
          </p>
        )}
      </div>

      <div className={classes.fieldGroup}>
        <label htmlFor="emailCheckTimeout" className={classes.label}>
          Timeout (minutes)
        </label>
        <input
          type="number"
          id="emailCheckTimeout"
          className={classes.input}
          min="1"
          max="120"
          {...register('emailCheckTimeout')}
        />
        <p className={classes.hint}>
          How long to wait for confirmation email (1-120 minutes).
        </p>
      </div>
      </fieldset>
    
    </FormGroup>
  );
}
