import Create from './Create.jsx';
import Remove from './Remove.jsx';
import Edit from './Edit.jsx';

const modals = {
  creating: Create,
  removing: Remove,
  editing: Edit,
};

export default (modalName) => modals[modalName];
