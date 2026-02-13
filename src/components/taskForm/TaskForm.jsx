import { useState, useEffect } from 'react';
import { useNavigate, useParams, useRevalidator } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { 
  BasicDetailsSection, 
  ScheduleTimeSection, 
  ActionsSection,
  EmailMonitoringSection,
  ErrorDisplaySection
} from './sections';
import { formatDateTime } from '../../util/helpers';
import { authFetch } from '../../util/auth';
import { API_ENDPOINTS } from '../../config/api';
import classes from './TaskForm.module.css';


export default function TaskForm({ task }) {
  const [emailAccounts, setEmailAccounts] = useState([]);
  const [serverErrors, setServerErrors] = useState(null);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const revalidator = useRevalidator();

  // Fetch connected email accounts
  useEffect(() => {
    async function fetchEmailAccounts() {
      try {
        const accounts = await authFetch(API_ENDPOINTS.GMAIL_ACCOUNTS);
        setEmailAccounts(accounts || []);
      } catch (error) {
        console.error("Failed to fetch email accounts:", error);
      }
    }
    fetchEmailAccounts();
  }, []);

  const form = useForm({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      url: task?.url || '',
      taskInputs: task?.inputs || {},
      scheduleType: task?.cron_expression ? 'cron' : 'single', // ← This controls default radio
      scheduleTime: task?.launch_time?.slice(0, -3) || '',
      cronExpression: task?.cron_expression || '',
      createdOn: task?.createdOn || formatDateTime(new Date()),
      changedOn: formatDateTime(new Date()),
      emailAccountId: task?.email_account_id ? String(task.email_account_id) : '',
      emailCheckTimeout: task?.email_check_timeout || 30
    }
  })

  // Reset form with email_account_id after accounts are loaded
  useEffect(() => {
    if (emailAccounts.length > 0 && task?.email_account_id) {
      form.reset({
        ...form.getValues(),
        email_account_id: String(task.email_account_id),
      });
    }
  }, [emailAccounts, task?.email_account_id, form]);

  const onSubmit = async (data) => {
    try {

      setServerErrors(null);

      const token = localStorage.getItem("token")

      if (!token) {
        setServerErrors({ general: "Authentication required. Please log in." })
        return
      }

      const isEditing = !!task;
      const method = isEditing ? "PATCH" : "POST";
      const url = isEditing ? API_ENDPOINTS.task(task.id) : API_ENDPOINTS.TASKS;

      const taskData = {
        title: data.title,
        description: data.description,
        url: data.url,
        inputs: data.taskInputs || {}, 
        scheduleType: data.scheduleType,
        scheduleTime: data.scheduleTime ? (data.scheduleTime + ":00") : null,
        cronExpression: data.cronExpression,
        emailAccountId: data.emailAccountId ? Number(data.emailAccountId) : null,
        emailCheckTimeout: data.emailCheckTimeout ? Number(data.emailCheckTimeout) : 30
      };

      // Only include project_id when CREATING a new task
      if (!isEditing) {
        taskData.project_id = projectId
      }

      console.log("Submitting task data:", taskData)

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,  
        },
        body: JSON.stringify(taskData)
      });

      if (response.status === 422) {
        const errorData = await response.json();
        setServerErrors(errorData.errors);
        return;
      }

      if (!response.ok) {
        console.log(response);
        throw new Error('Could not save task');
      } 

      // Success - redirect to project
      revalidator.revalidate(); 
      navigate(`/projects/${projectId}`);
      
    } catch (error) {
      console.error('Submit error:', error);
      setServerErrors({ general: 'An error occurred while saving the task' });
    }
  };

  return (
    <FormProvider {...form}>
      <form className={classes.form} onSubmit={form.handleSubmit(onSubmit)}>
        <BasicDetailsSection />
        <ScheduleTimeSection />
        <EmailMonitoringSection emailAccounts={emailAccounts} />
        <ErrorDisplaySection errors={serverErrors} className={classes.errorList}/>
        <ActionsSection onCancel={() => navigate(`/projects/${projectId}`)} />
      </form>
    </FormProvider>
  );
}

