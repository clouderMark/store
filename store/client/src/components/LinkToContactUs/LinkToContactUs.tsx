import {content} from './content';
import TwoColumns from '../TwoColumns/TwoColumns';
import NavLinkButtons from '../NavLinkButtons/NavLinkButtons';

const buttonStyle = {
  textTransform: 'capitalize',
  mr: '10px',
  mb: '10px',
};

const LinkToContactUs = () => (
  <TwoColumns content={content} buttons={<NavLinkButtons buttons={content.column2.buttons} sx={buttonStyle} />} />
);

export default LinkToContactUs;
