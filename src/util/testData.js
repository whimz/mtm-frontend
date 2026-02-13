export const TEST_FORM_DATA_SINGLE_LAUNCH = {
  title: 'Test Task Title',
  description: 'This is a test task description for development purposes',
  url: 'https://back-office.com.ua',
  taskInputs: {
    'name-123': { 
      value: 'John Doe', 
      selector: '<input size="40" maxlength="400" class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" placeholder="Степан Степанович" value="" type="text" name="yourName">' 
    },
    'tel-986': {
      value: '12345679',
      selector: '<input size="40" maxlength="400" class="wpcf7-form-control wpcf7-tel wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-tel" aria-required="true" aria-invalid="false" placeholder="123456789" value="" type="tel" name="tel-994" autocomplete="off" data-intl-tel-input-id="0" style="padding-left: 103px;">'
    },
    'email-456': { 
      value: 'john@example.com', 
      selector: '<input size="40" maxlength="400" class="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" aria-required="true" aria-invalid="false" placeholder="example@gmail.com" value="" type="email" name="email">' 
    },
    'socials-111': {
      value: 'viber',
      selector: '<input size="40" maxlength="400" class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" placeholder="https://www.instagram.com/backofficeagency" value="" type="text" name="socials">'
    },
    'message-789': { 
      value: 'Test message content', 
      selector: '<textarea cols="40" rows="10" maxlength="2000" class="wpcf7-form-control wpcf7-textarea" aria-invalid="false" placeholder="Текст" name="message"></textarea>' 
    }
  },
  scheduleType: 'single',
  scheduleTime: '2024-12-25T10:30',
  cronExpression: '',
};

// You can also have multiple test scenarios
export const TEST_FORM_DATA_CRON = {
  ...TEST_FORM_DATA_SINGLE_LAUNCH,
  scheduleType: 'cron',
  scheduleTime: '',
  cronExpression: '0 9 * * 1',
};