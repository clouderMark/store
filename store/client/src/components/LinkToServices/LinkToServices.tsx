import {content} from './content';
import TwoColumns from '../TwoColumns/TwoColumns';
import NavLinkButtons from '../NavLinkButtons/NavLinkButtons';

const LinkToServices = () => (
  <TwoColumns
    content={content}
    buttons={<NavLinkButtons buttons={content.column2.buttons} sx={{textTransform: 'capitalize'}} />}
  />
);

export default LinkToServices;
