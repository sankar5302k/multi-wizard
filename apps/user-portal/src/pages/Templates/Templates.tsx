import { observer } from 'mobx-react-lite';
import { TemplateList } from './TemplateList';

export const Templates = observer(function Templates() {
  return <TemplateList />;
});
