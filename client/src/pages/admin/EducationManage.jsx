import SimpleCrudManager from '../../components/admin/SimpleCrudManager.jsx';
import { educationService } from '../../services/simpleResourceServices.js';

const fields = [
  { name: 'degree', label: 'Degree / Course', default: '' },
  { name: 'institution', label: 'Institution', default: '' },
  { name: 'location', label: 'Location (optional)', default: '' },
  { name: 'startDate', label: 'Start date', type: 'date', default: '' },
  { name: 'endDate', label: 'End date (leave blank if ongoing)', type: 'date', default: '' },
  { name: 'current', label: 'Currently studying here', type: 'checkbox', default: false },
  { name: 'description', label: 'Description', type: 'textarea', default: '' },
  { name: 'order', label: 'Display order', type: 'number', default: 0 },
];

export default function EducationManage() {
  return (
    <SimpleCrudManager
      title="Education"
      description="Shown as a timeline on the public Education page."
      service={educationService}
      fields={fields}
      renderRow={(item) => (
        <div>
          <p className="font-medium text-text">{item.degree}</p>
          <p className="text-sm text-muted">{item.institution}</p>
        </div>
      )}
    />
  );
}
