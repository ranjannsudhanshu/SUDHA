import SimpleCrudManager from '../../components/admin/SimpleCrudManager.jsx';
import { experienceService } from '../../services/simpleResourceServices.js';

const fields = [
  { name: 'role', label: 'Role / Title', default: '' },
  { name: 'company', label: 'Company', default: '' },
  { name: 'location', label: 'Location (optional)', default: '' },
  { name: 'startDate', label: 'Start date', type: 'date', default: '' },
  { name: 'endDate', label: 'End date (leave blank if current)', type: 'date', default: '' },
  { name: 'current', label: 'I currently work here', type: 'checkbox', default: false },
  { name: 'description', label: 'Description', type: 'textarea', default: '' },
  { name: 'order', label: 'Display order', type: 'number', default: 0 },
];

export default function ExperienceManage() {
  return (
    <SimpleCrudManager
      title="Experience"
      description="Shown as a timeline on the public Experience page."
      service={experienceService}
      fields={fields}
      renderRow={(item) => (
        <div>
          <p className="font-medium text-text">{item.role}</p>
          <p className="text-sm text-muted">{item.company}</p>
        </div>
      )}
    />
  );
}
