import CenteredContainer from '../CenteredContainer/CenteredContainer';
import {content} from './content';

const Quality = () => (
  <CenteredContainer title={content.title} header={content.header} content={content.content} images={content.images} />
);

export default Quality;
