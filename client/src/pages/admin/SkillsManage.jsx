import SimpleCrudManager from '../../components/admin/SimpleCrudManager.jsx';
import { skillService } from '../../services/simpleResourceServices.js';

const fields = [
  { name: 'name', label: 'Skill name', default: '' },
  { name: 'category', label: 'Category', default: 'General' },
  { name: 'proficiency', label: 'Proficiency % (optional)', type: 'number', default: '' },
  { name: 'order', label: 'Display order', type: 'number', default: 0 },
];

export default function SkillsManage() {
  return (
    <SimpleCrudManager
      title="Skills"
      description="Shown grouped by category on the public Skills page."
      service={skillService}
      fields={fields}
      renderRow={(skill) => (
        <div>
          <p className="font-medium text-text">{skill.name}</p>
          <p className="text-sm text-muted">
            {skill.category}
            {typeof skill.proficiency === 'number' ? ` · ${skill.proficiency}%` : ''}
          </p>
        </div>
      )}
    />
  );
}
